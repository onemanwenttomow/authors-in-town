const express           = require('express');
const compression       = require('compression');
const bodyParser        = require('body-parser');
const cookieSession     = require('cookie-session');
const csurf             = require('csurf');
const multer            = require('multer');
const uidSafe           = require('uid-safe');
const path              = require('path');
const axios             = require('axios');
const url               = require('url');
const convert           = require('xml-js');
const goodreads         = require('goodreads-api-node');
const auth              = require('./auth.js');
const checkPass         = require('./passwordcheck.js');
const db                = require('./db.js');
const happy             = require('./happy.js');
const s3                = require('./s3.js');
const s3url             = require('./config.json');
const secrets           = require('./secrets');

const myCredentials = {
    key: secrets.key,
    secret: secrets.secret
};

const gr = goodreads(myCredentials);
gr.initOAuth('http://localhost:8080/');


const app = express();

const server            = require('http').Server(app);
const io                = require('socket.io')(server, { origins: 'localhost:8080' });

app.use(compression());

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24)
            .then(function(uid) {
                callback(null, uid + path.extname(file.originalname));
            });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});


const cookieSessionMiddleware = (cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14
}));

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static('public'));

app.post('/register', (req, res) => {
    console.log("req.body: ", req.body);
    if (req.body.isAuthor) {
        auth.hashPassword(req.body.password)
            .then((hash) => {
                db.insertNewUserAuthor(req.body.first, req.body.last, req.body.email, hash)
                    .then((result) => {
                        req.session.userId = result.rows[0].id;
                        res.json({ success: true });
                    }).catch(() => {res.json({ success: false });});
            }).catch(() => {res.json({ success: false });});
    } else {
        auth.hashPassword(req.body.password)
            .then((hash) => {
                db.insertNewUser(req.body.first, req.body.last, req.body.email, hash)
                    .then((result) => {
                        req.session.userId = result.rows[0].id;
                        res.json({ success: true });
                    }).catch(() => {res.json({ success: false });});
            }).catch(() => {res.json({ success: false });});
    }

});

app.post('/login', (req, res) => {
    checkPass.checkUserPassword(req.body.email, req.body.password)
        .then((data) => {
            if (data) {
                req.session.userId = data;
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        }).catch(err => { console.log(err); });
});

app.post('/upload', uploader.single('file'), s3.upload, (req, res) => {
    const imgUrl = `${s3url.s3Url}${req.file.filename}`;
    db.updateUserImage(req.session.userId, imgUrl)
        .then((data) => {
            res.json(data.rows[0]);
        }).catch(err => {console.log(err);});
});

app.post('/updatelocation.json', (req, res) => {
    db.updateUserLocation(req.session.userId, req.body.city, req.body.country)
        .then(data => {
            res.json(data.rows[0]);
        }).catch(err => { console.log(err); });
});

app.post('/addevent.json', (req, res) => {
    console.log("req.body: ", req.body);
    db.insertNewEvent(
        req.session.userId,
        req.body.name,
        req.body.goodreadsid,
        req.body.eventname,
        req.body.venue,
        req.body.town,
        req.body.country,
        req.body.eventtime
    )
        .then((result) => {
            console.log(result);
            res.json({ success: true });
        }).catch(() => {res.json({ success: false });});
});

app.get('/welcome', function(req, res) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/getuserinfo.json', function(req, res) {
    db.getUserInfo(req.session.userId)
        .then(data => {
            res.json({
                data: data.rows[0],
                happyWord: happy.getRandomWord()
            });
        }).catch(err => { console.log(err); });
});

app.get('/getauthorsevents.json', function(req, res) {
    db.getAuthorEvents(req.session.userId)
        .then(data => {
            res.json({ data: data.rows });
        }).catch(err => { console.log(err); });
});

