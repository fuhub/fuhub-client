import Resource from './resource';

export default class Channel extends Resource {
	constructor(client, id) {
		super(client, 'channel', id);
	}
}
