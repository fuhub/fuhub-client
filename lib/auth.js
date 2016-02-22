'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.makeAuthorizationHeader = makeAuthorizationHeader;
exports.basicAuth = basicAuth;
function makeAuthorizationHeader(options) {
	if (options.token) {
		return 'Bearer  ' + options.token;
	}
	return basicAuth(options);
}

var btoa = window.btoa || function btoa(s) {
	return new Buffer(s).toString('base64');
};

function basicAuth(_ref) {
	var username = _ref.username;
	var password = _ref.password;

	if (!username || !password) {
		return '';
	}
	var t = btoa(username + ':' + password);
	return 'Basic ' + t;
}