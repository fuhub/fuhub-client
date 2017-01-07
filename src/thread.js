import Resource from './resource';
import mimeType from './mimeType';

export default class Thread extends Resource {
  constructor(client, id) {
    super(client, 'thread', id);
  }

  messages() {
    return this.fetchJSON(`${this.path}/messages`).then(a => a || []);
  }

  sendMessage(msg) {
    let payload = msg;
    if (typeof msg === 'string') {
      payload = {
        body: msg,
        format: mimeType.markdown,
      };
    }
    return this.client.postJSON(this.path, payload);
  }

  send(msg) {
    return this.sendMessage(msg);
  }
}
