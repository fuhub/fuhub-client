// TODO fix path

export default class Resource {
	constructor(client, type, id) {
		this.client = client;
		this.type = type;
		this.id = id;
		this.path = `/api/${type}/${this.id}`;
	}

	fetch() {
		return this.client.fetchJSON(this.path);
	}

	load() {
		return this.fetch();
	}

	update(payload) {
		return this.client.putJSON(this.path, payload);
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
