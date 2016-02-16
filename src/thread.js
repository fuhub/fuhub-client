import Resource from './resource';

// TODO move to common module
export const defaultFormat = 'text/markdown';

export default class Thread extends Resource {
	constructor(client, id) {
		super(client, 'thread', id);
	}

	sendMessage(msg) {
		let payload = msg;
		if (typeof msg === 'string') {
			payload = {
				body: msg,
				format: defaultFormat,
			};
		}
		return this.client.fetchJSON(this.path, { method: 'post', body: payload });
	}

	send(msg) {
		return this.sendMessage(msg);
	}
}
