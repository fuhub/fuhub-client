require('es6-promise').polyfill();
require('isomorphic-fetch');

// TODO duplicate code (see client.js)
function fetchJSON(url, options = {}) {
	const opts = {
		headers: {
			// TODO support basic auth
			Authorization: `Bearer  ${this.token}`,
			Accept: mimeType.json,
		},
		...options,
	};
	return fetch(this.absurl(url), opts).then(response => response.json());
}

// TODO support custom endpoint
// TODO rename to lastToken?
export function token() {
	return fetchJSON('/api/token');
}

export function login(payload) {
	return fetchJSON('/api/login', { method: 'post', body: payload });
}

export function signup(user) {
	return fetchJSON('/api/signup', { method: 'post', body: user });
}
