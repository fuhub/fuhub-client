'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	switch (name) {
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
			var _name = _step.value;

			var method = collection[_name];
			if (_lodash2.default.isFunction(method)) {
				documentFn[_name] = collection[_name].bind(collection);
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

var HubClient = (function () {
	function HubClient() {
		var options = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

		_classCallCheck(this, HubClient);

		this.options = options;
		this.token = options.token;
		this.endpoint = options.endpoint;
		this.users = makeCollection(this, 'user');
		this.channels = makeCollection(this, 'channel');
		this.threads = makeCollection(this, 'thread');
		this.messages = makeCollection(this, 'message');
	}

	_createClass(HubClient, [{
		key: 'absurl',
		value: function absurl(url) {
			return this.endpoint ? (0, _urlJoin2.default)(this.endpoint, url) : url;
		}
	}, {
		key: 'fetchJSON',
		value: function fetchJSON(url) {
			var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

			var opts = _extends({
				headers: {
					// TODO support basic auth
					Authorization: 'Bearer  ' + this.token,
					Accept: _mimeType2.default.json
				}
			}, options);
			return fetch(this.absurl(url), opts).then(function (response) {
				return response.json();
			});
		}
	}, {
		key: 'delete',
		value: function _delete(url) {
			return this.fetchJSON(url, { method: 'delete' });
		}
	}, {
		key: 'logout',
		value: function logout() {
			return this.fetchJSON('/api/logout', { method: 'post' });
		}
	}]);

	return HubClient;
})();

exports.default = HubClient;