app.get('/getauthorbyid.json/:id', function(req, res) {
    console.log("req.params: ", req.params.id);
    db.getAuthorById(req.params.id)
        .then(data => {
            res.json({ data: data.rows[0] });
        }).catch(err => { console.log(err); });
});

app.get('/getauthorseventsbyid.json/:id', function(req, res) {
    console.log("req.params: ", req.params.id);
    db.getAuthorEventsByGoodReadsId(req.params.id)
        .then(data => {
            res.json({ data: data.rows });
        }).catch(err => { console.log(err); });
});

app.post('/deleteevent.json', function(req, res) {
    db.deleteEvent(req.body.eventId)
        .then(() => {
            res.json({ success: true });
        }).catch(err => { console.log(err); });
});

app.get('/authgoodreads.json', (req, res) => {
    gr.getRequestToken()
        .then((goodreadsurl) => {
            res.json({
                url: goodreadsurl,
                success: true
            });
        }).catch(err => {console.log(err);});
});

app.get('/token.json', (req, res) => {
    console.log("MADE IT HERE!!!");
    gr.getAccessToken()
        .then(() => {
            console.log("MADE IT TO ACCESS TOKEN");
            gr.followAuthor(4432)
                .then((data) => {
                    req.session.goodReadsId = data.author_following.user.id;
                    axios.get(`https://www.goodreads.com/review/list/${req.session.goodReadsId}.xml?key=${secrets.key}&shelf=read&per_page=200&v=2`)
                        .then((data) => {
                            console.log("converting...");
                            let xml = data.data;
                            let result1 = convert.xml2json(xml, {compact: true, spaces: 4});
                            let obj = JSON.parse(result1);
                            console.log("should be finished");
                            console.log("Info about authors: ", obj.GoodreadsResponse.reviews.review[2].book.authors.author.id._text);

                            let authorsArray = [];
                            for (var i = 0; i < obj.GoodreadsResponse.reviews.review.length; i++) {
                                authorsArray.push({
                                    name: obj.GoodreadsResponse.reviews.review[i].book.authors.author.name._text,
                                    author_pic_url: obj.GoodreadsResponse.reviews.review[i].book.authors.author.image_url._cdata,
                                    popularity_ranking: obj.GoodreadsResponse.reviews.review[i].book.authors.author.text_reviews_count._text,
                                    goodreads_id: obj.GoodreadsResponse.reviews.review[i].book.authors.author.id._text,
                                });
                            }
                            let uniqueAuthors = authorsArray.filter((thing, index, self) =>
                                index === self.findIndex((t) => (
                                    t.name === thing.name
                                ))
                            );

                            console.log(uniqueAuthors);
                            res.json({uniqueAuthors: uniqueAuthors});
                            for (let i = 0; i < uniqueAuthors.length; i++) {
                                db.insertNewAuthor(
                                    uniqueAuthors[i].name,
                                    req.session.userId,
                                    uniqueAuthors[i].author_pic_url,
                                    uniqueAuthors[i].popularity_ranking,
                                    uniqueAuthors[i].goodreads_id,
                                );
                            }
                        }).catch(err => {console.log(err);});
                }).catch(err => {console.log(err);});
        }).catch(err => {console.log(err);});
});

app.post('/setgoodreadstotrue', (req, res) => {
    db.updateUserGooReadsStatus(req.session.userId)
        .then(data => {
            console.log(data);
            res.json({success: true});
        }).catch(err => { console.log(err); });
});

app.get('/getauthorbooks.json/:id', (req, res) => {
    console.log(req.params);
    gr.getAuthorInfo(req.params.id)
        .then((data) => {
            // console.log(data.books);
            res.json(data.books);
        }).catch(err => {console.log(err);});
});

app.get('/logout', function(req, res) {
    req.session.userId = null;
    res.redirect('/');
});

app.get('*', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
        console.log(happy.getRandomWord());
    }
});

server.listen(8080, function() {
    console.log("Authors in town up and running!");
});
