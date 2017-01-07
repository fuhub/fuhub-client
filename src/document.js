import Resource from './resource';
import mimeType from './mimeType';

export default class Document extends Resource {
  constructor(client, id) {
    super(client, 'document', id);
  }

  revisions() {
    return this.fetchJSON(`${this.path}/revisions`).then(a => a || []);
  }

  content() {
    const opts = {
      headers: {
        Accept: mimeType.markdown,
      },
    };
    return this.client.fetch(`${this.path}/content`, opts).then(r => r.text());
  }

  updateContent(text, contentType = mimeType.markdown) {
    const opts = {
      method: 'put',
      headers: {
        'Content-Type': contentType || mimeType.markdown,
      },
      body: text,
    };
    this.client.fetch(`${this.path}/content`, opts).then(r => r.json());
  }
}
