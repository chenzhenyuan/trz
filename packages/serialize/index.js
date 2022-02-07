"use strict";

require("core-js/modules/es.object.define-property.js");

var _regeneratorRuntime2 = require("@babel/runtime/regenerator");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Serialize = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/web.dom-collections.for-each.js");

var _type = _interopRequireDefault(require("@trz/type"));

var _marked = _regeneratorRuntime2.mark(entriesIterator);

var properties = new WeakMap();

function entriesIterator(items) {
  var i;
  return _regenerator.default.wrap(function entriesIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < items.length)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return items[i];

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var Serialize = function () {
  function Serialize(source) {
    (0, _classCallCheck2.default)(this, Serialize);
    var matches = source ? source.split('&').map(function (item) {
      return item.replace('=', '&').split('&');
    }) : [];
    properties.set(this, matches);
  }

  (0, _createClass2.default)(Serialize, [{
    key: "append",
    value: function append(name, value) {
      properties.get(this).push([name, value]);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var source = properties.get(this);

      for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
        names[_key] = arguments[_key];
      }

      var _loop = function _loop() {
        var k = _names[_i];
        source = source.filter(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 1),
              name = _ref2[0];

          return name !== k;
        });
      };

      for (var _i = 0, _names = names; _i < _names.length; _i++) {
        _loop();
      }

      properties.set(this, source);
    }
  }, {
    key: "get",
    value: function get(name) {
      return properties.get(this).find(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
            k = _ref4[0];

        return name === k;
      })[1];
    }
  }, {
    key: "getAll",
    value: function getAll(name) {
      return properties.get(this).filter(function (_ref5) {
        var _ref6 = (0, _slicedToArray2.default)(_ref5, 1),
            k = _ref6[0];

        return name === k;
      }).map(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            v = _ref8[1];

        return v;
      });
    }
  }, {
    key: "has",
    value: function has(name) {
      return properties.get(this).some(function (_ref9) {
        var _ref10 = (0, _slicedToArray2.default)(_ref9, 1),
            k = _ref10[0];

        return name === k;
      });
    }
  }, {
    key: "set",
    value: function set(name, value) {
      var index,
          source = properties.get(this);
      index = source.findIndex(function (_ref11) {
        var _ref12 = (0, _slicedToArray2.default)(_ref11, 1),
            k = _ref12[0];

        return name === k;
      });
      source = source.filter(function (_ref13) {
        var _ref14 = (0, _slicedToArray2.default)(_ref13, 1),
            k = _ref14[0];

        return name !== k;
      });
      index = ~index ? Math.min(index, source.length) : source.length;
      source.splice(index, 0, [name, value]);
      properties.set(this, source);
    }
  }, {
    key: "keys",
    value: function keys() {
      return properties.get(this).map(function (_ref15) {
        var _ref16 = (0, _slicedToArray2.default)(_ref15, 1),
            key = _ref16[0];

        return key;
      }).entries();
    }
  }, {
    key: "values",
    value: function values() {
      return properties.get(this).map(function (_ref17) {
        var _ref18 = (0, _slicedToArray2.default)(_ref17, 2),
            value = _ref18[1];

        return value;
      }).entries();
    }
  }, {
    key: "sort",
    value: function sort() {
      var target = properties.get(this);
      properties.set(this, target.sort(function (_ref19, _ref20) {
        var _ref21 = (0, _slicedToArray2.default)(_ref19, 1),
            k1 = _ref21[0];

        var _ref22 = (0, _slicedToArray2.default)(_ref20, 1),
            k2 = _ref22[0];

        return k1 < k2 ? -1 : k1 > k2 ? 1 : 0;
      }));
      return this;
    }
  }, {
    key: "entries",
    value: function entries() {
      return entriesIterator(properties.get(this));
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.stringify();
    }
  }, {
    key: "stringify",
    value: function stringify() {
      return properties.get(this).map(function (_ref23) {
        var _ref24 = (0, _slicedToArray2.default)(_ref23, 2),
            k = _ref24[0],
            v = _ref24[1];

        if (_type.default.is(v, 'undefined')) {
          return k;
        }

        if (_type.default.is(v, 'null')) {
          return k + '=';
        }

        if (_type.default.some(v, ['string', 'number', 'boolean', 'null'])) {
          return [k, v].join('=');
        }

        return k + '=' + JSON.stringify(v);
      }).join('&');
    }
  }, {
    key: "forEach",
    value: function forEach(caller, thisArg) {
      var _this = this;

      (0, _toConsumableArray2.default)(properties.get(this)).forEach(function (_ref25) {
        var _ref26 = (0, _slicedToArray2.default)(_ref25, 2),
            key = _ref26[0],
            value = _ref26[1];

        caller.call(_this, key, value, _this);
      }, thisArg);
    }
  }]);
  return Serialize;
}();

exports.Serialize = Serialize;
var _default = Serialize;
exports.default = _default;