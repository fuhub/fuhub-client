'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _mimeType = require('./mimeType');

var _mimeType2 = _interopRequireDefault(_mimeType);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _auth = require('./auth');

var _store = require('./store');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('es6-promise').polyfill();

var ClientBase = function (_EventEmitter) {
	_inherits(ClientBase, _EventEmitter);

	function ClientBase(options) {
		_classCallCheck(this, ClientBase);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ClientBase).call(this));

		_this.options = options;
		_this.endpoint = options.endpoint;
		return _this;
	}

	_createClass(ClientBase, [{
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
		key: 'fetch',
		value: function fetch(path) {
			var _this2 = this;

			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			if (_lodash2.default.isObject(options.body)) {
				options.body = JSON.stringify(options.body); // eslint-disable-line
			}
			var method = (options.method || 'get').toLowerCase();
			var auth = options.noauth ? '' : this.makeAuth();
			var headers = _extends({}, options.headers || {});
			if (auth) {
				headers.Authorization = auth;
			}
			if (options.hasOwnProperty('body')) {
				headers['Content-Type'] = _mimeType2.default.json;
			}
			var opts = _extends({}, options, { headers: headers });
			var onSuccess = function onSuccess(response) {
				if (response.status === 401) {
					_this2.emitError({ type: 'unauthorized' });
					return Promise.reject('unauthorized');
				}
				if (response.status === 200 && method === 'delete') {
					return response;
				}
				if (response.status >= 400) {
					return response.text().then(function (s) {
						try {
							var err = JSON.parse(s);
							_this2.emitError(err);
							return Promise.reject(err);
						} catch (err) {
							_this2.emitError(err);
							return Promise.reject(err);
						}
					});
				}
				return response;
			};
			return (0, _isomorphicFetch2.default)(this.absurl(path), opts).then(onSuccess, function (err) {
				return _this2.emitError(err);
			});
		}
	}, {
		key: 'fetchJSON',
		value: function fetchJSON(path) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			var opts = _extends({}, options, {
				headers: _extends({}, options.headers || {}, {
					Accept: _mimeType2.default.json
				})
			});
			return this.fetch(path, opts).then(function (r) {
				return r.json();
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
			return this.fetch(url, { method: 'delete' });
		}
	}]);

	return ClientBase;
}(_eventemitter2.default);

exports.default = ClientBase;