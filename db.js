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
    const q = `INSERT INTO users (first, last, email, password)
            VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [
        first || null,
        last || null,
        email || null,
        hashedPw || null
    ];
    return db.query(q, params);
};

exports.getHashedPw = function(email){
    const q = `SELECT password, id FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};
