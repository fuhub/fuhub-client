'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserCollection = exports.User = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resource = require('./resource');

var _resource2 = _interopRequireDefault(_resource);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = exports.User = function (_Resource) {
  _inherits(User, _Resource);

  function User(client, id) {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, client, 'user', id));
  }

  return User;
}(_resource2.default);

var UserCollection = exports.UserCollection = function (_Collection) {
  _inherits(UserCollection, _Collection);

  function UserCollection(client) {
    _classCallCheck(this, UserCollection);

    return _possibleConstructorReturn(this, (UserCollection.__proto__ || Object.getPrototypeOf(UserCollection)).call(this, client, 'users'));
  }

  _createClass(UserCollection, [{
    key: 'me',
    value: function me() {
      return this.client.fetchJSON('/api/user');
    }
  }, {
    key: 'current',
    value: function current() {
      return this.me();
    }
  }]);

  return UserCollection;
}(_collection2.default);