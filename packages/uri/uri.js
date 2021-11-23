"use strict";

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUri = exports.default = exports.Uri = exports.Serialize = exports.SearchParams = exports.HashParams = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.object.to-string.js");

var _type = _interopRequireDefault(require("@trz/type"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var rProtocol = '((?<protocol>(^[^/]+:)(?=//))(//))?';
var rUserInfo = '((?<username>[^:]+(?=(:|@)))(:(?<password>.+(?=@)))?@)?';
var rHostName = '(?<hostname>([a-z0-9-]+\\.)+([a-z0-9-]+))?';
var rPort = '(:(?<port>\\d{1,5}))?';
var rHost = "((^//)?(?<host>".concat(rHostName).concat(rPort, "))?");
var rPath = '(?<pathname>((\\.{1,2})?(/*?)[^/?#]*)+)?';
var rSearch = '(?<search>\\?[^#]*)?';
var rHash = '(?<hash>#.*$)?';
var reg = new RegExp("".concat(rProtocol).concat(rUserInfo).concat(rHost).concat(rPath).concat(rSearch).concat(rHash), 'i');
var rOrigin = /^((?:[^/]+:)(?=\/\/))?\/\/(?:([^:@]+)(?::([^@]+))?@)?(((?:[a-z0-9-]+\.)+[a-z0-9-]+)(?::(\d{1,5}))?)?/i;
var rPathname = /([^?#]+)?(\?[^#]*)?(#.*)?$/i;

var urlParse = function urlParse(url) {
  if (_type.default.is(url, 'undefined')) {
    url = window.location.href;
  }

  if (_type.default.is(url, 'string') && url !== '') {
    var _rOrigin$exec, _rPathname$exec;

    var href = decodeURIComponent(url);

    var _ref = (_rOrigin$exec = rOrigin.exec(href)) !== null && _rOrigin$exec !== void 0 ? _rOrigin$exec : [],
        _ref2 = (0, _slicedToArray2.default)(_ref, 7),
        _ref2$ = _ref2[1],
        protocol = _ref2$ === void 0 ? '' : _ref2$,
        _ref2$2 = _ref2[2],
        username = _ref2$2 === void 0 ? '' : _ref2$2,
        _ref2$3 = _ref2[3],
        password = _ref2$3 === void 0 ? '' : _ref2$3,
        _ref2$4 = _ref2[4],
        host = _ref2$4 === void 0 ? '' : _ref2$4,
        _ref2$5 = _ref2[5],
        hostname = _ref2$5 === void 0 ? '' : _ref2$5,
        _ref2$6 = _ref2[6],
        port = _ref2$6 === void 0 ? '' : _ref2$6;

    var _ref3 = (_rPathname$exec = rPathname.exec(href.replace(rOrigin, ''))) !== null && _rPathname$exec !== void 0 ? _rPathname$exec : [],
        _ref4 = (0, _slicedToArray2.default)(_ref3, 4),
        _ref4$ = _ref4[1],
        pathname = _ref4$ === void 0 ? '' : _ref4$,
        _ref4$2 = _ref4[2],
        search = _ref4$2 === void 0 ? '' : _ref4$2,
        _ref4$3 = _ref4[3],
        hash = _ref4$3 === void 0 ? '' : _ref4$3;

    return {
      hash: hash,
      host: host,
      hostname: hostname,
      href: href,
      origin: host ? "".concat(protocol, "//").concat(host) : '',
      password: password,
      pathname: pathname,
      port: port,
      protocol: protocol,
      search: search,
      username: username
    };
  }

  throw new TypeError('The parameter must be a legal value.');
};

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

  return ParamsError;
}((0, _wrapNativeSuper2.default)(Error));

var Serialize = function () {
  function Serialize(source) {
    var _source$match;

    (0, _classCallCheck2.default)(this, Serialize);
    var matches = ((_source$match = source.match(/([^=&]+(?:=[^&]+)?)/g)) !== null && _source$match !== void 0 ? _source$match : []).map(function (i) {
      return i.split(/=/i);
    });

    var _iterator = _createForOfIteratorHelper(matches),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = (0, _toArray2.default)(_step.value),
            key = _step$value[0],
            value = _step$value.slice(1);

        this[key] = value.join('=');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  (0, _createClass2.default)(Serialize, [{
    key: "toString",
    value: function toString() {
      return this.stringify();
    }
  }, {
    key: "stringify",
    value: function stringify() {
      return Object.entries(this).map(function (arr) {
        return arr.join('=');
      }).join('&');
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this[key] = !value || _type.default.is(value, 'string') || _type.default.is(value, 'number') ? String(value || (value === 0 ? value : '')) : JSON.stringify(value);
    }
  }, {
    key: "delete",
    value: function _delete() {
      for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
        keys[_key] = arguments[_key];
      }

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];

        if (_type.default.is(key, 'string') && this.hasOwnProperty(key)) {
          delete this[key];
        }
      }
    }
  }]);
  return Serialize;
}();

exports.Serialize = Serialize;

var isUri = function isUri(source) {
  return rOrigin.test(source);
};

exports.isUri = isUri;

var SearchParams = function (_Serialize) {
  (0, _inherits2.default)(SearchParams, _Serialize);

  var _super2 = _createSuper(SearchParams);

  function SearchParams() {
    var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    (0, _classCallCheck2.default)(this, SearchParams);

    if (search.slice(0, 1) != '?') {
      throw new ParamsError('The params must be a search string.');
    }

    return _super2.call(this, (typeof search === 'string' ? search : '').replace(/#.*$/i, '').replace(/^\?/i, ''));
  }

  (0, _createClass2.default)(SearchParams, [{
    key: "stringify",
    value: function stringify() {
      return '?' + Object.entries(this).map(function (arr) {
        arr[1] = encodeURIComponent(arr[1]);
        return arr.join('=');
      }).join('&');
    }
  }]);
  return SearchParams;
}(Serialize);

exports.SearchParams = SearchParams;

var HashParams = function (_Serialize2) {
  (0, _inherits2.default)(HashParams, _Serialize2);

  var _super3 = _createSuper(HashParams);

  function HashParams() {
    var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    (0, _classCallCheck2.default)(this, HashParams);

    if (hash.slice(0, 1) != '#') {
      throw new ParamsError('The params must be a hash string.');
    }

    return _super3.call(this, (typeof hash === 'string' ? hash : '').replace(/\?[^#]*/i, '').replace(/^#/i, ''));
  }

  (0, _createClass2.default)(HashParams, [{
    key: "stringify",
    value: function stringify() {
      return '#' + Object.entries(this).map(function (arr) {
        arr[1] = encodeURIComponent(arr[1]);
        return arr.join('=');
      }).join('&');
    }
  }]);
  return HashParams;
}(Serialize);

exports.HashParams = HashParams;

var Uri = function () {
  function Uri(url) {
    (0, _classCallCheck2.default)(this, Uri);
    var properties = urlParse(url);
    properties.hashParams = new HashParams(properties.hash || '#');
    properties.searchParams = new SearchParams(properties.search || '?');

    for (var key in properties) {
      var _properties$key;

      var value = (_properties$key = properties[key]) !== null && _properties$key !== void 0 ? _properties$key : '';
      Object.defineProperty(this, key, {
        writable: false,
        configurable: false,
        enumerable: true,
        value: value
      });
    }
  }

  (0, _createClass2.default)(Uri, [{
    key: "toString",
    value: function toString() {
      return this.stringify();
    }
  }, {
    key: "stringify",
    value: function stringify() {
      var domain = this.host !== '' ? this.protocol + '//' + this.host : '';
      var search = this.searchParams.toString() === '?' ? '' : this.searchParams;
      var hash = this.hashParams.toString() === '#' ? '' : this.hashParams;
      return domain + this.pathname + search + hash;
    }
  }]);
  return Uri;
}();

exports.Uri = Uri;
var _default = Uri;
exports.default = _default;