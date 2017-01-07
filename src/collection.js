export default class Collection {
  constructor(client, name) {
    this.client = client;
    this.name = name;
    this.path = `/api/${this.name}`;
  }

  fetch() {
    return this.client.fetchJSON(this.path).then(a => a || []);
  }

  load() {
    return this.fetch();
  }

  scan() {
    return this.fetch();
  }

  create(body) {
    return this.client.postJSON(this.path, body);
  }

  // TODO find
}
