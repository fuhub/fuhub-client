import Resource from './resource';

export default class Thread extends Resource {
	constructor(client, id) {
		super(client, 'thread', id);
	}
}
