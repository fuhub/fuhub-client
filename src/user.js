import Resource from './resource';
import Collection from './collection';

export class User extends Resource {
  constructor(client, id) {
    super(client, 'user', id);
  }
}

export class UserCollection extends Collection {
  constructor(client) {
    super(client, 'users');
  }

  me() {
    return this.client.fetchJSON('/api/user');
  }

  current() {
    return this.me();
  }
}
