'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _resource = require('./resource');

var _resource2 = _interopRequireDefault(_resource);

var _user = require('./user');

var _channel = require('./channel');

var _channel2 = _interopRequireDefault(_channel);

var _thread = require('./thread');

var _thread2 = _interopRequireDefault(_thread);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _mimeType = require('./mimeType');

var _mimeType2 = _interopRequireDefault(_mimeType);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _auth = require('./auth');

var _store = require('./store');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('es6-promise').polyfill();
require('isomorphic-fetch');

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

var Client = (function (_EventEmitter) {
	_inherits(Client, _EventEmitter);

	function Client() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

		_classCallCheck(this, Client);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Client).call(this));

		_this.options = options;
		_this.endpoint = options.endpoint;
		_this.users = makeCollection(_this, 'user');
		_this.channels = makeCollection(_this, 'channel');
		_this.threads = makeCollection(_this, 'thread');
		_this.messages = makeCollection(_this, 'message');
		return _this;
	}

	_createClass(Client, [{
		key: 'absurl',
		value: function absurl(url) {
			return this.endpoint ? (0, _urlJoin2.default)(this.endpoint, url) : url;
		}
	}, {
		key: 'emitError',
		value: function emitError(err) {
			if (_lodash2.default.isFunction(this.onError)) {
				this.onError(err);
				return;
			}
			this.emit('error', err);
		}
	}, {
		key: 'makeAuth',
		value: function makeAuth() {
			if (this.options.token || this.options.username) {
				return (0, _auth.makeAuthorizationHeader)(this.options);
			}
			// get token from local storage
			var options = { token: (0, _store.getToken)() };
			return (0, _auth.makeAuthorizationHeader)(options);
		}
	}, {
		key: 'fetchJSON',
		value: function fetchJSON(path) {
			var _this2 = this;

			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			if (_lodash2.default.isObject(options.body)) {
				options.body = JSON.stringify(options.body); // eslint-disable-line
			}
			var auth = this.makeAuth();
			var opts = _extends({
				headers: {
					Authorization: auth,
					Accept: _mimeType2.default.json
				}
			}, options);
			var onSuccess = function onSuccess(response) {
				if (response.status === 401) {
					_this2.emitError({ type: 'unauthorized' });
					return Promise.reject('unauthorized');
				}
				return response.json();
			};
			return fetch(this.absurl(path), opts).then(onSuccess, function (err) {
				return _this2.emitError(err);
			});
		}
	}, {
		key: 'postJSON',
		value: function postJSON(path, body) {
			var extra = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

			return this.fetchJSON(path, _extends({ method: 'post', body: body }, extra));
		}
	}, {
		key: 'putJSON',
		value: function putJSON(path, body) {
			var extra = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

			return this.fetchJSON(path, _extends({ method: 'put', body: body }, extra));
		}
	}, {
		key: 'delete',
		value: function _delete(url) {
			return this.fetchJSON(url, { method: 'delete' });
		}
	}, {
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
	}]);

	return Client;
})(_eventemitter2.default);

exports.default = Client;