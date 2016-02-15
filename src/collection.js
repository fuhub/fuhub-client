export default class ResourceCollection {
	constructor(client, name) {
		this.client = client;
		this.name = name;
	}

	load() {
		return this.client.fetchJSON(`/api/${this.name}`);
	}

	scan() {
		return this.load();
	}

	// TODO find
}
