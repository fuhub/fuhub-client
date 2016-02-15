// TODO fix path

export default class Resource {
	constructor(client, type, id) {
		this.client = client;
		this.type = type;
		this.id = id;
		this.path = `${type}/${this.id}`;
	}

	load() {
		return this.client.fetchJSON(`/api/${this.path}`);
	}

	delete() {
		return this.client.delete(`/api/${this.path}`);
	}

	remove() {
		return this.delete();
	}
}

// TODO WithEvents functional mixin
// TODO WithComments functional mixin
