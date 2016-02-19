import EventEmitter from 'eventemitter3';
import EventSource from 'eventsource';
// TODO remove dependency on callback-queue
// import callbackQueue from 'callback-queue';
import urljoin from 'url-join';
import queryString from 'query-string';
import _ from 'lodash';

// TODO idea: use generators to ensure hronological order of events

// Event stream from global channel or specific channels.
export default class EventStream extends EventEmitter {
	constructor(options) {
		super();

		if (options && options.url && options.token) {
			this.open(options);
		}
	}

	open(options) {
		this.close();

		const params = queryString.stringify({ auth_token: options.token });
		const url = urljoin(options.url, `?${params}`);
		const source = new EventSource(url);
		const self = this;

		this.source = source;

		source.onerror = (err) => {
			console.log('SSE error:', err);
			self.emit('error', err);
		};

		source.onmessage = (e) => {
			const msg = _.isString(e.data) ? JSON.parse(e.data) : e.data;
			console.log('SSE message:', msg);
			self.handleEvent(msg);
		};
	}

	close() {
		const source = this.source;
		this.source = null;
		if (source) {
			source.close();
		}
	}

	handleEvent(e) {
		const action = (e.action || '').toLowerCase();
		const id = e.resource_id;
		let data = e.body;
		const type = (e.type || '').toUpperCase();
		const eventType = `${action.toUpperCase()}_${type}`;
		if (action === 'delete') {
			data = id;
		}
		const self = this;
		self.emit(eventType, data);
		// TODO deal with order of events to avoid async side-effects in application
		// const cb = callbackQueue.add(e.id, () => {
		// 	self.emit(eventType, data);
		// });
		// cb();
	}
}
