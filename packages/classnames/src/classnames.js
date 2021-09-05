var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.classnames = exports.default = void 0;
    /* ************************************************************************* */
    var is = function (source, targetTypeName) {
        var sourceTypeName = Object.prototype.toString.call(source).slice(8, -1).toLowerCase();
        return targetTypeName ? sourceTypeName === targetTypeName : sourceTypeName;
    };
    var classnames = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var classes = [];
        function pushClasses(cls) {
            classes = classes.concat(cls.split(" "));
        }
        Array.from(args).forEach(function (classname) {
            var e_1, _a;
            if (is(classname, "string")) {
                pushClasses("" + classname);
            }
            else if (is(classname, "object")) {
                try {
                    for (var _b = __values(Object.entries(classname)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = __read(_c.value, 2), c = _d[0], b = _d[1];
                        if (b === true)
                            pushClasses(c);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else if (is(classname, "array")) {
                pushClasses(classnames.apply(void 0, __spread(classname)));
            }
        });
        return Array.from(new Set(classes)).join(" ").replace(/\s+/g, " ");
    };
    exports.default = classnames;
    exports.classnames = classnames;
});
