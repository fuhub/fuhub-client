import _ from 'lodash';
import Client from './client';
import { getToken, setToken } from './store';

export EventStream from './eventstream';
export mimeType from './mimeType';

export function initSession(init, showLogin) {
	const client = new Client();
	client.token().then(t => {
		setToken(t);
		if (_.isFunction(init)) {
			init();
		}
	}, () => {
		if (_.isFunction(showLogin)) {
			showLogin();
		}
	});
}

export function isLoggedIn() {
	return (getToken() || '').length > 0;
}

export const API = new Client();

export {
	Client,
	getToken,
	setToken,
};

export default Client;
