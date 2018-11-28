const redis = require('redis');
let client;

if (process.env.NODE_ENV === 'production') {
    client = redis.createClient({
        host: 'ec2-54-209-190-123.compute-1.amazonaws.com',
        port: 7739
    });
} else {
    client = redis.createClient({
        host: 'localhost',
        port: 6379
    });
}

const {promisify} = require('util');

client.on('error', function(err) {
    console.log(err);
});

exports.get = promisify(client.get).bind(client);
exports.setex = promisify(client.setex).bind(client);
exports.del = promisify(client.del).bind(client);
