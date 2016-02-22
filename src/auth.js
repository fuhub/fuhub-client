export function makeAuthorizationHeader(options) {
	if (options.token) {
		return `Bearer  ${options.token}`;
	}
	return basicAuth(options);
}

const btoa = window.btoa || function btoa(s) {
	return new Buffer(s).toString('base64');
};

export function basicAuth({ username, password }) {
	if (!username || !password) {
		return '';
	}
	const t = btoa(`${username}:${password}`);
	return `Basic ${t}`;
}
