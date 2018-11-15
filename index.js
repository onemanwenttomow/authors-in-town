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
const cheerio           = require('cheerio');
const request           = require('request');
const goodreads         = require('goodreads-api-node');
const auth              = require('./auth.js');
const checkPass         = require('./passwordcheck.js');
const db                = require('./db.js');
const happy             = require('./happy.js');
const s3                = require('./s3.js');
const s3url             = require('./config.json');
const secrets           = require('./secrets');
const redis             = require('./redis');
const session           = require('express-session');
const Store             = require('connect-redis')(session);


const myCredentials = {
    key: secrets.key,
    secret: secrets.secret
};

const gr = goodreads(myCredentials);
gr.initOAuth('http://localhost:8080/');

console.log(gr);

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

app.use(session({
    store: new Store({
        ttl: 3600, //1 hour
        host: 'localhost',
        port: 6379
    }),
    resave: false,
    saveUninitialized: true,
    secret: secrets.redis_secret
}));

app.post('/register', (req, res) => {
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

app.post('/updateprofile', (req, res) => {
    console.log("Old pass: ", req.body.oldpassword);
    console.log("Old pass: ", req.body.password);
    if (req.body.password == '') {
        db.updateUserProfile(
            req.session.userId,
            req.body.first,
            req.body.last,
            req.body.email
        )
            .then(() => {
                res.json({ success: true });
            }).catch((err) => {
                res.json({ success: false });
                console.log(err);
            });
    } else {
        checkPass.checkUserPassword(req.body.email, req.body.oldpassword)
            .then((data) => {
                if (data) {
                    auth.hashPassword(req.body.password)
                        .then((hash) => {
                            db.updateUserProfileAndPass(
                                req.session.userId,
                                req.body.first,
                                req.body.last,
                                req.body.email,
                                hash,
                            )
                                .then(() => {
                                    res.json({ success: true });
                                }).catch((err) => { console.log(err); });
                        }).catch((err) => {console.log(err);});
                } else {
                    res.json({ success: false });
                }
            }).catch(() => {res.json({ success: false });});
    }
});

app.post('/addevent.json', (req, res) => {
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
    let currentDate2 = new Date().toISOString().slice(0,10);
    db.getAuthorEvents(req.session.userId, currentDate2)
        .then(data => {
            res.json({ data: data.rows });
        }).catch(err => { console.log(err); });
});

app.get('/getauthorbyid.json/:id', function(req, res) {
    db.getAuthorById(req.params.id)
        .then(data => {
            res.json({ data: data.rows[0] });
        }).catch(err => { console.log(err); });
});

app.get('/getauthorseventsbyid.json/:id', function(req, res) {
    let currentDate3 = new Date().toISOString().slice(0,10);
    db.getAuthorEventsByGoodReadsId(req.params.id, currentDate3)
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
    gr.getAccessToken()
        .then(() => {
            console.log("MADE IT TO ACCESS TOKEN");
            gr.getCurrentUserInfo()
                .then(data => {
                    req.session.goodReadsId = data.user.id;
                    axios.get(`https://www.goodreads.com/review/list/${req.session.goodReadsId}.xml?key=${secrets.key}&shelf=read&per_page=200&v=2`)
                        .then((data) => {
                            console.log("converting...");
                            let xml = data.data;
                            let result1 = convert.xml2json(xml, {compact: true, spaces: 4});
                            let obj = JSON.parse(result1);

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

                            console.log("there should be this number of authors: ", authorsArray.length);
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
                }).catch(err => { console.log(err); });
        }).catch(err => {console.log(err);});
});

app.post('/setgoodreadstotrue', (req, res) => {
    db.updateUserGooReadsStatus(req.session.userId)
        .then(() => {
            res.json({success: true});
        }).catch(err => { console.log(err); });
});

app.get('/getauthorbooks.json/:id', (req, res) => {
    redis.get(req.params.id)
        .then((data) => {
            if (data) {
                console.log("rendered from REDIS!!");
                res.json(JSON.parse(data));
            } else {
                gr.getAuthorInfo(req.params.id)
                    .then((data) => {
                        let stringifyedData = JSON.stringify(data.books.book.slice(0,9));
                        redis.setex(req.params.id, 60 * 60 * 2, stringifyedData)
                            .then(() => {
                                return redis.get(req.params.id);
                            }).then(() => {
                                console.log("rendered from POSGRES");
                                res.json(data.books.book.slice(0,9));
                            });
                    }).catch(err => {console.log(err);});
            }
        });
});

app.get('/geteventsbyuserid.json', (req, res) => {
    let currentDate = new Date().toISOString().slice(0,10);
    db.getPopularAuthorEvents(req.session.userId, currentDate)
        .then((data) => {
            res.json(data.rows);
        }).catch(err => {console.log(err);});
});

app.get('/getallevents.json', (req, res) => {
    let date = new Date().toISOString().slice(0,10);
    db.getAllEvents(date)
        .then(data => {
            console.log(data.rows);
            res.json(data.rows);
        }).catch(err => { console.log(err); });
});

app.get('/search.json/:q', (req, res) => {
    db.incrementalSearchQuery(req.params.q)
        .then(data => {
            if (data.rows.length == 0 ) {
                res.json({ data: 'no results', });
            } else {
                console.log(data.rows);
                res.json({
                    data: data.rows
                });
            }

        }).catch(err => { console.log(err); });
});

app.get('/testingevents', (req, res) => {
    let token= secrets.thelist;
    var config = {
        headers: {'Authorization': "Bearer " + token}
    };
    axios.get('https://api.list.co.uk/v1/search?query=signing&page=5', config)
        .then((response) => {
            console.log("RES: ", response.data);
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].tags[0] == 'books') {
                    db.insertTheListingEvent(
                        response.data[i].name,
                        response.data[i].place_name,
                        response.data[i].town,
                        response.data[i].start_ts
                    )
                        .then((data) => {
                            console.log(data);
                        }).catch(err => { console.log(err); });
                }
            }
            res.json(response.data);
        }).catch((error) => {
            console.log(error);
        });
});

app.get('/eventbrite', (req, res) => {
    axios.get('https://www.eventbriteapi.com/v3/events/search/?q=waterstones&location.address=gb&token=2SEOR22VPGMINMOYPLBO')
        .then((response) => {
            res.json(response.data);
        }).catch((error) => {
            console.log(error);
        });
});

app.get('/goodreadsevents/:countrycode', (req, res) => {
    // let countryCode = '';
    let countryCode = req.params.countrycode.toUpperCase();
    console.log(countryCode);
    axios.get(`https://www.goodreads.com/event/index.xml?key=HYVXXW6GnQ5MwI3g8fjw&search[country_code]=${countryCode}`)
        .then((data) => {
            let xml = data.data;
            let result1 = convert.xml2json(xml, {compact: true, spaces: 4});
            let obj = JSON.parse(result1);
            console.log(obj.GoodreadsResponse.query.country._text);
            let country = obj.GoodreadsResponse.query.country._text;
            // let country = 'USA'
            console.log("testing length: ", obj.GoodreadsResponse.events.event[3].resource_id._attributes);
            console.log("testing length2: ", obj.GoodreadsResponse.events.event.length);
            for (let i = 0; i < obj.GoodreadsResponse.events.event.length; i++) {
                if (obj.GoodreadsResponse.events.event[i].city._text != undefined) {
                    console.log("there is a city");
                    gr.getAuthorInfo(obj.GoodreadsResponse.events.event[i].resource_id._text)
                        .then(data => {
                            console.log(data);
                            db.insertGoodReadsEvent(
                                data.name,
                                obj.GoodreadsResponse.events.event[i].resource_id._text,
                                obj.GoodreadsResponse.events.event[i].title._text,
                                obj.GoodreadsResponse.events.event[i].venue._text,
                                obj.GoodreadsResponse.events.event[i].city._text,
                                country,
                                obj.GoodreadsResponse.events.event[i].start_at._text
                            )
                                .then((data) => {
                                    console.log(data);
                                }).catch(err => { console.log(err); });
                        }).catch(err => { console.log(err); });

                } else {
                    console.log("there is NOT a city");
                }
            }
            res.json(obj);
        }).catch((error) => {
            console.log(error);
        });
});

app.get('/updateauthorstable', (req, response) => {
    db.getAuthorNamesFromGoodReadsTable()
        .then(data => {
            console.log(data.rows[0].goodreads_id);
            for (let i = 0; i < data.rows.length; i++) {
                gr.getAuthorInfo(data.rows[i].goodreads_id)
                    .then(data => {
                        console.log(data);
                        // response.json({success: true});
                        db.insertNewAuthor(
                            data.name,
                            1,
                            data.image_url,
                            'test',
                            data.id
                        )
                            .then(() => {
                                response.json({success: true});
                            }).catch(err => { console.log(err); });
                    }).catch(err => { console.log(err); });
            }
        }).catch(err => { console.log(err); });
});

app.get('/wiki', (req, response) => {

    let url = 'https://en.wikipedia.org/wiki/List_of_authors_by_name:_A';
    request(url, { json: true }, (err, res, body) => {

        if (err) { return console.log(err); }
        const $ = cheerio.load(body);
        let authors = $('a').eq(0).attribs;
        // for (let i = 0; i < as.length; i++ ) {
        //
        // }
        console.log(authors);
        response.json({success: true});
    });
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
