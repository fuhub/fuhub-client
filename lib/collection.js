"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collection = function () {
  function Collection(client, name) {
    _classCallCheck(this, Collection);

    this.client = client;
    this.name = name;
    this.path = "/api/" + this.name;
  }

  _createClass(Collection, [{
    key: "fetch",
    value: function fetch() {
      return this.client.fetchJSON(this.path).then(function (a) {
        return a || [];
      });
    }
  }, {
    key: "load",
    value: function load() {
      return this.fetch();
    }
  }, {
    key: "scan",
    value: function scan() {
      return this.fetch();
    }
  }, {
    key: "create",
    value: function create(body) {
      return this.client.postJSON(this.path, body);
    }

    // TODO find

  }]);

  return Collection;
}();

exports.default = Collection;