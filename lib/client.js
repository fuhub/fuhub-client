'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _clientbase = require('./clientbase');

var _clientbase2 = _interopRequireDefault(_clientbase);

var _resource = require('./resource');

var _resource2 = _interopRequireDefault(_resource);

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

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _store = require('./store');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function makeResource(client, resourceType, id) {
	switch (resourceType.toLowerCase()) {
		case 'user':
			return new _user.User(client, id);
		case 'channel':
			return new _channel2.default(client, id);
		case 'thread':
			return new _thread2.default(client, id);
		case 'message':
			return new _message2.default(client, id);
		case 'document':
			return new _document2.default(client, id);
		default:
			return new _resource2.default(client, resourceType, id);
	}
}

function createCollection(client, resourceType) {
	switch (resourceType) {
		case 'user':
			return new _user.UserCollection(client, (0, _pluralize2.default)(resourceType));
		default:
			return new _collection2.default(client, (0, _pluralize2.default)(resourceType));
	}
}

function makeCollection(client, resourceType) {
	var collection = createCollection(client, resourceType);
	var documentFn = function documentFn(id) {
		if (!id) return collection;
		return makeResource(client, resourceType, id);
	};

	// extend documentFn with collection API to reduce mistakes
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = Object.getOwnPropertyNames(Object.getPrototypeOf(collection))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var name = _step.value;

			var method = collection[name];
			if (_lodash2.default.isFunction(method)) {
				documentFn[name] = collection[name].bind(collection);
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return documentFn;
}

var defaultOptions = {
	endpoint: '',
	token: ''
};

var Client = function (_ClientBase) {
	_inherits(Client, _ClientBase);

	function Client() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

		_classCallCheck(this, Client);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Client).call(this, options));

		_this.users = makeCollection(_this, 'user');
		_this.channels = makeCollection(_this, 'channel');
		_this.threads = makeCollection(_this, 'thread');
		_this.messages = makeCollection(_this, 'message');
		_this.documents = makeCollection(_this, 'document');
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
			return this.postJSON('/api/login', payload).then(function (token) {
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