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

exports.insertNewUserAuthor = function(first, last, email, hashedPw) {
    const q = `INSERT INTO users (first, last, email, password, imgurl, city, country, author)
            VALUES ($1, $2, $3, $4, '/img/robots.png', 'London', 'UK', true) RETURNING id`;
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
    const q = `SELECT first, last, id, approvedGoodReads, imgurl, city, country, author FROM users WHERE id = $1`;
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

////////////////////////////////////////////////////////////////////////////////
////////////////////////         EVENTS          ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

exports.insertNewEvent = function(userId, name, goodreadsId, eventName, venueName, town, country, eventTime) {
    const q = `INSERT INTO events (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    const params = [
        userId || null,
        name || null,
        goodreadsId || null,
        eventName || null,
        venueName || null,
        town || null,
        country || null,
        eventTime || null
    ];
    return db.query(q, params);
};

exports.getCuratedAuthorEvents = function(userid) {
    const query = `
        SELECT DISTINCT authors.name, author_pic_url, venue_name, event_time, events.id, events.goodreads_id
        FROM events
        JOIN authors
        ON authors.goodreads_id = events.goodreads_id
        WHERE authors.user_id = $1
    `;
    const params = [userid || null];
    return db.query(query, params);
};

exports.getPopularAuthorEvents = function(userid) {
    const query = `
        SELECT DISTINCT authors.goodreads_id, author_pic_url, venue_name, event_time, events.id, authors.name, popularity_ranking, town, country
        FROM events
        JOIN authors
        ON authors.goodreads_id = events.goodreads_id
        WHERE authors.user_id = $1
        ORDER BY popularity_ranking DESC
        LIMIT 50
    `;
    const params = [userid || null];
    return db.query(query, params);
};

exports.getAuthorEvents = function(userid) {
    const query = `
        SELECT DISTINCT authors.name, author_pic_url, venue_name, event_time, events.id, events.goodreads_id
        FROM events
        JOIN authors
        ON authors.goodreads_id = events.goodreads_id
        WHERE events.user_id = $1
    `;
    const params = [userid || null];
    return db.query(query, params);
};

exports.getAuthorById = function(id) {
    const query = `
        SELECT name, author_pic_url, goodreads_id
        FROM authors
        WHERE goodreads_id = $1
    `;
    const params = [id || null];
    return db.query(query, params);
};

exports.getAuthorEventsByGoodReadsId = function(goodreadsid) {
    const q = `
        SELECT event_name, venue_name, town, country, event_time, id
        FROM events
        WHERE goodreads_id = $1
    `;
    const params = [goodreadsid || null];
    return db.query(q, params);
};

exports.deleteEvent = function(eventId) {
    const q = `DELETE FROM events WHERE id = $1`;
    const params = [eventId || null];
    return db.query(q, params);
};


exports.insertTheListingEvent = function(name, venueName, town, eventTime) {
    const q = `INSERT INTO thelistevents (name, event_name, venue_name, town, country, event_time)
            VALUES ($1, $1, $2, $3, 'UK', $4) RETURNING id`;
    const params = [
        name || null,
        venueName || null,
        town || null,
        eventTime || null
    ];
    return db.query(q, params);
};


////////////////////////////////////////////////////////////////////////////////
////////////////////////         SEARCH          ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

exports.incrementalSearchQuery = function(q) {
    const query = `
        SELECT DISTINCT authors.name, author_pic_url, events.goodreads_id
        FROM events
        JOIN authors
        ON authors.goodreads_id = events.goodreads_id
        WHERE authors.name ILIKE $1
    `;
    const params = ['%' + q + '%' || null];
    return db.query(query, params);
};
