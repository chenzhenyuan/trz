"use strict";

require("core-js/modules/es.reflect.construct.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUri = exports.default = exports.Uris = exports.SearchParams = exports.HashParams = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _type = _interopRequireDefault(require("@trz/type"));

var _serialize = _interopRequireDefault(require("@trz/serialize"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var rOrigin = /^((?:[^/]+:)(?=\/\/))?\/\/(?:([^:@]+)(?::([^@]+))?@)?(((?:[a-z0-9-]+\.)+[a-z0-9-]+)(?::(\d{1,5}))?)?/i;
var rPathname = /([^?#]+)?(\?[^#]*)?(#.*)?$/i;

var urlParse = function urlParse(url) {
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
      pathname: pathname,
      port: port,
      protocol: protocol,
      search: search,
      username: encodeURIComponent(username),
      password: encodeURIComponent(password)
    };
  }

  throw new TypeError('The parameter of Uri must be a legal value.');
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

    if (hash.slice(0, 1) != '#') {
      throw new ParamsError('The params must be a hash string.');
    }

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
var properties = new WeakMap();

var Uris = function () {
  function Uris(url) {
    (0, _classCallCheck2.default)(this, Uris);
    var uri = Object.entries(urlParse(url));
    properties.set(this, uri);
  }

  (0, _createClass2.default)(Uris, [{
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
  }, {
    key: "host",
    get: function get() {
      return null;
    },
    set: function set(value) {
      console.log(111);
      Object.defineProperty(this, 'host', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: value
      });
    }
  }]);
  return Uris;
}();

exports.Uris = Uris;
console.log(new URL('aa?ssss', new URL('' + window.location)));
var _default = URL;
exports.default = _default;