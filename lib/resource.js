"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO fix path

var Resource = function () {
  function Resource(client, type, id) {
    _classCallCheck(this, Resource);

    this.client = client;
    this.type = type;
    this.id = id;
    this.path = "/api/" + type + "/" + this.id;
  }

  _createClass(Resource, [{
    key: "fetchJSON",
    value: function fetchJSON(path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.client.fetchJSON(path, options);
    }
  }, {
    key: "postJSON",
    value: function postJSON(path, body) {
      var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.client.postJSON(path, body, extra);
    }
  }, {
    key: "putJSON",
    value: function putJSON(path, body) {
      var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return this.client.putJSON(path, body, extra);
    }
  }, {
    key: "fetch",
    value: function fetch() {
      return this.client.fetchJSON(this.path);
    }
  }, {
    key: "load",
    value: function load() {
      return this.fetch();
    }
  }, {
    key: "update",
    value: function update(payload) {
      return this.client.putJSON(this.path, payload);
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this.client.delete(this.path);
    }
  }, {
    key: "remove",
    value: function remove() {
      return this.delete();
    }
  }]);

  return Resource;
}();

// TODO WithEvents functional mixin
// TODO WithComments functional mixin


exports.default = Resource;