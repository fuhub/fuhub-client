import ClientBase from './clientbase';
import Resource from './resource';
import { User, UserCollection } from './user';
import Channel from './channel';
import Thread from './thread';
import Message from './message';
import Document from './document';
import ResourceCollection from './collection';
import pluralize from 'pluralize';
import { setToken } from './store';
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
	case 'document':
		return new Document(client, id);
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

export default class Client extends ClientBase {
	constructor(options = defaultOptions) {
		super(options);
		this.users = makeCollection(this, 'user');
		this.channels = makeCollection(this, 'channel');
		this.threads = makeCollection(this, 'thread');
		this.messages = makeCollection(this, 'message');
		this.documents = makeCollection(this, 'document');
	}

	token() {
		return this.fetchJSON('/api/token');
	}

	login(payload) {
		return this.postJSON('/api/login', payload).then(token => {
			setToken(token);
			return token;
		});
	}

	logout() {
		return this.postJSON('/api/logout', {});
	}

	me() {
		return this.fetchJSON('/api/user');
	}

	currentUser() {
		return this.me();
	}

	user(id) {
		return new User(this, id);
	}

	channel(id) {
		return new Channel(this, id);
	}

	thread(id) {
		return new Thread(this, id);
	}

	message(id) {
		return new Message(this, id);
	}

	document(id) {
		return new Document(this, id);
	}
}
