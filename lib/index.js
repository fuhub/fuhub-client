'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.reduxCollection = exports.setToken = exports.getToken = exports.Client = exports.EventStream = exports.SSE = exports.ServerEvents = exports.API = exports.mimeType = undefined;

var _global = require('./global');

Object.defineProperty(exports, 'API', {
	enumerable: true,
	get: function get() {
		return _global.API;
	}
});
Object.defineProperty(exports, 'ServerEvents', {
	enumerable: true,
	get: function get() {
		return _global.ServerEvents;
	}
});
Object.defineProperty(exports, 'SSE', {
	enumerable: true,
	get: function get() {
		return _global.SSE;
	}
});
exports.initSession = initSession;
exports.isLoggedIn = isLoggedIn;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _store = require('./store');

var _eventstream = require('./eventstream');

var _eventstream2 = _interopRequireDefault(_eventstream);

var _mimeType2 = require('./mimeType');

var _mimeType3 = _interopRequireDefault(_mimeType2);

var _redux = require('./redux');

var _redux2 = _interopRequireDefault(_redux);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.mimeType = _mimeType3.default;
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

exports.EventStream = _eventstream2.default;
exports.Client = _client2.default;
exports.getToken = _store.getToken;
exports.setToken = _store.setToken;
exports.reduxCollection = _redux2.default;
exports.default = _client2.default;