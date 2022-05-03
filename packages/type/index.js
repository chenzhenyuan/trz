"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.some = exports.of = exports.like = exports.isUndefined = exports.isString = exports.isObject = exports.isNumber = exports.isNull = exports.isFunction = exports.isBoolean = exports.isArray = exports.is = exports.default = exports.ENUM_TYPE = void 0;

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.to-string.js");

var ENUM_TYPE;
exports.ENUM_TYPE = ENUM_TYPE;

(function (ENUM_TYPE) {
  ENUM_TYPE["string"] = "string";
  ENUM_TYPE["number"] = "number";
  ENUM_TYPE["int"] = "number";
  ENUM_TYPE["array"] = "array";
  ENUM_TYPE["list"] = "array";
  ENUM_TYPE["object"] = "object";
  ENUM_TYPE["dict"] = "object";
})(ENUM_TYPE || (exports.ENUM_TYPE = ENUM_TYPE = {}));

var types = function types(any) {
  var typeName = Object.prototype.toString.call(any).slice(8, -1);
  return typeName.slice(0, 1).toLowerCase() + typeName.slice(1);
};

var is = function is(source, assert) {
  if (types(assert) !== 'string') {
    return false;
  }

  return types(source) === String.prototype.toLowerCase.call(assert);
};

exports.is = is;

var some = function some(source, assertList) {
  return Array.isArray(assertList) && assertList.some(function (assert) {
    return types(source) === String.prototype.toLowerCase.call(assert);
  });
};

exports.some = some;

var like = function like(source, mirror) {
  return types(source) === types(mirror);
};

exports.like = like;

var isUndefined = function isUndefined(source) {
  return source === undefined;
};

exports.isUndefined = isUndefined;

var isNull = function isNull(source) {
  return source === null;
};

exports.isNull = isNull;

var isString = function isString(source) {
  return is(source, 'string');
};

exports.isString = isString;

var isNumber = function isNumber(source) {
  return is(source, 'number');
};

exports.isNumber = isNumber;

var isBoolean = function isBoolean(source) {
  return is(source, 'boolean');
};

exports.isBoolean = isBoolean;

var isObject = function isObject(source) {
  return is(source, 'object');
};

exports.isObject = isObject;

var isArray = function isArray(source) {
  return is(source, 'array');
};

exports.isArray = isArray;

var isFunction = function isFunction(source) {
  return is(source, 'function');
};

exports.isFunction = isFunction;
var of = types;
exports.of = of;
var _default = {
  enum: ENUM_TYPE,
  is: is,
  of: of,
  isString: isString,
  isNumber: isNumber,
  isArray: isArray,
  isNull: isNull,
  isBoolean: isBoolean,
  isObject: isObject,
  isUndefined: isUndefined,
  isFunction: isFunction,
  some: some
};
exports.default = _default;