'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EventStream = exports.HubClient = undefined;

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _eventstream = require('./eventstream');

var _eventstream2 = _interopRequireDefault(_eventstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.HubClient = _client2.default;
exports.EventStream = _eventstream2.default;
exports.default = _client2.default;