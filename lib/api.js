'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.API = exports.MessageAPI = exports.ThreadAPI = exports.sendMessage = exports.ChannelAPI = exports.UserAPI = exports.HTTP = exports.defaultFormat = undefined;
exports.token = token;
exports.login = login;
exports.logout = logout;
exports.signup = signup;
exports.sendComment = sendComment;

var _http = require('./http');

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

var defaultFormat = exports.defaultFormat = 'text/markdown';

var HTTP = exports.HTTP = new _http.HttpClient({
	endpoint: '/',
	token: '',
	prefix: 'api'
});

// TODO rename to lastToken?
function token() {
	return HTTP.get('token').then(function (t) {
		HTTP.token = t;
		return t;
	});
}

function login(payload) {
	return HTTP.post('login', payload).then(function (t) {
		HTTP.token = t;
		return t;
	});
}

function logout() {
	return HTTP.post('logout').then(function (t) {
		HTTP.token = '';
		return t;
	});
}

function signup(user) {
	return HTTP.post('signup', user).then(function (t) {
		HTTP.token = t;
		return t;
	});
}

function makeAPI(name, collectionName, extend) {
	var api = {
		create: function create(payload) {
			return HTTP.post(collectionName, payload);
		},
		get: function get(id) {
			if (id) {
				return HTTP.get(name + '/' + id);
			}
			return HTTP.get(collectionName).then(function (list) {
				return list || [];
			});
		},
		post: function post(payload, id) {
			if (id) {
				return HTTP.post(name + '/' + id, payload);
			}
			return HTTP.post(collectionName, payload);
		},
		remove: function remove(id) {
			return HTTP.del(name + '/' + id);
		},
		update: function update(id, payload) {
			return HTTP.put(name + '/' + id, payload);
		}
	};
	if (typeof extend === 'function') {
		api = Object.assign({}, api, extend(api));
	} else if ((typeof extend === 'undefined' ? 'undefined' : _typeof(extend)) === 'object') {
		api = Object.assign({}, api, extend);
	}
	var fn = function fn() {
		return api.get();
	};
	Object.keys(api).forEach(function (key) {
		fn[key] = api[key];
	});
	return fn;
}

var UserAPI = exports.UserAPI = makeAPI('user', 'users', {
	me: function me() {
		return HTTP.get('user');
	}
});

var ChannelAPI = exports.ChannelAPI = makeAPI('channel', 'channels', {
	one: function one(id) {
		return {
			threads: function threads() {
				return HTTP.get('channel/' + id + '/threads').then(function (list) {
					return list || [];
				});
			}
		};
	}
});

function _sendMessage(path, msg) {
	var payload = msg;
	if (typeof msg === 'string') {
		payload = {
			body: msg,
			format: defaultFormat
		};
	}
	return HTTP.post(path, payload);
}

exports.sendMessage = _sendMessage;
function sendComment(type, id, msg) {
	return _sendMessage(type + '/' + id + '/comments', msg);
}

var ThreadAPI = exports.ThreadAPI = makeAPI('thread', 'threads', {
	one: function one(id) {
		return {
			sendMessage: function sendMessage(msg) {
				return _sendMessage('thread/' + id, msg);
			},
			messages: function messages() {
				return HTTP.get('thread/' + id + '/messages').then(function (list) {
					return list || [];
				});
			}
		};
	}
});

var MessageAPI = exports.MessageAPI = makeAPI('message', 'messages', {
	send: _sendMessage,
	sendComment: sendComment
});

var API = exports.API = {
	token: token,
	login: login,
	logout: logout,
	signup: signup,
	me: UserAPI.me,
	users: UserAPI,
	channels: ChannelAPI,
	channel: ChannelAPI.one,
	threads: ThreadAPI,
	thread: ThreadAPI.one,
	messages: MessageAPI,
	sendMessage: _sendMessage,
	sendComment: sendComment
};

exports.default = API;