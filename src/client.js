require('es6-promise').polyfill();
require('isomorphic-fetch');
import Resource from './resource';
import { User, UserCollection } from './user';
import Channel from './channel';
import Thread from './thread';
import Message from './message';
import ResourceCollection from './collection';
import mimeType from './mimeType';
import urljoin from 'url-join';
import pluralize from 'pluralize';
import _ from 'lodash';

function makeResource(client, resourceType, id) {
	switch (resourceType.toLowerCase()) {
	case 'user':
		return new User(client, id);
	case 'channel':
		return new Channel(client, id);
	case 'thread':
		return new Thread(client, id);
	case 'message':
		return new Message(client, id);
	default:
		return new Resource(client, resourceType, id);
	}
}

function createCollection(client, resourceType) {
	switch (name) {
	case 'user':
		return new UserCollection(client, pluralize(resourceType));
	default:
		return new ResourceCollection(client, pluralize(resourceType));
	}
}

function makeCollection(client, resourceType) {
	const collection = createCollection(client, resourceType);
	const documentFn = function (id) {
		if (!id) return collection;
		return makeResource(client, resourceType, id);
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
		this.users = makeCollection(this, 'user');
		this.channels = makeCollection(this, 'channel');
		this.threads = makeCollection(this, 'thread');
		this.messages = makeCollection(this, 'message');
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
