const spicedPg = require('spiced-pg');
let secrets;
if (process.env.NODE_ENV === 'production') {
    secrets = process.env;
} else {
    secrets = require('./secrets');
}

const dbUrl = process.env.DATABASE_URL || `postgres:${secrets.dbUser}:${secrets.dbPassword}@localhost:5432/authorsintown`;
const db = spicedPg(dbUrl);

exports.insertNewUser = function(first, last, email, hashedPw) {
    const q = `INSERT INTO users (first, last, email, password, imgurl, city, country)
            VALUES ($1, $2, $3, $4, '/img/robots.png', 'London', 'UK') RETURNING id`;
    const params = [
        first || null,
        last || null,
        email || null,
        hashedPw || null
    ];
    return db.query(q, params);
};

exports.updateUserImage = function(id, imgurl) {
    const q = `UPDATE users SET imgurl = $2 WHERE id = $1 RETURNING imgurl`;
    const params = [id || null, imgurl];
    return db.query(q, params);
};

exports.updateUserGooReadsStatus = function(id) {
    const q = `UPDATE users SET approvedGoodReads = true WHERE id = $1`;
    const params = [id || null];
    return db.query(q, params);
};

exports.updateUserLocation = function(id, city, country) {
    const q = `UPDATE users SET city = $2, country = $3 WHERE id = $1 RETURNING city, country`;
    const params = [id || null, city || null, country || null];
    return db.query(q, params);
};

exports.getHashedPw = function(email){
    const q = `SELECT password, id FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

exports.getUserInfo = function(id) {
    const q = `SELECT first, last, id, approvedGoodReads, imgurl, city, country FROM users WHERE id = $1`;
    const params = [id || null,];
    return db.query(q, params);
};

////////////////////////////////////////////////////////////////////////////////
////////////////////////         AUTHORS         ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

exports.insertNewAuthor = function(name, userid, img, pop, goodreadsid) {
    const q = `INSERT INTO authors (name, user_id, author_pic_url, popularity_ranking, goodreads_id)
            VALUES ($1, $2, $3, $4, $5)`;
    const params = [name || null, userid || null, img || null, pop || null, goodreadsid || null];
    return db.query(q, params);
};
