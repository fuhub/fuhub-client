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

var Document = function (_Resource) {
	_inherits(Document, _Resource);

	function Document(client, id) {
		_classCallCheck(this, Document);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Document).call(this, client, 'document', id));
	}

	_createClass(Document, [{
		key: 'revisions',
		value: function revisions() {
			return this.fetchJSON(this.path + '/revisions');
		}
	}, {
		key: 'content',
		value: function content() {
			var opts = {
				headers: {
					Accept: _mimeType2.default.markdown
				}
			};
			return this.client.fetch(this.path + '/content', opts).then(function (r) {
				return r.text();
			});
		}
	}, {
		key: 'updateContent',
		value: function updateContent(text) {
			var contentType = arguments.length <= 1 || arguments[1] === undefined ? _mimeType2.default.markdown : arguments[1];

			var opts = {
				method: 'put',
				headers: {
					'Content-Type': contentType || _mimeType2.default.markdown
				},
				body: text
			};
			this.client.fetch(this.path + '/content', opts).then(function (r) {
				return r.json();
			});
		}
	}]);

	return Document;
}(_resource2.default);

exports.default = Document;