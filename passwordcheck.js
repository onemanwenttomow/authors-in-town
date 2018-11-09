const auth = require('./auth.js');
const db   = require('./db.js');

exports.checkUserPassword = function(email, pass) {
    return db.getHashedPw(email)
        .then((result) => {
            if (result.rows.length == 0) {
                return false;
            } else {
                return auth.checkPassword(pass, result.rows[0].password)
                    .then((passedAuth) => {
                        if (passedAuth) {
                            return result.rows[0].id;
                        } else {
                            return false;
                        }
                    }).catch((err) => {console.log(err);});
            }
        });
};
