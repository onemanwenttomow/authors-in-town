const authors           = require('./../../realauthors.js');
const authors2          = require('./../../realauthors2.js');

exports.getUniqueArrayOfAuthors = function() {
    const authors1Arr = authors.getHarperAuthors();
    const authors2Arr = authors2.getPanMac();
    const authorsArr = authors1Arr.concat(authors2Arr);
    const uniqueAuthors = authorsArr.filter(function(item, pos) {
        return authorsArr.indexOf(item) == pos;
    });
    return uniqueAuthors;
};
