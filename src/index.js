import Client from './client';
import EventStream from './eventstream';
import { getToken, setToken } from './store';
import _ from 'lodash';

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

export const API = new Client();

export {
	Client,
	EventStream,
	getToken,
	setToken,
};

export default Client;
