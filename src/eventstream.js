/* eslint-disable no-underscore-dangle */
import EventEmitter from 'eventemitter3';
import EventSource from 'eventsource';
import urljoin from 'url-join';
import queryString from 'query-string';
import _ from 'lodash';
import { getToken } from './store';

const nextTick = (function () {
  if (typeof process === 'object' && typeof process.nextTick === 'function') {
    return process.nextTick;
  }
  if (typeof setImmediate === 'function') {
    return setImmediate;
  }
  return cb => setTimeout(cb, 0);
}());

const defaultOptions = {
  url: '/api/event/stream',
  token: '',
};

// TODO auto-reconnect when token is changed

// Event stream from global channel or specific channels.
export default class EventStream extends EventEmitter {
  constructor(options = defaultOptions) {
    super();

    this._queue = [];
    this._processing = false;

    if (options && options.url) {
      this.open(options);
    }
  }

  open(options) {
    this.close();

    const token = options.token || getToken();
    const params = queryString.stringify({ auth_token: token });
    const url = urljoin(options.url, `?${params}`);
    const source = new EventSource(url);

    this.source = source;

    source.onerror = err => {
      console.log('SSE error:', err);
      this.emit('error', err);
    };

    source.onmessage = e => {
      const msg = _.isString(e.data) ? JSON.parse(e.data) : e.data;
      console.log('SSE message:', msg);
      this.handleEvent(msg);
    };
  }

  close() {
    if (this.source) {
      this.source.close();
      this.source = null;
    }
  }

  handleEvent(e) {
    const action = (e.action || '').toLowerCase();
    const id = e.resource_id;
    let data = e.body;
    const type = (e.type || '').toLowerCase();
    const eventType = `${type}.${action}`;
    if (action === 'delete') {
      data = id;
    }
    this._push(eventType, data);
  }

  _push(eventType, data) {
    this._queue.push(() => this.emit(eventType, data));
    if (this._processing) return;
    this._processing = true;
    this._loop();
  }

  _loop() {
    const fn = this._queue.shift();
    nextTick(() => {
      try {
        fn();
      } catch (err) {
        console.log(err);
      }
      if (this._queue.length > 0) {
        this._loop();
      } else {
        this._processing = false;
      }
    });
  }
}
