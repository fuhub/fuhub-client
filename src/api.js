import { HttpClient } from './http';

export const defaultFormat = 'text/markdown';

export const HTTP = new HttpClient({
	endpoint: '/',
	token: '',
	prefix: 'api',
});

// TODO rename to lastToken?
export function token() {
	return HTTP.get('token').then(t => {
		HTTP.token = t;
		return t;
	});
}

export function login(payload) {
	return HTTP.post('login', payload).then(t => {
		HTTP.token = t;
		return t;
	});
}

export function logout() {
	return HTTP.post('logout').then(t => {
		HTTP.token = '';
		return t;
	});
}

export function signup(user) {
	return HTTP.post('signup', user).then(t => {
		HTTP.token = t;
		return t;
	});
}

function makeAPI(name, collectionName, extend) {
	let api = {
		create(payload) {
			return HTTP.post(collectionName, payload);
		},
		get(id) {
			if (id) {
				return HTTP.get(`${name}/${id}`);
			}
			return HTTP.get(collectionName).then(list => list || []);
		},
		post(payload, id) {
			if (id) {
				return HTTP.post(`${name}/${id}`, payload);
			}
			return HTTP.post(collectionName, payload);
		},
		remove(id) {
			return HTTP.del(`${name}/${id}`);
		},
		update(id, payload) {
			return HTTP.put(`${name}/${id}`, payload);
		},
	};
	if (typeof extend === 'function') {
		api = Object.assign({}, api, extend(api));
	} else if (typeof extend === 'object') {
		api = Object.assign({}, api, extend);
	}
	const fn = () => api.get();
	Object.keys(api).forEach(key => {
		fn[key] = api[key];
	});
	return fn;
}

export const UserAPI = makeAPI('user', 'users', {
	me() {
		return HTTP.get('user');
	},
});

export const ChannelAPI = makeAPI('channel', 'channels', {
	one(id) {
		return {
			threads() {
				return HTTP.get(`channel/${id}/threads`).then(list => list || []);
			},
		};
	},
});

export function sendMessage(path, msg) {
	let payload = msg;
	if (typeof msg === 'string') {
		payload = {
			body: msg,
			format: defaultFormat,
		};
	}
	return HTTP.post(path, payload);
}

export function sendComment(type, id, msg) {
	return sendMessage(`${type}/${id}/comments`, msg);
}

export const ThreadAPI = makeAPI('thread', 'threads', {
	one(id) {
		return {
			sendMessage(msg) {
				return sendMessage(`thread/${id}`, msg);
			},
			messages() {
				return HTTP.get(`thread/${id}/messages`).then(list => list || []);
			},
		};
	},
});

export const MessageAPI = makeAPI('message', 'messages', {
	send: sendMessage,
	sendComment,
});

export const API = {
	token,
	login,
	logout,
	signup,
	me: UserAPI.me,
	users: UserAPI,
	channels: ChannelAPI,
	channel: ChannelAPI.one,
	threads: ThreadAPI,
	thread: ThreadAPI.one,
	messages: MessageAPI,
	sendMessage,
	sendComment,
};

export default API;
