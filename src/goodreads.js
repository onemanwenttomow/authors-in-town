
function(token, tokenSecret, ctx, cb) {
    var OAuth = new require("oauth").OAuth;
    var parser = require(\'xml2json\');
    var oauth = new OAuth(ctx.requestTokenURL, ctx.accessTokenURL, ctx.client_id, ctx.client_secret, "1.0", null, "HMAC-SHA1");
    oauth.get("https://www.goodreads.com/api/auth_user", token, tokenSecret, function(e, xml, r) {
        console.log(xml);
        if (e) return cb(e);
        if (r.statusCode !== 200)
        return cb(new Error("StatusCode: " + r.statusCode));
        try {
            var jsonResp = JSON.parse(parser.toJson(xml));
            var user = jsonResp.GoodreadsResponse.user; cb(null, user);
        } catch (e) {
            console.log(e);
            cb(new UnauthorizedError("[+] fetchUserProfile: Goodreads fetch script failed. Check Webtask logs"));
        }
    });
}
