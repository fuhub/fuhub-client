require('es6-promise').polyfill();
require('isomorphic-fetch');
import Resource from './resource';
import User from './user';
import Channel from './channel';
import Thread from './thread';
import Message from './message';
import ResourceCollection from './collection';
import mimeType from './mimeType';
import urljoin from 'url-join';
import _ from 'lodash';

function makeResource(client, singleName, collectionName, id) {
	switch (collectionName.toLowerCase()) {
	case 'users':
		return new User(client, id);
	case 'channels':
		return new Channel(client, id);
	case 'threads':
		return new Thread(client, id);
	case 'messages':
		return new Message(client, id);
	default:
		return new Resource(client, singleName, id);
	}
}

function makeCollection(client, collectionName) {
	const collection = new ResourceCollection(client, collectionName);
	const documentFn = function (id) {
		if (!id) return collection;
		return makeResource(client, collectionName, id);
	};

	// extend documentFn with collection API to reduce mistakes
	for (const name of Object.getOwnPropertyNames(Object.getPrototypeOf(collection))) {
		const method = collection[name];
		if (_.isFunction(method)) {
			documentFn[name] = collection[name].bind(collection);
		}
	}

	return documentFn;
}

const defaultOptions = {
	endpoint: '',
	token: '',
};

export default class HubClient {
	constructor(options = defaultOptions) {
		this.options = options;
		this.token = options.token;
		this.endpoint = options.endpoint;
		this.users = makeCollection(this, 'user', 'users');
		this.channels = makeCollection(this, 'channel', 'channels');
		this.threads = makeCollection(this, 'thread', 'threads');
		this.messages = makeCollection(this, 'message', 'messages');
	}

	absurl(url) {
		return this.endpoint ? urljoin(this.endpoint, url) : url;
	}

	fetchJSON(url, options = {}) {
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

	delete(url) {
		return this.fetchJSON(url, { method: 'delete' });
	}

	logout() {
		return this.fetchJSON('/api/logout', { method: 'post' });
	}
}
