'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getToken = getToken;
exports.setToken = setToken;
var tokenKey = 'auth.token';

// TODO store in old-school cookies for old browsers

function getToken() {
	return localStorage[tokenKey];
}

function setToken(value) {
	localStorage[tokenKey] = value;
}