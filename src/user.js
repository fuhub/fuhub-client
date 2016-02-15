import Resource from './resource';

export default class User extends Resource {
	constructor(client, id) {
		super(client, 'user', id);
	}
}
