'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable no-underscore-dangle */


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

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nextTick = function () {
  if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.nextTick === 'function') {
    return process.nextTick;
  }
  if (typeof setImmediate === 'function') {
    return setImmediate;
  }
  return function (cb) {
    return setTimeout(cb, 0);
  };
}();

var defaultOptions = {
  url: '/api/event/stream',
  token: ''
};

// TODO auto-reconnect when token is changed

// Event stream from global channel or specific channels.

var EventStream = function (_EventEmitter) {
  _inherits(EventStream, _EventEmitter);

  function EventStream() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

    _classCallCheck(this, EventStream);

    var _this = _possibleConstructorReturn(this, (EventStream.__proto__ || Object.getPrototypeOf(EventStream)).call(this));

    _this._queue = [];
    _this._processing = false;

    if (options && options.url) {
      _this.open(options);
    }
    return _this;
  }

  _createClass(EventStream, [{
    key: 'open',
    value: function open(options) {
      var _this2 = this;

      this.close();

      var token = options.token || (0, _store.getToken)();
      var params = _queryString2.default.stringify({ auth_token: token });
      var url = (0, _urlJoin2.default)(options.url, '?' + params);
      var source = new _eventsource2.default(url);

      this.source = source;

      source.onerror = function (err) {
        console.log('SSE error:', err);
        _this2.emit('error', err);
      };

      source.onmessage = function (e) {
        var msg = _lodash2.default.isString(e.data) ? JSON.parse(e.data) : e.data;
        console.log('SSE message:', msg);
        _this2.handleEvent(msg);
      };
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.source) {
        this.source.close();
        this.source = null;
      }
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(e) {
      var action = (e.action || '').toLowerCase();
      var id = e.resource_id;
      var data = e.body;
      var type = (e.type || '').toLowerCase();
      var eventType = type + '.' + action;
      if (action === 'delete') {
        data = id;
      }
      this._push(eventType, data);
    }
  }, {
    key: '_push',
    value: function _push(eventType, data) {
      var _this3 = this;

      this._queue.push(function () {
        return _this3.emit(eventType, data);
      });
      if (this._processing) return;
      this._processing = true;
      this._loop();
    }
  }, {
    key: '_loop',
    value: function _loop() {
      var _this4 = this;

      var fn = this._queue.shift();
      nextTick(function () {
        try {
          fn();
        } catch (err) {
          console.log(err);
        }
        if (_this4._queue.length > 0) {
          _this4._loop();
        } else {
          _this4._processing = false;
        }
      });
    }
  }]);

  return EventStream;
}(_eventemitter2.default);

exports.default = EventStream;