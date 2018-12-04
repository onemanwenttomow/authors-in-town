const goodreads = require('goodreads-api-node');
var URL = 'https://goodreads.com';


function getCurrentUserInfo() {
    var fn_name = 'getCurrentUserInfo()';
    if (!OAUTHENTICATED) return Promise.reject(noOAuthError(fn_name));
    var path = URL + '/api/auth_user';
    var authOptions = _getAuthOptions();
    var req = Request.builder().withPath(path).withOAuth(authOptions).build();
    return _execute(oAuthGet, req);
}
