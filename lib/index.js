'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.setToken = exports.getToken = exports.EventStream = exports.Client = exports.API = undefined;
exports.initSession = initSession;
exports.isLoggedIn = isLoggedIn;

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _eventstream = require('./eventstream');

var _eventstream2 = _interopRequireDefault(_eventstream);

var _store = require('./store');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initSession(init, showLogin) {
	var client = new _client2.default();
	client.token().then(function (t) {
		(0, _store.setToken)(t);
		if (_lodash2.default.isFunction(init)) {
			init();
		}
	}, function () {
		if (_lodash2.default.isFunction(showLogin)) {
			showLogin();
		}
	});
}

function isLoggedIn() {
	return ((0, _store.getToken)() || '').length > 0;
}

var API = exports.API = new _client2.default();

exports.Client = _client2.default;
exports.EventStream = _eventstream2.default;
exports.getToken = _store.getToken;
exports.setToken = _store.setToken;
exports.default = _client2.default;