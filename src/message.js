import Resource from './resource';

export default class Message extends Resource {
	constructor(client, id) {
		super(client, 'message', id);
	}
}
