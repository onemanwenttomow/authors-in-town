const spicedPg = require('spiced-pg');
let secrets;
if (process.env.NODE_ENV === 'production') {
    secrets = process.env;
} else {
    secrets = require('./secrets');
}

const dbUrl = process.env.DATABASE_URL || `postgres:${secrets.dbUser}:${secrets.dbPassword}@localhost:5432/authorsintown`;
const db = spicedPg(dbUrl);

////////////////////////////////////////////////////////////////////////////////
////////////////////////         USER            ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

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
            VALUES ($1, $2, $3, $4, '/img/robots.png', 'Berlin', 'Germany', true) RETURNING id`;
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
    const q = `SELECT first, last, id, approvedGoodReads, email, imgurl, city, country, author FROM users WHERE id = $1`;
    const params = [id || null,];
    return db.query(q, params);
};

exports.updateUserProfile = function(id, first, last, email) {
    const q = `UPDATE users
        SET first = $2,
        last = $3,
        email = $4
        WHERE id = $1
        RETURNING id`;
    const params = [id || null, first || null, last || null, email || null];
    return db.query(q, params);
};

exports.updateUserProfileAndPass = function(id, first, last, email, hash) {
    const q = `UPDATE users
        SET first = $2,
        last = $3,
        email = $4,
        password = $5
        WHERE id = $1
        RETURNING id`;
    const params = [id || null, first || null, last || null, email || null, hash];
    return db.query(q, params);
};

exports.userFollowingAuthorCheck = function(userId, authorId) {
    const q = `SELECT name FROM authors WHERE user_id = $1 AND goodreads_id = $2`;
    const params = [userId || null, authorId || null];
    return db.query(q, params);
};

exports.unfollowAuthor = function(userId, authorId) {
    const q = `DELETE FROM authors WHERE user_id = $1 AND goodreads_id = $2`;
    const params = [userId || null, authorId || null];
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
    const q = `INSERT INTO goodreadsevents (user_id, name, goodreads_id, event_name, venue_name, town, country, event_time)
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
        SELECT DISTINCT authors.name, author_pic_url, venue_name, event_time, goodreadsevents.id, goodreadsevents.goodreads_id
        FROM goodreadsevents
        JOIN authors
        ON authors.goodreads_id = goodreadsevents.goodreads_id
        WHERE authors.user_id = $1
    `;
    const params = [userid || null];
    return db.query(query, params);
};

exports.getPopularAuthorEvents = function(userid, currentDate) {
    const query = `
        SELECT DISTINCT authors.goodreads_id, author_pic_url, venue_name, event_time, goodreadsevents.id, authors.name, popularity_ranking, town, country
        FROM goodreadsevents
        JOIN authors
        ON authors.goodreads_id = goodreadsevents.goodreads_id
        WHERE authors.user_id = $1
        AND
        event_time >= $2
        AND event_time <  '2020-07-01'
        ORDER BY popularity_ranking DESC
        LIMIT 200
    `;
    const params = [userid || null, currentDate];
    return db.query(query, params);
};

exports.getAuthorEvents = function(userid, currentDate) {
    const query = `
        SELECT DISTINCT authors.name, author_pic_url, venue_name, event_time, goodreadsevents.id, goodreadsevents.goodreads_id
        FROM goodreadsevents
        JOIN authors
        ON authors.goodreads_id = goodreadsevents.goodreads_id
        WHERE goodreadsevents.user_id = $1
        AND
        event_time >= $2
        AND event_time <  '2020-07-01'
    `;
    const params = [userid || null ,currentDate];
    return db.query(query, params);
};

exports.getAllEvents = function(currentDate) {
    const query = `
        SELECT DISTINCT authors.name, author_pic_url, venue_name, event_time, goodreadsevents.id, country, town, goodreadsevents.goodreads_id
        FROM goodreadsevents
        JOIN authors
        ON authors.goodreads_id = goodreadsevents.goodreads_id
        WHERE event_time >= $1
        AND event_time <  '2020-07-01'
        ORDER BY event_time
        LIMIT 20
    `;
    const params = [currentDate];
    return db.query(query, params);
};

exports.getMoreEvents = function(currentDate, id) {
    const query = `
        SELECT DISTINCT authors.name, author_pic_url, venue_name, event_time, goodreadsevents.id, country, town, goodreadsevents.goodreads_id
        FROM goodreadsevents
        JOIN authors
        ON authors.goodreads_id = goodreadsevents.goodreads_id
        WHERE event_time >= $1
        AND event_time <  '2020-07-01'
        AND goodreadsevents.id < $2
        ORDER BY event_time
        LIMIT 20
    `;
    const params = [currentDate, id];
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
        FROM goodreadsevents
        WHERE goodreads_id = $1
    `;
    const params = [goodreadsid || null];
    return db.query(q, params);
};

exports.deleteEvent = function(eventId) {
    const q = `DELETE FROM goodreadsevents WHERE id = $1`;
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

exports.insertGoodReadsEvent = function(name, goodreadsId, eventName, venueName, town, country, eventTime) {
    const q = `INSERT INTO goodreadsevents (name, goodreads_id, event_name, venue_name, town, country, event_time)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`;
    const params = [
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


exports.getAuthorNamesFromGoodReadsTable = function() {
    const q = `SELECT name, goodreads_id FROM goodreadsevents`;
    const params = [];
    return db.query(q, params);
};


////////////////////////////////////////////////////////////////////////////////
////////////////////////         SEARCH          ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

exports.incrementalSearchQuery = function(q) {
    const query = `
        SELECT DISTINCT authors.name, author_pic_url, authors.popularity_ranking, goodreadsevents.goodreads_id
        FROM goodreadsevents
        JOIN authors
        ON authors.goodreads_id = goodreadsevents.goodreads_id
        WHERE authors.name ILIKE $1
        ORDER BY authors.popularity_ranking
        LIMIT 8
    `;
    const params = ['%' + q + '%' || null];
    return db.query(query, params);
};



////////////////////////////////////////////////////////////////////////////////
///////////////////         AUTHOR LONG LIST          //////////////////////////
////////////////////////////////////////////////////////////////////////////////

exports.insertNewLongListAuthor = function(name) {
    const q = `INSERT INTO authorlonglist (name)
            VALUES ($1)`;
    const params = [name || null];
    return db.query(q, params);
};
