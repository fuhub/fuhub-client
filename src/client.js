import ClientBase from './clientbase';
import { User, UserCollection } from './user';
import Channel from './channel';
import Thread from './thread';
import Message from './message';
import Document from './document';
import ResourceCollection from './collection';
import { setToken } from './store';

const defaultOptions = {
  endpoint: '',
  token: '',
};

export default class Client extends ClientBase {
  constructor(options = defaultOptions) {
    super(options);
    this.users = new UserCollection(this);
    this.channels = new ResourceCollection(this, 'channels');
    this.threads = new ResourceCollection(this, 'threads');
    this.messages = new ResourceCollection(this, 'messages');
    this.documents = new ResourceCollection(this, 'documents');
  }

  token() {
    return this.fetchJSON('/api/token');
  }

  login(payload) {
    return this.postJSON('/api/login', payload, { noauth: true }).then((token) => {
      setToken(token);
      return token;
    });
  }

  logout() {
    return this.postJSON('/api/logout', {});
  }

  me() {
    return this.fetchJSON('/api/user');
  }

  currentUser() {
    return this.me();
  }

  user(id) {
    return new User(this, id);
  }

  channel(id) {
    return new Channel(this, id);
  }

  thread(id) {
    return new Thread(this, id);
  }

  message(id) {
    return new Message(this, id);
  }

  document(id) {
    return new Document(this, id);
  }

  search(query) {
    return this.fetchJSON('/api/search', { query: { q: query } });
  }
}
