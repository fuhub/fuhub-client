// simple HTTP client
import _ from 'lodash';
import EventEmitter from 'eventemitter3';
import qwest from 'qwest';
import QS from 'query-string';

const AUTH_SCHEME_BEARER = 'Bearer ';
const AUTH_SCHEME_BASIC = 'Basic ';

if (!('btoa' in window)) {
	window.btoa = function btoa(s) {
		return new Buffer(s).toString('base64');
	};
}

export const HttpEvents = new EventEmitter();

export class HttpClient {
	constructor(options) {
		let endpoint = options.endpoint;
		if (endpoint.charAt(endpoint.length - 1) === '/') {
			endpoint = endpoint.substr(0, endpoint.length - 1);
		}

		this.endpoint = endpoint;
		this.headers = _.extend({}, options.headers || {});
		this.prefix = options.prefix || '';
		this.initAuth(options.token || '');
	}

	get token() {
		return this._token;
	}

	set token(value) {
		this.initAuth(value);
		HttpEvents.emit(value ? 'authorized' : 'unauthorized');
		return value;
	}

	initAuth(token) {
		if (!token) {
			this._token = '';
			this.auth = {};
			return;
		}
		if (typeof token === 'object') {
			this._token = window.btoa(`${token.user}:${token.password}`);
			this.auth = { Authorization: AUTH_SCHEME_BASIC + this._token };
		} else {
			this._token = token || '';
			this.auth = { Authorization: AUTH_SCHEME_BEARER + this._token };
		}
	}

	path(to) {
		return joinPath(this.endpoint, this.prefix, to);
	}

	send(method, path, data, query = {}) {
		const url = this.path(path) + queryString(query);
		const headers = Object.assign({}, this.headers, this.auth);
		const options = {
			headers,
			dataType: 'json',
			responseType: 'json',
		};
		const self = this;

		// TODO use fetch instead of qwest
		return qwest.map(method, url, data, options).then(
			(xhr, response) => response,
			(xhr, error) => {
				if (xhr.status === 401) {
					self.token = '';
					HttpEvents.emit('unauthorized', error);
				} else {
					HttpEvents.emit('error', error);
				}
				return error;
			}
		);
	}

	get(path, query = {}) {
		return this.send('GET', path, null, query);
	}

	post(path, data, query = {}) {
		return this.send('POST', path, data, query);
	}

	put(path, data, query = {}) {
		return this.send('PUT', path, data, query);
	}

	patch(path, data, query = {}) {
		return this.send('PATCH', path, data, query);
	}

	del(path, data = null, query = {}) {
		return this.send('DELETE', path, data, query);
	}
}

export default HttpClient;

export function joinPath(...segments) {
	const path = [...segments].map(trimSlash).filter(_.identity).join('/');
	return `/${path}`;
}

function trimSlash(str) {
	let s = str;
	if (!s) return '';
	if (s.charAt(0) === '/') {
		s = s.substr(1);
	}
	if (s.charAt(s.length - 1) === '/') {
		s = s.substr(0, s.length - 1);
	}
	return s;
}

export function queryString(query) {
	const params = _.isObject(query) ? QS.stringify(query) : '';
	const search = window && window.location ? window.location.search : '';
	let result = [search, params].filter(_.identity).join('&');
	if (!result) return '';
	if (result.charAt(0) !== '?') {
		result = `?${result}`;
	}
	return result;
}
