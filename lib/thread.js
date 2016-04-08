'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resource = require('./resource');

var _resource2 = _interopRequireDefault(_resource);

var _mimeType = require('./mimeType');

var _mimeType2 = _interopRequireDefault(_mimeType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Thread = function (_Resource) {
	_inherits(Thread, _Resource);

	function Thread(client, id) {
		_classCallCheck(this, Thread);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Thread).call(this, client, 'thread', id));
	}

	_createClass(Thread, [{
		key: 'messages',
		value: function messages() {
			return this.fetchJSON(this.path + '/messages');
		}
	}, {
		key: 'sendMessage',
		value: function sendMessage(msg) {
			var payload = msg;
			if (typeof msg === 'string') {
				payload = {
					body: msg,
					format: _mimeType2.default.markdown
				};
			}
			return this.client.postJSON(this.path, payload);
		}
	}, {
		key: 'send',
		value: function send(msg) {
			return this.sendMessage(msg);
		}
	}]);

	return Thread;
}(_resource2.default);

exports.default = Thread;