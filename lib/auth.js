'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.token = token;
exports.login = login;
exports.signup = signup;
require('es6-promise').polyfill();
require('isomorphic-fetch');

// TODO duplicate code (see client.js)
function fetchJSON(url) {
	var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var opts = _extends({
		headers: {
			// TODO support basic auth
			Authorization: 'Bearer  ' + this.token,
			Accept: mimeType.json
		}
	}, options);
	return fetch(this.absurl(url), opts).then(function (response) {
		return response.json();
	});
}

// TODO support custom endpoint
// TODO rename to lastToken?
function token() {
	return fetchJSON('/api/token');
}

function login(payload) {
	return fetchJSON('/api/login', { method: 'post', body: payload });
}

function signup(user) {
	return fetchJSON('/api/signup', { method: 'post', body: user });
}