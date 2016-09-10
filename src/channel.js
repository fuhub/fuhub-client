import Resource from './resource';

export default class Channel extends Resource {
  constructor(client, id) {
    super(client, 'channel', id);
  }

  threads() {
    return this.fetchJSON(`${this.path}/threads`);
  }

  // TODO create thread
}
