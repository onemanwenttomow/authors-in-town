const express           = require('express');
const compression       = require('compression');
const bodyParser        = require('body-parser');
const cookieSession     = require('cookie-session');
const csurf             = require('csurf');
const auth              = require('./auth.js');
const checkPass         = require('./passwordcheck.js');
const db                = require('./db.js');

const app = express();

const server            = require('http').Server(app);
const io                = require('socket.io')(server, { origins: 'localhost:8080' });

app.use(compression());


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
    auth.hashPassword(req.body.password)
        .then((hash) => {
            db.insertNewUser(req.body.first, req.body.last, req.body.email, hash)
                .then((result) => {
                    req.session.userId = result.rows[0].id;
                    res.json({ success: true });
                }).catch(() => {res.json({ success: false });});
        }).catch(() => {res.json({ success: false });});
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


app.get('/welcome', function(req, res) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
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
    }
});

server.listen(8080, function() {
    console.log("Authors in town up and running!");
});
