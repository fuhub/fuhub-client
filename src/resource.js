// TODO fix path

export default class Resource {
	constructor(client, type, id) {
		this.client = client;
		this.type = type;
		this.id = id;
		this.path = `/api/${type}/${this.id}`;
	}

	fetchJSON(path, options = {}) {
		return this.client.fetchJSON(path, options);
	}

	postJSON(path, body, extra = {}) {
		return this.client.postJSON(path, body, extra);
	}

	putJSON(path, body, extra = {}) {
		return this.client.putJSON(path, body, extra);
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
