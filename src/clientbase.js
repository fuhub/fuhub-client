/* eslint-disable */
require('es6-promise').polyfill();
import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import EventEmitter from 'eventemitter3';
import queryString from 'query-string';
import urljoin from 'url-join';
import mimeType from './mimeType';
import { makeAuthorizationHeader } from './auth';
import { getToken } from './store';
/* eslint-enable */

export default class ClientBase extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.endpoint = options.endpoint;
  }

  absurl(url) {
    return this.endpoint ? urljoin(this.endpoint, url) : url;
  }

  emitError(err) {
    if (_.isFunction(this.onError)) {
      this.onError(err);
      return;
    }
    this.emit('error', err);
  }

  makeAuth() {
    if (this.options.token || this.options.username) {
      return makeAuthorizationHeader(this.options);
    }
    // get token from local storage
    const options = { token: getToken() };
    return makeAuthorizationHeader(options);
  }

  fetch(path, options = {}) {
    if (_.isObject(options.body)) {
      options.body = JSON.stringify(options.body); // eslint-disable-line
    }

    const method = (options.method || 'get').toLowerCase();
    const auth = options.noauth ? '' : this.makeAuth();
    const headers = { ...(options.headers || {}) };
    if (auth) {
      headers.Authorization = auth;
    }
    if (options.body && !headers['Content-Type']) {
      headers['Content-Type'] = mimeType.json;
    }

    const onSuccess = (response) => {
      if (response.status === 401) {
        // TODO emit object error
        this.emitError({ type: 'unauthorized' });
        return Promise.reject('unauthorized');
      }
      if (response.status === 200 && method === 'delete') {
        return response;
      }
      if (response.status >= 400) {
        return response.text().then((s) => {
          try {
            const err = JSON.parse(s);
            this.emitError(err);
            return Promise.reject(err);
          } catch (err) {
            this.emitError(err);
            return Promise.reject(err);
          }
        });
      }
      return response;
    };

    let qs = '';
    if (_.isObject(options.query)) {
      qs = `?${queryString.stringify(options.query)}`;
    }

    const url = this.absurl(path) + qs;
    const params = { ...options, headers };
    return fetch(url, params).then(onSuccess, err => this.emitError(err));
  }

  fetchJSON(path, options = {}) {
    const opts = {
      ...options,
      headers: {
        ...(options.headers || {}),
        Accept: mimeType.json,
      },
    };
    return this.fetch(path, opts).then(r => r.json());
  }

  postJSON(path, body, extra = {}) {
    return this.fetchJSON(path, { method: 'post', body, ...extra });
  }

  putJSON(path, body, extra = {}) {
    return this.fetchJSON(path, { method: 'put', body, ...extra });
  }

  delete(url) {
    return this.fetch(url, { method: 'delete' });
  }
}
