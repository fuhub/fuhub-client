'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _eventsource = require('eventsource');

var _eventsource2 = _interopRequireDefault(_eventsource);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// TODO remove dependency on callback-queue
// import callbackQueue from 'callback-queue';


// TODO idea: use generators to ensure hronological order of events

// Event stream from global channel or specific channels.

var EventStream = function (_EventEmitter) {
	_inherits(EventStream, _EventEmitter);

	function EventStream(options) {
		_classCallCheck(this, EventStream);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventStream).call(this));

		if (options && options.url && options.token) {
			_this.open(options);
		}
		return _this;
	}

	_createClass(EventStream, [{
		key: 'open',
		value: function open(options) {
			this.close();

			var params = _queryString2.default.stringify({ auth_token: options.token });
			var url = (0, _urlJoin2.default)(options.url, '?' + params);
			var source = new _eventsource2.default(url);
			var self = this;

			this.source = source;

			source.onerror = function (err) {
				console.log('SSE error:', err);
				self.emit('error', err);
			};

			source.onmessage = function (e) {
				var msg = _lodash2.default.isString(e.data) ? JSON.parse(e.data) : e.data;
				console.log('SSE message:', msg);
				self.handleEvent(msg);
			};
		}
	}, {
		key: 'close',
		value: function close() {
			var source = this.source;
			this.source = null;
			if (source) {
				source.close();
			}
		}
	}, {
		key: 'handleEvent',
		value: function handleEvent(e) {
			var action = (e.action || '').toLowerCase();
			var id = e.resource_id;
			var data = e.body;
			var type = (e.type || '').toUpperCase();
			var eventType = action.toUpperCase() + '_' + type;
			if (action === 'delete') {
				data = id;
			}
			var self = this;
			self.emit(eventType, data);
			// TODO deal with order of events to avoid async side-effects in application
			// const cb = callbackQueue.add(e.id, () => {
			// 	self.emit(eventType, data);
			// });
			// cb();
		}
	}]);

	return EventStream;
}(_eventemitter2.default);

exports.default = EventStream;