require('es6-promise').polyfill();
require('isomorphic-fetch');
import EventEmitter from 'eventemitter3';
import Resource from './resource';
import { User, UserCollection } from './user';
import Channel from './channel';
import Thread from './thread';
import Message from './message';
import ResourceCollection from './collection';
import mimeType from './mimeType';
import urljoin from 'url-join';
import pluralize from 'pluralize';
import { makeAuthorizationHeader } from './auth';
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
	switch (resourceType) {
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

export default class Client extends EventEmitter {
	constructor(options = defaultOptions) {
		super();
		this.options = options;
		this.token = options.token;
		this.auth = makeAuthorizationHeader(options);
		this.endpoint = options.endpoint;
		this.users = makeCollection(this, 'user');
		this.channels = makeCollection(this, 'channel');
		this.threads = makeCollection(this, 'thread');
		this.messages = makeCollection(this, 'message');
	}

	absurl(url) {
		return this.endpoint ? urljoin(this.endpoint, url) : url;
	}

	emitError(err) {
		if (_.isFunction(this.onError)) {
			this.onError(err);
			return;
		}
		this.emit('error', err);
	}

	fetchJSON(path, options = {}) {
		const opts = {
			headers: {
				Authorization: this.auth,
				Accept: mimeType.json,
			},
			...options,
		};
		const onSuccess = response => {
			if (response.status === 401) {
				this.emitError({ type: 'unauthorized' });
				return Promise.reject('unauthorized');
			}
			return response.json();
		};
		return fetch(this.absurl(path), opts).then(onSuccess, err => this.emitError(err));
	}

	postJSON(path, body, extra = {}) {
		if (_.isObject(body)) {
			body = JSON.stringify(body); // eslint-disable-line
		}
		return this.fetchJSON(path, { method: 'post', body, ...extra });
	}

	putJSON(path, body, extra = {}) {
		if (_.isObject(body)) {
			body = JSON.stringify(body); // eslint-disable-line
		}
		return this.fetchJSON(path, { method: 'put', body, ...extra });
	}

	delete(url) {
		return this.fetchJSON(url, { method: 'delete' });
	}

	token() {
		return this.fetchJSON('/api/token');
	}

	login(payload) {
		return this.postJSON('/api/login', payload);
	}

	logout() {
		return this.postJSON('/api/logout', {});
	}
}
