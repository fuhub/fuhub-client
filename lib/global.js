'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerEvents = exports.SSE = exports.API = undefined;

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

var _eventstream = require('./eventstream');

var _eventstream2 = _interopRequireDefault(_eventstream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = exports.API = new _client2.default();
var SSE = exports.SSE = new _eventstream2.default();
var ServerEvents = exports.ServerEvents = SSE;