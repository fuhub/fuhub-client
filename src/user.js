import Resource from './resource';
import Collection from './collection';

export class User extends Resource {
	constructor(client, id) {
		super(client, 'user', id);
	}
}

export class UserCollection extends Collection {
	constructor(client, name) {
		super(client, name);
	}

	current() {
		return this.client.fetchJSON(`${this.path}/me`);
	}
}
