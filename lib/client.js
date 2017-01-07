'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clientbase = require('./clientbase');

var _clientbase2 = _interopRequireDefault(_clientbase);

var _user = require('./user');

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _thread = require('./thread');

var _thread2 = _interopRequireDefault(_thread);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _document = require('./document');

var _document2 = _interopRequireDefault(_document);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _store = require('./store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultOptions = {
  endpoint: '',
  token: ''
};

var Client = function (_ClientBase) {
  _inherits(Client, _ClientBase);

  function Client() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;

    _classCallCheck(this, Client);

    var _this = _possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this, options));

    _this.users = new _user.UserCollection(_this);
    _this.channels = new _collection2.default(_this, 'channels');
    _this.threads = new _collection2.default(_this, 'threads');
    _this.messages = new _collection2.default(_this, 'messages');
    _this.documents = new _collection2.default(_this, 'documents');
    return _this;
  }

  _createClass(Client, [{
    key: 'token',
    value: function token() {
      return this.fetchJSON('/api/token');
    }
  }, {
    key: 'login',
    value: function login(payload) {
      return this.postJSON('/api/login', payload, { noauth: true }).then(function (token) {
        (0, _store.setToken)(token);
        return token;
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      return this.postJSON('/api/logout', {});
    }
  }, {
    key: 'me',
    value: function me() {
      return this.fetchJSON('/api/user');
    }
  }, {
    key: 'currentUser',
    value: function currentUser() {
      return this.me();
    }
  }, {
    key: 'user',
    value: function user(id) {
      return new _user.User(this, id);
    }
  }, {
    key: 'channel',
    value: function channel(id) {
      return new _channel2.default(this, id);
    }
  }, {
    key: 'thread',
    value: function thread(id) {
      return new _thread2.default(this, id);
    }
  }, {
    key: 'message',
    value: function message(id) {
      return new _message2.default(this, id);
    }
  }, {
    key: 'document',
    value: function document(id) {
      return new _document2.default(this, id);
    }
  }]);

  return Client;
}(_clientbase2.default);

exports.default = Client;