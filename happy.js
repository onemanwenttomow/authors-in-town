const happyWords = [
    'sagacious',
    'great',
    'superb',
    'amazing',
    'incredible',
    'marvelous',
    'wonderful',
    'stunning',
    'phenomenal',
    'peachy',
    'dynamite',
    'stupendous',
    'awe-inspiring',
    'sensational',
    'remarkable',
    'prodigious',
    'brilliant',
    'super',
    'swell',
    'admirable',
    'astonishing',
    'excellent',
    'fabulous',
    'fantastic',
    'wondrous'
];

exports.getRandomWord = function() {
    let random = Math.round(Math.random() * (happyWords.length - 1)) ;
    return happyWords[random];
};
