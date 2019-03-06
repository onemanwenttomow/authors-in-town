let alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

exports.alphabetArray = function() {
    return alphabet;
};

let nonAuthors = [
    "Talk",
    "Contributions",
    "Create account",
    "Log in",
    "Article",
    "Talk",
    "Read",
    "Edit",
    "View history",
    "",
    "Main page",
    "Contents",
    "Featured content",
    "Current events",
    "Random article",
    "Donate to Wikipedia",
    "Wikipedia store",
    "Help",
    "About Wikipedia",
    "Community portal",
    "Recent changes",
    "Contact page",
    "What links here",
    "Related changes",
    "Upload file",
    "Special pages",
    "Permanent link",
    "Page information",
    "Wikidata item",
    "Cite this page",
    "Create a book",
    "Download as PDF",
    "Printable version",
    "Wikisource",
    "Afrikaans",
    "Deutsch",
    "Türkçe",
    "Edit links",
    "edit"
];

exports.getNonAuthors = function() {
    return nonAuthors;
};
