export default class Collection {
	constructor(client, name) {
		this.client = client;
		this.name = name;
		this.path = `/api/${this.name}`;
	}

	load() {
		return this.client.fetchJSON(this.path);
	}

	scan() {
		return this.load();
	}

	// TODO create, find
}
