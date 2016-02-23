import Resource from './resource';

export default class Document extends Resource {
	constructor(client, id) {
		super(client, 'document', id);
	}

	revisions() {
		return this.fetchJSON(`${this.path}/revisions`);
	}

	content() {
		const opts = {
			headers: {
				// TODO markdown
				Accept: 'text/plain',
			},
		};
		return this.client.fetch(`${this.path}/content`, opts).then(r => r.text());
	}

	// TODO updateContent
}
