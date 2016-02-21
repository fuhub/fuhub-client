const tokenKey = 'auth.token';

// TODO store in old-school cookies for old browsers

export function getToken() {
	return localStorage[tokenKey];
}

export function setToken(value) {
	localStorage[tokenKey] = value;
}
