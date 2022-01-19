"use strict";

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.symbol.iterator.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Uri = exports.SearchParams = exports.HashParams = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.symbol.to-string-tag.js");

require("core-js/modules/es.json.to-string-tag.js");

require("core-js/modules/es.math.to-string-tag.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _serialize = _interopRequireDefault(require("@trz/serialize"));

var _type = _interopRequireDefault(require("@trz/type"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ParamsError = function (_Error) {
  (0, _inherits2.default)(ParamsError, _Error);

  var _super = _createSuper(ParamsError);

  function ParamsError(message) {
    var _this$stack;

    var _this;

    (0, _classCallCheck2.default)(this, ParamsError);
    _this = _super.call(this, message);
    _this.name = 'ParamsError';
    _this.message = message;
    var stack = ((_this$stack = _this.stack) === null || _this$stack === void 0 ? void 0 : _this$stack.split('\n')) || [];
    stack.splice(1, 2);
    _this.stack = stack.join('\n');
    return _this;
  }

  return (0, _createClass2.default)(ParamsError);
}((0, _wrapNativeSuper2.default)(Error));

var SearchParams = function (_Serialize) {
  (0, _inherits2.default)(SearchParams, _Serialize);

  var _super2 = _createSuper(SearchParams);

  function SearchParams() {
    var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    (0, _classCallCheck2.default)(this, SearchParams);
    return _super2.call(this, (typeof search === 'string' ? search : '').replace(/#.*$/i, '').replace(/^\?/i, ''));
  }

  (0, _createClass2.default)(SearchParams, [{
    key: "toString",
    value: function toString() {
      var str = this.stringify();
      return str && "?".concat(str);
    }
  }]);
  return SearchParams;
}(_serialize.default);

exports.SearchParams = SearchParams;

var HashParams = function (_Serialize2) {
  (0, _inherits2.default)(HashParams, _Serialize2);

  var _super3 = _createSuper(HashParams);

  function HashParams() {
    var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    (0, _classCallCheck2.default)(this, HashParams);
    return _super3.call(this, (typeof hash === 'string' ? hash : '').replace(/\?[^#]*/i, '').replace(/^#/i, ''));
  }

  (0, _createClass2.default)(HashParams, [{
    key: "toString",
    value: function toString() {
      var str = this.stringify();
      return str && "#".concat(str);
    }
  }]);
  return HashParams;
}(_serialize.default);

exports.HashParams = HashParams;

var mergeUri = function mergeUri() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var url = new URL(window.location.toString());
  args = Array.from(args);

  var _iterator = _createForOfIteratorHelper(args),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      url = new URL(element, url);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return url;
};

var Uri = function (_URL) {
  (0, _inherits2.default)(Uri, _URL);

  var _super4 = _createSuper(Uri);

  function Uri() {
    (0, _classCallCheck2.default)(this, Uri);
    return _super4.call(this, mergeUri.apply(void 0, arguments));
  }

  (0, _createClass2.default)(Uri, [{
    key: "setSearch",
    value: function setSearch(name, value) {
      var _this2 = this;

      var params = [];

      if (_type.default.is(name, 'string') && name.length) {
        params = [[name, value]];
      } else if (_type.default.is(name, 'object')) {
        params = Object.entries(name);
      } else if (_type.default.is(name, 'array')) {
        params = name;
      } else {
        throw TypeError('参数类型错误，请使用正确的参数。');
      }

      params.forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            key = _ref2[0],
            val = _ref2[1];

        var v = val !== null && val !== void 0 ? val : '';

        _this2.searchParams.set(key, _type.default.is(v, 'string') ? v : JSON.stringify(v));
      });
    }
  }, {
    key: "appendSearch",
    value: function appendSearch(name, value) {
      var _this3 = this;

      var params = [];

      if (_type.default.is(name, 'string') && name.length) {
        params = [[name, value]];
      } else if (_type.default.is(name, 'object')) {
        params = Object.entries(name);
      } else if (_type.default.is(name, 'array')) {
        params = name;
      } else {
        throw TypeError('参数类型错误，请使用正确的参数。');
      }

      params.forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            key = _ref4[0],
            val = _ref4[1];

        var v = val !== null && val !== void 0 ? val : '';

        _this3.searchParams.append(key, _type.default.is(v, 'string') ? v : JSON.stringify(v));
      });
    }
  }, {
    key: "removeSearch",
    value: function removeSearch() {}
  }]);
  return Uri;
}((0, _wrapNativeSuper2.default)(URL));

exports.Uri = Uri;
Object.defineProperty(Uri.prototype, Symbol.toStringTag, {
  value: 'Uri'
});
var _default = Uri;
exports.default = _default;