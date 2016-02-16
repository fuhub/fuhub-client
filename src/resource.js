// TODO fix path

export default class Resource {
	constructor(client, type, id) {
		this.client = client;
		this.type = type;
		this.id = id;
		this.path = `/api/${type}/${this.id}`;
	}

	load() {
		return this.client.fetchJSON(this.path);
	}

	update(payload) {
		return this.client.fetchJSON(this.path, { method: 'PUT', body: payload });
	}

	delete() {
		return this.client.delete(this.path);
	}

	remove() {
		return this.delete();
	}
}

// TODO WithEvents functional mixin
// TODO WithComments functional mixin
