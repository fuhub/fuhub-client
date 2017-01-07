import _ from 'lodash';
import Client from './client';
import { getToken, setToken } from './store';
import EventStream from './eventstream';
import reduxCollection from './redux';

export mimeType from './mimeType';
export { API, ServerEvents, SSE } from './global';

export function initSession(init, showLogin) {
  const client = new Client();
  client.token().then((token) => {
    setToken(token);
    if (_.isFunction(init)) {
      init();
    }
  }, () => {
    if (_.isFunction(showLogin)) {
      showLogin();
    }
  });
}

export function isLoggedIn() {
  return (getToken() || '').length > 0;
}

export {
  EventStream,
  Client,
  getToken,
  setToken,
  reduxCollection,
};

export default Client;
