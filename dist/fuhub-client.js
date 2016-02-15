!function(root, factory) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = factory(); else if ("function" == typeof define && define.amd) define([], factory); else {
        var a = factory();
        for (var i in a) ("object" == typeof exports ? exports : root)[i] = a[i];
    }
}(this, function() {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                exports: {},
                /******/
                id: moduleId,
                /******/
                loaded: !1
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ /* 0 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.EventStream = exports.HubClient = void 0;
        var _client = __webpack_require__(11), _client2 = _interopRequireDefault(_client), _eventstream = __webpack_require__(13), _eventstream2 = _interopRequireDefault(_eventstream);
        exports.HubClient = _client2["default"], exports.EventStream = _eventstream2["default"], 
        exports["default"] = _client2["default"];
    }, /* 1 */
    /***/
    function(module, exports) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), Resource = function() {
            function Resource(client, type, id) {
                _classCallCheck(this, Resource), this.client = client, this.type = type, this.id = id, 
                this.path = type + "/" + this.id;
            }
            return _createClass(Resource, [ {
                key: "load",
                value: function() {
                    return this.client.fetchJSON("/api/" + this.path);
                }
            }, {
                key: "delete",
                value: function() {
                    return this.client["delete"]("/api/" + this.path);
                }
            }, {
                key: "remove",
                value: function() {
                    return this["delete"]();
                }
            } ]), Resource;
        }();
        // TODO WithEvents functional mixin
        // TODO WithComments functional mixin
        exports["default"] = Resource;
    }, /* 2 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(setImmediate, clearImmediate) {
            function Timeout(id, clearFn) {
                this._id = id, this._clearFn = clearFn;
            }
            var nextTick = __webpack_require__(40).nextTick, apply = Function.prototype.apply, slice = Array.prototype.slice, immediateIds = {}, nextImmediateId = 0;
            // DOM APIs, for completeness
            exports.setTimeout = function() {
                return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
            }, exports.setInterval = function() {
                return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
            }, exports.clearTimeout = exports.clearInterval = function(timeout) {
                timeout.close();
            }, Timeout.prototype.unref = Timeout.prototype.ref = function() {}, Timeout.prototype.close = function() {
                this._clearFn.call(window, this._id);
            }, // Does not start the time, just sets up the members needed.
            exports.enroll = function(item, msecs) {
                clearTimeout(item._idleTimeoutId), item._idleTimeout = msecs;
            }, exports.unenroll = function(item) {
                clearTimeout(item._idleTimeoutId), item._idleTimeout = -1;
            }, exports._unrefActive = exports.active = function(item) {
                clearTimeout(item._idleTimeoutId);
                var msecs = item._idleTimeout;
                msecs >= 0 && (item._idleTimeoutId = setTimeout(function() {
                    item._onTimeout && item._onTimeout();
                }, msecs));
            }, // That's not how node.js implements it but the exposed api is the same.
            exports.setImmediate = "function" == typeof setImmediate ? setImmediate : function(fn) {
                var id = nextImmediateId++, args = arguments.length < 2 ? !1 : slice.call(arguments, 1);
                return immediateIds[id] = !0, nextTick(function() {
                    immediateIds[id] && (// fn.call() is faster so we optimize for the common use-case
                    // @see http://jsperf.com/call-apply-segu
                    args ? fn.apply(null, args) : fn.call(null), // Prevent ids from leaking
                    exports.clearImmediate(id));
                }), id;
            }, exports.clearImmediate = "function" == typeof clearImmediate ? clearImmediate : function(id) {
                delete immediateIds[id];
            };
        }).call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate);
    }, /* 3 */
    /***/
    function(module, exports) {
        /**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
        function baseProperty(key) {
            return function(object) {
                return null == object ? void 0 : object[key];
            };
        }
        /**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
        function isArguments(value) {
            // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
            return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
        }
        /**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
        function isArrayLike(value) {
            return null != value && !("function" == typeof value && isFunction(value)) && isLength(getLength(value));
        }
        /**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @type Function
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
        function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
        }
        /**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
        function isFunction(value) {
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in Safari 8 which returns 'object' for typed array constructors, and
            // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
            var tag = isObject(value) ? objectToString.call(value) : "";
            return tag == funcTag || tag == genTag;
        }
        /**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
        function isLength(value) {
            return "number" == typeof value && value > -1 && value % 1 == 0 && MAX_SAFE_INTEGER >= value;
        }
        /**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
        function isObject(value) {
            var type = typeof value;
            return !!value && ("object" == type || "function" == type);
        }
        /**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
        function isObjectLike(value) {
            return !!value && "object" == typeof value;
        }
        /**
	 * lodash 3.0.6 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /** Used as references for various `Number` constants. */
        var MAX_SAFE_INTEGER = 9007199254740991, argsTag = "[object Arguments]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, objectToString = objectProto.toString, propertyIsEnumerable = objectProto.propertyIsEnumerable, getLength = baseProperty("length");
        module.exports = isArguments;
    }, /* 4 */
    /***/
    function(module, exports) {
        /**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
        function isObjectLike(value) {
            return !!value && "object" == typeof value;
        }
        /**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
        function getNative(object, key) {
            var value = null == object ? void 0 : object[key];
            return isNative(value) ? value : void 0;
        }
        /**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
        function isLength(value) {
            return "number" == typeof value && value > -1 && value % 1 == 0 && MAX_SAFE_INTEGER >= value;
        }
        /**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
        function isFunction(value) {
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in older versions of Chrome and Safari which return 'function' for regexes
            // and Safari 8 equivalents which return 'object' for typed array constructors.
            return isObject(value) && objToString.call(value) == funcTag;
        }
        /**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && ("object" == type || "function" == type);
        }
        /**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
        function isNative(value) {
            return null == value ? !1 : isFunction(value) ? reIsNative.test(fnToString.call(value)) : isObjectLike(value) && reIsHostCtor.test(value);
        }
        /**
	 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /** `Object#toString` result references. */
        var arrayTag = "[object Array]", funcTag = "[object Function]", reIsHostCtor = /^\[object .+?Constructor\]$/, objectProto = Object.prototype, fnToString = Function.prototype.toString, hasOwnProperty = objectProto.hasOwnProperty, objToString = objectProto.toString, reIsNative = RegExp("^" + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), nativeIsArray = getNative(Array, "isArray"), MAX_SAFE_INTEGER = 9007199254740991, isArray = nativeIsArray || function(value) {
            return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
        };
        module.exports = isArray;
    }, /* 5 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
        function isIndex(value, length) {
            return value = "number" == typeof value || reIsUint.test(value) ? +value : -1, length = null == length ? MAX_SAFE_INTEGER : length, 
            value > -1 && value % 1 == 0 && length > value;
        }
        /**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
        function isLength(value) {
            return "number" == typeof value && value > -1 && value % 1 == 0 && MAX_SAFE_INTEGER >= value;
        }
        /**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && ("object" == type || "function" == type);
        }
        /**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
        function keysIn(object) {
            if (null == object) return [];
            isObject(object) || (object = Object(object));
            var length = object.length;
            length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;
            for (var Ctor = object.constructor, index = -1, isProto = "function" == typeof Ctor && Ctor.prototype === object, result = Array(length), skipIndexes = length > 0; ++index < length; ) result[index] = index + "";
            for (var key in object) skipIndexes && isIndex(key, length) || "constructor" == key && (isProto || !hasOwnProperty.call(object, key)) || result.push(key);
            return result;
        }
        /**
	 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        var isArguments = __webpack_require__(3), isArray = __webpack_require__(4), reIsUint = /^\d+$/, objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, MAX_SAFE_INTEGER = 9007199254740991;
        module.exports = keysIn;
    }, /* 6 */
    /***/
    function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        /* WEBPACK VAR INJECTION */ (function(module, global) {
            (function() {
                /*--------------------------------------------------------------------------*/
                /**
	   * Adds the key-value `pair` to `map`.
	   *
	   * @private
	   * @param {Object} map The map to modify.
	   * @param {Array} pair The key-value pair to add.
	   * @returns {Object} Returns `map`.
	   */
                function addMapEntry(map, pair) {
                    return map.set(pair[0], pair[1]), map;
                }
                /**
	   * Adds `value` to `set`.
	   *
	   * @private
	   * @param {Object} set The set to modify.
	   * @param {*} value The value to add.
	   * @returns {Object} Returns `set`.
	   */
                function addSetEntry(set, value) {
                    return set.add(value), set;
                }
                /**
	   * A faster alternative to `Function#apply`, this function invokes `func`
	   * with the `this` binding of `thisArg` and the arguments of `args`.
	   *
	   * @private
	   * @param {Function} func The function to invoke.
	   * @param {*} thisArg The `this` binding of `func`.
	   * @param {...*} args The arguments to invoke `func` with.
	   * @returns {*} Returns the result of `func`.
	   */
                function apply(func, thisArg, args) {
                    var length = args.length;
                    switch (length) {
                      case 0:
                        return func.call(thisArg);

                      case 1:
                        return func.call(thisArg, args[0]);

                      case 2:
                        return func.call(thisArg, args[0], args[1]);

                      case 3:
                        return func.call(thisArg, args[0], args[1], args[2]);
                    }
                    return func.apply(thisArg, args);
                }
                /**
	   * A specialized version of `baseAggregator` for arrays.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} setter The function to set `accumulator` values.
	   * @param {Function} iteratee The iteratee to transform keys.
	   * @param {Object} accumulator The initial aggregated object.
	   * @returns {Function} Returns `accumulator`.
	   */
                function arrayAggregator(array, setter, iteratee, accumulator) {
                    for (var index = -1, length = array.length; ++index < length; ) {
                        var value = array[index];
                        setter(accumulator, value, iteratee(value), array);
                    }
                    return accumulator;
                }
                /**
	   * Creates a new array concatenating `array` with `other`.
	   *
	   * @private
	   * @param {Array} array The first array to concatenate.
	   * @param {Array} other The second array to concatenate.
	   * @returns {Array} Returns the new concatenated array.
	   */
                function arrayConcat(array, other) {
                    for (var index = -1, length = array.length, othIndex = -1, othLength = other.length, result = Array(length + othLength); ++index < length; ) result[index] = array[index];
                    for (;++othIndex < othLength; ) result[index++] = other[othIndex];
                    return result;
                }
                /**
	   * A specialized version of `_.forEach` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
                function arrayEach(array, iteratee) {
                    for (var index = -1, length = array.length; ++index < length && iteratee(array[index], index, array) !== !1; ) ;
                    return array;
                }
                /**
	   * A specialized version of `_.forEachRight` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns `array`.
	   */
                function arrayEachRight(array, iteratee) {
                    for (var length = array.length; length-- && iteratee(array[length], length, array) !== !1; ) ;
                    return array;
                }
                /**
	   * A specialized version of `_.every` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`.
	   */
                function arrayEvery(array, predicate) {
                    for (var index = -1, length = array.length; ++index < length; ) if (!predicate(array[index], index, array)) return !1;
                    return !0;
                }
                /**
	   * A specialized version of `_.filter` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {Array} Returns the new filtered array.
	   */
                function arrayFilter(array, predicate) {
                    for (var index = -1, length = array.length, resIndex = -1, result = []; ++index < length; ) {
                        var value = array[index];
                        predicate(value, index, array) && (result[++resIndex] = value);
                    }
                    return result;
                }
                /**
	   * A specialized version of `_.includes` for arrays without support for
	   * specifying an index to search from.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} target The value to search for.
	   * @returns {boolean} Returns `true` if `target` is found, else `false`.
	   */
                function arrayIncludes(array, value) {
                    return !!array.length && baseIndexOf(array, value, 0) > -1;
                }
                /**
	   * A specialized version of `_.includesWith` for arrays without support for
	   * specifying an index to search from.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} target The value to search for.
	   * @param {Function} comparator The comparator invoked per element.
	   * @returns {boolean} Returns `true` if `target` is found, else `false`.
	   */
                function arrayIncludesWith(array, value, comparator) {
                    for (var index = -1, length = array.length; ++index < length; ) if (comparator(value, array[index])) return !0;
                    return !1;
                }
                /**
	   * A specialized version of `_.map` for arrays without support for iteratee
	   * shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the new mapped array.
	   */
                function arrayMap(array, iteratee) {
                    for (var index = -1, length = array.length, result = Array(length); ++index < length; ) result[index] = iteratee(array[index], index, array);
                    return result;
                }
                /**
	   * Appends the elements of `values` to `array`.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {Array} values The values to append.
	   * @returns {Array} Returns `array`.
	   */
                function arrayPush(array, values) {
                    for (var index = -1, length = values.length, offset = array.length; ++index < length; ) array[offset + index] = values[index];
                    return array;
                }
                /**
	   * A specialized version of `_.reduce` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
	   * @returns {*} Returns the accumulated value.
	   */
                function arrayReduce(array, iteratee, accumulator, initAccum) {
                    var index = -1, length = array.length;
                    for (initAccum && length && (accumulator = array[++index]); ++index < length; ) accumulator = iteratee(accumulator, array[index], index, array);
                    return accumulator;
                }
                /**
	   * A specialized version of `_.reduceRight` for arrays without support for
	   * iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} [accumulator] The initial value.
	   * @param {boolean} [initAccum] Specify using the last element of `array` as the initial value.
	   * @returns {*} Returns the accumulated value.
	   */
                function arrayReduceRight(array, iteratee, accumulator, initAccum) {
                    var length = array.length;
                    for (initAccum && length && (accumulator = array[--length]); length--; ) accumulator = iteratee(accumulator, array[length], length, array);
                    return accumulator;
                }
                /**
	   * A specialized version of `_.some` for arrays without support for iteratee
	   * shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} predicate The function invoked per iteration.
	   * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	   */
                function arraySome(array, predicate) {
                    for (var index = -1, length = array.length; ++index < length; ) if (predicate(array[index], index, array)) return !0;
                    return !1;
                }
                /**
	   * The base implementation of methods like `_.max` and `_.min` which accepts a
	   * `comparator` to determine the extremum value.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The iteratee invoked per iteration.
	   * @param {Function} comparator The comparator used to compare values.
	   * @returns {*} Returns the extremum value.
	   */
                function baseExtremum(array, iteratee, comparator) {
                    for (var index = -1, length = array.length; ++index < length; ) {
                        var value = array[index], current = iteratee(value);
                        if (null != current && (computed === undefined ? current === current : comparator(current, computed))) var computed = current, result = value;
                    }
                    return result;
                }
                /**
	   * The base implementation of methods like `_.find` and `_.findKey`, without
	   * support for iteratee shorthands, which iterates over `collection` using
	   * `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to search.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @param {boolean} [retKey] Specify returning the key of the found element instead of the element itself.
	   * @returns {*} Returns the found element or its key, else `undefined`.
	   */
                function baseFind(collection, predicate, eachFunc, retKey) {
                    var result;
                    return eachFunc(collection, function(value, key, collection) {
                        return predicate(value, key, collection) ? (result = retKey ? key : value, !1) : void 0;
                    }), result;
                }
                /**
	   * The base implementation of `_.findIndex` and `_.findLastIndex` without
	   * support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
                function baseFindIndex(array, predicate, fromRight) {
                    for (var length = array.length, index = fromRight ? length : -1; fromRight ? index-- : ++index < length; ) if (predicate(array[index], index, array)) return index;
                    return -1;
                }
                /**
	   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
                function baseIndexOf(array, value, fromIndex) {
                    if (value !== value) return indexOfNaN(array, fromIndex);
                    for (var index = fromIndex - 1, length = array.length; ++index < length; ) if (array[index] === value) return index;
                    return -1;
                }
                /**
	   * The base implementation of `_.reduce` and `_.reduceRight`, without support
	   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
	   *
	   * @private
	   * @param {Array|Object} collection The collection to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @param {*} accumulator The initial value.
	   * @param {boolean} initAccum Specify using the first or last element of `collection` as the initial value.
	   * @param {Function} eachFunc The function to iterate over `collection`.
	   * @returns {*} Returns the accumulated value.
	   */
                function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
                    return eachFunc(collection, function(value, index, collection) {
                        accumulator = initAccum ? (initAccum = !1, value) : iteratee(accumulator, value, index, collection);
                    }), accumulator;
                }
                /**
	   * The base implementation of `_.sortBy` which uses `comparer` to define
	   * the sort order of `array` and replaces criteria objects with their
	   * corresponding values.
	   *
	   * @private
	   * @param {Array} array The array to sort.
	   * @param {Function} comparer The function to define sort order.
	   * @returns {Array} Returns `array`.
	   */
                function baseSortBy(array, comparer) {
                    var length = array.length;
                    for (array.sort(comparer); length--; ) array[length] = array[length].value;
                    return array;
                }
                /**
	   * The base implementation of `_.sum` without support for iteratee shorthands.
	   *
	   * @private
	   * @param {Array} array The array to iterate over.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {number} Returns the sum.
	   */
                function baseSum(array, iteratee) {
                    for (var result, index = -1, length = array.length; ++index < length; ) {
                        var current = iteratee(array[index]);
                        current !== undefined && (result = result === undefined ? current : result + current);
                    }
                    return result;
                }
                /**
	   * The base implementation of `_.times` without support for iteratee shorthands
	   * or max array length checks.
	   *
	   * @private
	   * @param {number} n The number of times to invoke `iteratee`.
	   * @param {Function} iteratee The function invoked per iteration.
	   * @returns {Array} Returns the array of results.
	   */
                function baseTimes(n, iteratee) {
                    for (var index = -1, result = Array(n); ++index < n; ) result[index] = iteratee(index);
                    return result;
                }
                /**
	   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	   * of key-value pairs for `object` corresponding to the property names of `props`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Array} props The property names to get values for.
	   * @returns {Object} Returns the new array of key-value pairs.
	   */
                function baseToPairs(object, props) {
                    return arrayMap(props, function(key) {
                        return [ key, object[key] ];
                    });
                }
                /**
	   * The base implementation of `_.unary` without support for storing wrapper metadata.
	   *
	   * @private
	   * @param {Function} func The function to cap arguments for.
	   * @returns {Function} Returns the new function.
	   */
                function baseUnary(func) {
                    return function(value) {
                        return func(value);
                    };
                }
                /**
	   * The base implementation of `_.values` and `_.valuesIn` which creates an
	   * array of `object` property values corresponding to the property names
	   * of `props`.
	   *
	   * @private
	   * @param {Object} object The object to query.
	   * @param {Array} props The property names to get values for.
	   * @returns {Object} Returns the array of property values.
	   */
                function baseValues(object, props) {
                    return arrayMap(props, function(key) {
                        return object[key];
                    });
                }
                /**
	   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
	   * that is not found in the character symbols.
	   *
	   * @private
	   * @param {Array} strSymbols The string symbols to inspect.
	   * @param {Array} chrSymbols The character symbols to find.
	   * @returns {number} Returns the index of the first unmatched string symbol.
	   */
                function charsStartIndex(strSymbols, chrSymbols) {
                    for (var index = -1, length = strSymbols.length; ++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1; ) ;
                    return index;
                }
                /**
	   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
	   * that is not found in the character symbols.
	   *
	   * @private
	   * @param {Array} strSymbols The string symbols to inspect.
	   * @param {Array} chrSymbols The character symbols to find.
	   * @returns {number} Returns the index of the last unmatched string symbol.
	   */
                function charsEndIndex(strSymbols, chrSymbols) {
                    for (var index = strSymbols.length; index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1; ) ;
                    return index;
                }
                /**
	   * Checks if `value` is a global object.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	   */
                function checkGlobal(value) {
                    return value && value.Object === Object ? value : null;
                }
                /**
	   * Compares values to sort them in ascending order.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {number} Returns the sort order indicator for `value`.
	   */
                function compareAscending(value, other) {
                    if (value !== other) {
                        var valIsNull = null === value, valIsUndef = value === undefined, valIsReflexive = value === value, othIsNull = null === other, othIsUndef = other === undefined, othIsReflexive = other === other;
                        if (value > other && !othIsNull || !valIsReflexive || valIsNull && !othIsUndef && othIsReflexive || valIsUndef && othIsReflexive) return 1;
                        if (other > value && !valIsNull || !othIsReflexive || othIsNull && !valIsUndef && valIsReflexive || othIsUndef && valIsReflexive) return -1;
                    }
                    return 0;
                }
                /**
	   * Used by `_.orderBy` to compare multiple properties of a value to another
	   * and stable sort them.
	   *
	   * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
	   * specify an order of "desc" for descending or "asc" for ascending sort order
	   * of corresponding values.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {boolean[]|string[]} orders The order to sort by for each property.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */
                function compareMultiple(object, other, orders) {
                    for (var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length; ++index < length; ) {
                        var result = compareAscending(objCriteria[index], othCriteria[index]);
                        if (result) {
                            if (index >= ordersLength) return result;
                            var order = orders[index];
                            return result * ("desc" == order ? -1 : 1);
                        }
                    }
                    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
                    // that causes it, under certain circumstances, to provide the same value for
                    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
                    // for more details.
                    //
                    // This also ensures a stable sort in V8 and other engines.
                    // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
                    return object.index - other.index;
                }
                /**
	   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	   *
	   * @private
	   * @param {string} letter The matched letter to deburr.
	   * @returns {string} Returns the deburred letter.
	   */
                function deburrLetter(letter) {
                    return deburredLetters[letter];
                }
                /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
                function escapeHtmlChar(chr) {
                    return htmlEscapes[chr];
                }
                /**
	   * Used by `_.template` to escape characters for inclusion in compiled string literals.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
                function escapeStringChar(chr) {
                    return "\\" + stringEscapes[chr];
                }
                /**
	   * Gets the index at which the first occurrence of `NaN` is found in `array`.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {number} fromIndex The index to search from.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	   */
                function indexOfNaN(array, fromIndex, fromRight) {
                    for (var length = array.length, index = fromIndex + (fromRight ? 0 : -1); fromRight ? index-- : ++index < length; ) {
                        var other = array[index];
                        if (other !== other) return index;
                    }
                    return -1;
                }
                /**
	   * Checks if `value` is a host object in IE < 9.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	   */
                function isHostObject(value) {
                    // Many host objects are `Object` objects that can coerce to strings
                    // despite having improperly defined `toString` methods.
                    var result = !1;
                    if (null != value && "function" != typeof value.toString) try {
                        result = !!(value + "");
                    } catch (e) {}
                    return result;
                }
                /**
	   * Checks if `value` is a valid array-like index.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	   */
                function isIndex(value, length) {
                    return value = "number" == typeof value || reIsUint.test(value) ? +value : -1, length = null == length ? MAX_SAFE_INTEGER : length, 
                    value > -1 && value % 1 == 0 && length > value;
                }
                /**
	   * Converts `iterator` to an array.
	   *
	   * @private
	   * @param {Object} iterator The iterator to convert.
	   * @returns {Array} Returns the converted array.
	   */
                function iteratorToArray(iterator) {
                    for (var data, result = []; !(data = iterator.next()).done; ) result.push(data.value);
                    return result;
                }
                /**
	   * Converts `map` to an array.
	   *
	   * @private
	   * @param {Object} map The map to convert.
	   * @returns {Array} Returns the converted array.
	   */
                function mapToArray(map) {
                    var index = -1, result = Array(map.size);
                    return map.forEach(function(value, key) {
                        result[++index] = [ key, value ];
                    }), result;
                }
                /**
	   * Replaces all `placeholder` elements in `array` with an internal placeholder
	   * and returns an array of their indexes.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {*} placeholder The placeholder to replace.
	   * @returns {Array} Returns the new array of placeholder indexes.
	   */
                function replaceHolders(array, placeholder) {
                    for (var index = -1, length = array.length, resIndex = -1, result = []; ++index < length; ) array[index] === placeholder && (array[index] = PLACEHOLDER, 
                    result[++resIndex] = index);
                    return result;
                }
                /**
	   * Converts `set` to an array.
	   *
	   * @private
	   * @param {Object} set The set to convert.
	   * @returns {Array} Returns the converted array.
	   */
                function setToArray(set) {
                    var index = -1, result = Array(set.size);
                    return set.forEach(function(value) {
                        result[++index] = value;
                    }), result;
                }
                /**
	   * Gets the number of symbols in `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the string size.
	   */
                function stringSize(string) {
                    if (!string || !reHasComplexSymbol.test(string)) return string.length;
                    for (var result = reComplexSymbol.lastIndex = 0; reComplexSymbol.test(string); ) result++;
                    return result;
                }
                /**
	   * Converts `string` to an array.
	   *
	   * @private
	   * @param {string} string The string to convert.
	   * @returns {Array} Returns the converted array.
	   */
                function stringToArray(string) {
                    return string.match(reComplexSymbol);
                }
                /**
	   * Used by `_.unescape` to convert HTML entities to characters.
	   *
	   * @private
	   * @param {string} chr The matched character to unescape.
	   * @returns {string} Returns the unescaped character.
	   */
                function unescapeHtmlChar(chr) {
                    return htmlUnescapes[chr];
                }
                /*--------------------------------------------------------------------------*/
                /**
	   * Create a new pristine `lodash` function using the `context` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Util
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns a new `lodash` function.
	   * @example
	   *
	   * _.mixin({ 'foo': _.constant('foo') });
	   *
	   * var lodash = _.runInContext();
	   * lodash.mixin({ 'bar': lodash.constant('bar') });
	   *
	   * _.isFunction(_.foo);
	   * // => true
	   * _.isFunction(_.bar);
	   * // => false
	   *
	   * lodash.isFunction(lodash.foo);
	   * // => false
	   * lodash.isFunction(lodash.bar);
	   * // => true
	   *
	   * // Use `context` to mock `Date#getTime` use in `_.now`.
	   * var mock = _.runInContext({
	   *   'Date': function() {
	   *     return { 'getTime': getTimeMock };
	   *   }
	   * });
	   *
	   * // Create a suped-up `defer` in Node.js.
	   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
	   */
                function runInContext(context) {
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a `lodash` object which wraps `value` to enable implicit method
	     * chaining. Methods that operate on and return arrays, collections, and
	     * functions can be chained together. Methods that retrieve a single value or
	     * may return a primitive value will automatically end the chain sequence and
	     * return the unwrapped value. Otherwise, the value must be unwrapped with
	     * `_#value`.
	     *
	     * Explicit chaining, which must be unwrapped with `_#value` in all cases,
	     * may be enabled using `_.chain`.
	     *
	     * The execution of chained methods is lazy, that is, it's deferred until
	     * `_#value` is implicitly or explicitly called.
	     *
	     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	     * fusion is an optimization to merge iteratee calls; this avoids the creation
	     * of intermediate arrays and can greatly reduce the number of iteratee executions.
	     * Sections of a chain sequence qualify for shortcut fusion if the section is
	     * applied to an array of at least two hundred elements and any iteratees
	     * accept only one argument. The heuristic for whether a section qualifies
	     * for shortcut fusion is subject to change.
	     *
	     * Chaining is supported in custom builds as long as the `_#value` method is
	     * directly or indirectly included in the build.
	     *
	     * In addition to lodash methods, wrappers have `Array` and `String` methods.
	     *
	     * The wrapper `Array` methods are:
	     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
	     *
	     * The wrapper `String` methods are:
	     * `replace` and `split`
	     *
	     * The wrapper methods that support shortcut fusion are:
	     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
	     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
	     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
	     *
	     * The chainable wrapper methods are:
	     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`,
	     * `at`, `before`, `bind`, `bindAll`, `bindKey`, `chain`, `chunk`, `commit`,
	     * `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`, `curry`,
	     * `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`, `difference`,
	     * `differenceBy`, `differenceWith`, `drop`, `dropRight`, `dropRightWhile`,
	     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flip`, `flow`,
	     * `flowRight`, `fromPairs`, `functions`, `functionsIn`, `groupBy`, `initial`,
	     * `intersection`, `intersectionBy`, `intersectionWith`, `invert`, `invertBy`,
	     * `invokeMap`, `iteratee`, `keyBy`, `keys`, `keysIn`, `map`, `mapKeys`,
	     * `mapValues`, `matches`, `matchesProperty`, `memoize`, `merge`, `mergeWith`,
	     * `method`, `methodOf`, `mixin`, `negate`, `nthArg`, `omit`, `omitBy`, `once`,
	     * `orderBy`, `over`, `overArgs`, `overEvery`, `overSome`, `partial`,
	     * `partialRight`, `partition`, `pick`, `pickBy`, `plant`, `property`,
	     * `propertyOf`, `pull`, `pullAll`, `pullAllBy`, `pullAt`, `push`, `range`,
	     * `rangeRight`, `rearg`, `reject`, `remove`, `rest`, `reverse`, `sampleSize`,
	     * `set`, `setWith`, `shuffle`, `slice`, `sort`, `sortBy`, `splice`, `spread`,
	     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `tap`, `throttle`,
	     * `thru`, `toArray`, `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`,
	     * `transform`, `unary`, `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`,
	     * `uniqWith`, `unset`, `unshift`, `unzip`, `unzipWith`, `values`, `valuesIn`,
	     * `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`, `zipObject`,
	     * `zipObjectDeep`, and `zipWith`
	     *
	     * The wrapper methods that are **not** chainable by default are:
	     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
	     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `deburr`, `endsWith`, `eq`,
	     * `escape`, `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`,
	     * `findLast`, `findLastIndex`, `findLastKey`, `floor`, `forEach`, `forEachRight`,
	     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
	     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
	     * `isArguments`, `isArray`, `isArrayLike`, `isArrayLikeObject`, `isBoolean`,
	     * `isDate`, `isElement`, `isEmpty`, `isEqual`, `isEqualWith`, `isError`,
	     * `isFinite`, `isFunction`, `isInteger`, `isLength`, `isMatch`, `isMatchWith`,
	     * `isNaN`, `isNative`, `isNil`, `isNull`, `isNumber`, `isObject`, `isObjectLike`,
	     * `isPlainObject`, `isRegExp`, `isSafeInteger`, `isString`, `isUndefined`,
	     * `isTypedArray`, `join`, `kebabCase`, `last`, `lastIndexOf`, `lowerCase`,
	     * `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `min`, `minBy`,
	     * `noConflict`, `noop`, `now`, `pad`, `padEnd`, `padStart`, `parseInt`,
	     * `pop`, `random`, `reduce`, `reduceRight`, `repeat`, `result`, `round`,
	     * `runInContext`, `sample`, `shift`, `size`, `snakeCase`, `some`, `sortedIndex`,
	     * `sortedIndexBy`, `sortedLastIndex`, `sortedLastIndexBy`, `startCase`,
	     * `startsWith`, `subtract`, `sum`, `sumBy`, `template`, `times`, `toLower`,
	     * `toInteger`, `toLength`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`,
	     * `trim`, `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`,
	     * `upperCase`, `upperFirst`, `value`, and `words`
	     *
	     * @name _
	     * @constructor
	     * @category Seq
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // Returns an unwrapped value.
	     * wrapped.reduce(_.add);
	     * // => 6
	     *
	     * // Returns a wrapped value.
	     * var squares = wrapped.map(square);
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
                    function lodash(value) {
                        if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
                            if (value instanceof LodashWrapper) return value;
                            if (hasOwnProperty.call(value, "__wrapped__")) return wrapperClone(value);
                        }
                        return new LodashWrapper(value);
                    }
                    /**
	     * The function whose prototype all chaining wrappers inherit from.
	     *
	     * @private
	     */
                    function baseLodash() {}
                    /**
	     * The base constructor for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	     */
                    function LodashWrapper(value, chainAll) {
                        this.__wrapped__ = value, this.__actions__ = [], this.__chain__ = !!chainAll, this.__index__ = 0, 
                        this.__values__ = undefined;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     */
                    function LazyWrapper(value) {
                        this.__wrapped__ = value, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, 
                        this.__iteratees__ = [], this.__takeCount__ = MAX_ARRAY_LENGTH, this.__views__ = [];
                    }
                    /**
	     * Creates a clone of the lazy wrapper object.
	     *
	     * @private
	     * @name clone
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the cloned `LazyWrapper` object.
	     */
                    function lazyClone() {
                        var result = new LazyWrapper(this.__wrapped__);
                        return result.__actions__ = copyArray(this.__actions__), result.__dir__ = this.__dir__, 
                        result.__filtered__ = this.__filtered__, result.__iteratees__ = copyArray(this.__iteratees__), 
                        result.__takeCount__ = this.__takeCount__, result.__views__ = copyArray(this.__views__), 
                        result;
                    }
                    /**
	     * Reverses the direction of lazy iteration.
	     *
	     * @private
	     * @name reverse
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the new reversed `LazyWrapper` object.
	     */
                    function lazyReverse() {
                        if (this.__filtered__) {
                            var result = new LazyWrapper(this);
                            result.__dir__ = -1, result.__filtered__ = !0;
                        } else result = this.clone(), result.__dir__ *= -1;
                        return result;
                    }
                    /**
	     * Extracts the unwrapped value from its lazy wrapper.
	     *
	     * @private
	     * @name value
	     * @memberOf LazyWrapper
	     * @returns {*} Returns the unwrapped value.
	     */
                    function lazyValue() {
                        var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = 0 > dir, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
                        if (!isArr || LARGE_ARRAY_SIZE > arrLength || arrLength == length && takeCount == length) return baseWrapperValue(array, this.__actions__);
                        var result = [];
                        outer: for (;length-- && takeCount > resIndex; ) {
                            index += dir;
                            for (var iterIndex = -1, value = array[index]; ++iterIndex < iterLength; ) {
                                var data = iteratees[iterIndex], iteratee = data.iteratee, type = data.type, computed = iteratee(value);
                                if (type == LAZY_MAP_FLAG) value = computed; else if (!computed) {
                                    if (type == LAZY_FILTER_FLAG) continue outer;
                                    break outer;
                                }
                            }
                            result[resIndex++] = value;
                        }
                        return result;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates an hash object.
	     *
	     * @private
	     * @returns {Object} Returns the new hash object.
	     */
                    function Hash() {}
                    /**
	     * Removes `key` and its value from the hash.
	     *
	     * @private
	     * @param {Object} hash The hash to modify.
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
                    function hashDelete(hash, key) {
                        return hashHas(hash, key) && delete hash[key];
                    }
                    /**
	     * Gets the hash value for `key`.
	     *
	     * @private
	     * @param {Object} hash The hash to query.
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
                    function hashGet(hash, key) {
                        if (nativeCreate) {
                            var result = hash[key];
                            return result === HASH_UNDEFINED ? undefined : result;
                        }
                        return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
                    }
                    /**
	     * Checks if a hash value for `key` exists.
	     *
	     * @private
	     * @param {Object} hash The hash to query.
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
                    function hashHas(hash, key) {
                        return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
                    }
                    /**
	     * Sets the hash `key` to `value`.
	     *
	     * @private
	     * @param {Object} hash The hash to modify.
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     */
                    function hashSet(hash, key, value) {
                        hash[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a map cache object to store key-value pairs.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     */
                    function MapCache(values) {
                        var index = -1, length = values ? values.length : 0;
                        for (this.clear(); ++index < length; ) {
                            var entry = values[index];
                            this.set(entry[0], entry[1]);
                        }
                    }
                    /**
	     * Removes all key-value entries from the map.
	     *
	     * @private
	     * @name clear
	     * @memberOf MapCache
	     */
                    function mapClear() {
                        this.__data__ = {
                            hash: new Hash(),
                            map: Map ? new Map() : [],
                            string: new Hash()
                        };
                    }
                    /**
	     * Removes `key` and its value from the map.
	     *
	     * @private
	     * @name delete
	     * @memberOf MapCache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
                    function mapDelete(key) {
                        var data = this.__data__;
                        return isKeyable(key) ? hashDelete("string" == typeof key ? data.string : data.hash, key) : Map ? data.map["delete"](key) : assocDelete(data.map, key);
                    }
                    /**
	     * Gets the map value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf MapCache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
                    function mapGet(key) {
                        var data = this.__data__;
                        return isKeyable(key) ? hashGet("string" == typeof key ? data.string : data.hash, key) : Map ? data.map.get(key) : assocGet(data.map, key);
                    }
                    /**
	     * Checks if a map value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf MapCache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
                    function mapHas(key) {
                        var data = this.__data__;
                        return isKeyable(key) ? hashHas("string" == typeof key ? data.string : data.hash, key) : Map ? data.map.has(key) : assocHas(data.map, key);
                    }
                    /**
	     * Sets the map `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf MapCache
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the map cache object.
	     */
                    function mapSet(key, value) {
                        var data = this.__data__;
                        return isKeyable(key) ? hashSet("string" == typeof key ? data.string : data.hash, key, value) : Map ? data.map.set(key, value) : assocSet(data.map, key, value), 
                        this;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     *
	     * Creates a set cache object to store unique values.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     */
                    function SetCache(values) {
                        var index = -1, length = values ? values.length : 0;
                        for (this.__data__ = new MapCache(); ++index < length; ) this.push(values[index]);
                    }
                    /**
	     * Checks if `value` is in `cache`.
	     *
	     * @private
	     * @param {Object} cache The set cache to search.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns `true` if `value` is found, else `false`.
	     */
                    function cacheHas(cache, value) {
                        var map = cache.__data__;
                        if (isKeyable(value)) {
                            var data = map.__data__, hash = "string" == typeof value ? data.string : data.hash;
                            return hash[value] === HASH_UNDEFINED;
                        }
                        return map.has(value);
                    }
                    /**
	     * Adds `value` to the set cache.
	     *
	     * @private
	     * @name push
	     * @memberOf SetCache
	     * @param {*} value The value to cache.
	     */
                    function cachePush(value) {
                        var map = this.__data__;
                        if (isKeyable(value)) {
                            var data = map.__data__, hash = "string" == typeof value ? data.string : data.hash;
                            hash[value] = HASH_UNDEFINED;
                        } else map.set(value, HASH_UNDEFINED);
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a stack cache object to store key-value pairs.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     */
                    function Stack(values) {
                        var index = -1, length = values ? values.length : 0;
                        for (this.clear(); ++index < length; ) {
                            var entry = values[index];
                            this.set(entry[0], entry[1]);
                        }
                    }
                    /**
	     * Removes all key-value entries from the stack.
	     *
	     * @private
	     * @name clear
	     * @memberOf Stack
	     */
                    function stackClear() {
                        this.__data__ = {
                            array: [],
                            map: null
                        };
                    }
                    /**
	     * Removes `key` and its value from the stack.
	     *
	     * @private
	     * @name delete
	     * @memberOf Stack
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
                    function stackDelete(key) {
                        var data = this.__data__, array = data.array;
                        return array ? assocDelete(array, key) : data.map["delete"](key);
                    }
                    /**
	     * Gets the stack value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf Stack
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
                    function stackGet(key) {
                        var data = this.__data__, array = data.array;
                        return array ? assocGet(array, key) : data.map.get(key);
                    }
                    /**
	     * Checks if a stack value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf Stack
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
                    function stackHas(key) {
                        var data = this.__data__, array = data.array;
                        return array ? assocHas(array, key) : data.map.has(key);
                    }
                    /**
	     * Sets the stack `key` to `value`.
	     *
	     * @private
	     * @name set
	     * @memberOf Stack
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns the stack cache object.
	     */
                    function stackSet(key, value) {
                        var data = this.__data__, array = data.array;
                        array && (array.length < LARGE_ARRAY_SIZE - 1 ? assocSet(array, key, value) : (data.array = null, 
                        data.map = new MapCache(array)));
                        var map = data.map;
                        return map && map.set(key, value), this;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Removes `key` and its value from the associative array.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	     */
                    function assocDelete(array, key) {
                        var index = assocIndexOf(array, key);
                        if (0 > index) return !1;
                        var lastIndex = array.length - 1;
                        return index == lastIndex ? array.pop() : splice.call(array, index, 1), !0;
                    }
                    /**
	     * Gets the associative array value for `key`.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the entry value.
	     */
                    function assocGet(array, key) {
                        var index = assocIndexOf(array, key);
                        return 0 > index ? undefined : array[index][1];
                    }
                    /**
	     * Checks if an associative array value for `key` exists.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
                    function assocHas(array, key) {
                        return assocIndexOf(array, key) > -1;
                    }
                    /**
	     * Gets the index at which the first occurrence of `key` is found in `array`
	     * of key-value pairs.
	     *
	     * @private
	     * @param {Array} array The array to search.
	     * @param {*} key The key to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     */
                    function assocIndexOf(array, key) {
                        for (var length = array.length; length--; ) if (eq(array[length][0], key)) return length;
                        return -1;
                    }
                    /**
	     * Sets the associative array `key` to `value`.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {string} key The key of the value to set.
	     * @param {*} value The value to set.
	     */
                    function assocSet(array, key, value) {
                        var index = assocIndexOf(array, key);
                        0 > index ? array.push([ key, value ]) : array[index][1] = value;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Used by `_.defaults` to customize its `_.assignIn` use.
	     *
	     * @private
	     * @param {*} objValue The destination value.
	     * @param {*} srcValue The source value.
	     * @param {string} key The key of the property to assign.
	     * @param {Object} object The parent object of `objValue`.
	     * @returns {*} Returns the value to assign.
	     */
                    function assignInDefaults(objValue, srcValue, key, object) {
                        return objValue === undefined || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key) ? srcValue : objValue;
                    }
                    /**
	     * This function is like `assignValue` except that it doesn't assign `undefined` values.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {string} key The key of the property to assign.
	     * @param {*} value The value to assign.
	     */
                    function assignMergeValue(object, key, value) {
                        (value !== undefined && !eq(object[key], value) || "number" == typeof key && value === undefined && !(key in object)) && (object[key] = value);
                    }
                    /**
	     * Assigns `value` to `key` of `object` if the existing value is not equivalent
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {string} key The key of the property to assign.
	     * @param {*} value The value to assign.
	     */
                    function assignValue(object, key, value) {
                        var objValue = object[key];
                        (!eq(objValue, value) || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key) || value === undefined && !(key in object)) && (object[key] = value);
                    }
                    /**
	     * Aggregates elements of `collection` on `accumulator` with keys transformed
	     * by `iteratee` and values set by `setter`.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} setter The function to set `accumulator` values.
	     * @param {Function} iteratee The iteratee to transform keys.
	     * @param {Object} accumulator The initial aggregated object.
	     * @returns {Function} Returns `accumulator`.
	     */
                    function baseAggregator(collection, setter, iteratee, accumulator) {
                        return baseEach(collection, function(value, key, collection) {
                            setter(accumulator, value, iteratee(value), collection);
                        }), accumulator;
                    }
                    /**
	     * The base implementation of `_.assign` without support for multiple sources
	     * or `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @returns {Object} Returns `object`.
	     */
                    function baseAssign(object, source) {
                        return object && copyObject(source, keys(source), object);
                    }
                    /**
	     * The base implementation of `_.at` without support for individual paths.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {string[]} paths The property paths of elements to pick.
	     * @returns {Array} Returns the new array of picked elements.
	     */
                    function baseAt(object, paths) {
                        for (var index = -1, isNil = null == object, length = paths.length, result = Array(length); ++index < length; ) result[index] = isNil ? undefined : get(object, paths[index]);
                        return result;
                    }
                    /**
	     * The base implementation of `_.clamp` which doesn't coerce arguments to numbers.
	     *
	     * @private
	     * @param {number} number The number to clamp.
	     * @param {number} [lower] The lower bound.
	     * @param {number} upper The upper bound.
	     * @returns {number} Returns the clamped number.
	     */
                    function baseClamp(number, lower, upper) {
                        return number === number && (upper !== undefined && (number = upper >= number ? number : upper), 
                        lower !== undefined && (number = number >= lower ? number : lower)), number;
                    }
                    /**
	     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	     * traversed objects.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning.
	     * @param {string} [key] The key of `value`.
	     * @param {Object} [object] The parent object of `value`.
	     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	     * @returns {*} Returns the cloned value.
	     */
                    function baseClone(value, isDeep, customizer, key, object, stack) {
                        var result;
                        if (customizer && (result = object ? customizer(value, key, object, stack) : customizer(value)), 
                        result !== undefined) return result;
                        if (!isObject(value)) return value;
                        var isArr = isArray(value);
                        if (isArr) {
                            if (result = initCloneArray(value), !isDeep) return copyArray(value, result);
                        } else {
                            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
                            if (isBuffer(value)) return cloneBuffer(value, isDeep);
                            if (tag != objectTag && tag != argsTag && (!isFunc || object)) return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : object ? value : {};
                            if (isHostObject(value)) return object ? value : {};
                            if (result = initCloneObject(isFunc ? {} : value), !isDeep) return copySymbols(value, baseAssign(result, value));
                        }
                        // Check for circular references and return its corresponding clone.
                        stack || (stack = new Stack());
                        var stacked = stack.get(value);
                        // Recursively populate clone (susceptible to call stack limits).
                        return stacked ? stacked : (stack.set(value, result), (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
                            assignValue(result, key, baseClone(subValue, isDeep, customizer, key, value, stack));
                        }), isArr ? result : copySymbols(value, result));
                    }
                    /**
	     * The base implementation of `_.conforms` which doesn't clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {Function} Returns the new function.
	     */
                    function baseConforms(source) {
                        var props = keys(source), length = props.length;
                        return function(object) {
                            if (null == object) return !length;
                            for (var index = length; index--; ) {
                                var key = props[index], predicate = source[key], value = object[key];
                                if (value === undefined && !(key in Object(object)) || !predicate(value)) return !1;
                            }
                            return !0;
                        };
                    }
                    /**
	     * The base implementation of `_.delay` and `_.defer` which accepts an array
	     * of `func` arguments.
	     *
	     * @private
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {Object} args The arguments to provide to `func`.
	     * @returns {number} Returns the timer id.
	     */
                    function baseDelay(func, wait, args) {
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return setTimeout(function() {
                            func.apply(undefined, args);
                        }, wait);
                    }
                    /**
	     * The base implementation of methods like `_.difference` without support for
	     * excluding multiple arrays or iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Array} values The values to exclude.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of filtered values.
	     */
                    function baseDifference(array, values, iteratee, comparator) {
                        var index = -1, includes = arrayIncludes, isCommon = !0, length = array.length, result = [], valuesLength = values.length;
                        if (!length) return result;
                        iteratee && (values = arrayMap(values, baseUnary(iteratee))), comparator ? (includes = arrayIncludesWith, 
                        isCommon = !1) : values.length >= LARGE_ARRAY_SIZE && (includes = cacheHas, isCommon = !1, 
                        values = new SetCache(values));
                        outer: for (;++index < length; ) {
                            var value = array[index], computed = iteratee ? iteratee(value) : value;
                            if (isCommon && computed === computed) {
                                for (var valuesIndex = valuesLength; valuesIndex--; ) if (values[valuesIndex] === computed) continue outer;
                                result.push(value);
                            } else includes(values, computed, comparator) || result.push(value);
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.every` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`
	     */
                    function baseEvery(collection, predicate) {
                        var result = !0;
                        return baseEach(collection, function(value, index, collection) {
                            return result = !!predicate(value, index, collection);
                        }), result;
                    }
                    /**
	     * The base implementation of `_.fill` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     */
                    function baseFill(array, value, start, end) {
                        var length = array.length;
                        for (start = toInteger(start), 0 > start && (start = -start > length ? 0 : length + start), 
                        end = end === undefined || end > length ? length : toInteger(end), 0 > end && (end += length), 
                        end = start > end ? 0 : toLength(end); end > start; ) array[start++] = value;
                        return array;
                    }
                    /**
	     * The base implementation of `_.filter` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */
                    function baseFilter(collection, predicate) {
                        var result = [];
                        return baseEach(collection, function(value, index, collection) {
                            predicate(value, index, collection) && result.push(value);
                        }), result;
                    }
                    /**
	     * The base implementation of `_.flatten` with support for restricting flattening.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	     * @param {Array} [result=[]] The initial result value.
	     * @returns {Array} Returns the new flattened array.
	     */
                    function baseFlatten(array, isDeep, isStrict, result) {
                        result || (result = []);
                        for (var index = -1, length = array.length; ++index < length; ) {
                            var value = array[index];
                            isArrayLikeObject(value) && (isStrict || isArray(value) || isArguments(value)) ? isDeep ? // Recursively flatten arrays (susceptible to call stack limits).
                            baseFlatten(value, isDeep, isStrict, result) : arrayPush(result, value) : isStrict || (result[result.length] = value);
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.forIn` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
                    function baseForIn(object, iteratee) {
                        return null == object ? object : baseFor(object, iteratee, keysIn);
                    }
                    /**
	     * The base implementation of `_.forOwn` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
                    function baseForOwn(object, iteratee) {
                        return object && baseFor(object, iteratee, keys);
                    }
                    /**
	     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
                    function baseForOwnRight(object, iteratee) {
                        return object && baseForRight(object, iteratee, keys);
                    }
                    /**
	     * The base implementation of `_.functions` which creates an array of
	     * `object` function property names filtered from `props`.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} props The property names to filter.
	     * @returns {Array} Returns the new array of filtered property names.
	     */
                    function baseFunctions(object, props) {
                        return arrayFilter(props, function(key) {
                            return isFunction(object[key]);
                        });
                    }
                    /**
	     * The base implementation of `_.get` without support for default values.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @returns {*} Returns the resolved value.
	     */
                    function baseGet(object, path) {
                        path = isKey(path, object) ? [ path + "" ] : baseToPath(path);
                        for (var index = 0, length = path.length; null != object && length > index; ) object = object[path[index++]];
                        return index && index == length ? object : undefined;
                    }
                    /**
	     * The base implementation of `_.has` without support for deep paths.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} key The key to check.
	     * @returns {boolean} Returns `true` if `key` exists, else `false`.
	     */
                    function baseHas(object, key) {
                        // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
                        // that are composed entirely of index properties, return `false` for
                        // `hasOwnProperty` checks of them.
                        return hasOwnProperty.call(object, key) || "object" == typeof object && key in object && null === getPrototypeOf(object);
                    }
                    /**
	     * The base implementation of `_.hasIn` without support for deep paths.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} key The key to check.
	     * @returns {boolean} Returns `true` if `key` exists, else `false`.
	     */
                    function baseHasIn(object, key) {
                        return key in Object(object);
                    }
                    /**
	     * The base implementation of `_.inRange` which doesn't coerce arguments to numbers.
	     *
	     * @private
	     * @param {number} number The number to check.
	     * @param {number} start The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
	     */
                    function baseInRange(number, start, end) {
                        return number >= nativeMin(start, end) && number < nativeMax(start, end);
                    }
                    /**
	     * The base implementation of methods like `_.intersection`, without support
	     * for iteratee shorthands, that accepts an array of arrays to inspect.
	     *
	     * @private
	     * @param {Array} arrays The arrays to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of shared values.
	     */
                    function baseIntersection(arrays, iteratee, comparator) {
                        for (var includes = comparator ? arrayIncludesWith : arrayIncludes, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), result = []; othIndex--; ) {
                            var array = arrays[othIndex];
                            othIndex && iteratee && (array = arrayMap(array, baseUnary(iteratee))), caches[othIndex] = !comparator && (iteratee || array.length >= 120) ? new SetCache(othIndex && array) : undefined;
                        }
                        array = arrays[0];
                        var index = -1, length = array.length, seen = caches[0];
                        outer: for (;++index < length; ) {
                            var value = array[index], computed = iteratee ? iteratee(value) : value;
                            if (!(seen ? cacheHas(seen, computed) : includes(result, computed, comparator))) {
                                for (var othIndex = othLength; --othIndex; ) {
                                    var cache = caches[othIndex];
                                    if (!(cache ? cacheHas(cache, computed) : includes(arrays[othIndex], computed, comparator))) continue outer;
                                }
                                seen && seen.push(computed), result.push(value);
                            }
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.invert` and `_.invertBy` which inverts
	     * `object` with values transformed by `iteratee` and set by `setter`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} setter The function to set `accumulator` values.
	     * @param {Function} iteratee The iteratee to transform values.
	     * @param {Object} accumulator The initial inverted object.
	     * @returns {Function} Returns `accumulator`.
	     */
                    function baseInverter(object, setter, iteratee, accumulator) {
                        return baseForOwn(object, function(value, key, object) {
                            setter(accumulator, iteratee(value), key, object);
                        }), accumulator;
                    }
                    /**
	     * The base implementation of `_.invoke` without support for individual
	     * method arguments.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {Array} args The arguments to invoke the method with.
	     * @returns {*} Returns the result of the invoked method.
	     */
                    function baseInvoke(object, path, args) {
                        isKey(path, object) || (path = baseToPath(path), object = parent(object, path), 
                        path = last(path));
                        var func = null == object ? object : object[path];
                        return null == func ? undefined : apply(func, object, args);
                    }
                    /**
	     * The base implementation of `_.isEqual` which supports partial comparisons
	     * and tracks traversed objects.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @param {boolean} [bitmask] The bitmask of comparison flags.
	     *  The bitmask may be composed of the following flags:
	     *     1 - Unordered comparison
	     *     2 - Partial comparison
	     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
                    function baseIsEqual(value, other, customizer, bitmask, stack) {
                        return value === other ? !0 : null == value || null == other || !isObject(value) && !isObjectLike(other) ? value !== value && other !== other : baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
                    }
                    /**
	     * A specialized version of `baseIsEqual` for arrays and objects which performs
	     * deep comparisons and tracks traversed objects enabling objects with circular
	     * references to be compared.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
                    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
                        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
                        objIsArr || (objTag = getTag(object), objTag == argsTag ? objTag = objectTag : objTag != objectTag && (objIsArr = isTypedArray(object))), 
                        othIsArr || (othTag = getTag(other), othTag == argsTag ? othTag = objectTag : othTag != objectTag && (othIsArr = isTypedArray(other)));
                        var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
                        if (isSameTag && !objIsArr && !objIsObj) return equalByTag(object, other, objTag, equalFunc, customizer, bitmask);
                        var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
                        if (!isPartial) {
                            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
                            if (objIsWrapped || othIsWrapped) return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
                        }
                        return isSameTag ? (stack || (stack = new Stack()), (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, bitmask, stack)) : !1;
                    }
                    /**
	     * The base implementation of `_.isMatch` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Array} matchData The property names, values, and compare flags to match.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     */
                    function baseIsMatch(object, source, matchData, customizer) {
                        var index = matchData.length, length = index, noCustomizer = !customizer;
                        if (null == object) return !length;
                        for (object = Object(object); index--; ) {
                            var data = matchData[index];
                            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return !1;
                        }
                        for (;++index < length; ) {
                            data = matchData[index];
                            var key = data[0], objValue = object[key], srcValue = data[1];
                            if (noCustomizer && data[2]) {
                                if (objValue === undefined && !(key in object)) return !1;
                            } else {
                                var stack = new Stack(), result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;
                                if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) return !1;
                            }
                        }
                        return !0;
                    }
                    /**
	     * The base implementation of `_.iteratee`.
	     *
	     * @private
	     * @param {*} [value=_.identity] The value to convert to an iteratee.
	     * @returns {Function} Returns the iteratee.
	     */
                    function baseIteratee(value) {
                        var type = typeof value;
                        return "function" == type ? value : null == value ? identity : "object" == type ? isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value) : property(value);
                    }
                    /**
	     * The base implementation of `_.keys` which doesn't skip the constructor
	     * property of prototypes or treat sparse arrays as dense.
	     *
	     * @private
	     * @type Function
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
                    function baseKeys(object) {
                        return nativeKeys(Object(object));
                    }
                    /**
	     * The base implementation of `_.keysIn` which doesn't skip the constructor
	     * property of prototypes or treat sparse arrays as dense.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
                    function baseKeysIn(object) {
                        object = null == object ? object : Object(object);
                        var result = [];
                        for (var key in object) result.push(key);
                        return result;
                    }
                    /**
	     * The base implementation of `_.map` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */
                    function baseMap(collection, iteratee) {
                        var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
                        return baseEach(collection, function(value, key, collection) {
                            result[++index] = iteratee(value, key, collection);
                        }), result;
                    }
                    /**
	     * The base implementation of `_.matches` which doesn't clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     */
                    function baseMatches(source) {
                        var matchData = getMatchData(source);
                        if (1 == matchData.length && matchData[0][2]) {
                            var key = matchData[0][0], value = matchData[0][1];
                            return function(object) {
                                return null == object ? !1 : object[key] === value && (value !== undefined || key in Object(object));
                            };
                        }
                        return function(object) {
                            return object === source || baseIsMatch(object, source, matchData);
                        };
                    }
                    /**
	     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	     *
	     * @private
	     * @param {string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new function.
	     */
                    function baseMatchesProperty(path, srcValue) {
                        return function(object) {
                            var objValue = get(object, path);
                            return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
                        };
                    }
                    /**
	     * The base implementation of `_.merge` without support for multiple sources.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {number} srcIndex The index of `source`.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	     */
                    function baseMerge(object, source, srcIndex, customizer, stack) {
                        if (object !== source) {
                            var props = isArray(source) || isTypedArray(source) ? undefined : keysIn(source);
                            arrayEach(props || source, function(srcValue, key) {
                                if (props && (key = srcValue, srcValue = source[key]), isObject(srcValue)) stack || (stack = new Stack()), 
                                baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack); else {
                                    var newValue = customizer ? customizer(object[key], srcValue, key + "", object, source, stack) : undefined;
                                    newValue === undefined && (newValue = srcValue), assignMergeValue(object, key, newValue);
                                }
                            });
                        }
                    }
                    /**
	     * A specialized version of `baseMerge` for arrays and objects which performs
	     * deep merges and tracks traversed objects enabling objects with circular
	     * references to be merged.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {string} key The key of the value to merge.
	     * @param {number} srcIndex The index of `source`.
	     * @param {Function} mergeFunc The function to merge values.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	     */
                    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
                        var objValue = object[key], srcValue = source[key], stacked = stack.get(srcValue);
                        if (stacked) return void assignMergeValue(object, key, stacked);
                        var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined, isCommon = newValue === undefined;
                        isCommon && (newValue = srcValue, isArray(srcValue) || isTypedArray(srcValue) ? isArray(objValue) ? newValue = srcIndex ? copyArray(objValue) : objValue : isArrayLikeObject(objValue) ? newValue = copyArray(objValue) : (isCommon = !1, 
                        newValue = baseClone(srcValue)) : isPlainObject(srcValue) || isArguments(srcValue) ? isArguments(objValue) ? newValue = toPlainObject(objValue) : !isObject(objValue) || srcIndex && isFunction(objValue) ? (isCommon = !1, 
                        newValue = baseClone(srcValue)) : newValue = srcIndex ? baseClone(objValue) : objValue : isCommon = !1), 
                        stack.set(srcValue, newValue), isCommon && // Recursively merge objects and arrays (susceptible to call stack limits).
                        mergeFunc(newValue, srcValue, srcIndex, customizer, stack), assignMergeValue(object, key, newValue);
                    }
                    /**
	     * The base implementation of `_.orderBy` without param guards.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {string[]} orders The sort orders of `iteratees`.
	     * @returns {Array} Returns the new sorted array.
	     */
                    function baseOrderBy(collection, iteratees, orders) {
                        var index = -1, toIteratee = getIteratee();
                        iteratees = arrayMap(iteratees.length ? iteratees : Array(1), function(iteratee) {
                            return toIteratee(iteratee);
                        });
                        var result = baseMap(collection, function(value, key, collection) {
                            var criteria = arrayMap(iteratees, function(iteratee) {
                                return iteratee(value);
                            });
                            return {
                                criteria: criteria,
                                index: ++index,
                                value: value
                            };
                        });
                        return baseSortBy(result, function(object, other) {
                            return compareMultiple(object, other, orders);
                        });
                    }
                    /**
	     * The base implementation of `_.pick` without support for individual
	     * property names.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} props The property names to pick.
	     * @returns {Object} Returns the new object.
	     */
                    function basePick(object, props) {
                        return object = Object(object), arrayReduce(props, function(result, key) {
                            return key in object && (result[key] = object[key]), result;
                        }, {});
                    }
                    /**
	     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {Function} predicate The function invoked per property.
	     * @returns {Object} Returns the new object.
	     */
                    function basePickBy(object, predicate) {
                        var result = {};
                        return baseForIn(object, function(value, key) {
                            predicate(value, key) && (result[key] = value);
                        }), result;
                    }
                    /**
	     * The base implementation of `_.property` without support for deep paths.
	     *
	     * @private
	     * @param {string} key The key of the property to get.
	     * @returns {Function} Returns the new function.
	     */
                    function baseProperty(key) {
                        return function(object) {
                            return null == object ? undefined : object[key];
                        };
                    }
                    /**
	     * A specialized version of `baseProperty` which supports deep paths.
	     *
	     * @private
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     */
                    function basePropertyDeep(path) {
                        return function(object) {
                            return baseGet(object, path);
                        };
                    }
                    /**
	     * The base implementation of `_.pullAll`.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @returns {Array} Returns `array`.
	     */
                    function basePullAll(array, values) {
                        return basePullAllBy(array, values);
                    }
                    /**
	     * The base implementation of `_.pullAllBy` without support for iteratee
	     * shorthands.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @returns {Array} Returns `array`.
	     */
                    function basePullAllBy(array, values, iteratee) {
                        var index = -1, length = values.length, seen = array;
                        for (iteratee && (seen = arrayMap(array, function(value) {
                            return iteratee(value);
                        })); ++index < length; ) for (var fromIndex = 0, value = values[index], computed = iteratee ? iteratee(value) : value; (fromIndex = baseIndexOf(seen, computed, fromIndex)) > -1; ) seen !== array && splice.call(seen, fromIndex, 1), 
                        splice.call(array, fromIndex, 1);
                        return array;
                    }
                    /**
	     * The base implementation of `_.pullAt` without support for individual
	     * indexes or capturing the removed elements.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {number[]} indexes The indexes of elements to remove.
	     * @returns {Array} Returns `array`.
	     */
                    function basePullAt(array, indexes) {
                        for (var length = array ? indexes.length : 0, lastIndex = length - 1; length--; ) {
                            var index = indexes[length];
                            if (lastIndex == length || index != previous) {
                                var previous = index;
                                if (isIndex(index)) splice.call(array, index, 1); else if (isKey(index, array)) delete array[index]; else {
                                    var path = baseToPath(index), object = parent(array, path);
                                    null != object && delete object[last(path)];
                                }
                            }
                        }
                        return array;
                    }
                    /**
	     * The base implementation of `_.random` without support for returning
	     * floating-point numbers.
	     *
	     * @private
	     * @param {number} lower The lower bound.
	     * @param {number} upper The upper bound.
	     * @returns {number} Returns the random number.
	     */
                    function baseRandom(lower, upper) {
                        return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
                    }
                    /**
	     * The base implementation of `_.range` and `_.rangeRight` which doesn't
	     * coerce arguments to numbers.
	     *
	     * @private
	     * @param {number} start The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} step The value to increment or decrement by.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the new array of numbers.
	     */
                    function baseRange(start, end, step, fromRight) {
                        for (var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length); length--; ) result[fromRight ? length : ++index] = start, 
                        start += step;
                        return result;
                    }
                    /**
	     * The base implementation of `_.set`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @param {Function} [customizer] The function to customize path creation.
	     * @returns {Object} Returns `object`.
	     */
                    function baseSet(object, path, value, customizer) {
                        path = isKey(path, object) ? [ path + "" ] : baseToPath(path);
                        for (var index = -1, length = path.length, lastIndex = length - 1, nested = object; null != nested && ++index < length; ) {
                            var key = path[index];
                            if (isObject(nested)) {
                                var newValue = value;
                                if (index != lastIndex) {
                                    var objValue = nested[key];
                                    newValue = customizer ? customizer(objValue, key, nested) : undefined, newValue === undefined && (newValue = null == objValue ? isIndex(path[index + 1]) ? [] : {} : objValue);
                                }
                                assignValue(nested, key, newValue);
                            }
                            nested = nested[key];
                        }
                        return object;
                    }
                    /**
	     * The base implementation of `_.slice` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
                    function baseSlice(array, start, end) {
                        var index = -1, length = array.length;
                        0 > start && (start = -start > length ? 0 : length + start), end = end > length ? length : end, 
                        0 > end && (end += length), length = start > end ? 0 : end - start >>> 0, start >>>= 0;
                        for (var result = Array(length); ++index < length; ) result[index] = array[index + start];
                        return result;
                    }
                    /**
	     * The base implementation of `_.some` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	     */
                    function baseSome(collection, predicate) {
                        var result;
                        return baseEach(collection, function(value, index, collection) {
                            return result = predicate(value, index, collection), !result;
                        }), !!result;
                    }
                    /**
	     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
	     * performs a binary search of `array` to determine the index at which `value`
	     * should be inserted into `array` in order to maintain its sort order.
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
                    function baseSortedIndex(array, value, retHighest) {
                        var low = 0, high = array ? array.length : low;
                        if ("number" == typeof value && value === value && HALF_MAX_ARRAY_LENGTH >= high) {
                            for (;high > low; ) {
                                var mid = low + high >>> 1, computed = array[mid];
                                (retHighest ? value >= computed : value > computed) && null !== computed ? low = mid + 1 : high = mid;
                            }
                            return high;
                        }
                        return baseSortedIndexBy(array, value, identity, retHighest);
                    }
                    /**
	     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
	     * which invokes `iteratee` for `value` and each element of `array` to compute
	     * their sort ranking. The iteratee is invoked with one argument; (value).
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} iteratee The iteratee invoked per element.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted into `array`.
	     */
                    function baseSortedIndexBy(array, value, iteratee, retHighest) {
                        value = iteratee(value);
                        for (var low = 0, high = array ? array.length : 0, valIsNaN = value !== value, valIsNull = null === value, valIsUndef = value === undefined; high > low; ) {
                            var mid = nativeFloor((low + high) / 2), computed = iteratee(array[mid]), isDef = computed !== undefined, isReflexive = computed === computed;
                            if (valIsNaN) var setLow = isReflexive || retHighest; else setLow = valIsNull ? isReflexive && isDef && (retHighest || null != computed) : valIsUndef ? isReflexive && (retHighest || isDef) : null == computed ? !1 : retHighest ? value >= computed : value > computed;
                            setLow ? low = mid + 1 : high = mid;
                        }
                        return nativeMin(high, MAX_ARRAY_INDEX);
                    }
                    /**
	     * The base implementation of `_.sortedUniq`.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @returns {Array} Returns the new duplicate free array.
	     */
                    function baseSortedUniq(array) {
                        return baseSortedUniqBy(array);
                    }
                    /**
	     * The base implementation of `_.sortedUniqBy` without support for iteratee
	     * shorthands.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     */
                    function baseSortedUniqBy(array, iteratee) {
                        for (var index = 0, length = array.length, value = array[0], computed = iteratee ? iteratee(value) : value, seen = computed, resIndex = 0, result = [ value ]; ++index < length; ) value = array[index], 
                        computed = iteratee ? iteratee(value) : value, eq(computed, seen) || (seen = computed, 
                        result[++resIndex] = value);
                        return result;
                    }
                    /**
	     * The base implementation of `_.toPath` which only converts `value` to a
	     * path if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array} Returns the property path array.
	     */
                    function baseToPath(value) {
                        return isArray(value) ? value : stringToPath(value);
                    }
                    /**
	     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     */
                    function baseUniq(array, iteratee, comparator) {
                        var index = -1, includes = arrayIncludes, length = array.length, isCommon = !0, result = [], seen = result;
                        if (comparator) isCommon = !1, includes = arrayIncludesWith; else if (length >= LARGE_ARRAY_SIZE) {
                            var set = iteratee ? null : createSet(array);
                            if (set) return setToArray(set);
                            isCommon = !1, includes = cacheHas, seen = new SetCache();
                        } else seen = iteratee ? [] : result;
                        outer: for (;++index < length; ) {
                            var value = array[index], computed = iteratee ? iteratee(value) : value;
                            if (isCommon && computed === computed) {
                                for (var seenIndex = seen.length; seenIndex--; ) if (seen[seenIndex] === computed) continue outer;
                                iteratee && seen.push(computed), result.push(value);
                            } else includes(seen, computed, comparator) || (seen !== result && seen.push(computed), 
                            result.push(value));
                        }
                        return result;
                    }
                    /**
	     * The base implementation of `_.unset`.
	     *
	     * @private
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to unset.
	     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	     */
                    function baseUnset(object, path) {
                        path = isKey(path, object) ? [ path + "" ] : baseToPath(path), object = parent(object, path);
                        var key = last(path);
                        return null != object && has(object, key) ? delete object[key] : !0;
                    }
                    /**
	     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
	     * without support for iteratee shorthands.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the slice of `array`.
	     */
                    function baseWhile(array, predicate, isDrop, fromRight) {
                        for (var length = array.length, index = fromRight ? length : -1; (fromRight ? index-- : ++index < length) && predicate(array[index], index, array); ) ;
                        return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
                    }
                    /**
	     * The base implementation of `wrapperValue` which returns the result of
	     * performing a sequence of actions on the unwrapped `value`, where each
	     * successive action is supplied the return value of the previous.
	     *
	     * @private
	     * @param {*} value The unwrapped value.
	     * @param {Array} actions Actions to perform to resolve the unwrapped value.
	     * @returns {*} Returns the resolved value.
	     */
                    function baseWrapperValue(value, actions) {
                        var result = value;
                        return result instanceof LazyWrapper && (result = result.value()), arrayReduce(actions, function(result, action) {
                            return action.func.apply(action.thisArg, arrayPush([ result ], action.args));
                        }, result);
                    }
                    /**
	     * The base implementation of methods like `_.xor`, without support for
	     * iteratee shorthands, that accepts an array of arrays to inspect.
	     *
	     * @private
	     * @param {Array} arrays The arrays to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new array of values.
	     */
                    function baseXor(arrays, iteratee, comparator) {
                        for (var index = -1, length = arrays.length; ++index < length; ) var result = result ? arrayPush(baseDifference(result, arrays[index], iteratee, comparator), baseDifference(arrays[index], result, iteratee, comparator)) : arrays[index];
                        return result && result.length ? baseUniq(result, iteratee, comparator) : [];
                    }
                    /**
	     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
	     *
	     * @private
	     * @param {Array} props The property names.
	     * @param {Array} values The property values.
	     * @param {Function} assignFunc The function to assign values.
	     * @returns {Object} Returns the new object.
	     */
                    function baseZipObject(props, values, assignFunc) {
                        for (var index = -1, length = props.length, valsLength = values.length, result = {}; ++index < length; ) assignFunc(result, props[index], valsLength > index ? values[index] : undefined);
                        return result;
                    }
                    /**
	     * Creates a clone of  `buffer`.
	     *
	     * @private
	     * @param {Buffer} buffer The buffer to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Buffer} Returns the cloned buffer.
	     */
                    function cloneBuffer(buffer, isDeep) {
                        if (isDeep) return buffer.slice();
                        var Ctor = buffer.constructor, result = new Ctor(buffer.length);
                        return buffer.copy(result), result;
                    }
                    /**
	     * Creates a clone of `arrayBuffer`.
	     *
	     * @private
	     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	     * @returns {ArrayBuffer} Returns the cloned array buffer.
	     */
                    function cloneArrayBuffer(arrayBuffer) {
                        var Ctor = arrayBuffer.constructor, result = new Ctor(arrayBuffer.byteLength), view = new Uint8Array(result);
                        return view.set(new Uint8Array(arrayBuffer)), result;
                    }
                    /**
	     * Creates a clone of `map`.
	     *
	     * @private
	     * @param {Object} map The map to clone.
	     * @returns {Object} Returns the cloned map.
	     */
                    function cloneMap(map) {
                        var Ctor = map.constructor;
                        return arrayReduce(mapToArray(map), addMapEntry, new Ctor());
                    }
                    /**
	     * Creates a clone of `regexp`.
	     *
	     * @private
	     * @param {Object} regexp The regexp to clone.
	     * @returns {Object} Returns the cloned regexp.
	     */
                    function cloneRegExp(regexp) {
                        var Ctor = regexp.constructor, result = new Ctor(regexp.source, reFlags.exec(regexp));
                        return result.lastIndex = regexp.lastIndex, result;
                    }
                    /**
	     * Creates a clone of `set`.
	     *
	     * @private
	     * @param {Object} set The set to clone.
	     * @returns {Object} Returns the cloned set.
	     */
                    function cloneSet(set) {
                        var Ctor = set.constructor;
                        return arrayReduce(setToArray(set), addSetEntry, new Ctor());
                    }
                    /**
	     * Creates a clone of the `symbol` object.
	     *
	     * @private
	     * @param {Object} symbol The symbol object to clone.
	     * @returns {Object} Returns the cloned symbol object.
	     */
                    function cloneSymbol(symbol) {
                        return Symbol ? Object(symbolValueOf.call(symbol)) : {};
                    }
                    /**
	     * Creates a clone of `typedArray`.
	     *
	     * @private
	     * @param {Object} typedArray The typed array to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the cloned typed array.
	     */
                    function cloneTypedArray(typedArray, isDeep) {
                        var buffer = typedArray.buffer, Ctor = typedArray.constructor;
                        return new Ctor(isDeep ? cloneArrayBuffer(buffer) : buffer, typedArray.byteOffset, typedArray.length);
                    }
                    /**
	     * Creates an array that is the composition of partially applied arguments,
	     * placeholders, and provided arguments into a single array of arguments.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to prepend to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
                    function composeArgs(args, partials, holders) {
                        for (var holdersLength = holders.length, argsIndex = -1, argsLength = nativeMax(args.length - holdersLength, 0), leftIndex = -1, leftLength = partials.length, result = Array(leftLength + argsLength); ++leftIndex < leftLength; ) result[leftIndex] = partials[leftIndex];
                        for (;++argsIndex < holdersLength; ) result[holders[argsIndex]] = args[argsIndex];
                        for (;argsLength--; ) result[leftIndex++] = args[argsIndex++];
                        return result;
                    }
                    /**
	     * This function is like `composeArgs` except that the arguments composition
	     * is tailored for `_.partialRight`.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to append to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
                    function composeArgsRight(args, partials, holders) {
                        for (var holdersIndex = -1, holdersLength = holders.length, argsIndex = -1, argsLength = nativeMax(args.length - holdersLength, 0), rightIndex = -1, rightLength = partials.length, result = Array(argsLength + rightLength); ++argsIndex < argsLength; ) result[argsIndex] = args[argsIndex];
                        for (var offset = argsIndex; ++rightIndex < rightLength; ) result[offset + rightIndex] = partials[rightIndex];
                        for (;++holdersIndex < holdersLength; ) result[offset + holders[holdersIndex]] = args[argsIndex++];
                        return result;
                    }
                    /**
	     * Copies the values of `source` to `array`.
	     *
	     * @private
	     * @param {Array} source The array to copy values from.
	     * @param {Array} [array=[]] The array to copy values to.
	     * @returns {Array} Returns `array`.
	     */
                    function copyArray(source, array) {
                        var index = -1, length = source.length;
                        for (array || (array = Array(length)); ++index < length; ) array[index] = source[index];
                        return array;
                    }
                    /**
	     * Copies properties of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy properties from.
	     * @param {Array} props The property names to copy.
	     * @param {Object} [object={}] The object to copy properties to.
	     * @returns {Object} Returns `object`.
	     */
                    function copyObject(source, props, object) {
                        return copyObjectWith(source, props, object);
                    }
                    /**
	     * This function is like `copyObject` except that it accepts a function to
	     * customize copied values.
	     *
	     * @private
	     * @param {Object} source The object to copy properties from.
	     * @param {Array} props The property names to copy.
	     * @param {Object} [object={}] The object to copy properties to.
	     * @param {Function} [customizer] The function to customize copied values.
	     * @returns {Object} Returns `object`.
	     */
                    function copyObjectWith(source, props, object, customizer) {
                        object || (object = {});
                        for (var index = -1, length = props.length; ++index < length; ) {
                            var key = props[index], newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];
                            assignValue(object, key, newValue);
                        }
                        return object;
                    }
                    /**
	     * Copies own symbol properties of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy symbols from.
	     * @param {Object} [object={}] The object to copy symbols to.
	     * @returns {Object} Returns `object`.
	     */
                    function copySymbols(source, object) {
                        return copyObject(source, getSymbols(source), object);
                    }
                    /**
	     * Creates a function like `_.groupBy`.
	     *
	     * @private
	     * @param {Function} setter The function to set accumulator values.
	     * @param {Function} [initializer] The accumulator object initializer.
	     * @returns {Function} Returns the new aggregator function.
	     */
                    function createAggregator(setter, initializer) {
                        return function(collection, iteratee) {
                            var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
                            return func(collection, setter, getIteratee(iteratee), accumulator);
                        };
                    }
                    /**
	     * Creates a function like `_.assign`.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @returns {Function} Returns the new assigner function.
	     */
                    function createAssigner(assigner) {
                        return rest(function(object, sources) {
                            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
                            for (customizer = "function" == typeof customizer ? (length--, customizer) : undefined, 
                            guard && isIterateeCall(sources[0], sources[1], guard) && (customizer = 3 > length ? undefined : customizer, 
                            length = 1), object = Object(object); ++index < length; ) {
                                var source = sources[index];
                                source && assigner(object, source, index, customizer);
                            }
                            return object;
                        });
                    }
                    /**
	     * Creates a `baseEach` or `baseEachRight` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
                    function createBaseEach(eachFunc, fromRight) {
                        return function(collection, iteratee) {
                            if (null == collection) return collection;
                            if (!isArrayLike(collection)) return eachFunc(collection, iteratee);
                            for (var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection); (fromRight ? index-- : ++index < length) && iteratee(iterable[index], index, iterable) !== !1; ) ;
                            return collection;
                        };
                    }
                    /**
	     * Creates a base function for methods like `_.forIn`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
                    function createBaseFor(fromRight) {
                        return function(object, iteratee, keysFunc) {
                            for (var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length; length--; ) {
                                var key = props[fromRight ? length : ++index];
                                if (iteratee(iterable[key], key, iterable) === !1) break;
                            }
                            return object;
                        };
                    }
                    /**
	     * Creates a function that wraps `func` to invoke it with the optional `this`
	     * binding of `thisArg`.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createBaseWrapper(func, bitmask, thisArg) {
                        function wrapper() {
                            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
                            return fn.apply(isBind ? thisArg : this, arguments);
                        }
                        var isBind = bitmask & BIND_FLAG, Ctor = createCtorWrapper(func);
                        return wrapper;
                    }
                    /**
	     * Creates a function like `_.lowerFirst`.
	     *
	     * @private
	     * @param {string} methodName The name of the `String` case method to use.
	     * @returns {Function} Returns the new function.
	     */
                    function createCaseFirst(methodName) {
                        return function(string) {
                            string = toString(string);
                            var strSymbols = reHasComplexSymbol.test(string) ? stringToArray(string) : undefined, chr = strSymbols ? strSymbols[0] : string.charAt(0), trailing = strSymbols ? strSymbols.slice(1).join("") : string.slice(1);
                            return chr[methodName]() + trailing;
                        };
                    }
                    /**
	     * Creates a function like `_.camelCase`.
	     *
	     * @private
	     * @param {Function} callback The function to combine each word.
	     * @returns {Function} Returns the new compounder function.
	     */
                    function createCompounder(callback) {
                        return function(string) {
                            return arrayReduce(words(deburr(string)), callback, "");
                        };
                    }
                    /**
	     * Creates a function that produces an instance of `Ctor` regardless of
	     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	     *
	     * @private
	     * @param {Function} Ctor The constructor to wrap.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createCtorWrapper(Ctor) {
                        return function() {
                            // Use a `switch` statement to work with class constructors.
                            // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
                            // for more details.
                            var args = arguments;
                            switch (args.length) {
                              case 0:
                                return new Ctor();

                              case 1:
                                return new Ctor(args[0]);

                              case 2:
                                return new Ctor(args[0], args[1]);

                              case 3:
                                return new Ctor(args[0], args[1], args[2]);

                              case 4:
                                return new Ctor(args[0], args[1], args[2], args[3]);

                              case 5:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4]);

                              case 6:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);

                              case 7:
                                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                            }
                            var thisBinding = baseCreate(Ctor.prototype), result = Ctor.apply(thisBinding, args);
                            // Mimic the constructor's `return` behavior.
                            // See https://es5.github.io/#x13.2.2 for more details.
                            return isObject(result) ? result : thisBinding;
                        };
                    }
                    /**
	     * Creates a function that wraps `func` to enable currying.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	     * @param {number} arity The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createCurryWrapper(func, bitmask, arity) {
                        function wrapper() {
                            for (var length = arguments.length, index = length, args = Array(length), fn = this && this !== root && this instanceof wrapper ? Ctor : func, placeholder = lodash.placeholder || wrapper.placeholder; index--; ) args[index] = arguments[index];
                            var holders = 3 > length && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
                            return length -= holders.length, arity > length ? createRecurryWrapper(func, bitmask, createHybridWrapper, placeholder, undefined, args, holders, undefined, undefined, arity - length) : apply(fn, this, args);
                        }
                        var Ctor = createCtorWrapper(func);
                        return wrapper;
                    }
                    /**
	     * Creates a `_.flow` or `_.flowRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new flow function.
	     */
                    function createFlow(fromRight) {
                        return rest(function(funcs) {
                            funcs = baseFlatten(funcs);
                            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
                            for (fromRight && funcs.reverse(); index--; ) {
                                var func = funcs[index];
                                if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                                if (prereq && !wrapper && "wrapper" == getFuncName(func)) var wrapper = new LodashWrapper([], !0);
                            }
                            for (index = wrapper ? index : length; ++index < length; ) {
                                func = funcs[index];
                                var funcName = getFuncName(func), data = "wrapper" == funcName ? getData(func) : undefined;
                                wrapper = data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && 1 == data[9] ? wrapper[getFuncName(data[0])].apply(wrapper, data[3]) : 1 == func.length && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                            }
                            return function() {
                                var args = arguments, value = args[0];
                                if (wrapper && 1 == args.length && isArray(value) && value.length >= LARGE_ARRAY_SIZE) return wrapper.plant(value).value();
                                for (var index = 0, result = length ? funcs[index].apply(this, args) : value; ++index < length; ) result = funcs[index].call(this, result);
                                return result;
                            };
                        });
                    }
                    /**
	     * Creates a function that wraps `func` to invoke it with optional `this`
	     * binding of `thisArg`, partial application, and currying.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to wrap.
	     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
                        function wrapper() {
                            for (var length = arguments.length, index = length, args = Array(length); index--; ) args[index] = arguments[index];
                            if (partials && (args = composeArgs(args, partials, holders)), partialsRight && (args = composeArgsRight(args, partialsRight, holdersRight)), 
                            isCurry || isCurryRight) {
                                var placeholder = lodash.placeholder || wrapper.placeholder, argsHolders = replaceHolders(args, placeholder);
                                if (length -= argsHolders.length, arity > length) return createRecurryWrapper(func, bitmask, createHybridWrapper, placeholder, thisArg, args, argsHolders, argPos, ary, arity - length);
                            }
                            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
                            return argPos ? args = reorder(args, argPos) : isFlip && args.length > 1 && args.reverse(), 
                            isAry && ary < args.length && (args.length = ary), this && this !== root && this instanceof wrapper && (fn = Ctor || createCtorWrapper(fn)), 
                            fn.apply(thisBinding, args);
                        }
                        var isAry = bitmask & ARY_FLAG, isBind = bitmask & BIND_FLAG, isBindKey = bitmask & BIND_KEY_FLAG, isCurry = bitmask & CURRY_FLAG, isCurryRight = bitmask & CURRY_RIGHT_FLAG, isFlip = bitmask & FLIP_FLAG, Ctor = isBindKey ? undefined : createCtorWrapper(func);
                        return wrapper;
                    }
                    /**
	     * Creates a function like `_.invertBy`.
	     *
	     * @private
	     * @param {Function} setter The function to set accumulator values.
	     * @param {Function} toIteratee The function to resolve iteratees.
	     * @returns {Function} Returns the new inverter function.
	     */
                    function createInverter(setter, toIteratee) {
                        return function(object, iteratee) {
                            return baseInverter(object, setter, toIteratee(iteratee), {});
                        };
                    }
                    /**
	     * Creates a function like `_.over`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over iteratees.
	     * @returns {Function} Returns the new invoker function.
	     */
                    function createOver(arrayFunc) {
                        return rest(function(iteratees) {
                            return iteratees = arrayMap(baseFlatten(iteratees), getIteratee()), rest(function(args) {
                                var thisArg = this;
                                return arrayFunc(iteratees, function(iteratee) {
                                    return apply(iteratee, thisArg, args);
                                });
                            });
                        });
                    }
                    /**
	     * Creates the padding for `string` based on `length`. The `chars` string
	     * is truncated if the number of characters exceeds `length`.
	     *
	     * @private
	     * @param {string} string The string to create padding for.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padding for `string`.
	     */
                    function createPadding(string, length, chars) {
                        length = toInteger(length);
                        var strLength = stringSize(string);
                        if (!length || strLength >= length) return "";
                        var padLength = length - strLength;
                        chars = chars === undefined ? " " : chars + "";
                        var result = repeat(chars, nativeCeil(padLength / stringSize(chars)));
                        return reHasComplexSymbol.test(chars) ? stringToArray(result).slice(0, padLength).join("") : result.slice(0, padLength);
                    }
                    /**
	     * Creates a function that wraps `func` to invoke it with the optional `this`
	     * binding of `thisArg` and the `partials` prepended to those provided to
	     * the wrapper.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {Array} partials The arguments to prepend to those provided to the new function.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createPartialWrapper(func, bitmask, thisArg, partials) {
                        function wrapper() {
                            for (var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func; ++leftIndex < leftLength; ) args[leftIndex] = partials[leftIndex];
                            for (;argsLength--; ) args[leftIndex++] = arguments[++argsIndex];
                            return apply(fn, isBind ? thisArg : this, args);
                        }
                        var isBind = bitmask & BIND_FLAG, Ctor = createCtorWrapper(func);
                        return wrapper;
                    }
                    /**
	     * Creates a `_.range` or `_.rangeRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new range function.
	     */
                    function createRange(fromRight) {
                        return function(start, end, step) {
                            // Ensure the sign of `-0` is preserved.
                            return step && "number" != typeof step && isIterateeCall(start, end, step) && (end = step = undefined), 
                            start = toNumber(start), start = start === start ? start : 0, end === undefined ? (end = start, 
                            start = 0) : end = toNumber(end) || 0, step = step === undefined ? end > start ? 1 : -1 : toNumber(step) || 0, 
                            baseRange(start, end, step, fromRight);
                        };
                    }
                    /**
	     * Creates a function that wraps `func` to continue currying.
	     *
	     * @private
	     * @param {Function} func The function to wrap.
	     * @param {number} bitmask The bitmask of wrapper flags. See `createWrapper` for more details.
	     * @param {Function} wrapFunc The function to create the `func` wrapper.
	     * @param {*} placeholder The placeholder to replace.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createRecurryWrapper(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
                        var isCurry = bitmask & CURRY_FLAG, newArgPos = argPos ? copyArray(argPos) : undefined, newsHolders = isCurry ? holders : undefined, newHoldersRight = isCurry ? undefined : holders, newPartials = isCurry ? partials : undefined, newPartialsRight = isCurry ? undefined : partials;
                        bitmask |= isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG, bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG), 
                        bitmask & CURRY_BOUND_FLAG || (bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG));
                        var newData = [ func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, arity ], result = wrapFunc.apply(undefined, newData);
                        return isLaziable(func) && setData(result, newData), result.placeholder = placeholder, 
                        result;
                    }
                    /**
	     * Creates a function like `_.round`.
	     *
	     * @private
	     * @param {string} methodName The name of the `Math` method to use when rounding.
	     * @returns {Function} Returns the new round function.
	     */
                    function createRound(methodName) {
                        var func = Math[methodName];
                        return function(number, precision) {
                            if (number = toNumber(number), precision = toInteger(precision)) {
                                // Shift with exponential notation to avoid floating-point issues.
                                // See [MDN](https://mdn.io/round#Examples) for more details.
                                var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                                return pair = (toString(value) + "e").split("e"), +(pair[0] + "e" + (+pair[1] - precision));
                            }
                            return func(number);
                        };
                    }
                    /**
	     * Creates a function that either curries or invokes `func` with optional
	     * `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to wrap.
	     * @param {number} bitmask The bitmask of wrapper flags.
	     *  The bitmask may be composed of the following flags:
	     *     1 - `_.bind`
	     *     2 - `_.bindKey`
	     *     4 - `_.curry` or `_.curryRight` of a bound function
	     *     8 - `_.curry`
	     *    16 - `_.curryRight`
	     *    32 - `_.partial`
	     *    64 - `_.partialRight`
	     *   128 - `_.rearg`
	     *   256 - `_.ary`
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to be partially applied.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
                    function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
                        var isBindKey = bitmask & BIND_KEY_FLAG;
                        if (!isBindKey && "function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        var length = partials ? partials.length : 0;
                        if (length || (bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG), partials = holders = undefined), 
                        ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0), arity = arity === undefined ? arity : toInteger(arity), 
                        length -= holders ? holders.length : 0, bitmask & PARTIAL_RIGHT_FLAG) {
                            var partialsRight = partials, holdersRight = holders;
                            partials = holders = undefined;
                        }
                        var data = isBindKey ? undefined : getData(func), newData = [ func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity ];
                        if (data && mergeData(newData, data), func = newData[0], bitmask = newData[1], thisArg = newData[2], 
                        partials = newData[3], holders = newData[4], arity = newData[9] = null == newData[9] ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0), 
                        !arity && bitmask & (CURRY_FLAG | CURRY_RIGHT_FLAG) && (bitmask &= ~(CURRY_FLAG | CURRY_RIGHT_FLAG)), 
                        bitmask && bitmask != BIND_FLAG) result = bitmask == CURRY_FLAG || bitmask == CURRY_RIGHT_FLAG ? createCurryWrapper(func, bitmask, arity) : bitmask != PARTIAL_FLAG && bitmask != (BIND_FLAG | PARTIAL_FLAG) || holders.length ? createHybridWrapper.apply(undefined, newData) : createPartialWrapper(func, bitmask, thisArg, partials); else var result = createBaseWrapper(func, bitmask, thisArg);
                        var setter = data ? baseSetData : setData;
                        return setter(result, newData);
                    }
                    /**
	     * A specialized version of `baseIsEqualDeep` for arrays with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Array} array The array to compare.
	     * @param {Array} other The other array to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	     * @param {Object} [stack] Tracks traversed `array` and `other` objects.
	     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	     */
                    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
                        var index = -1, isPartial = bitmask & PARTIAL_COMPARE_FLAG, isUnordered = bitmask & UNORDERED_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
                        if (arrLength != othLength && !(isPartial && othLength > arrLength)) return !1;
                        // Assume cyclic values are equal.
                        var stacked = stack.get(array);
                        if (stacked) return stacked == other;
                        var result = !0;
                        // Ignore non-index properties.
                        for (stack.set(array, other); ++index < arrLength; ) {
                            var arrValue = array[index], othValue = other[index];
                            if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
                            if (compared !== undefined) {
                                if (compared) continue;
                                result = !1;
                                break;
                            }
                            // Recursively compare arrays (susceptible to call stack limits).
                            if (isUnordered) {
                                if (!arraySome(other, function(othValue) {
                                    return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
                                })) {
                                    result = !1;
                                    break;
                                }
                            } else if (arrValue !== othValue && !equalFunc(arrValue, othValue, customizer, bitmask, stack)) {
                                result = !1;
                                break;
                            }
                        }
                        return stack["delete"](array), result;
                    }
                    /**
	     * A specialized version of `baseIsEqualDeep` for comparing objects of
	     * the same `toStringTag`.
	     *
	     * **Note:** This function only supports comparing values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {string} tag The `toStringTag` of the objects to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
                    function equalByTag(object, other, tag, equalFunc, customizer, bitmask) {
                        switch (tag) {
                          case arrayBufferTag:
                            return object.byteLength == other.byteLength && equalFunc(new Uint8Array(object), new Uint8Array(other)) ? !0 : !1;

                          case boolTag:
                          case dateTag:
                            // Coerce dates and booleans to numbers, dates to milliseconds and booleans
                            // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
                            return +object == +other;

                          case errorTag:
                            return object.name == other.name && object.message == other.message;

                          case numberTag:
                            // Treat `NaN` vs. `NaN` as equal.
                            return object != +object ? other != +other : object == +other;

                          case regexpTag:
                          case stringTag:
                            // Coerce regexes to strings and treat strings primitives and string
                            // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
                            return object == other + "";

                          case mapTag:
                            var convert = mapToArray;

                          case setTag:
                            var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
                            // Recursively compare objects (susceptible to call stack limits).
                            return convert || (convert = setToArray), (isPartial || object.size == other.size) && equalFunc(convert(object), convert(other), customizer, bitmask | UNORDERED_COMPARE_FLAG);

                          case symbolTag:
                            return !!Symbol && symbolValueOf.call(object) == symbolValueOf.call(other);
                        }
                        return !1;
                    }
                    /**
	     * A specialized version of `baseIsEqualDeep` for objects with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
                    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
                        var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys(object), objLength = objProps.length, othProps = keys(other), othLength = othProps.length;
                        if (objLength != othLength && !isPartial) return !1;
                        for (var index = objLength; index--; ) {
                            var key = objProps[index];
                            if (!(isPartial ? key in other : baseHas(other, key))) return !1;
                        }
                        // Assume cyclic values are equal.
                        var stacked = stack.get(object);
                        if (stacked) return stacked == other;
                        var result = !0;
                        stack.set(object, other);
                        for (var skipCtor = isPartial; ++index < objLength; ) {
                            key = objProps[index];
                            var objValue = object[key], othValue = other[key];
                            if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
                            // Recursively compare objects (susceptible to call stack limits).
                            if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
                                result = !1;
                                break;
                            }
                            skipCtor || (skipCtor = "constructor" == key);
                        }
                        if (result && !skipCtor) {
                            var objCtor = object.constructor, othCtor = other.constructor;
                            objCtor != othCtor && "constructor" in object && "constructor" in other && !("function" == typeof objCtor && objCtor instanceof objCtor && "function" == typeof othCtor && othCtor instanceof othCtor) && (result = !1);
                        }
                        return stack["delete"](object), result;
                    }
                    /**
	     * Gets the name of `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {string} Returns the function name.
	     */
                    function getFuncName(func) {
                        for (var result = func.name + "", array = realNames[result], length = hasOwnProperty.call(realNames, result) ? array.length : 0; length--; ) {
                            var data = array[length], otherFunc = data.func;
                            if (null == otherFunc || otherFunc == func) return data.name;
                        }
                        return result;
                    }
                    /**
	     * Gets the appropriate "iteratee" function. If the `_.iteratee` method is
	     * customized this function returns the custom method, otherwise it returns
	     * `baseIteratee`. If arguments are provided the chosen function is invoked
	     * with them and its result is returned.
	     *
	     * @private
	     * @param {*} [value] The value to convert to an iteratee.
	     * @param {number} [arity] The arity of the created iteratee.
	     * @returns {Function} Returns the chosen function or its result.
	     */
                    function getIteratee() {
                        var result = lodash.iteratee || iteratee;
                        return result = result === iteratee ? baseIteratee : result, arguments.length ? result(arguments[0], arguments[1]) : result;
                    }
                    /**
	     * Gets the property names, values, and compare flags of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the match data of `object`.
	     */
                    function getMatchData(object) {
                        for (var result = toPairs(object), length = result.length; length--; ) result[length][2] = isStrictComparable(result[length][1]);
                        return result;
                    }
                    /**
	     * Gets the native function at `key` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {string} key The key of the method to get.
	     * @returns {*} Returns the function if it's native, else `undefined`.
	     */
                    function getNative(object, key) {
                        var value = null == object ? undefined : object[key];
                        return isNative(value) ? value : undefined;
                    }
                    /**
	     * Gets the `toStringTag` of `value`.
	     *
	     * @private
	     * @param {*} value The value to query.
	     * @returns {string} Returns the `toStringTag`.
	     */
                    function getTag(value) {
                        return objectToString.call(value);
                    }
                    /**
	     * Gets the view, applying any `transforms` to the `start` and `end` positions.
	     *
	     * @private
	     * @param {number} start The start of the view.
	     * @param {number} end The end of the view.
	     * @param {Array} transforms The transformations to apply to the view.
	     * @returns {Object} Returns an object containing the `start` and `end`
	     *  positions of the view.
	     */
                    function getView(start, end, transforms) {
                        for (var index = -1, length = transforms.length; ++index < length; ) {
                            var data = transforms[index], size = data.size;
                            switch (data.type) {
                              case "drop":
                                start += size;
                                break;

                              case "dropRight":
                                end -= size;
                                break;

                              case "take":
                                end = nativeMin(end, start + size);
                                break;

                              case "takeRight":
                                start = nativeMax(start, end - size);
                            }
                        }
                        return {
                            start: start,
                            end: end
                        };
                    }
                    /**
	     * Checks if `path` exists on `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @param {Function} hasFunc The function to check properties.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     */
                    function hasPath(object, path, hasFunc) {
                        if (null == object) return !1;
                        var result = hasFunc(object, path);
                        result || isKey(path) || (path = baseToPath(path), object = parent(object, path), 
                        null != object && (path = last(path), result = hasFunc(object, path)));
                        var length = object ? object.length : undefined;
                        return result || !!length && isLength(length) && isIndex(path, length) && (isArray(object) || isString(object) || isArguments(object));
                    }
                    /**
	     * Initializes an array clone.
	     *
	     * @private
	     * @param {Array} array The array to clone.
	     * @returns {Array} Returns the initialized clone.
	     */
                    function initCloneArray(array) {
                        var length = array.length, result = array.constructor(length);
                        // Add properties assigned by `RegExp#exec`.
                        return length && "string" == typeof array[0] && hasOwnProperty.call(array, "index") && (result.index = array.index, 
                        result.input = array.input), result;
                    }
                    /**
	     * Initializes an object clone.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @returns {Object} Returns the initialized clone.
	     */
                    function initCloneObject(object) {
                        if (isPrototype(object)) return {};
                        var Ctor = object.constructor;
                        return baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
                    }
                    /**
	     * Initializes an object clone based on its `toStringTag`.
	     *
	     * **Note:** This function only supports cloning values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @param {string} tag The `toStringTag` of the object to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the initialized clone.
	     */
                    function initCloneByTag(object, tag, isDeep) {
                        var Ctor = object.constructor;
                        switch (tag) {
                          case arrayBufferTag:
                            return cloneArrayBuffer(object);

                          case boolTag:
                          case dateTag:
                            return new Ctor(+object);

                          case float32Tag:
                          case float64Tag:
                          case int8Tag:
                          case int16Tag:
                          case int32Tag:
                          case uint8Tag:
                          case uint8ClampedTag:
                          case uint16Tag:
                          case uint32Tag:
                            return cloneTypedArray(object, isDeep);

                          case mapTag:
                            return cloneMap(object);

                          case numberTag:
                          case stringTag:
                            return new Ctor(object);

                          case regexpTag:
                            return cloneRegExp(object);

                          case setTag:
                            return cloneSet(object);

                          case symbolTag:
                            return cloneSymbol(object);
                        }
                    }
                    /**
	     * Creates an array of index keys for `object` values of arrays,
	     * `arguments` objects, and strings, otherwise `null` is returned.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array|null} Returns index keys, else `null`.
	     */
                    function indexKeys(object) {
                        var length = object ? object.length : undefined;
                        return isLength(length) && (isArray(object) || isString(object) || isArguments(object)) ? baseTimes(length, String) : null;
                    }
                    /**
	     * Checks if the given arguments are from an iteratee call.
	     *
	     * @private
	     * @param {*} value The potential iteratee value argument.
	     * @param {*} index The potential iteratee index or key argument.
	     * @param {*} object The potential iteratee object argument.
	     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	     */
                    function isIterateeCall(value, index, object) {
                        if (!isObject(object)) return !1;
                        var type = typeof index;
                        return ("number" == type ? isArrayLike(object) && isIndex(index, object.length) : "string" == type && index in object) ? eq(object[index], value) : !1;
                    }
                    /**
	     * Checks if `value` is a property name and not a property path.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	     */
                    function isKey(value, object) {
                        return "number" == typeof value ? !0 : !isArray(value) && (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object));
                    }
                    /**
	     * Checks if `value` is suitable for use as unique object key.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	     */
                    function isKeyable(value) {
                        var type = typeof value;
                        return "number" == type || "boolean" == type || "string" == type && "__proto__" !== value || null == value;
                    }
                    /**
	     * Checks if `func` has a lazy counterpart.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
	     */
                    function isLaziable(func) {
                        var funcName = getFuncName(func), other = lodash[funcName];
                        if ("function" != typeof other || !(funcName in LazyWrapper.prototype)) return !1;
                        if (func === other) return !0;
                        var data = getData(other);
                        return !!data && func === data[0];
                    }
                    /**
	     * Checks if `value` is likely a prototype object.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	     */
                    function isPrototype(value) {
                        var Ctor = value && value.constructor, proto = "function" == typeof Ctor && Ctor.prototype || objectProto;
                        return value === proto;
                    }
                    /**
	     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` if suitable for strict
	     *  equality comparisons, else `false`.
	     */
                    function isStrictComparable(value) {
                        return value === value && !isObject(value);
                    }
                    /**
	     * Merges the function metadata of `source` into `data`.
	     *
	     * Merging metadata reduces the number of wrappers used to invoke a function.
	     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	     * modify function arguments, making the order in which they are executed important,
	     * preventing the merging of metadata. However, we make an exception for a safe
	     * combined case where curried functions have `_.ary` and or `_.rearg` applied.
	     *
	     * @private
	     * @param {Array} data The destination metadata.
	     * @param {Array} source The source metadata.
	     * @returns {Array} Returns `data`.
	     */
                    function mergeData(data, source) {
                        var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = (BIND_FLAG | BIND_KEY_FLAG | ARY_FLAG) > newBitmask, isCombo = srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG || srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8] || srcBitmask == (ARY_FLAG | REARG_FLAG) && source[7].length <= source[8] && bitmask == CURRY_FLAG;
                        // Exit early if metadata can't be merged.
                        if (!isCommon && !isCombo) return data;
                        // Use source `thisArg` if available.
                        srcBitmask & BIND_FLAG && (data[2] = source[2], // Set when currying a bound function.
                        newBitmask |= bitmask & BIND_FLAG ? 0 : CURRY_BOUND_FLAG);
                        // Compose partial arguments.
                        var value = source[3];
                        if (value) {
                            var partials = data[3];
                            data[3] = partials ? composeArgs(partials, value, source[4]) : copyArray(value), 
                            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : copyArray(source[4]);
                        }
                        // Compose partial right arguments.
                        // Use source `argPos` if available.
                        // Use source `ary` if it's smaller.
                        // Use source `arity` if one is not provided.
                        // Use source `func` and merge bitmasks.
                        return value = source[5], value && (partials = data[5], data[5] = partials ? composeArgsRight(partials, value, source[6]) : copyArray(value), 
                        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : copyArray(source[6])), 
                        value = source[7], value && (data[7] = copyArray(value)), srcBitmask & ARY_FLAG && (data[8] = null == data[8] ? source[8] : nativeMin(data[8], source[8])), 
                        null == data[9] && (data[9] = source[9]), data[0] = source[0], data[1] = newBitmask, 
                        data;
                    }
                    /**
	     * Used by `_.defaultsDeep` to customize its `_.merge` use.
	     *
	     * @private
	     * @param {*} objValue The destination value.
	     * @param {*} srcValue The source value.
	     * @param {string} key The key of the property to merge.
	     * @param {Object} object The parent object of `objValue`.
	     * @param {Object} source The parent object of `srcValue`.
	     * @param {Object} [stack] Tracks traversed source values and their merged counterparts.
	     * @returns {*} Returns the value to assign.
	     */
                    function mergeDefaults(objValue, srcValue, key, object, source, stack) {
                        return isObject(objValue) && isObject(srcValue) && (stack.set(srcValue, objValue), 
                        baseMerge(objValue, srcValue, undefined, mergeDefaults, stack)), objValue;
                    }
                    /**
	     * Gets the parent value at `path` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} path The path to get the parent value of.
	     * @returns {*} Returns the parent value.
	     */
                    function parent(object, path) {
                        return 1 == path.length ? object : get(object, baseSlice(path, 0, -1));
                    }
                    /**
	     * Reorder `array` according to the specified indexes where the element at
	     * the first index is assigned as the first element, the element at
	     * the second index is assigned as the second element, and so on.
	     *
	     * @private
	     * @param {Array} array The array to reorder.
	     * @param {Array} indexes The arranged array indexes.
	     * @returns {Array} Returns `array`.
	     */
                    function reorder(array, indexes) {
                        for (var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array); length--; ) {
                            var index = indexes[length];
                            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
                        }
                        return array;
                    }
                    /**
	     * Converts `string` to a property path array.
	     *
	     * @private
	     * @param {string} string The string to convert.
	     * @returns {Array} Returns the property path array.
	     */
                    function stringToPath(string) {
                        var result = [];
                        return toString(string).replace(rePropName, function(match, number, quote, string) {
                            result.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
                        }), result;
                    }
                    /**
	     * Converts `value` to an array-like object if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array} Returns the array-like object.
	     */
                    function toArrayLikeObject(value) {
                        return isArrayLikeObject(value) ? value : [];
                    }
                    /**
	     * Converts `value` to a function if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Function} Returns the function.
	     */
                    function toFunction(value) {
                        return "function" == typeof value ? value : identity;
                    }
                    /**
	     * Creates a clone of `wrapper`.
	     *
	     * @private
	     * @param {Object} wrapper The wrapper to clone.
	     * @returns {Object} Returns the cloned wrapper.
	     */
                    function wrapperClone(wrapper) {
                        if (wrapper instanceof LazyWrapper) return wrapper.clone();
                        var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
                        return result.__actions__ = copyArray(wrapper.__actions__), result.__index__ = wrapper.__index__, 
                        result.__values__ = wrapper.__values__, result;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates an array of elements split into groups the length of `size`.
	     * If `array` can't be split evenly, the final chunk will be the remaining
	     * elements.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to process.
	     * @param {number} [size=0] The length of each chunk.
	     * @returns {Array} Returns the new array containing chunks.
	     * @example
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 2);
	     * // => [['a', 'b'], ['c', 'd']]
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 3);
	     * // => [['a', 'b', 'c'], ['d']]
	     */
                    function chunk(array, size) {
                        size = nativeMax(toInteger(size), 0);
                        var length = array ? array.length : 0;
                        if (!length || 1 > size) return [];
                        for (var index = 0, resIndex = -1, result = Array(nativeCeil(length / size)); length > index; ) result[++resIndex] = baseSlice(array, index, index += size);
                        return result;
                    }
                    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
                    function compact(array) {
                        for (var index = -1, length = array ? array.length : 0, resIndex = -1, result = []; ++index < length; ) {
                            var value = array[index];
                            value && (result[++resIndex] = value);
                        }
                        return result;
                    }
                    /**
	     * Creates a slice of `array` with `n` elements dropped from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.drop([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.drop([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.drop([1, 2, 3], 5);
	     * // => []
	     *
	     * _.drop([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
                    function drop(array, n, guard) {
                        var length = array ? array.length : 0;
                        return length ? (n = guard || n === undefined ? 1 : toInteger(n), baseSlice(array, 0 > n ? 0 : n, length)) : [];
                    }
                    /**
	     * Creates a slice of `array` with `n` elements dropped from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRight([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.dropRight([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.dropRight([1, 2, 3], 5);
	     * // => []
	     *
	     * _.dropRight([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
                    function dropRight(array, n, guard) {
                        var length = array ? array.length : 0;
                        return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, 
                        baseSlice(array, 0, 0 > n ? 0 : n)) : [];
                    }
                    /**
	     * Creates a slice of `array` excluding elements dropped from the end.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * invoked with three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.dropRightWhile(users, function(o) { return !o.active; });
	     * // => objects for ['barney']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
	     * // => objects for ['barney', 'fred']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.dropRightWhile(users, ['active', false]);
	     * // => objects for ['barney']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.dropRightWhile(users, 'active');
	     * // => objects for ['barney', 'fred', 'pebbles']
	     */
                    function dropRightWhile(array, predicate) {
                        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0, !0) : [];
                    }
                    /**
	     * Creates a slice of `array` excluding elements dropped from the beginning.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * invoked with three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.dropWhile(users, function(o) { return !o.active; });
	     * // => objects for ['pebbles']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.dropWhile(users, { 'user': 'barney', 'active': false });
	     * // => objects for ['fred', 'pebbles']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.dropWhile(users, ['active', false]);
	     * // => objects for ['pebbles']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.dropWhile(users, 'active');
	     * // => objects for ['barney', 'fred', 'pebbles']
	     */
                    function dropWhile(array, predicate) {
                        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !0) : [];
                    }
                    /**
	     * Fills elements of `array` with `value` from `start` up to, but not
	     * including, `end`.
	     *
	     * **Note:** This method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.fill(array, 'a');
	     * console.log(array);
	     * // => ['a', 'a', 'a']
	     *
	     * _.fill(Array(3), 2);
	     * // => [2, 2, 2]
	     *
	     * _.fill([4, 6, 8, 10], '*', 1, 3);
	     * // => [4, '*', '*', 10]
	     */
                    function fill(array, value, start, end) {
                        var length = array ? array.length : 0;
                        return length ? (start && "number" != typeof start && isIterateeCall(array, value, start) && (start = 0, 
                        end = length), baseFill(array, value, start, end)) : [];
                    }
                    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.findIndex(users, function(o) { return o.user == 'barney'; });
	     * // => 0
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findIndex(users, { 'user': 'fred', 'active': false });
	     * // => 1
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findIndex(users, ['active', false]);
	     * // => 0
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findIndex(users, 'active');
	     * // => 2
	     */
                    function findIndex(array, predicate) {
                        return array && array.length ? baseFindIndex(array, getIteratee(predicate, 3)) : -1;
                    }
                    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
	     * // => 2
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
	     * // => 0
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findLastIndex(users, ['active', false]);
	     * // => 2
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findLastIndex(users, 'active');
	     * // => 0
	     */
                    function findLastIndex(array, predicate) {
                        return array && array.length ? baseFindIndex(array, getIteratee(predicate, 3), !0) : -1;
                    }
                    /**
	     * Flattens `array` a single level.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, [4]]
	     */
                    function flatten(array) {
                        var length = array ? array.length : 0;
                        return length ? baseFlatten(array) : [];
                    }
                    /**
	     * This method is like `_.flatten` except that it recursively flattens `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to recursively flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flattenDeep([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, 4]
	     */
                    function flattenDeep(array) {
                        var length = array ? array.length : 0;
                        return length ? baseFlatten(array, !0) : [];
                    }
                    /**
	     * The inverse of `_.toPairs`; this method returns an object composed
	     * from key-value `pairs`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} pairs The key-value pairs.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.fromPairs([['fred', 30], ['barney', 40]]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */
                    function fromPairs(pairs) {
                        for (var index = -1, length = pairs ? pairs.length : 0, result = {}; ++index < length; ) {
                            var pair = pairs[index];
                            result[pair[0]] = pair[1];
                        }
                        return result;
                    }
                    /**
	     * Gets the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias first
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the first element of `array`.
	     * @example
	     *
	     * _.head([1, 2, 3]);
	     * // => 1
	     *
	     * _.head([]);
	     * // => undefined
	     */
                    function head(array) {
                        return array ? array[0] : undefined;
                    }
                    /**
	     * Gets the index at which the first occurrence of `value` is found in `array`
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it's used as the offset
	     * from the end of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 1, 2], 2);
	     * // => 1
	     *
	     * // Search from the `fromIndex`.
	     * _.indexOf([1, 2, 1, 2], 2, 2);
	     * // => 3
	     */
                    function indexOf(array, value, fromIndex) {
                        var length = array ? array.length : 0;
                        return length ? (fromIndex = toInteger(fromIndex), 0 > fromIndex && (fromIndex = nativeMax(length + fromIndex, 0)), 
                        baseIndexOf(array, value, fromIndex)) : -1;
                    }
                    /**
	     * Gets all but the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     */
                    function initial(array) {
                        return dropRight(array, 1);
                    }
                    /**
	     * Converts all elements in `array` into a string separated by `separator`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to convert.
	     * @param {string} [separator=','] The element separator.
	     * @returns {string} Returns the joined string.
	     * @example
	     *
	     * _.join(['a', 'b', 'c'], '~');
	     * // => 'a~b~c'
	     */
                    function join(array, separator) {
                        return array ? nativeJoin.call(array, separator) : "";
                    }
                    /**
	     * Gets the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the last element of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     */
                    function last(array) {
                        var length = array ? array.length : 0;
                        return length ? array[length - 1] : undefined;
                    }
                    /**
	     * This method is like `_.indexOf` except that it iterates over elements of
	     * `array` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=array.length-1] The index to search from.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 1, 2], 2);
	     * // => 3
	     *
	     * // Search from the `fromIndex`.
	     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
	     * // => 1
	     */
                    function lastIndexOf(array, value, fromIndex) {
                        var length = array ? array.length : 0;
                        if (!length) return -1;
                        var index = length;
                        if (fromIndex !== undefined && (index = toInteger(fromIndex), index = (0 > index ? nativeMax(length + index, 0) : nativeMin(index, length - 1)) + 1), 
                        value !== value) return indexOfNaN(array, index, !0);
                        for (;index--; ) if (array[index] === value) return index;
                        return -1;
                    }
                    /**
	     * This method is like `_.pull` except that it accepts an array of values to remove.
	     *
	     * **Note:** Unlike `_.difference`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     *
	     * _.pullAll(array, [2, 3]);
	     * console.log(array);
	     * // => [1, 1]
	     */
                    function pullAll(array, values) {
                        return array && array.length && values && values.length ? basePullAll(array, values) : array;
                    }
                    /**
	     * This method is like `_.pullAll` except that it accepts `iteratee` which is
	     * invoked for each element of `array` and `values` to generate the criterion
	     * by which uniqueness is computed. The iteratee is invoked with one argument: (value).
	     *
	     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to remove.
	     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
	     *
	     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
	     * console.log(array);
	     * // => [{ 'x': 2 }]
	     */
                    function pullAllBy(array, values, iteratee) {
                        return array && array.length && values && values.length ? basePullAllBy(array, values, getIteratee(iteratee)) : array;
                    }
                    /**
	     * Removes all elements from `array` that `predicate` returns truthy for
	     * and returns an array of the removed elements. The predicate is invoked with
	     * three arguments: (value, index, array).
	     *
	     * **Note:** Unlike `_.filter`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4];
	     * var evens = _.remove(array, function(n) {
	     *   return n % 2 == 0;
	     * });
	     *
	     * console.log(array);
	     * // => [1, 3]
	     *
	     * console.log(evens);
	     * // => [2, 4]
	     */
                    function remove(array, predicate) {
                        var result = [];
                        if (!array || !array.length) return result;
                        var index = -1, indexes = [], length = array.length;
                        for (predicate = getIteratee(predicate, 3); ++index < length; ) {
                            var value = array[index];
                            predicate(value, index, array) && (result.push(value), indexes.push(index));
                        }
                        return basePullAt(array, indexes), result;
                    }
                    /**
	     * Reverses `array` so that the first element becomes the last, the second
	     * element becomes the second to last, and so on.
	     *
	     * **Note:** This method mutates `array` and is based on
	     * [`Array#reverse`](https://mdn.io/Array/reverse).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.reverse(array);
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */
                    function reverse(array) {
                        return array ? nativeReverse.call(array) : array;
                    }
                    /**
	     * Creates a slice of `array` from `start` up to, but not including, `end`.
	     *
	     * **Note:** This method is used instead of [`Array#slice`](https://mdn.io/Array/slice)
	     * to ensure dense arrays are returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
                    function slice(array, start, end) {
                        var length = array ? array.length : 0;
                        return length ? (end && "number" != typeof end && isIterateeCall(array, start, end) ? (start = 0, 
                        end = length) : (start = null == start ? 0 : toInteger(start), end = end === undefined ? length : toInteger(end)), 
                        baseSlice(array, start, end)) : [];
                    }
                    /**
	     * Uses a binary search to determine the lowest index at which `value` should
	     * be inserted into `array` in order to maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @returns {number} Returns the index at which `value` should be inserted into `array`.
	     * @example
	     *
	     * _.sortedIndex([30, 50], 40);
	     * // => 1
	     *
	     * _.sortedIndex([4, 5], 4);
	     * // => 0
	     */
                    function sortedIndex(array, value) {
                        return baseSortedIndex(array, value);
                    }
                    /**
	     * This method is like `_.sortedIndex` except that it accepts `iteratee`
	     * which is invoked for `value` and each element of `array` to compute their
	     * sort ranking. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the index at which `value` should be inserted into `array`.
	     * @example
	     *
	     * var dict = { 'thirty': 30, 'forty': 40, 'fifty': 50 };
	     *
	     * _.sortedIndexBy(['thirty', 'fifty'], 'forty', _.propertyOf(dict));
	     * // => 1
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.sortedIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');
	     * // => 0
	     */
                    function sortedIndexBy(array, value, iteratee) {
                        return baseSortedIndexBy(array, value, getIteratee(iteratee));
                    }
                    /**
	     * This method is like `_.indexOf` except that it performs a binary
	     * search on a sorted `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.sortedIndexOf([1, 1, 2, 2], 2);
	     * // => 2
	     */
                    function sortedIndexOf(array, value) {
                        var length = array ? array.length : 0;
                        if (length) {
                            var index = baseSortedIndex(array, value);
                            if (length > index && eq(array[index], value)) return index;
                        }
                        return -1;
                    }
                    /**
	     * This method is like `_.sortedIndex` except that it returns the highest
	     * index at which `value` should be inserted into `array` in order to
	     * maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @returns {number} Returns the index at which `value` should be inserted into `array`.
	     * @example
	     *
	     * _.sortedLastIndex([4, 5], 4);
	     * // => 1
	     */
                    function sortedLastIndex(array, value) {
                        return baseSortedIndex(array, value, !0);
                    }
                    /**
	     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
	     * which is invoked for `value` and each element of `array` to compute their
	     * sort ranking. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the index at which `value` should be inserted into `array`.
	     * @example
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.sortedLastIndexBy([{ 'x': 4 }, { 'x': 5 }], { 'x': 4 }, 'x');
	     * // => 1
	     */
                    function sortedLastIndexBy(array, value, iteratee) {
                        return baseSortedIndexBy(array, value, getIteratee(iteratee), !0);
                    }
                    /**
	     * This method is like `_.lastIndexOf` except that it performs a binary
	     * search on a sorted `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.sortedLastIndexOf([1, 1, 2, 2], 2);
	     * // => 3
	     */
                    function sortedLastIndexOf(array, value) {
                        var length = array ? array.length : 0;
                        if (length) {
                            var index = baseSortedIndex(array, value, !0) - 1;
                            if (eq(array[index], value)) return index;
                        }
                        return -1;
                    }
                    /**
	     * This method is like `_.uniq` except that it's designed and optimized
	     * for sorted arrays.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.sortedUniq([1, 1, 2]);
	     * // => [1, 2]
	     */
                    function sortedUniq(array) {
                        return array && array.length ? baseSortedUniq(array) : [];
                    }
                    /**
	     * This method is like `_.uniqBy` except that it's designed and optimized
	     * for sorted arrays.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The iteratee invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
	     * // => [1.1, 2.3]
	     */
                    function sortedUniqBy(array, iteratee) {
                        return array && array.length ? baseSortedUniqBy(array, getIteratee(iteratee)) : [];
                    }
                    /**
	     * Gets all but the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.tail([1, 2, 3]);
	     * // => [2, 3]
	     */
                    function tail(array) {
                        return drop(array, 1);
                    }
                    /**
	     * Creates a slice of `array` with `n` elements taken from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.take([1, 2, 3]);
	     * // => [1]
	     *
	     * _.take([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.take([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.take([1, 2, 3], 0);
	     * // => []
	     */
                    function take(array, n, guard) {
                        return array && array.length ? (n = guard || n === undefined ? 1 : toInteger(n), 
                        baseSlice(array, 0, 0 > n ? 0 : n)) : [];
                    }
                    /**
	     * Creates a slice of `array` with `n` elements taken from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRight([1, 2, 3]);
	     * // => [3]
	     *
	     * _.takeRight([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.takeRight([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.takeRight([1, 2, 3], 0);
	     * // => []
	     */
                    function takeRight(array, n, guard) {
                        var length = array ? array.length : 0;
                        return length ? (n = guard || n === undefined ? 1 : toInteger(n), n = length - n, 
                        baseSlice(array, 0 > n ? 0 : n, length)) : [];
                    }
                    /**
	     * Creates a slice of `array` with elements taken from the end. Elements are
	     * taken until `predicate` returns falsey. The predicate is invoked with three
	     * arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.takeRightWhile(users, function(o) { return !o.active; });
	     * // => objects for ['fred', 'pebbles']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
	     * // => objects for ['pebbles']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.takeRightWhile(users, ['active', false]);
	     * // => objects for ['fred', 'pebbles']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.takeRightWhile(users, 'active');
	     * // => []
	     */
                    function takeRightWhile(array, predicate) {
                        return array && array.length ? baseWhile(array, getIteratee(predicate, 3), !1, !0) : [];
                    }
                    /**
	     * Creates a slice of `array` with elements taken from the beginning. Elements
	     * are taken until `predicate` returns falsey. The predicate is invoked with
	     * three arguments: (value, index, array).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false},
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.takeWhile(users, function(o) { return !o.active; });
	     * // => objects for ['barney', 'fred']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.takeWhile(users, { 'user': 'barney', 'active': false });
	     * // => objects for ['barney']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.takeWhile(users, ['active', false]);
	     * // => objects for ['barney', 'fred']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.takeWhile(users, 'active');
	     * // => []
	     */
                    function takeWhile(array, predicate) {
                        return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
                    }
                    /**
	     * Creates a duplicate-free version of an array, using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons, in which only the first occurrence of each element
	     * is kept.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.uniq([2, 1, 2]);
	     * // => [2, 1]
	     */
                    function uniq(array) {
                        return array && array.length ? baseUniq(array) : [];
                    }
                    /**
	     * This method is like `_.uniq` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the criterion by which
	     * uniqueness is computed. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
	     * // => [2.1, 1.2]
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
                    function uniqBy(array, iteratee) {
                        return array && array.length ? baseUniq(array, getIteratee(iteratee)) : [];
                    }
                    /**
	     * This method is like `_.uniq` except that it accepts `comparator` which
	     * is invoked to compare elements of `array`. The comparator is invoked with
	     * two arguments: (arrVal, othVal).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {Function} [comparator] The comparator invoked per element.
	     * @returns {Array} Returns the new duplicate free array.
	     * @example
	     *
	     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 },  { 'x': 1, 'y': 2 }];
	     *
	     * _.uniqWith(objects, _.isEqual);
	     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
	     */
                    function uniqWith(array, comparator) {
                        return array && array.length ? baseUniq(array, undefined, comparator) : [];
                    }
                    /**
	     * This method is like `_.zip` except that it accepts an array of grouped
	     * elements and creates an array regrouping the elements to their pre-zip
	     * configuration.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     *
	     * _.unzip(zipped);
	     * // => [['fred', 'barney'], [30, 40], [true, false]]
	     */
                    function unzip(array) {
                        if (!array || !array.length) return [];
                        var length = 0;
                        return array = arrayFilter(array, function(group) {
                            return isArrayLikeObject(group) ? (length = nativeMax(group.length, length), !0) : void 0;
                        }), baseTimes(length, function(index) {
                            return arrayMap(array, baseProperty(index));
                        });
                    }
                    /**
	     * This method is like `_.unzip` except that it accepts `iteratee` to specify
	     * how regrouped values should be combined. The iteratee is invoked with the
	     * elements of each group: (...group).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @param {Function} [iteratee=_.identity] The function to combine regrouped values.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
	     * // => [[1, 10, 100], [2, 20, 200]]
	     *
	     * _.unzipWith(zipped, _.add);
	     * // => [3, 30, 300]
	     */
                    function unzipWith(array, iteratee) {
                        if (!array || !array.length) return [];
                        var result = unzip(array);
                        return null == iteratee ? result : arrayMap(result, function(group) {
                            return apply(iteratee, undefined, group);
                        });
                    }
                    /**
	     * This method is like `_.fromPairs` except that it accepts two arrays,
	     * one of property names and one of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} [props=[]] The property names.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObject(['a', 'b'], [1, 2]);
	     * // => { 'a': 1, 'b': 2 }
	     */
                    function zipObject(props, values) {
                        return baseZipObject(props || [], values || [], assignValue);
                    }
                    /**
	     * This method is like `_.zipObject` except that it supports property paths.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} [props=[]] The property names.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
	     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
	     */
                    function zipObjectDeep(props, values) {
                        return baseZipObject(props || [], values || [], baseSet);
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a `lodash` object that wraps `value` with explicit method chaining enabled.
	     * The result of such method chaining must be unwrapped with `_#value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Seq
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36 },
	     *   { 'user': 'fred',    'age': 40 },
	     *   { 'user': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _
	     *   .chain(users)
	     *   .sortBy('age')
	     *   .map(function(o) {
	     *     return o.user + ' is ' + o.age;
	     *   })
	     *   .head()
	     *   .value();
	     * // => 'pebbles is 1'
	     */
                    function chain(value) {
                        var result = lodash(value);
                        return result.__chain__ = !0, result;
                    }
                    /**
	     * This method invokes `interceptor` and returns `value`. The interceptor
	     * is invoked with one argument; (value). The purpose of this method is to
	     * "tap into" a method chain in order to modify intermediate results.
	     *
	     * @static
	     * @memberOf _
	     * @category Seq
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3])
	     *  .tap(function(array) {
	     *    // Mutate input array.
	     *    array.pop();
	     *  })
	     *  .reverse()
	     *  .value();
	     * // => [2, 1]
	     */
                    function tap(value, interceptor) {
                        return interceptor(value), value;
                    }
                    /**
	     * This method is like `_.tap` except that it returns the result of `interceptor`.
	     * The purpose of this method is to "pass thru" values replacing intermediate
	     * results in a method chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Seq
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns the result of `interceptor`.
	     * @example
	     *
	     * _('  abc  ')
	     *  .chain()
	     *  .trim()
	     *  .thru(function(value) {
	     *    return [value];
	     *  })
	     *  .value();
	     * // => ['abc']
	     */
                    function thru(value, interceptor) {
                        return interceptor(value);
                    }
                    /**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Seq
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // A sequence without explicit chaining.
	     * _(users).head();
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // A sequence with explicit chaining.
	     * _(users)
	     *   .chain()
	     *   .head()
	     *   .pick('user')
	     *   .value();
	     * // => { 'user': 'barney' }
	     */
                    function wrapperChain() {
                        return chain(this);
                    }
                    /**
	     * Executes the chained sequence and returns the wrapped result.
	     *
	     * @name commit
	     * @memberOf _
	     * @category Seq
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).push(3);
	     *
	     * console.log(array);
	     * // => [1, 2]
	     *
	     * wrapped = wrapped.commit();
	     * console.log(array);
	     * // => [1, 2, 3]
	     *
	     * wrapped.last();
	     * // => 3
	     *
	     * console.log(array);
	     * // => [1, 2, 3]
	     */
                    function wrapperCommit() {
                        return new LodashWrapper(this.value(), this.__chain__);
                    }
                    /**
	     * This method is the wrapper version of `_.flatMap`.
	     *
	     * @name flatMap
	     * @memberOf _
	     * @category Seq
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * function duplicate(n) {
	     *   return [n, n];
	     * }
	     *
	     * _([1, 2]).flatMap(duplicate).value();
	     * // => [1, 1, 2, 2]
	     */
                    function wrapperFlatMap(iteratee) {
                        return this.map(iteratee).flatten();
                    }
                    /**
	     * Gets the next value on a wrapped object following the
	     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
	     *
	     * @name next
	     * @memberOf _
	     * @category Seq
	     * @returns {Object} Returns the next iterator value.
	     * @example
	     *
	     * var wrapped = _([1, 2]);
	     *
	     * wrapped.next();
	     * // => { 'done': false, 'value': 1 }
	     *
	     * wrapped.next();
	     * // => { 'done': false, 'value': 2 }
	     *
	     * wrapped.next();
	     * // => { 'done': true, 'value': undefined }
	     */
                    function wrapperNext() {
                        this.__values__ === undefined && (this.__values__ = toArray(this.value()));
                        var done = this.__index__ >= this.__values__.length, value = done ? undefined : this.__values__[this.__index__++];
                        return {
                            done: done,
                            value: value
                        };
                    }
                    /**
	     * Enables the wrapper to be iterable.
	     *
	     * @name Symbol.iterator
	     * @memberOf _
	     * @category Seq
	     * @returns {Object} Returns the wrapper object.
	     * @example
	     *
	     * var wrapped = _([1, 2]);
	     *
	     * wrapped[Symbol.iterator]() === wrapped;
	     * // => true
	     *
	     * Array.from(wrapped);
	     * // => [1, 2]
	     */
                    function wrapperToIterator() {
                        return this;
                    }
                    /**
	     * Creates a clone of the chained sequence planting `value` as the wrapped value.
	     *
	     * @name plant
	     * @memberOf _
	     * @category Seq
	     * @param {*} value The value to plant.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var wrapped = _([1, 2]).map(square);
	     * var other = wrapped.plant([3, 4]);
	     *
	     * other.value();
	     * // => [9, 16]
	     *
	     * wrapped.value();
	     * // => [1, 4]
	     */
                    function wrapperPlant(value) {
                        for (var result, parent = this; parent instanceof baseLodash; ) {
                            var clone = wrapperClone(parent);
                            clone.__index__ = 0, clone.__values__ = undefined, result ? previous.__wrapped__ = clone : result = clone;
                            var previous = clone;
                            parent = parent.__wrapped__;
                        }
                        return previous.__wrapped__ = value, result;
                    }
                    /**
	     * This method is the wrapper version of `_.reverse`.
	     *
	     * **Note:** This method mutates the wrapped array.
	     *
	     * @name reverse
	     * @memberOf _
	     * @category Seq
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _(array).reverse().value()
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */
                    function wrapperReverse() {
                        var value = this.__wrapped__;
                        if (value instanceof LazyWrapper) {
                            var wrapped = value;
                            return this.__actions__.length && (wrapped = new LazyWrapper(this)), wrapped = wrapped.reverse(), 
                            wrapped.__actions__.push({
                                func: thru,
                                args: [ reverse ],
                                thisArg: undefined
                            }), new LodashWrapper(wrapped, this.__chain__);
                        }
                        return this.thru(reverse);
                    }
                    /**
	     * Executes the chained sequence to extract the unwrapped value.
	     *
	     * @name value
	     * @memberOf _
	     * @alias toJSON, valueOf
	     * @category Seq
	     * @returns {*} Returns the resolved unwrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).value();
	     * // => [1, 2, 3]
	     */
                    function wrapperValue() {
                        return baseWrapperValue(this.__wrapped__, this.__actions__);
                    }
                    /**
	     * Checks if `predicate` returns truthy for **all** elements of `collection`.
	     * Iteration is stopped once `predicate` returns falsey. The predicate is
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check, else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes'], Boolean);
	     * // => false
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': false },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.every(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.every(users, ['active', false]);
	     * // => true
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.every(users, 'active');
	     * // => false
	     */
                    function every(collection, predicate, guard) {
                        var func = isArray(collection) ? arrayEvery : baseEvery;
                        return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), 
                        func(collection, getIteratee(predicate, 3));
                    }
                    /**
	     * Iterates over elements of `collection`, returning an array of all elements
	     * `predicate` returns truthy for. The predicate is invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.filter(users, function(o) { return !o.active; });
	     * // => objects for ['fred']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.filter(users, { 'age': 36, 'active': true });
	     * // => objects for ['barney']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.filter(users, ['active', false]);
	     * // => objects for ['fred']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.filter(users, 'active');
	     * // => objects for ['barney']
	     */
                    function filter(collection, predicate) {
                        var func = isArray(collection) ? arrayFilter : baseFilter;
                        return func(collection, getIteratee(predicate, 3));
                    }
                    /**
	     * Iterates over elements of `collection`, returning the first element
	     * `predicate` returns truthy for. The predicate is invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': true },
	     *   { 'user': 'fred',    'age': 40, 'active': false },
	     *   { 'user': 'pebbles', 'age': 1,  'active': true }
	     * ];
	     *
	     * _.find(users, function(o) { return o.age < 40; });
	     * // => object for 'barney'
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.find(users, { 'age': 1, 'active': true });
	     * // => object for 'pebbles'
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.find(users, ['active', false]);
	     * // => object for 'fred'
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.find(users, 'active');
	     * // => object for 'barney'
	     */
                    function find(collection, predicate) {
                        if (predicate = getIteratee(predicate, 3), isArray(collection)) {
                            var index = baseFindIndex(collection, predicate);
                            return index > -1 ? collection[index] : undefined;
                        }
                        return baseFind(collection, predicate, baseEach);
                    }
                    /**
	     * This method is like `_.find` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 1;
	     * });
	     * // => 3
	     */
                    function findLast(collection, predicate) {
                        if (predicate = getIteratee(predicate, 3), isArray(collection)) {
                            var index = baseFindIndex(collection, predicate, !0);
                            return index > -1 ? collection[index] : undefined;
                        }
                        return baseFind(collection, predicate, baseEachRight);
                    }
                    /**
	     * Creates an array of flattened values by running each element in `collection`
	     * through `iteratee` and concating its result to the other mapped values.
	     * The iteratee is invoked with three arguments: (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * function duplicate(n) {
	     *   return [n, n];
	     * }
	     *
	     * _.flatMap([1, 2], duplicate);
	     * // => [1, 1, 2, 2]
	     */
                    function flatMap(collection, iteratee) {
                        return baseFlatten(map(collection, iteratee));
                    }
                    /**
	     * Iterates over elements of `collection` invoking `iteratee` for each element.
	     * The iteratee is invoked with three arguments: (value, index|key, collection).
	     * Iteratee functions may exit iteration early by explicitly returning `false`.
	     *
	     * **Note:** As with other "Collections" methods, objects with a "length" property
	     * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
	     * for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEach(function(value) {
	     *   console.log(value);
	     * });
	     * // => logs `1` then `2`
	     *
	     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a' then 'b' (iteration order is not guaranteed)
	     */
                    function forEach(collection, iteratee) {
                        return "function" == typeof iteratee && isArray(collection) ? arrayEach(collection, iteratee) : baseEach(collection, toFunction(iteratee));
                    }
                    /**
	     * This method is like `_.forEach` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array|Object} Returns `collection`.
	     * @example
	     *
	     * _.forEachRight([1, 2], function(value) {
	     *   console.log(value);
	     * });
	     * // => logs `2` then `1`
	     */
                    function forEachRight(collection, iteratee) {
                        return "function" == typeof iteratee && isArray(collection) ? arrayEachRight(collection, iteratee) : baseEachRight(collection, toFunction(iteratee));
                    }
                    /**
	     * Checks if `value` is in `collection`. If `collection` is a string it's checked
	     * for a substring of `value`, otherwise [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * is used for equality comparisons. If `fromIndex` is negative, it's used as
	     * the offset from the end of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
	     * @returns {boolean} Returns `true` if `value` is found, else `false`.
	     * @example
	     *
	     * _.includes([1, 2, 3], 1);
	     * // => true
	     *
	     * _.includes([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.includes('pebbles', 'eb');
	     * // => true
	     */
                    function includes(collection, value, fromIndex, guard) {
                        collection = isArrayLike(collection) ? collection : values(collection), fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
                        var length = collection.length;
                        return 0 > fromIndex && (fromIndex = nativeMax(length + fromIndex, 0)), isString(collection) ? length >= fromIndex && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
                    }
                    /**
	     * Creates an array of values by running each element in `collection` through
	     * `iteratee`. The iteratee is invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	     *
	     * The guarded methods are:
	     * `ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`,
	     * `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`,
	     * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`,
	     * and `words`
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * _.map([4, 8], square);
	     * // => [16, 64]
	     *
	     * _.map({ 'a': 4, 'b': 8 }, square);
	     * // => [16, 64] (iteration order is not guaranteed)
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.map(users, 'user');
	     * // => ['barney', 'fred']
	     */
                    function map(collection, iteratee) {
                        var func = isArray(collection) ? arrayMap : baseMap;
                        return func(collection, getIteratee(iteratee, 3));
                    }
                    /**
	     * This method is like `_.sortBy` except that it allows specifying the sort
	     * orders of the iteratees to sort by. If `orders` is unspecified, all values
	     * are sorted in ascending order. Otherwise, specify an order of "desc" for
	     * descending or "asc" for ascending sort order of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} [iteratees=[_.identity]] The iteratees to sort by.
	     * @param {string[]} [orders] The sort orders of `iteratees`.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.reduce`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 34 },
	     *   { 'user': 'fred',   'age': 42 },
	     *   { 'user': 'barney', 'age': 36 }
	     * ];
	     *
	     * // Sort by `user` in ascending order and by `age` in descending order.
	     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
	     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	     */
                    function orderBy(collection, iteratees, orders, guard) {
                        return null == collection ? [] : (isArray(iteratees) || (iteratees = null == iteratees ? [] : [ iteratees ]), 
                        orders = guard ? undefined : orders, isArray(orders) || (orders = null == orders ? [] : [ orders ]), 
                        baseOrderBy(collection, iteratees, orders));
                    }
                    /**
	     * Reduces `collection` to a value which is the accumulated result of running
	     * each element in `collection` through `iteratee`, where each successive
	     * invocation is supplied the return value of the previous. If `accumulator`
	     * is not given the first element of `collection` is used as the initial
	     * value. The iteratee is invoked with four arguments:
	     * (accumulator, value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.reduce`, `_.reduceRight`, and `_.transform`.
	     *
	     * The guarded methods are:
	     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
	     * and `sortBy`
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.reduce([1, 2], function(sum, n) {
	     *   return sum + n;
	     * }, 0);
	     * // => 3
	     *
	     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	     *   (result[value] || (result[value] = [])).push(key);
	     *   return result;
	     * }, {});
	     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
	     */
                    function reduce(collection, iteratee, accumulator) {
                        var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
                        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
                    }
                    /**
	     * This method is like `_.reduce` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var array = [[0, 1], [2, 3], [4, 5]];
	     *
	     * _.reduceRight(array, function(flattened, other) {
	     *   return flattened.concat(other);
	     * }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
                    function reduceRight(collection, iteratee, accumulator) {
                        var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
                        return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
                    }
                    /**
	     * The opposite of `_.filter`; this method returns the elements of `collection`
	     * that `predicate` does **not** return truthy for.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * _.reject(users, function(o) { return !o.active; });
	     * // => objects for ['fred']
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.reject(users, { 'age': 40, 'active': true });
	     * // => objects for ['barney']
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.reject(users, ['active', false]);
	     * // => objects for ['fred']
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.reject(users, 'active');
	     * // => objects for ['barney']
	     */
                    function reject(collection, predicate) {
                        var func = isArray(collection) ? arrayFilter : baseFilter;
                        return predicate = getIteratee(predicate, 3), func(collection, function(value, index, collection) {
                            return !predicate(value, index, collection);
                        });
                    }
                    /**
	     * Gets a random element from `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to sample.
	     * @returns {*} Returns the random element.
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     */
                    function sample(collection) {
                        var array = isArrayLike(collection) ? collection : values(collection), length = array.length;
                        return length > 0 ? array[baseRandom(0, length - 1)] : undefined;
                    }
                    /**
	     * Gets `n` random elements at unique keys from `collection` up to the
	     * size of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to sample.
	     * @param {number} [n=0] The number of elements to sample.
	     * @returns {Array} Returns the random elements.
	     * @example
	     *
	     * _.sampleSize([1, 2, 3], 2);
	     * // => [3, 1]
	     *
	     * _.sampleSize([1, 2, 3], 4);
	     * // => [2, 3, 1]
	     */
                    function sampleSize(collection, n) {
                        var index = -1, result = toArray(collection), length = result.length, lastIndex = length - 1;
                        for (n = baseClamp(toInteger(n), 0, length); ++index < n; ) {
                            var rand = baseRandom(index, lastIndex), value = result[rand];
                            result[rand] = result[index], result[index] = value;
                        }
                        return result.length = n, result;
                    }
                    /**
	     * Creates an array of shuffled values, using a version of the
	     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4]);
	     * // => [4, 1, 3, 2]
	     */
                    function shuffle(collection) {
                        return sampleSize(collection, MAX_ARRAY_LENGTH);
                    }
                    /**
	     * Gets the size of `collection` by returning its length for array-like
	     * values or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to inspect.
	     * @returns {number} Returns the collection size.
	     * @example
	     *
	     * _.size([1, 2, 3]);
	     * // => 3
	     *
	     * _.size({ 'a': 1, 'b': 2 });
	     * // => 2
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
                    function size(collection) {
                        if (null == collection) return 0;
                        if (isArrayLike(collection)) {
                            var result = collection.length;
                            return result && isString(collection) ? stringSize(collection) : result;
                        }
                        return keys(collection).length;
                    }
                    /**
	     * Checks if `predicate` returns truthy for **any** element of `collection`.
	     * Iteration is stopped once `predicate` returns truthy. The predicate is
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': true },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.some(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.some(users, ['active', false]);
	     * // => true
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.some(users, 'active');
	     * // => true
	     */
                    function some(collection, predicate, guard) {
                        var func = isArray(collection) ? arraySome : baseSome;
                        return guard && isIterateeCall(collection, predicate, guard) && (predicate = undefined), 
                        func(collection, getIteratee(predicate, 3));
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * The opposite of `_.before`; this method creates a function that invokes
	     * `func` once it's called `n` or more times.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls before `func` is invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'done saving!' after the two async saves have completed
	     */
                    function after(n, func) {
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return n = toInteger(n), function() {
                            return --n < 1 ? func.apply(this, arguments) : void 0;
                        };
                    }
                    /**
	     * Creates a function that accepts up to `n` arguments, ignoring any
	     * additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @param {number} [n=func.length] The arity cap.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	     * // => [6, 8, 10]
	     */
                    function ary(func, n, guard) {
                        return n = guard ? undefined : n, n = func && null == n ? func.length : n, createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
                    }
                    /**
	     * Creates a function that invokes `func`, with the `this` binding and arguments
	     * of the created function, while it's called less than `n` times. Subsequent
	     * calls to the created function return the result of the last `func` invocation.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls at which `func` is no longer invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * jQuery(element).on('click', _.before(5, addContactToList));
	     * // => allows adding up to 4 contacts to the list
	     */
                    function before(n, func) {
                        var result;
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return n = toInteger(n), function() {
                            return --n > 0 && (result = func.apply(this, arguments)), 1 >= n && (func = undefined), 
                            result;
                        };
                    }
                    /**
	     * Creates a function that accepts arguments of `func` and either invokes
	     * `func` returning its result, if at least `arity` number of arguments have
	     * been provided, or returns a function that accepts the remaining `func`
	     * arguments, and so on. The arity of `func` may be specified if `func.length`
	     * is not sufficient.
	     *
	     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method doesn't set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curry(abc);
	     *
	     * curried(1)(2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // Curried with placeholders.
	     * curried(1)(_, 3)(2);
	     * // => [1, 2, 3]
	     */
                    function curry(func, arity, guard) {
                        arity = guard ? undefined : arity;
                        var result = createWrapper(func, CURRY_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
                        return result.placeholder = lodash.placeholder || curry.placeholder, result;
                    }
                    /**
	     * This method is like `_.curry` except that arguments are applied to `func`
	     * in the manner of `_.partialRight` instead of `_.partial`.
	     *
	     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method doesn't set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curryRight(abc);
	     *
	     * curried(3)(2)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(2, 3)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // Curried with placeholders.
	     * curried(3)(1, _)(2);
	     * // => [1, 2, 3]
	     */
                    function curryRight(func, arity, guard) {
                        arity = guard ? undefined : arity;
                        var result = createWrapper(func, CURRY_RIGHT_FLAG, undefined, undefined, undefined, undefined, undefined, arity);
                        return result.placeholder = lodash.placeholder || curryRight.placeholder, result;
                    }
                    /**
	     * Creates a debounced function that delays invoking `func` until after `wait`
	     * milliseconds have elapsed since the last time the debounced function was
	     * invoked. The debounced function comes with a `cancel` method to cancel
	     * delayed `func` invocations and a `flush` method to immediately invoke them.
	     * Provide an options object to indicate whether `func` should be invoked on
	     * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	     * with the last arguments provided to the debounced function. Subsequent calls
	     * to the debounced function return the result of the last `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.debounce` and `_.throttle`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to debounce.
	     * @param {number} [wait=0] The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	     *  delayed before it's invoked.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // Avoid costly calculations while the window size is in flux.
	     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	     *
	     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	     * jQuery(element).on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * }));
	     *
	     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	     * var source = new EventSource('/stream');
	     * jQuery(source).on('message', debounced);
	     *
	     * // Cancel the trailing debounced invocation.
	     * jQuery(window).on('popstate', debounced.cancel);
	     */
                    function debounce(func, wait, options) {
                        function cancel() {
                            timeoutId && clearTimeout(timeoutId), maxTimeoutId && clearTimeout(maxTimeoutId), 
                            lastCalled = 0, args = maxTimeoutId = thisArg = timeoutId = trailingCall = undefined;
                        }
                        function complete(isCalled, id) {
                            id && clearTimeout(id), maxTimeoutId = timeoutId = trailingCall = undefined, isCalled && (lastCalled = now(), 
                            result = func.apply(thisArg, args), timeoutId || maxTimeoutId || (args = thisArg = undefined));
                        }
                        function delayed() {
                            var remaining = wait - (now() - stamp);
                            0 >= remaining || remaining > wait ? complete(trailingCall, maxTimeoutId) : timeoutId = setTimeout(delayed, remaining);
                        }
                        function flush() {
                            return (timeoutId && trailingCall || maxTimeoutId && trailing) && (result = func.apply(thisArg, args)), 
                            cancel(), result;
                        }
                        function maxDelayed() {
                            complete(trailing, timeoutId);
                        }
                        function debounced() {
                            if (args = arguments, stamp = now(), thisArg = this, trailingCall = trailing && (timeoutId || !leading), 
                            maxWait === !1) var leadingCall = leading && !timeoutId; else {
                                lastCalled || maxTimeoutId || leading || (lastCalled = stamp);
                                var remaining = maxWait - (stamp - lastCalled), isCalled = 0 >= remaining || remaining > maxWait;
                                isCalled ? (maxTimeoutId && (maxTimeoutId = clearTimeout(maxTimeoutId)), lastCalled = stamp, 
                                result = func.apply(thisArg, args)) : maxTimeoutId || (maxTimeoutId = setTimeout(maxDelayed, remaining));
                            }
                            return isCalled && timeoutId ? timeoutId = clearTimeout(timeoutId) : timeoutId || wait === maxWait || (timeoutId = setTimeout(delayed, wait)), 
                            leadingCall && (isCalled = !0, result = func.apply(thisArg, args)), !isCalled || timeoutId || maxTimeoutId || (args = thisArg = undefined), 
                            result;
                        }
                        var args, maxTimeoutId, result, stamp, thisArg, timeoutId, trailingCall, lastCalled = 0, leading = !1, maxWait = !1, trailing = !0;
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return wait = toNumber(wait) || 0, isObject(options) && (leading = !!options.leading, 
                        maxWait = "maxWait" in options && nativeMax(toNumber(options.maxWait) || 0, wait), 
                        trailing = "trailing" in options ? !!options.trailing : trailing), debounced.cancel = cancel, 
                        debounced.flush = flush, debounced;
                    }
                    /**
	     * Creates a function that invokes `func` with arguments reversed.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to flip arguments for.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var flipped = _.flip(function() {
	     *   return _.toArray(arguments);
	     * });
	     *
	     * flipped('a', 'b', 'c', 'd');
	     * // => ['d', 'c', 'b', 'a']
	     */
                    function flip(func) {
                        return createWrapper(func, FLIP_FLAG);
                    }
                    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it determines the cache key for storing the result based on the
	     * arguments provided to the memoized function. By default, the first argument
	     * provided to the memoized function is used as the map cache key. The `func`
	     * is invoked with the `this` binding of the memoized function.
	     *
	     * **Note:** The cache is exposed as the `cache` property on the memoized
	     * function. Its creation may be customized by replacing the `_.memoize.Cache`
	     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	     * method interface of `delete`, `get`, `has`, and `set`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] The function to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2 };
	     * var other = { 'c': 3, 'd': 4 };
	     *
	     * var values = _.memoize(_.values);
	     * values(object);
	     * // => [1, 2]
	     *
	     * values(other);
	     * // => [3, 4]
	     *
	     * object.a = 2;
	     * values(object);
	     * // => [1, 2]
	     *
	     * // Modify the result cache.
	     * values.cache.set(object, ['a', 'b']);
	     * values(object);
	     * // => ['a', 'b']
	     *
	     * // Replace `_.memoize.Cache`.
	     * _.memoize.Cache = WeakMap;
	     */
                    function memoize(func, resolver) {
                        if ("function" != typeof func || resolver && "function" != typeof resolver) throw new TypeError(FUNC_ERROR_TEXT);
                        var memoized = function() {
                            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
                            if (cache.has(key)) return cache.get(key);
                            var result = func.apply(this, args);
                            return memoized.cache = cache.set(key, result), result;
                        };
                        return memoized.cache = new memoize.Cache(), memoized;
                    }
                    /**
	     * Creates a function that negates the result of the predicate `func`. The
	     * `func` predicate is invoked with the `this` binding and arguments of the
	     * created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} predicate The predicate to negate.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function isEven(n) {
	     *   return n % 2 == 0;
	     * }
	     *
	     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	     * // => [1, 3, 5]
	     */
                    function negate(predicate) {
                        if ("function" != typeof predicate) throw new TypeError(FUNC_ERROR_TEXT);
                        return function() {
                            return !predicate.apply(this, arguments);
                        };
                    }
                    /**
	     * Creates a function that is restricted to invoking `func` once. Repeat calls
	     * to the function return the value of the first invocation. The `func` is
	     * invoked with the `this` binding and arguments of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` invokes `createApplication` once
	     */
                    function once(func) {
                        return before(2, func);
                    }
                    /**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * created function and arguments from `start` and beyond provided as an array.
	     *
	     * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.rest(function(what, names) {
	     *   return what + ' ' + _.initial(names).join(', ') +
	     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	     * });
	     *
	     * say('hello', 'fred', 'barney', 'pebbles');
	     * // => 'hello fred, barney, & pebbles'
	     */
                    function rest(func, start) {
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return start = nativeMax(start === undefined ? func.length - 1 : toInteger(start), 0), 
                        function() {
                            for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length); ++index < length; ) array[index] = args[start + index];
                            switch (start) {
                              case 0:
                                return func.call(this, array);

                              case 1:
                                return func.call(this, args[0], array);

                              case 2:
                                return func.call(this, args[0], args[1], array);
                            }
                            var otherArgs = Array(start + 1);
                            for (index = -1; ++index < start; ) otherArgs[index] = args[index];
                            return otherArgs[start] = array, apply(func, this, otherArgs);
                        };
                    }
                    /**
	     * Creates a function that invokes `func` with the `this` binding of the created
	     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
	     *
	     * **Note:** This method is based on the [spread operator](https://mdn.io/spread_operator).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to spread arguments over.
	     * @param {number} [start=0] The start position of the spread.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.spread(function(who, what) {
	     *   return who + ' says ' + what;
	     * });
	     *
	     * say(['fred', 'hello']);
	     * // => 'fred says hello'
	     *
	     * var numbers = Promise.all([
	     *   Promise.resolve(40),
	     *   Promise.resolve(36)
	     * ]);
	     *
	     * numbers.then(_.spread(function(x, y) {
	     *   return x + y;
	     * }));
	     * // => a Promise of 76
	     */
                    function spread(func, start) {
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return start = start === undefined ? 0 : nativeMax(toInteger(start), 0), rest(function(args) {
                            var array = args[start], otherArgs = args.slice(0, start);
                            return array && arrayPush(otherArgs, array), apply(func, this, otherArgs);
                        });
                    }
                    /**
	     * Creates a throttled function that only invokes `func` at most once per
	     * every `wait` milliseconds. The throttled function comes with a `cancel`
	     * method to cancel delayed `func` invocations and a `flush` method to
	     * immediately invoke them. Provide an options object to indicate whether
	     * `func` should be invoked on the leading and/or trailing edge of the `wait`
	     * timeout. The `func` is invoked with the last arguments provided to the
	     * throttled function. Subsequent calls to the throttled function return the
	     * result of the last `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.throttle` and `_.debounce`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to throttle.
	     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // Avoid excessively updating the position while scrolling.
	     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	     *
	     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	     * jQuery(element).on('click', throttled);
	     *
	     * // Cancel the trailing throttled invocation.
	     * jQuery(window).on('popstate', throttled.cancel);
	     */
                    function throttle(func, wait, options) {
                        var leading = !0, trailing = !0;
                        if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
                        return isObject(options) && (leading = "leading" in options ? !!options.leading : leading, 
                        trailing = "trailing" in options ? !!options.trailing : trailing), debounce(func, wait, {
                            leading: leading,
                            maxWait: wait,
                            trailing: trailing
                        });
                    }
                    /**
	     * Creates a function that accepts up to one argument, ignoring any
	     * additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.unary(parseInt));
	     * // => [6, 8, 10]
	     */
                    function unary(func) {
                        return ary(func, 1);
                    }
                    /**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Any additional arguments provided to the function are
	     * appended to those provided to the wrapper function. The wrapper is invoked
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('fred, barney, & pebbles');
	     * // => '<p>fred, barney, &amp; pebbles</p>'
	     */
                    function wrap(value, wrapper) {
                        return wrapper = null == wrapper ? identity : wrapper, partial(wrapper, value);
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Creates a shallow clone of `value`.
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
	     * and supports cloning arrays, array buffers, booleans, date objects, maps,
	     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
	     * arrays. The own enumerable properties of `arguments` objects are cloned
	     * as plain objects. An empty object is returned for uncloneable values such
	     * as error objects, functions, DOM nodes, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var objects = [{ 'a': 1 }, { 'b': 2 }];
	     *
	     * var shallow = _.clone(objects);
	     * console.log(shallow[0] === objects[0]);
	     * // => true
	     */
                    function clone(value) {
                        return baseClone(value);
                    }
                    /**
	     * This method is like `_.clone` except that it accepts `customizer` which
	     * is invoked to produce the cloned value. If `customizer` returns `undefined`
	     * cloning is handled by the method instead. The `customizer` is invoked with
	     * up to four arguments; (value [, index|key, object, stack]).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @param {Function} [customizer] The function to customize cloning.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * function customizer(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(false);
	     *   }
	     * }
	     *
	     * var el = _.cloneWith(document.body, customizer);
	     *
	     * console.log(el === document.body);
	     * // => false
	     * console.log(el.nodeName);
	     * // => 'BODY'
	     * console.log(el.childNodes.length);
	     * // => 0
	     */
                    function cloneWith(value, customizer) {
                        return baseClone(value, !1, customizer);
                    }
                    /**
	     * This method is like `_.clone` except that it recursively clones `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to recursively clone.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var objects = [{ 'a': 1 }, { 'b': 2 }];
	     *
	     * var deep = _.cloneDeep(objects);
	     * console.log(deep[0] === objects[0]);
	     * // => false
	     */
                    function cloneDeep(value) {
                        return baseClone(value, !0);
                    }
                    /**
	     * This method is like `_.cloneWith` except that it recursively clones `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to recursively clone.
	     * @param {Function} [customizer] The function to customize cloning.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * function customizer(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(true);
	     *   }
	     * }
	     *
	     * var el = _.cloneDeepWith(document.body, customizer);
	     *
	     * console.log(el === document.body);
	     * // => false
	     * console.log(el.nodeName);
	     * // => 'BODY'
	     * console.log(el.childNodes.length);
	     * // => 20
	     */
                    function cloneDeepWith(value, customizer) {
                        return baseClone(value, !0, customizer);
                    }
                    /**
	     * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * comparison between two values to determine if they are equivalent.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'fred' };
	     *
	     * _.eq(object, object);
	     * // => true
	     *
	     * _.eq(object, other);
	     * // => false
	     *
	     * _.eq('a', 'a');
	     * // => true
	     *
	     * _.eq('a', Object('a'));
	     * // => false
	     *
	     * _.eq(NaN, NaN);
	     * // => true
	     */
                    function eq(value, other) {
                        return value === other || value !== value && other !== other;
                    }
                    /**
	     * Checks if `value` is greater than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
	     * @example
	     *
	     * _.gt(3, 1);
	     * // => true
	     *
	     * _.gt(3, 3);
	     * // => false
	     *
	     * _.gt(1, 3);
	     * // => false
	     */
                    function gt(value, other) {
                        return value > other;
                    }
                    /**
	     * Checks if `value` is greater than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.gte(3, 1);
	     * // => true
	     *
	     * _.gte(3, 3);
	     * // => true
	     *
	     * _.gte(1, 3);
	     * // => false
	     */
                    function gte(value, other) {
                        return value >= other;
                    }
                    /**
	     * Checks if `value` is likely an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArguments(function() { return arguments; }());
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
                    function isArguments(value) {
                        // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
                        return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
                    }
                    /**
	     * Checks if `value` is classified as an `ArrayBuffer` object.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArrayBuffer(new ArrayBuffer(2));
	     * // => true
	     *
	     * _.isArrayBuffer(new Array(2));
	     * // => false
	     */
                    function isArrayBuffer(value) {
                        return isObjectLike(value) && objectToString.call(value) == arrayBufferTag;
                    }
                    /**
	     * Checks if `value` is array-like. A value is considered array-like if it's
	     * not a function and has a `value.length` that's an integer greater than or
	     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	     * @example
	     *
	     * _.isArrayLike([1, 2, 3]);
	     * // => true
	     *
	     * _.isArrayLike(document.body.children);
	     * // => true
	     *
	     * _.isArrayLike('abc');
	     * // => true
	     *
	     * _.isArrayLike(_.noop);
	     * // => false
	     */
                    function isArrayLike(value) {
                        return null != value && !("function" == typeof value && isFunction(value)) && isLength(getLength(value));
                    }
                    /**
	     * This method is like `_.isArrayLike` except that it also checks if `value`
	     * is an object.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	     * @example
	     *
	     * _.isArrayLikeObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isArrayLikeObject(document.body.children);
	     * // => true
	     *
	     * _.isArrayLikeObject('abc');
	     * // => false
	     *
	     * _.isArrayLikeObject(_.noop);
	     * // => false
	     */
                    function isArrayLikeObject(value) {
                        return isObjectLike(value) && isArrayLike(value);
                    }
                    /**
	     * Checks if `value` is classified as a boolean primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isBoolean(false);
	     * // => true
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
                    function isBoolean(value) {
                        return value === !0 || value === !1 || isObjectLike(value) && objectToString.call(value) == boolTag;
                    }
                    /**
	     * Checks if `value` is classified as a `Date` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     *
	     * _.isDate('Mon April 23 2012');
	     * // => false
	     */
                    function isDate(value) {
                        return isObjectLike(value) && objectToString.call(value) == dateTag;
                    }
                    /**
	     * Checks if `value` is likely a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     *
	     * _.isElement('<body>');
	     * // => false
	     */
                    function isElement(value) {
                        return !!value && 1 === value.nodeType && isObjectLike(value) && !isPlainObject(value);
                    }
                    /**
	     * Checks if `value` is empty. A value is considered empty unless it's an
	     * `arguments` object, array, string, or jQuery-like collection with a length
	     * greater than `0` or an object with own enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty(null);
	     * // => true
	     *
	     * _.isEmpty(true);
	     * // => true
	     *
	     * _.isEmpty(1);
	     * // => true
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({ 'a': 1 });
	     * // => false
	     */
                    function isEmpty(value) {
                        if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value))) return !value.length;
                        for (var key in value) if (hasOwnProperty.call(value, key)) return !1;
                        return !0;
                    }
                    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent.
	     *
	     * **Note:** This method supports comparing arrays, array buffers, booleans,
	     * date objects, error objects, maps, numbers, `Object` objects, regexes,
	     * sets, strings, symbols, and typed arrays. `Object` objects are compared
	     * by their own, not inherited, enumerable properties. Functions and DOM
	     * nodes are **not** supported.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'fred' };
	     *
	     * _.isEqual(object, other);
	     * // => true
	     *
	     * object === other;
	     * // => false
	     */
                    function isEqual(value, other) {
                        return baseIsEqual(value, other);
                    }
                    /**
	     * This method is like `_.isEqual` except that it accepts `customizer` which is
	     * invoked to compare values. If `customizer` returns `undefined` comparisons are
	     * handled by the method instead. The `customizer` is invoked with up to six arguments:
	     * (objValue, othValue [, index|key, object, other, stack]).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * function isGreeting(value) {
	     *   return /^h(?:i|ello)$/.test(value);
	     * }
	     *
	     * function customizer(objValue, othValue) {
	     *   if (isGreeting(objValue) && isGreeting(othValue)) {
	     *     return true;
	     *   }
	     * }
	     *
	     * var array = ['hello', 'goodbye'];
	     * var other = ['hi', 'goodbye'];
	     *
	     * _.isEqualWith(array, other, customizer);
	     * // => true
	     */
                    function isEqualWith(value, other, customizer) {
                        customizer = "function" == typeof customizer ? customizer : undefined;
                        var result = customizer ? customizer(value, other) : undefined;
                        return result === undefined ? baseIsEqual(value, other, customizer) : !!result;
                    }
                    /**
	     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	     * `SyntaxError`, `TypeError`, or `URIError` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	     * @example
	     *
	     * _.isError(new Error);
	     * // => true
	     *
	     * _.isError(Error);
	     * // => false
	     */
                    function isError(value) {
                        return isObjectLike(value) && "string" == typeof value.message && objectToString.call(value) == errorTag;
                    }
                    /**
	     * Checks if `value` is a finite primitive number.
	     *
	     * **Note:** This method is based on [`Number.isFinite`](https://mdn.io/Number/isFinite).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	     * @example
	     *
	     * _.isFinite(3);
	     * // => true
	     *
	     * _.isFinite(Number.MAX_VALUE);
	     * // => true
	     *
	     * _.isFinite(3.14);
	     * // => true
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */
                    function isFinite(value) {
                        return "number" == typeof value && nativeIsFinite(value);
                    }
                    /**
	     * Checks if `value` is classified as a `Function` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     *
	     * _.isFunction(/abc/);
	     * // => false
	     */
                    function isFunction(value) {
                        // The use of `Object#toString` avoids issues with the `typeof` operator
                        // in Safari 8 which returns 'object' for typed array constructors, and
                        // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
                        var tag = isObject(value) ? objectToString.call(value) : "";
                        return tag == funcTag || tag == genTag;
                    }
                    /**
	     * Checks if `value` is an integer.
	     *
	     * **Note:** This method is based on [`Number.isInteger`](https://mdn.io/Number/isInteger).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
	     * @example
	     *
	     * _.isInteger(3);
	     * // => true
	     *
	     * _.isInteger(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isInteger(Infinity);
	     * // => false
	     *
	     * _.isInteger('3');
	     * // => false
	     */
                    function isInteger(value) {
                        return "number" == typeof value && value == toInteger(value);
                    }
                    /**
	     * Checks if `value` is a valid array-like length.
	     *
	     * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	     * @example
	     *
	     * _.isLength(3);
	     * // => true
	     *
	     * _.isLength(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isLength(Infinity);
	     * // => false
	     *
	     * _.isLength('3');
	     * // => false
	     */
                    function isLength(value) {
                        return "number" == typeof value && value > -1 && value % 1 == 0 && MAX_SAFE_INTEGER >= value;
                    }
                    /**
	     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(_.noop);
	     * // => true
	     *
	     * _.isObject(null);
	     * // => false
	     */
                    function isObject(value) {
                        var type = typeof value;
                        return !!value && ("object" == type || "function" == type);
                    }
                    /**
	     * Checks if `value` is object-like. A value is object-like if it's not `null`
	     * and has a `typeof` result of "object".
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	     * @example
	     *
	     * _.isObjectLike({});
	     * // => true
	     *
	     * _.isObjectLike([1, 2, 3]);
	     * // => true
	     *
	     * _.isObjectLike(_.noop);
	     * // => false
	     *
	     * _.isObjectLike(null);
	     * // => false
	     */
                    function isObjectLike(value) {
                        return !!value && "object" == typeof value;
                    }
                    /**
	     * Checks if `value` is classified as a `Map` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isMap(new Map);
	     * // => true
	     *
	     * _.isMap(new WeakMap);
	     * // => false
	     */
                    function isMap(value) {
                        return isObjectLike(value) && getTag(value) == mapTag;
                    }
                    /**
	     * Performs a deep comparison between `object` and `source` to determine if
	     * `object` contains equivalent property values.
	     *
	     * **Note:** This method supports comparing the same values as `_.isEqual`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.isMatch(object, { 'age': 40 });
	     * // => true
	     *
	     * _.isMatch(object, { 'age': 36 });
	     * // => false
	     */
                    function isMatch(object, source) {
                        return object === source || baseIsMatch(object, source, getMatchData(source));
                    }
                    /**
	     * This method is like `_.isMatch` except that it accepts `customizer` which
	     * is invoked to compare values. If `customizer` returns `undefined` comparisons
	     * are handled by the method instead. The `customizer` is invoked with five
	     * arguments: (objValue, srcValue, index|key, object, source).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Function} [customizer] The function to customize comparisons.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * function isGreeting(value) {
	     *   return /^h(?:i|ello)$/.test(value);
	     * }
	     *
	     * function customizer(objValue, srcValue) {
	     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
	     *     return true;
	     *   }
	     * }
	     *
	     * var object = { 'greeting': 'hello' };
	     * var source = { 'greeting': 'hi' };
	     *
	     * _.isMatchWith(object, source, customizer);
	     * // => true
	     */
                    function isMatchWith(object, source, customizer) {
                        return customizer = "function" == typeof customizer ? customizer : undefined, baseIsMatch(object, source, getMatchData(source), customizer);
                    }
                    /**
	     * Checks if `value` is `NaN`.
	     *
	     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
	     * which returns `true` for `undefined` and other non-numeric values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
                    function isNaN(value) {
                        // An `NaN` primitive is the only value that is not equal to itself.
                        // Perform the `toStringTag` check first to avoid errors with some ActiveX objects in IE.
                        return isNumber(value) && value != +value;
                    }
                    /**
	     * Checks if `value` is a native function.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	     * @example
	     *
	     * _.isNative(Array.prototype.push);
	     * // => true
	     *
	     * _.isNative(_);
	     * // => false
	     */
                    function isNative(value) {
                        return null == value ? !1 : isFunction(value) ? reIsNative.test(funcToString.call(value)) : isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
                    }
                    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(void 0);
	     * // => false
	     */
                    function isNull(value) {
                        return null === value;
                    }
                    /**
	     * Checks if `value` is `null` or `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
	     * @example
	     *
	     * _.isNil(null);
	     * // => true
	     *
	     * _.isNil(void 0);
	     * // => true
	     *
	     * _.isNil(NaN);
	     * // => false
	     */
                    function isNil(value) {
                        return null == value;
                    }
                    /**
	     * Checks if `value` is classified as a `Number` primitive or object.
	     *
	     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	     * as numbers, use the `_.isFinite` method.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isNumber(3);
	     * // => true
	     *
	     * _.isNumber(Number.MIN_VALUE);
	     * // => true
	     *
	     * _.isNumber(Infinity);
	     * // => true
	     *
	     * _.isNumber('3');
	     * // => false
	     */
                    function isNumber(value) {
                        return "number" == typeof value || isObjectLike(value) && objectToString.call(value) == numberTag;
                    }
                    /**
	     * Checks if `value` is a plain object, that is, an object created by the
	     * `Object` constructor or one with a `[[Prototype]]` of `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     * }
	     *
	     * _.isPlainObject(new Foo);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     *
	     * _.isPlainObject(Object.create(null));
	     * // => true
	     */
                    function isPlainObject(value) {
                        if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) return !1;
                        var proto = objectProto;
                        if ("function" == typeof value.constructor && (proto = getPrototypeOf(value)), null === proto) return !0;
                        var Ctor = proto.constructor;
                        return "function" == typeof Ctor && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
                    }
                    /**
	     * Checks if `value` is classified as a `RegExp` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isRegExp(/abc/);
	     * // => true
	     *
	     * _.isRegExp('/abc/');
	     * // => false
	     */
                    function isRegExp(value) {
                        return isObject(value) && objectToString.call(value) == regexpTag;
                    }
                    /**
	     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
	     * double precision number which isn't the result of a rounded unsafe integer.
	     *
	     * **Note:** This method is based on [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
	     * @example
	     *
	     * _.isSafeInteger(3);
	     * // => true
	     *
	     * _.isSafeInteger(Number.MIN_VALUE);
	     * // => false
	     *
	     * _.isSafeInteger(Infinity);
	     * // => false
	     *
	     * _.isSafeInteger('3');
	     * // => false
	     */
                    function isSafeInteger(value) {
                        return isInteger(value) && value >= -MAX_SAFE_INTEGER && MAX_SAFE_INTEGER >= value;
                    }
                    /**
	     * Checks if `value` is classified as a `Set` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isSet(new Set);
	     * // => true
	     *
	     * _.isSet(new WeakSet);
	     * // => false
	     */
                    function isSet(value) {
                        return isObjectLike(value) && getTag(value) == setTag;
                    }
                    /**
	     * Checks if `value` is classified as a `String` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isString('abc');
	     * // => true
	     *
	     * _.isString(1);
	     * // => false
	     */
                    function isString(value) {
                        return "string" == typeof value || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
                    }
                    /**
	     * Checks if `value` is classified as a `Symbol` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isSymbol(Symbol.iterator);
	     * // => true
	     *
	     * _.isSymbol('abc');
	     * // => false
	     */
                    function isSymbol(value) {
                        return "symbol" == typeof value || isObjectLike(value) && objectToString.call(value) == symbolTag;
                    }
                    /**
	     * Checks if `value` is classified as a typed array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isTypedArray(new Uint8Array);
	     * // => true
	     *
	     * _.isTypedArray([]);
	     * // => false
	     */
                    function isTypedArray(value) {
                        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
                    }
                    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     *
	     * _.isUndefined(null);
	     * // => false
	     */
                    function isUndefined(value) {
                        return value === undefined;
                    }
                    /**
	     * Checks if `value` is classified as a `WeakMap` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isWeakMap(new WeakMap);
	     * // => true
	     *
	     * _.isWeakMap(new Map);
	     * // => false
	     */
                    function isWeakMap(value) {
                        return isObjectLike(value) && getTag(value) == weakMapTag;
                    }
                    /**
	     * Checks if `value` is classified as a `WeakSet` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isWeakSet(new WeakSet);
	     * // => true
	     *
	     * _.isWeakSet(new Set);
	     * // => false
	     */
                    function isWeakSet(value) {
                        return isObjectLike(value) && objectToString.call(value) == weakSetTag;
                    }
                    /**
	     * Checks if `value` is less than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
	     * @example
	     *
	     * _.lt(1, 3);
	     * // => true
	     *
	     * _.lt(3, 3);
	     * // => false
	     *
	     * _.lt(3, 1);
	     * // => false
	     */
                    function lt(value, other) {
                        return other > value;
                    }
                    /**
	     * Checks if `value` is less than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.lte(1, 3);
	     * // => true
	     *
	     * _.lte(3, 3);
	     * // => true
	     *
	     * _.lte(3, 1);
	     * // => false
	     */
                    function lte(value, other) {
                        return other >= value;
                    }
                    /**
	     * Converts `value` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the converted array.
	     * @example
	     *
	     * _.toArray({ 'a': 1, 'b': 2 });
	     * // => [1, 2]
	     *
	     * _.toArray('abc');
	     * // => ['a', 'b', 'c']
	     *
	     * _.toArray(1);
	     * // => []
	     *
	     * _.toArray(null);
	     * // => []
	     */
                    function toArray(value) {
                        if (!value) return [];
                        if (isArrayLike(value)) return isString(value) ? stringToArray(value) : copyArray(value);
                        if (iteratorSymbol && value[iteratorSymbol]) return iteratorToArray(value[iteratorSymbol]());
                        var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
                        return func(value);
                    }
                    /**
	     * Converts `value` to an integer.
	     *
	     * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toInteger(3);
	     * // => 3
	     *
	     * _.toInteger(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toInteger(Infinity);
	     * // => 1.7976931348623157e+308
	     *
	     * _.toInteger('3');
	     * // => 3
	     */
                    function toInteger(value) {
                        if (!value) return 0 === value ? value : 0;
                        if (value = toNumber(value), value === INFINITY || value === -INFINITY) {
                            var sign = 0 > value ? -1 : 1;
                            return sign * MAX_INTEGER;
                        }
                        var remainder = value % 1;
                        return value === value ? remainder ? value - remainder : value : 0;
                    }
                    /**
	     * Converts `value` to an integer suitable for use as the length of an
	     * array-like object.
	     *
	     * **Note:** This method is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toLength(3);
	     * // => 3
	     *
	     * _.toLength(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toLength(Infinity);
	     * // => 4294967295
	     *
	     * _.toLength('3');
	     * // => 3
	     */
                    function toLength(value) {
                        return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
                    }
                    /**
	     * Converts `value` to a number.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to process.
	     * @returns {number} Returns the number.
	     * @example
	     *
	     * _.toNumber(3);
	     * // => 3
	     *
	     * _.toNumber(Number.MIN_VALUE);
	     * // => 5e-324
	     *
	     * _.toNumber(Infinity);
	     * // => Infinity
	     *
	     * _.toNumber('3');
	     * // => 3
	     */
                    function toNumber(value) {
                        if (isObject(value)) {
                            var other = isFunction(value.valueOf) ? value.valueOf() : value;
                            value = isObject(other) ? other + "" : other;
                        }
                        if ("string" != typeof value) return 0 === value ? value : +value;
                        value = value.replace(reTrim, "");
                        var isBinary = reIsBinary.test(value);
                        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
                    }
                    /**
	     * Converts `value` to a plain object flattening inherited enumerable
	     * properties of `value` to own properties of the plain object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Object} Returns the converted plain object.
	     * @example
	     *
	     * function Foo() {
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.assign({ 'a': 1 }, new Foo);
	     * // => { 'a': 1, 'b': 2 }
	     *
	     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	     * // => { 'a': 1, 'b': 2, 'c': 3 }
	     */
                    function toPlainObject(value) {
                        return copyObject(value, keysIn(value));
                    }
                    /**
	     * Converts `value` to a safe integer. A safe integer can be compared and
	     * represented correctly.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.toSafeInteger(3);
	     * // => 3
	     *
	     * _.toSafeInteger(Number.MIN_VALUE);
	     * // => 0
	     *
	     * _.toSafeInteger(Infinity);
	     * // => 9007199254740991
	     *
	     * _.toSafeInteger('3');
	     * // => 3
	     */
                    function toSafeInteger(value) {
                        return baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
                    }
                    /**
	     * Converts `value` to a string if it's not one. An empty string is returned
	     * for `null` and `undefined` values. The sign of `-0` is preserved.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to process.
	     * @returns {string} Returns the string.
	     * @example
	     *
	     * _.toString(null);
	     * // => ''
	     *
	     * _.toString(-0);
	     * // => '-0'
	     *
	     * _.toString([1, 2, 3]);
	     * // => '1,2,3'
	     */
                    function toString(value) {
                        // Exit early for strings to avoid a performance hit in some environments.
                        if ("string" == typeof value) return value;
                        if (null == value) return "";
                        if (isSymbol(value)) return Symbol ? symbolToString.call(value) : "";
                        var result = value + "";
                        return "0" == result && 1 / value == -INFINITY ? "-0" : result;
                    }
                    /**
	     * Creates an object that inherits from the `prototype` object. If a `properties`
	     * object is given its own enumerable properties are assigned to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, {
	     *   'constructor': Circle
	     * });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
                    function create(prototype, properties) {
                        var result = baseCreate(prototype);
                        return properties ? baseAssign(result, properties) : result;
                    }
                    /**
	     * This method is like `_.find` except that it returns the key of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findKey(users, function(o) { return o.age < 40; });
	     * // => 'barney' (iteration order is not guaranteed)
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findKey(users, { 'age': 1, 'active': true });
	     * // => 'pebbles'
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findKey(users, ['active', false]);
	     * // => 'fred'
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findKey(users, 'active');
	     * // => 'barney'
	     */
                    function findKey(object, predicate) {
                        return baseFind(object, getIteratee(predicate, 3), baseForOwn, !0);
                    }
                    /**
	     * This method is like `_.findKey` except that it iterates over elements of
	     * a collection in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findLastKey(users, function(o) { return o.age < 40; });
	     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
	     *
	     * // The `_.matches` iteratee shorthand.
	     * _.findLastKey(users, { 'age': 36, 'active': true });
	     * // => 'barney'
	     *
	     * // The `_.matchesProperty` iteratee shorthand.
	     * _.findLastKey(users, ['active', false]);
	     * // => 'fred'
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.findLastKey(users, 'active');
	     * // => 'pebbles'
	     */
                    function findLastKey(object, predicate) {
                        return baseFind(object, getIteratee(predicate, 3), baseForOwnRight, !0);
                    }
                    /**
	     * Iterates over own and inherited enumerable properties of an object invoking
	     * `iteratee` for each property. The iteratee is invoked with three arguments:
	     * (value, key, object). Iteratee functions may exit iteration early by explicitly
	     * returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forIn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a', 'b', then 'c' (iteration order is not guaranteed)
	     */
                    function forIn(object, iteratee) {
                        return null == object ? object : baseFor(object, toFunction(iteratee), keysIn);
                    }
                    /**
	     * This method is like `_.forIn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forInRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'
	     */
                    function forInRight(object, iteratee) {
                        return null == object ? object : baseForRight(object, toFunction(iteratee), keysIn);
                    }
                    /**
	     * Iterates over own enumerable properties of an object invoking `iteratee`
	     * for each property. The iteratee is invoked with three arguments:
	     * (value, key, object). Iteratee functions may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a' then 'b' (iteration order is not guaranteed)
	     */
                    function forOwn(object, iteratee) {
                        return object && baseForOwn(object, toFunction(iteratee));
                    }
                    /**
	     * This method is like `_.forOwn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwnRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'
	     */
                    function forOwnRight(object, iteratee) {
                        return object && baseForOwnRight(object, toFunction(iteratee));
                    }
                    /**
	     * Creates an array of function property names from own enumerable properties
	     * of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the new array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = _.constant('a');
	     *   this.b = _.constant('b');
	     * }
	     *
	     * Foo.prototype.c = _.constant('c');
	     *
	     * _.functions(new Foo);
	     * // => ['a', 'b']
	     */
                    function functions(object) {
                        return null == object ? [] : baseFunctions(object, keys(object));
                    }
                    /**
	     * Creates an array of function property names from own and inherited
	     * enumerable properties of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the new array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = _.constant('a');
	     *   this.b = _.constant('b');
	     * }
	     *
	     * Foo.prototype.c = _.constant('c');
	     *
	     * _.functionsIn(new Foo);
	     * // => ['a', 'b', 'c']
	     */
                    function functionsIn(object) {
                        return null == object ? [] : baseFunctions(object, keysIn(object));
                    }
                    /**
	     * Gets the value at `path` of `object`. If the resolved value is
	     * `undefined` the `defaultValue` is used in its place.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.get(object, 'a[0].b.c');
	     * // => 3
	     *
	     * _.get(object, ['a', '0', 'b', 'c']);
	     * // => 3
	     *
	     * _.get(object, 'a.b.c', 'default');
	     * // => 'default'
	     */
                    function get(object, path, defaultValue) {
                        var result = null == object ? undefined : baseGet(object, path);
                        return result === undefined ? defaultValue : result;
                    }
                    /**
	     * Checks if `path` is a direct property of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     * @example
	     *
	     * var object = { 'a': { 'b': { 'c': 3 } } };
	     * var other = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	     *
	     * _.has(object, 'a');
	     * // => true
	     *
	     * _.has(object, 'a.b.c');
	     * // => true
	     *
	     * _.has(object, ['a', 'b', 'c']);
	     * // => true
	     *
	     * _.has(other, 'a');
	     * // => false
	     */
                    function has(object, path) {
                        return hasPath(object, path, baseHas);
                    }
                    /**
	     * Checks if `path` is a direct or inherited property of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` exists, else `false`.
	     * @example
	     *
	     * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	     *
	     * _.hasIn(object, 'a');
	     * // => true
	     *
	     * _.hasIn(object, 'a.b.c');
	     * // => true
	     *
	     * _.hasIn(object, ['a', 'b', 'c']);
	     * // => true
	     *
	     * _.hasIn(object, 'b');
	     * // => false
	     */
                    function hasIn(object, path) {
                        return hasPath(object, path, baseHasIn);
                    }
                    /**
	     * Creates an array of the own enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects. See the
	     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keys(new Foo);
	     * // => ['a', 'b'] (iteration order is not guaranteed)
	     *
	     * _.keys('hi');
	     * // => ['0', '1']
	     */
                    function keys(object) {
                        var isProto = isPrototype(object);
                        if (!isProto && !isArrayLike(object)) return baseKeys(object);
                        var indexes = indexKeys(object), skipIndexes = !!indexes, result = indexes || [], length = result.length;
                        for (var key in object) !baseHas(object, key) || skipIndexes && ("length" == key || isIndex(key, length)) || isProto && "constructor" == key || result.push(key);
                        return result;
                    }
                    /**
	     * Creates an array of the own and inherited enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keysIn(new Foo);
	     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	     */
                    function keysIn(object) {
                        for (var index = -1, isProto = isPrototype(object), props = baseKeysIn(object), propsLength = props.length, indexes = indexKeys(object), skipIndexes = !!indexes, result = indexes || [], length = result.length; ++index < propsLength; ) {
                            var key = props[index];
                            skipIndexes && ("length" == key || isIndex(key, length)) || "constructor" == key && (isProto || !hasOwnProperty.call(object, key)) || result.push(key);
                        }
                        return result;
                    }
                    /**
	     * The opposite of `_.mapValues`; this method creates an object with the
	     * same values as `object` and keys generated by running each own enumerable
	     * property of `object` through `iteratee`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   return key + value;
	     * });
	     * // => { 'a1': 1, 'b2': 2 }
	     */
                    function mapKeys(object, iteratee) {
                        var result = {};
                        return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function(value, key, object) {
                            result[iteratee(value, key, object)] = value;
                        }), result;
                    }
                    /**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through `iteratee`. The
	     * iteratee function is invoked with three arguments: (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * var users = {
	     *   'fred':    { 'user': 'fred',    'age': 40 },
	     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	     * };
	     *
	     * _.mapValues(users, function(o) { return o.age; });
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.mapValues(users, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     */
                    function mapValues(object, iteratee) {
                        var result = {};
                        return iteratee = getIteratee(iteratee, 3), baseForOwn(object, function(value, key, object) {
                            result[key] = iteratee(value, key, object);
                        }), result;
                    }
                    /**
	     * The opposite of `_.pickBy`; this method creates an object composed of the
	     * own and inherited enumerable properties of `object` that `predicate`
	     * doesn't return truthy for.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per property.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': '2', 'c': 3 };
	     *
	     * _.omitBy(object, _.isNumber);
	     * // => { 'b': '2' }
	     */
                    function omitBy(object, predicate) {
                        return predicate = getIteratee(predicate, 2), basePickBy(object, function(value, key) {
                            return !predicate(value, key);
                        });
                    }
                    /**
	     * Creates an object composed of the `object` properties `predicate` returns
	     * truthy for. The predicate is invoked with two arguments: (value, key).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked per property.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': '2', 'c': 3 };
	     *
	     * _.pickBy(object, _.isNumber);
	     * // => { 'a': 1, 'c': 3 }
	     */
                    function pickBy(object, predicate) {
                        return null == object ? {} : basePickBy(object, getIteratee(predicate, 2));
                    }
                    /**
	     * This method is like `_.get` except that if the resolved value is a function
	     * it's invoked with the `this` binding of its parent object and its result
	     * is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to resolve.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	     *
	     * _.result(object, 'a[0].b.c1');
	     * // => 3
	     *
	     * _.result(object, 'a[0].b.c2');
	     * // => 4
	     *
	     * _.result(object, 'a[0].b.c3', 'default');
	     * // => 'default'
	     *
	     * _.result(object, 'a[0].b.c3', _.constant('default'));
	     * // => 'default'
	     */
                    function result(object, path, defaultValue) {
                        if (isKey(path, object)) result = null == object ? undefined : object[path]; else {
                            path = baseToPath(path);
                            var result = get(object, path);
                            object = parent(object, path);
                        }
                        return result === undefined && (result = defaultValue), isFunction(result) ? result.call(object) : result;
                    }
                    /**
	     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist
	     * it's created. Arrays are created for missing index properties while objects
	     * are created for all other missing properties. Use `_.setWith` to customize
	     * `path` creation.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.set(object, 'a[0].b.c', 4);
	     * console.log(object.a[0].b.c);
	     * // => 4
	     *
	     * _.set(object, 'x[0].y.z', 5);
	     * console.log(object.x[0].y.z);
	     * // => 5
	     */
                    function set(object, path, value) {
                        return null == object ? object : baseSet(object, path, value);
                    }
                    /**
	     * This method is like `_.set` except that it accepts `customizer` which is
	     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
	     * path creation is handled by the method instead. The `customizer` is invoked
	     * with three arguments: (nsValue, key, nsObject).
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.setWith({ '0': { 'length': 2 } }, '[0][1][2]', 3, Object);
	     * // => { '0': { '1': { '2': 3 }, 'length': 2 } }
	     */
                    function setWith(object, path, value, customizer) {
                        return customizer = "function" == typeof customizer ? customizer : undefined, null == object ? object : baseSet(object, path, value, customizer);
                    }
                    /**
	     * Creates an array of own enumerable key-value pairs for `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the new array of key-value pairs.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.toPairs(new Foo);
	     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	     */
                    function toPairs(object) {
                        return baseToPairs(object, keys(object));
                    }
                    /**
	     * Creates an array of own and inherited enumerable key-value pairs for `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the new array of key-value pairs.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.toPairsIn(new Foo);
	     * // => [['a', 1], ['b', 2], ['c', 1]] (iteration order is not guaranteed)
	     */
                    function toPairsIn(object) {
                        return baseToPairs(object, keysIn(object));
                    }
                    /**
	     * An alternative to `_.reduce`; this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own enumerable
	     * properties through `iteratee`, with each invocation potentially mutating
	     * the `accumulator` object. The iteratee is invoked with four arguments:
	     * (accumulator, value, key, object). Iteratee functions may exit iteration
	     * early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.transform([2, 3, 4], function(result, n) {
	     *   result.push(n *= n);
	     *   return n % 2 == 0;
	     * }, []);
	     * // => [4, 9]
	     *
	     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
	     *   (result[value] || (result[value] = [])).push(key);
	     * }, {});
	     * // => { '1': ['a', 'c'], '2': ['b'] }
	     */
                    function transform(object, iteratee, accumulator) {
                        var isArr = isArray(object) || isTypedArray(object);
                        if (iteratee = getIteratee(iteratee, 4), null == accumulator) if (isArr || isObject(object)) {
                            var Ctor = object.constructor;
                            accumulator = isArr ? isArray(object) ? new Ctor() : [] : baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
                        } else accumulator = {};
                        return (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
                            return iteratee(accumulator, value, index, object);
                        }), accumulator;
                    }
                    /**
	     * Removes the property at `path` of `object`.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to modify.
	     * @param {Array|string} path The path of the property to unset.
	     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
	     * _.unset(object, 'a[0].b.c');
	     * // => true
	     *
	     * console.log(object);
	     * // => { 'a': [{ 'b': {} }] };
	     *
	     * _.unset(object, 'a[0].b.c');
	     * // => true
	     *
	     * console.log(object);
	     * // => { 'a': [{ 'b': {} }] };
	     */
                    function unset(object, path) {
                        return null == object ? !0 : baseUnset(object, path);
                    }
                    /**
	     * Creates an array of the own enumerable property values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.values(new Foo);
	     * // => [1, 2] (iteration order is not guaranteed)
	     *
	     * _.values('hi');
	     * // => ['h', 'i']
	     */
                    function values(object) {
                        return object ? baseValues(object, keys(object)) : [];
                    }
                    /**
	     * Creates an array of the own and inherited enumerable property values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.valuesIn(new Foo);
	     * // => [1, 2, 3] (iteration order is not guaranteed)
	     */
                    function valuesIn(object) {
                        return null == object ? baseValues(object, keysIn(object)) : [];
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Clamps `number` within the inclusive `lower` and `upper` bounds.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} number The number to clamp.
	     * @param {number} [lower] The lower bound.
	     * @param {number} upper The upper bound.
	     * @returns {number} Returns the clamped number.
	     * @example
	     *
	     * _.clamp(-10, -5, 5);
	     * // => -5
	     *
	     * _.clamp(10, -5, 5);
	     * // => 5
	     */
                    function clamp(number, lower, upper) {
                        return upper === undefined && (upper = lower, lower = undefined), upper !== undefined && (upper = toNumber(upper), 
                        upper = upper === upper ? upper : 0), lower !== undefined && (lower = toNumber(lower), 
                        lower = lower === lower ? lower : 0), baseClamp(toNumber(number), lower, upper);
                    }
                    /**
	     * Checks if `n` is between `start` and up to but not including, `end`. If
	     * `end` is not specified it's set to `start` with `start` then set to `0`.
	     * If `start` is greater than `end` the params are swapped to support
	     * negative ranges.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} number The number to check.
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
	     * @example
	     *
	     * _.inRange(3, 2, 4);
	     * // => true
	     *
	     * _.inRange(4, 8);
	     * // => true
	     *
	     * _.inRange(4, 2);
	     * // => false
	     *
	     * _.inRange(2, 2);
	     * // => false
	     *
	     * _.inRange(1.2, 2);
	     * // => true
	     *
	     * _.inRange(5.2, 4);
	     * // => false
	     *
	     * _.inRange(-3, -2, -6);
	     * // => true
	     */
                    function inRange(number, start, end) {
                        return start = toNumber(start) || 0, end === undefined ? (end = start, start = 0) : end = toNumber(end) || 0, 
                        number = toNumber(number), baseInRange(number, start, end);
                    }
                    /**
	     * Produces a random number between the inclusive `lower` and `upper` bounds.
	     * If only one argument is provided a number between `0` and the given number
	     * is returned. If `floating` is `true`, or either `lower` or `upper` are floats,
	     * a floating-point number is returned instead of an integer.
	     *
	     * **Note:** JavaScript follows the IEEE-754 standard for resolving
	     * floating-point values which can produce unexpected results.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} [lower=0] The lower bound.
	     * @param {number} [upper=1] The upper bound.
	     * @param {boolean} [floating] Specify returning a floating-point number.
	     * @returns {number} Returns the random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
                    function random(lower, upper, floating) {
                        if (floating && "boolean" != typeof floating && isIterateeCall(lower, upper, floating) && (upper = floating = undefined), 
                        floating === undefined && ("boolean" == typeof upper ? (floating = upper, upper = undefined) : "boolean" == typeof lower && (floating = lower, 
                        lower = undefined)), lower === undefined && upper === undefined ? (lower = 0, upper = 1) : (lower = toNumber(lower) || 0, 
                        upper === undefined ? (upper = lower, lower = 0) : upper = toNumber(upper) || 0), 
                        lower > upper) {
                            var temp = lower;
                            lower = upper, upper = temp;
                        }
                        if (floating || lower % 1 || upper % 1) {
                            var rand = nativeRandom();
                            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
                        }
                        return baseRandom(lower, upper);
                    }
                    /**
	     * Converts the first character of `string` to upper case and the remaining
	     * to lower case.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to capitalize.
	     * @returns {string} Returns the capitalized string.
	     * @example
	     *
	     * _.capitalize('FRED');
	     * // => 'Fred'
	     */
                    function capitalize(string) {
                        return upperFirst(toString(string).toLowerCase());
                    }
                    /**
	     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to deburr.
	     * @returns {string} Returns the deburred string.
	     * @example
	     *
	     * _.deburr('déjà vu');
	     * // => 'deja vu'
	     */
                    function deburr(string) {
                        return string = toString(string), string && string.replace(reLatin1, deburrLetter).replace(reComboMark, "");
                    }
                    /**
	     * Checks if `string` ends with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=string.length] The position to search from.
	     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
	     * @example
	     *
	     * _.endsWith('abc', 'c');
	     * // => true
	     *
	     * _.endsWith('abc', 'b');
	     * // => false
	     *
	     * _.endsWith('abc', 'b', 2);
	     * // => true
	     */
                    function endsWith(string, target, position) {
                        string = toString(string), target = "string" == typeof target ? target : target + "";
                        var length = string.length;
                        return position = position === undefined ? length : baseClamp(toInteger(position), 0, length), 
                        position -= target.length, position >= 0 && string.indexOf(target, position) == position;
                    }
                    /**
	     * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
	     * their corresponding HTML entities.
	     *
	     * **Note:** No other characters are escaped. To escape additional
	     * characters use a third-party library like [_he_](https://mths.be/he).
	     *
	     * Though the ">" character is escaped for symmetry, characters like
	     * ">" and "/" don't need escaping in HTML and have no special meaning
	     * unless they're part of a tag or unquoted attribute value.
	     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	     * (under "semi-related fun fact") for more details.
	     *
	     * Backticks are escaped because in IE < 9, they can break out of
	     * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
	     * for more details.
	     *
	     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
	     * to reduce XSS vectors.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('fred, barney, & pebbles');
	     * // => 'fred, barney, &amp; pebbles'
	     */
                    function escape(string) {
                        return string = toString(string), string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
                    }
                    /**
	     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
	     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escapeRegExp('[lodash](https://lodash.com/)');
	     * // => '\[lodash\]\(https://lodash\.com/\)'
	     */
                    function escapeRegExp(string) {
                        return string = toString(string), string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
                    }
                    /**
	     * Pads `string` on the left and right sides if it's shorter than `length`.
	     * Padding characters are truncated if they can't be evenly divided by `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.pad('abc', 8);
	     * // => '  abc   '
	     *
	     * _.pad('abc', 8, '_-');
	     * // => '_-abc_-_'
	     *
	     * _.pad('abc', 3);
	     * // => 'abc'
	     */
                    function pad(string, length, chars) {
                        string = toString(string), length = toInteger(length);
                        var strLength = stringSize(string);
                        if (!length || strLength >= length) return string;
                        var mid = (length - strLength) / 2, leftLength = nativeFloor(mid), rightLength = nativeCeil(mid);
                        return createPadding("", leftLength, chars) + string + createPadding("", rightLength, chars);
                    }
                    /**
	     * Pads `string` on the right side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padEnd('abc', 6);
	     * // => 'abc   '
	     *
	     * _.padEnd('abc', 6, '_-');
	     * // => 'abc_-_'
	     *
	     * _.padEnd('abc', 3);
	     * // => 'abc'
	     */
                    function padEnd(string, length, chars) {
                        return string = toString(string), string + createPadding(string, length, chars);
                    }
                    /**
	     * Pads `string` on the left side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padStart('abc', 6);
	     * // => '   abc'
	     *
	     * _.padStart('abc', 6, '_-');
	     * // => '_-_abc'
	     *
	     * _.padStart('abc', 3);
	     * // => 'abc'
	     */
                    function padStart(string, length, chars) {
                        return string = toString(string), createPadding(string, length, chars) + string;
                    }
                    /**
	     * Converts `string` to an integer of the specified radix. If `radix` is
	     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
	     * in which case a `radix` of `16` is used.
	     *
	     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#x15.1.2.2)
	     * of `parseInt`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} string The string to convert.
	     * @param {number} [radix] The radix to interpret `value` by.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     *
	     * _.map(['6', '08', '10'], _.parseInt);
	     * // => [6, 8, 10]
	     */
                    function parseInt(string, radix, guard) {
                        // Chrome fails to trim leading <BOM> whitespace characters.
                        // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
                        return guard || null == radix ? radix = 0 : radix && (radix = +radix), string = toString(string).replace(reTrim, ""), 
                        nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
                    }
                    /**
	     * Repeats the given string `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to repeat.
	     * @param {number} [n=0] The number of times to repeat the string.
	     * @returns {string} Returns the repeated string.
	     * @example
	     *
	     * _.repeat('*', 3);
	     * // => '***'
	     *
	     * _.repeat('abc', 2);
	     * // => 'abcabc'
	     *
	     * _.repeat('abc', 0);
	     * // => ''
	     */
                    function repeat(string, n) {
                        string = toString(string), n = toInteger(n);
                        var result = "";
                        if (!string || 1 > n || n > MAX_SAFE_INTEGER) return result;
                        // Leverage the exponentiation by squaring algorithm for a faster repeat.
                        // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
                        do n % 2 && (result += string), n = nativeFloor(n / 2), string += string; while (n);
                        return result;
                    }
                    /**
	     * Replaces matches for `pattern` in `string` with `replacement`.
	     *
	     * **Note:** This method is based on [`String#replace`](https://mdn.io/String/replace).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to modify.
	     * @param {RegExp|string} pattern The pattern to replace.
	     * @param {Function|string} replacement The match replacement.
	     * @returns {string} Returns the modified string.
	     * @example
	     *
	     * _.replace('Hi Fred', 'Fred', 'Barney');
	     * // => 'Hi Barney'
	     */
                    function replace() {
                        var args = arguments, string = toString(args[0]);
                        return args.length < 3 ? string : string.replace(args[1], args[2]);
                    }
                    /**
	     * Splits `string` by `separator`.
	     *
	     * **Note:** This method is based on [`String#split`](https://mdn.io/String/split).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to split.
	     * @param {RegExp|string} separator The separator pattern to split by.
	     * @param {number} [limit] The length to truncate results to.
	     * @returns {Array} Returns the new array of string segments.
	     * @example
	     *
	     * _.split('a-b-c', '-', 2);
	     * // => ['a', 'b']
	     */
                    function split(string, separator, limit) {
                        return toString(string).split(separator, limit);
                    }
                    /**
	     * Checks if `string` starts with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=0] The position to search from.
	     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
	     * @example
	     *
	     * _.startsWith('abc', 'a');
	     * // => true
	     *
	     * _.startsWith('abc', 'b');
	     * // => false
	     *
	     * _.startsWith('abc', 'b', 1);
	     * // => true
	     */
                    function startsWith(string, target, position) {
                        return string = toString(string), position = baseClamp(toInteger(position), 0, string.length), 
                        string.lastIndexOf(target, position) == position;
                    }
                    /**
	     * Creates a compiled template function that can interpolate data properties
	     * in "interpolate" delimiters, HTML-escape interpolated data properties in
	     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	     * properties may be accessed as free variables in the template. If a setting
	     * object is given it takes precedence over `_.templateSettings` values.
	     *
	     * **Note:** In the development build `_.template` utilizes
	     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	     * for easier debugging.
	     *
	     * For more information on precompiling templates see
	     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	     *
	     * For more information on Chrome extension sandboxes see
	     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The template string.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as free variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [options.variable] The data object variable name.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {Function} Returns the compiled template function.
	     * @example
	     *
	     * // Use the "interpolate" delimiter to create a compiled template.
	     * var compiled = _.template('hello <%= user %>!');
	     * compiled({ 'user': 'fred' });
	     * // => 'hello fred!'
	     *
	     * // Use the HTML "escape" delimiter to escape data property values.
	     * var compiled = _.template('<b><%- value %></b>');
	     * compiled({ 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
	     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // Use the internal `print` function in "evaluate" delimiters.
	     * var compiled = _.template('<% print("hello " + user); %>!');
	     * compiled({ 'user': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // Use the ES delimiter as an alternative to the default "interpolate" delimiter.
	     * var compiled = _.template('hello ${ user }!');
	     * compiled({ 'user': 'pebbles' });
	     * // => 'hello pebbles!'
	     *
	     * // Use custom template delimiters.
	     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	     * var compiled = _.template('hello {{ user }}!');
	     * compiled({ 'user': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // Use backslashes to treat delimiters as plain text.
	     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	     * compiled({ 'value': 'ignored' });
	     * // => '<%- value %>'
	     *
	     * // Use the `imports` option to import `jQuery` as `jq`.
	     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
	     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
	     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     * //   var __t, __p = '';
	     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	     * //   return __p;
	     * // }
	     *
	     * // Use the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and stack traces.
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
                    function template(string, options, guard) {
                        // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
                        // and Laura Doktorova's doT.js (https://github.com/olado/doT).
                        var settings = lodash.templateSettings;
                        guard && isIterateeCall(string, options, guard) && (options = undefined), string = toString(string), 
                        options = assignInWith({}, options, settings, assignInDefaults);
                        var isEscaping, isEvaluating, imports = assignInWith({}, options.imports, settings.imports, assignInDefaults), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys), index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '", reDelimiters = RegExp((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g"), sourceURL = "//# sourceURL=" + ("sourceURL" in options ? options.sourceURL : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
                        string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                            // The JS engine embedded in Adobe products needs `match` returned in
                            // order to produce the correct `offset` value.
                            // Escape characters that can't be included in string literals.
                            // Replace delimiters with snippets.
                            return interpolateValue || (interpolateValue = esTemplateValue), source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar), 
                            escapeValue && (isEscaping = !0, source += "' +\n__e(" + escapeValue + ") +\n'"), 
                            evaluateValue && (isEvaluating = !0, source += "';\n" + evaluateValue + ";\n__p += '"), 
                            interpolateValue && (source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'"), 
                            index = offset + match.length, match;
                        }), source += "';\n";
                        // If `variable` is not specified wrap a with-statement around the generated
                        // code to add the data object to the top of the scope chain.
                        var variable = options.variable;
                        variable || (source = "with (obj) {\n" + source + "\n}\n"), source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;"), 
                        source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
                        var result = attempt(function() {
                            return Function(importsKeys, sourceURL + "return " + source).apply(undefined, importsValues);
                        });
                        if (// Provide the compiled function's source by its `toString` method or
                        // the `source` property as a convenience for inlining compiled templates.
                        result.source = source, isError(result)) throw result;
                        return result;
                    }
                    /**
	     * Converts `string`, as a whole, to lower case.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the lower cased string.
	     * @example
	     *
	     * _.toLower('--Foo-Bar');
	     * // => '--foo-bar'
	     *
	     * _.toLower('fooBar');
	     * // => 'foobar'
	     *
	     * _.toLower('__FOO_BAR__');
	     * // => '__foo_bar__'
	     */
                    function toLower(value) {
                        return toString(value).toLowerCase();
                    }
                    /**
	     * Converts `string`, as a whole, to upper case.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the upper cased string.
	     * @example
	     *
	     * _.toUpper('--foo-bar');
	     * // => '--FOO-BAR'
	     *
	     * _.toUpper('fooBar');
	     * // => 'FOOBAR'
	     *
	     * _.toUpper('__foo_bar__');
	     * // => '__FOO_BAR__'
	     */
                    function toUpper(value) {
                        return toString(value).toUpperCase();
                    }
                    /**
	     * Removes leading and trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trim('  abc  ');
	     * // => 'abc'
	     *
	     * _.trim('-_-abc-_-', '_-');
	     * // => 'abc'
	     *
	     * _.map(['  foo  ', '  bar  '], _.trim);
	     * // => ['foo', 'bar']
	     */
                    function trim(string, chars, guard) {
                        if (string = toString(string), !string) return string;
                        if (guard || chars === undefined) return string.replace(reTrim, "");
                        if (chars += "", !chars) return string;
                        var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars);
                        return strSymbols.slice(charsStartIndex(strSymbols, chrSymbols), charsEndIndex(strSymbols, chrSymbols) + 1).join("");
                    }
                    /**
	     * Removes trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimEnd('  abc  ');
	     * // => '  abc'
	     *
	     * _.trimEnd('-_-abc-_-', '_-');
	     * // => '-_-abc'
	     */
                    function trimEnd(string, chars, guard) {
                        if (string = toString(string), !string) return string;
                        if (guard || chars === undefined) return string.replace(reTrimEnd, "");
                        if (chars += "", !chars) return string;
                        var strSymbols = stringToArray(string);
                        return strSymbols.slice(0, charsEndIndex(strSymbols, stringToArray(chars)) + 1).join("");
                    }
                    /**
	     * Removes leading whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimStart('  abc  ');
	     * // => 'abc  '
	     *
	     * _.trimStart('-_-abc-_-', '_-');
	     * // => 'abc-_-'
	     */
                    function trimStart(string, chars, guard) {
                        if (string = toString(string), !string) return string;
                        if (guard || chars === undefined) return string.replace(reTrimStart, "");
                        if (chars += "", !chars) return string;
                        var strSymbols = stringToArray(string);
                        return strSymbols.slice(charsStartIndex(strSymbols, stringToArray(chars))).join("");
                    }
                    /**
	     * Truncates `string` if it's longer than the given maximum string length.
	     * The last characters of the truncated string are replaced with the omission
	     * string which defaults to "...".
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to truncate.
	     * @param {Object} [options] The options object.
	     * @param {number} [options.length=30] The maximum string length.
	     * @param {string} [options.omission='...'] The string to indicate text is omitted.
	     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
	     * @returns {string} Returns the truncated string.
	     * @example
	     *
	     * _.truncate('hi-diddly-ho there, neighborino');
	     * // => 'hi-diddly-ho there, neighbo...'
	     *
	     * _.truncate('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': ' '
	     * });
	     * // => 'hi-diddly-ho there,...'
	     *
	     * _.truncate('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': /,? +/
	     * });
	     * // => 'hi-diddly-ho there...'
	     *
	     * _.truncate('hi-diddly-ho there, neighborino', {
	     *   'omission': ' [...]'
	     * });
	     * // => 'hi-diddly-ho there, neig [...]'
	     */
                    function truncate(string, options) {
                        var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
                        if (isObject(options)) {
                            var separator = "separator" in options ? options.separator : separator;
                            length = "length" in options ? toInteger(options.length) : length, omission = "omission" in options ? toString(options.omission) : omission;
                        }
                        string = toString(string);
                        var strLength = string.length;
                        if (reHasComplexSymbol.test(string)) {
                            var strSymbols = stringToArray(string);
                            strLength = strSymbols.length;
                        }
                        if (length >= strLength) return string;
                        var end = length - stringSize(omission);
                        if (1 > end) return omission;
                        var result = strSymbols ? strSymbols.slice(0, end).join("") : string.slice(0, end);
                        if (separator === undefined) return result + omission;
                        if (strSymbols && (end += result.length - end), isRegExp(separator)) {
                            if (string.slice(end).search(separator)) {
                                var match, substring = result;
                                for (separator.global || (separator = RegExp(separator.source, toString(reFlags.exec(separator)) + "g")), 
                                separator.lastIndex = 0; match = separator.exec(substring); ) var newEnd = match.index;
                                result = result.slice(0, newEnd === undefined ? end : newEnd);
                            }
                        } else if (string.indexOf(separator, end) != end) {
                            var index = result.lastIndexOf(separator);
                            index > -1 && (result = result.slice(0, index));
                        }
                        return result + omission;
                    }
                    /**
	     * The inverse of `_.escape`; this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
	     * corresponding characters.
	     *
	     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
	     * entities use a third-party library like [_he_](https://mths.be/he).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('fred, barney, &amp; pebbles');
	     * // => 'fred, barney, & pebbles'
	     */
                    function unescape(string) {
                        return string = toString(string), string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
                    }
                    /**
	     * Splits `string` into an array of its words.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {RegExp|string} [pattern] The pattern to match words.
	     * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
	     * @returns {Array} Returns the words of `string`.
	     * @example
	     *
	     * _.words('fred, barney, & pebbles');
	     * // => ['fred', 'barney', 'pebbles']
	     *
	     * _.words('fred, barney, & pebbles', /[^, ]+/g);
	     * // => ['fred', 'barney', '&', 'pebbles']
	     */
                    function words(string, pattern, guard) {
                        return string = toString(string), pattern = guard ? undefined : pattern, pattern === undefined && (pattern = reHasComplexWord.test(string) ? reComplexWord : reBasicWord), 
                        string.match(pattern) || [];
                    }
                    /**
	     * Creates a function that iterates over `pairs` invoking the corresponding
	     * function of the first predicate to return truthy. The predicate-function
	     * pairs are invoked with the `this` binding and arguments of the created
	     * function.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {Array} pairs The predicate-function pairs.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var func = _.cond([
	     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
	     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
	     *   [_.constant(true),                _.constant('no match')]
	     * ]);
	     *
	     * func({ 'a': 1, 'b': 2 });
	     * // => 'matches A'
	     *
	     * func({ 'a': 0, 'b': 1 });
	     * // => 'matches B'
	     *
	     * func({ 'a': '1', 'b': '2' });
	     * // => 'no match'
	     */
                    function cond(pairs) {
                        var length = pairs ? pairs.length : 0, toIteratee = getIteratee();
                        return pairs = length ? arrayMap(pairs, function(pair) {
                            if ("function" != typeof pair[1]) throw new TypeError(FUNC_ERROR_TEXT);
                            return [ toIteratee(pair[0]), pair[1] ];
                        }) : [], rest(function(args) {
                            for (var index = -1; ++index < length; ) {
                                var pair = pairs[index];
                                if (apply(pair[0], this, args)) return apply(pair[1], this, args);
                            }
                        });
                    }
                    /**
	     * Creates a function that invokes the predicate properties of `source` with
	     * the corresponding property values of a given object, returning `true` if
	     * all predicates return truthy, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {Object} source The object of property predicates to conform to.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.filter(users, _.conforms({ 'age': _.partial(_.gt, _, 38) }));
	     * // => [{ 'user': 'fred', 'age': 40 }]
	     */
                    function conforms(source) {
                        return baseConforms(baseClone(source, !0));
                    }
                    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var getter = _.constant(object);
	     *
	     * getter() === object;
	     * // => true
	     */
                    function constant(value) {
                        return function() {
                            return value;
                        };
                    }
                    /**
	     * This method returns the first argument given to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.identity(object) === object;
	     * // => true
	     */
                    function identity(value) {
                        return value;
                    }
                    /**
	     * Creates a function that invokes `func` with the arguments of the created
	     * function. If `func` is a property name the created callback returns the
	     * property value for a given element. If `func` is an object the created
	     * callback returns `true` for elements that contain the equivalent object properties, otherwise it returns `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @returns {Function} Returns the callback.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // Create custom iteratee shorthands.
	     * _.iteratee = _.wrap(_.iteratee, function(callback, func) {
	     *   var p = /^(\S+)\s*([<>])\s*(\S+)$/.exec(func);
	     *   return !p ? callback(func) : function(object) {
	     *     return (p[2] == '>' ? object[p[1]] > p[3] : object[p[1]] < p[3]);
	     *   };
	     * });
	     *
	     * _.filter(users, 'age > 36');
	     * // => [{ 'user': 'fred', 'age': 40 }]
	     */
                    function iteratee(func) {
                        return baseIteratee("function" == typeof func ? func : baseClone(func, !0));
                    }
                    /**
	     * Creates a function that performs a deep partial comparison between a given
	     * object and `source`, returning `true` if the given object has equivalent
	     * property values, else `false`.
	     *
	     * **Note:** This method supports comparing the same values as `_.isEqual`.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
	     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
	     */
                    function matches(source) {
                        return baseMatches(baseClone(source, !0));
                    }
                    /**
	     * Creates a function that performs a deep partial comparison between the
	     * value at `path` of a given object to `srcValue`, returning `true` if the
	     * object value is equivalent, else `false`.
	     *
	     * **Note:** This method supports comparing the same values as `_.isEqual`.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * _.find(users, _.matchesProperty('user', 'fred'));
	     * // => { 'user': 'fred' }
	     */
                    function matchesProperty(path, srcValue) {
                        return baseMatchesProperty(path, baseClone(srcValue, !0));
                    }
                    /**
	     * Adds all own enumerable function properties of a source object to the
	     * destination object. If `object` is a function then methods are added to
	     * its prototype as well.
	     *
	     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	     * avoid conflicts caused by modifying the original.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {Function|Object} [object=lodash] The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added
	     *  are chainable.
	     * @returns {Function|Object} Returns `object`.
	     * @example
	     *
	     * function vowels(string) {
	     *   return _.filter(string, function(v) {
	     *     return /[aeiou]/i.test(v);
	     *   });
	     * }
	     *
	     * _.mixin({ 'vowels': vowels });
	     * _.vowels('fred');
	     * // => ['e']
	     *
	     * _('fred').vowels().value();
	     * // => ['e']
	     *
	     * _.mixin({ 'vowels': vowels }, { 'chain': false });
	     * _('fred').vowels();
	     * // => ['e']
	     */
                    function mixin(object, source, options) {
                        var props = keys(source), methodNames = baseFunctions(source, props);
                        null != options || isObject(source) && (methodNames.length || !props.length) || (options = source, 
                        source = object, object = this, methodNames = baseFunctions(source, keys(source)));
                        var chain = isObject(options) && "chain" in options ? options.chain : !0, isFunc = isFunction(object);
                        return arrayEach(methodNames, function(methodName) {
                            var func = source[methodName];
                            object[methodName] = func, isFunc && (object.prototype[methodName] = function() {
                                var chainAll = this.__chain__;
                                if (chain || chainAll) {
                                    var result = object(this.__wrapped__), actions = result.__actions__ = copyArray(this.__actions__);
                                    return actions.push({
                                        func: func,
                                        args: arguments,
                                        thisArg: object
                                    }), result.__chain__ = chainAll, result;
                                }
                                return func.apply(object, arrayPush([ this.value() ], arguments));
                            });
                        }), object;
                    }
                    /**
	     * Reverts the `_` variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
                    function noConflict() {
                        return root._ === this && (root._ = oldDash), this;
                    }
                    /**
	     * A no-operation function that returns `undefined` regardless of the
	     * arguments it receives.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.noop(object) === undefined;
	     * // => true
	     */
                    function noop() {}
                    /**
	     * Creates a function that returns its nth argument.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {number} [n=0] The index of the argument to return.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var func = _.nthArg(1);
	     *
	     * func('a', 'b', 'c');
	     * // => 'b'
	     */
                    function nthArg(n) {
                        return n = toInteger(n), function() {
                            return arguments[n];
                        };
                    }
                    /**
	     * Creates a function that returns the value at `path` of a given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': 2 } } },
	     *   { 'a': { 'b': { 'c': 1 } } }
	     * ];
	     *
	     * _.map(objects, _.property('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */
                    function property(path) {
                        return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
                    }
                    /**
	     * The opposite of `_.property`; this method creates a function that returns
	     * the value at a given path of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {Object} object The object to query.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var array = [0, 1, 2],
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
	     * // => [2, 0]
	     */
                    function propertyOf(object) {
                        return function(path) {
                            return null == object ? undefined : baseGet(object, path);
                        };
                    }
                    /**
	     * Invokes the iteratee function `n` times, returning an array of the results
	     * of each invocation. The iteratee is invoked with one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * _.times(3, String);
	     * // => ['0', '1', '2']
	     *
	     *  _.times(4, _.constant(true));
	     * // => [true, true, true, true]
	     */
                    function times(n, iteratee) {
                        if (n = toInteger(n), 1 > n || n > MAX_SAFE_INTEGER) return [];
                        var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
                        iteratee = toFunction(iteratee), n -= MAX_ARRAY_LENGTH;
                        for (var result = baseTimes(length, iteratee); ++index < n; ) iteratee(index);
                        return result;
                    }
                    /**
	     * Converts `value` to a property path array.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the new property path array.
	     * @example
	     *
	     * _.toPath('a.b.c');
	     * // => ['a', 'b', 'c']
	     *
	     * _.toPath('a[0].b.c');
	     * // => ['a', '0', 'b', 'c']
	     *
	     * var path = ['a', 'b', 'c'],
	     *     newPath = _.toPath(path);
	     *
	     * console.log(newPath);
	     * // => ['a', 'b', 'c']
	     *
	     * console.log(path === newPath);
	     * // => false
	     */
                    function toPath(value) {
                        return isArray(value) ? arrayMap(value, String) : stringToPath(value);
                    }
                    /**
	     * Generates a unique ID. If `prefix` is given the ID is appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Util
	     * @param {string} [prefix] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */
                    function uniqueId(prefix) {
                        var id = ++idCounter;
                        return toString(prefix) + id;
                    }
                    /*------------------------------------------------------------------------*/
                    /**
	     * Adds two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} augend The first number in an addition.
	     * @param {number} addend The second number in an addition.
	     * @returns {number} Returns the total.
	     * @example
	     *
	     * _.add(6, 4);
	     * // => 10
	     */
                    function add(augend, addend) {
                        var result;
                        return augend === undefined && addend === undefined ? 0 : (augend !== undefined && (result = augend), 
                        addend !== undefined && (result = result === undefined ? addend : result + addend), 
                        result);
                    }
                    /**
	     * Computes the maximum value of `array`. If `array` is empty or falsey
	     * `undefined` is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * _.max([]);
	     * // => undefined
	     */
                    function max(array) {
                        return array && array.length ? baseExtremum(array, identity, gt) : undefined;
                    }
                    /**
	     * This method is like `_.max` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the criterion by which
	     * the value is ranked. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * var objects = [{ 'n': 1 }, { 'n': 2 }];
	     *
	     * _.maxBy(objects, function(o) { return o.n; });
	     * // => { 'n': 2 }
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.maxBy(objects, 'n');
	     * // => { 'n': 2 }
	     */
                    function maxBy(array, iteratee) {
                        return array && array.length ? baseExtremum(array, getIteratee(iteratee), gt) : undefined;
                    }
                    /**
	     * Computes the mean of the values in `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {number} Returns the mean.
	     * @example
	     *
	     * _.mean([4, 2, 8, 6]);
	     * // => 5
	     */
                    function mean(array) {
                        return sum(array) / (array ? array.length : 0);
                    }
                    /**
	     * Computes the minimum value of `array`. If `array` is empty or falsey
	     * `undefined` is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * _.min([]);
	     * // => undefined
	     */
                    function min(array) {
                        return array && array.length ? baseExtremum(array, identity, lt) : undefined;
                    }
                    /**
	     * This method is like `_.min` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the criterion by which
	     * the value is ranked. The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * var objects = [{ 'n': 1 }, { 'n': 2 }];
	     *
	     * _.minBy(objects, function(o) { return o.n; });
	     * // => { 'n': 1 }
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.minBy(objects, 'n');
	     * // => { 'n': 1 }
	     */
                    function minBy(array, iteratee) {
                        return array && array.length ? baseExtremum(array, getIteratee(iteratee), lt) : undefined;
                    }
                    /**
	     * Subtract two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} minuend The first number in a subtraction.
	     * @param {number} subtrahend The second number in a subtraction.
	     * @returns {number} Returns the difference.
	     * @example
	     *
	     * _.subtract(6, 4);
	     * // => 2
	     */
                    function subtract(minuend, subtrahend) {
                        var result;
                        return minuend === undefined && subtrahend === undefined ? 0 : (minuend !== undefined && (result = minuend), 
                        subtrahend !== undefined && (result = result === undefined ? subtrahend : result - subtrahend), 
                        result);
                    }
                    /**
	     * Computes the sum of the values in `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.sum([4, 2, 8, 6]);
	     * // => 20
	     */
                    function sum(array) {
                        return array && array.length ? baseSum(array, identity) : 0;
                    }
                    /**
	     * This method is like `_.sum` except that it accepts `iteratee` which is
	     * invoked for each element in `array` to generate the value to be summed.
	     * The iteratee is invoked with one argument: (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array} array The array to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The iteratee invoked per element.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
	     *
	     * _.sumBy(objects, function(o) { return o.n; });
	     * // => 20
	     *
	     * // The `_.property` iteratee shorthand.
	     * _.sumBy(objects, 'n');
	     * // => 20
	     */
                    function sumBy(array, iteratee) {
                        return array && array.length ? baseSum(array, getIteratee(iteratee)) : 0;
                    }
                    context = context ? _.defaults({}, context, _.pick(root, contextProps)) : root;
                    /** Built-in constructor references. */
                    var Date = context.Date, Error = context.Error, Math = context.Math, RegExp = context.RegExp, TypeError = context.TypeError, arrayProto = context.Array.prototype, objectProto = context.Object.prototype, funcToString = context.Function.prototype.toString, hasOwnProperty = objectProto.hasOwnProperty, idCounter = 0, objectCtorString = funcToString.call(Object), objectToString = objectProto.toString, oldDash = root._, reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Buffer = moduleExports ? context.Buffer : undefined, Reflect = context.Reflect, Symbol = context.Symbol, Uint8Array = context.Uint8Array, clearTimeout = context.clearTimeout, enumerate = Reflect ? Reflect.enumerate : undefined, getPrototypeOf = Object.getPrototypeOf, getOwnPropertySymbols = Object.getOwnPropertySymbols, iteratorSymbol = "symbol" == typeof (iteratorSymbol = Symbol && Symbol.iterator) ? iteratorSymbol : undefined, propertyIsEnumerable = objectProto.propertyIsEnumerable, setTimeout = context.setTimeout, splice = arrayProto.splice, nativeCeil = Math.ceil, nativeFloor = Math.floor, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = Object.keys, nativeMax = Math.max, nativeMin = Math.min, nativeParseInt = context.parseInt, nativeRandom = Math.random, nativeReverse = arrayProto.reverse, Map = getNative(context, "Map"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object, "create"), metaMap = WeakMap && new WeakMap(), mapCtorString = Map ? funcToString.call(Map) : "", setCtorString = Set ? funcToString.call(Set) : "", weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : "", symbolProto = Symbol ? Symbol.prototype : undefined, symbolValueOf = Symbol ? symbolProto.valueOf : undefined, symbolToString = Symbol ? symbolProto.toString : undefined, realNames = {};
                    /**
	     * By default, the template delimiters used by lodash are like those in
	     * embedded Ruby (ERB). Change the following template settings to use
	     * alternative delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
                    lodash.templateSettings = {
                        /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
                        escape: reEscape,
                        /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
                        evaluate: reEvaluate,
                        /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
                        interpolate: reInterpolate,
                        /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */
                        variable: "",
                        /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */
                        imports: {
                            /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */
                            _: lodash
                        }
                    };
                    /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */
                    var baseCreate = function() {
                        function object() {}
                        return function(prototype) {
                            if (isObject(prototype)) {
                                object.prototype = prototype;
                                var result = new object();
                                object.prototype = undefined;
                            }
                            return result || {};
                        };
                    }(), baseEach = createBaseEach(baseForOwn), baseEachRight = createBaseEach(baseForOwnRight, !0), baseFor = createBaseFor(), baseForRight = createBaseFor(!0);
                    // Fallback for IE < 9 with es6-shim.
                    enumerate && !propertyIsEnumerable.call({
                        valueOf: 1
                    }, "valueOf") && (baseKeysIn = function(object) {
                        return iteratorToArray(enumerate(object));
                    });
                    /**
	     * The base implementation of `setData` without support for hot loop detection.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
                    var baseSetData = metaMap ? function(func, data) {
                        return metaMap.set(func, data), func;
                    } : identity, createSet = Set && 2 === new Set([ 1, 2 ]).size ? function(values) {
                        return new Set(values);
                    } : noop, getData = metaMap ? function(func) {
                        return metaMap.get(func);
                    } : noop, getLength = baseProperty("length"), getSymbols = getOwnPropertySymbols || function() {
                        return [];
                    };
                    // Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
                    (Map && getTag(new Map()) != mapTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) && (getTag = function(value) {
                        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : null, ctorString = "function" == typeof Ctor ? funcToString.call(Ctor) : "";
                        if (ctorString) switch (ctorString) {
                          case mapCtorString:
                            return mapTag;

                          case setCtorString:
                            return setTag;

                          case weakMapCtorString:
                            return weakMapTag;
                        }
                        return result;
                    });
                    /**
	     * Sets metadata for `func`.
	     *
	     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	     * period of time, it will trip its breaker and transition to an identity function
	     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
	     * for more details.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
                    var setData = function() {
                        var count = 0, lastCalled = 0;
                        return function(key, value) {
                            var stamp = now(), remaining = HOT_SPAN - (stamp - lastCalled);
                            if (lastCalled = stamp, remaining > 0) {
                                if (++count >= HOT_COUNT) return key;
                            } else count = 0;
                            return baseSetData(key, value);
                        };
                    }(), concat = rest(function(array, values) {
                        return isArray(array) || (array = null == array ? [] : [ Object(array) ]), values = baseFlatten(values), 
                        arrayConcat(array, values);
                    }), difference = rest(function(array, values) {
                        return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, !1, !0)) : [];
                    }), differenceBy = rest(function(array, values) {
                        var iteratee = last(values);
                        return isArrayLikeObject(iteratee) && (iteratee = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, !1, !0), getIteratee(iteratee)) : [];
                    }), differenceWith = rest(function(array, values) {
                        var comparator = last(values);
                        return isArrayLikeObject(comparator) && (comparator = undefined), isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values, !1, !0), undefined, comparator) : [];
                    }), intersection = rest(function(arrays) {
                        var mapped = arrayMap(arrays, toArrayLikeObject);
                        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
                    }), intersectionBy = rest(function(arrays) {
                        var iteratee = last(arrays), mapped = arrayMap(arrays, toArrayLikeObject);
                        return iteratee === last(mapped) ? iteratee = undefined : mapped.pop(), mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee)) : [];
                    }), intersectionWith = rest(function(arrays) {
                        var comparator = last(arrays), mapped = arrayMap(arrays, toArrayLikeObject);
                        return comparator === last(mapped) ? comparator = undefined : mapped.pop(), mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined, comparator) : [];
                    }), pull = rest(pullAll), pullAt = rest(function(array, indexes) {
                        indexes = arrayMap(baseFlatten(indexes), String);
                        var result = baseAt(array, indexes);
                        return basePullAt(array, indexes.sort(compareAscending)), result;
                    }), union = rest(function(arrays) {
                        return baseUniq(baseFlatten(arrays, !1, !0));
                    }), unionBy = rest(function(arrays) {
                        var iteratee = last(arrays);
                        return isArrayLikeObject(iteratee) && (iteratee = undefined), baseUniq(baseFlatten(arrays, !1, !0), getIteratee(iteratee));
                    }), unionWith = rest(function(arrays) {
                        var comparator = last(arrays);
                        return isArrayLikeObject(comparator) && (comparator = undefined), baseUniq(baseFlatten(arrays, !1, !0), undefined, comparator);
                    }), without = rest(function(array, values) {
                        return isArrayLikeObject(array) ? baseDifference(array, values) : [];
                    }), xor = rest(function(arrays) {
                        return baseXor(arrayFilter(arrays, isArrayLikeObject));
                    }), xorBy = rest(function(arrays) {
                        var iteratee = last(arrays);
                        return isArrayLikeObject(iteratee) && (iteratee = undefined), baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee));
                    }), xorWith = rest(function(arrays) {
                        var comparator = last(arrays);
                        return isArrayLikeObject(comparator) && (comparator = undefined), baseXor(arrayFilter(arrays, isArrayLikeObject), undefined, comparator);
                    }), zip = rest(unzip), zipWith = rest(function(arrays) {
                        var length = arrays.length, iteratee = length > 1 ? arrays[length - 1] : undefined;
                        return iteratee = "function" == typeof iteratee ? (arrays.pop(), iteratee) : undefined, 
                        unzipWith(arrays, iteratee);
                    }), wrapperAt = rest(function(paths) {
                        paths = baseFlatten(paths);
                        var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
                            return baseAt(object, paths);
                        };
                        return !(length > 1 || this.__actions__.length) && value instanceof LazyWrapper && isIndex(start) ? (value = value.slice(start, +start + (length ? 1 : 0)), 
                        value.__actions__.push({
                            func: thru,
                            args: [ interceptor ],
                            thisArg: undefined
                        }), new LodashWrapper(value, this.__chain__).thru(function(array) {
                            return length && !array.length && array.push(undefined), array;
                        })) : this.thru(interceptor);
                    }), countBy = createAggregator(function(result, value, key) {
                        hasOwnProperty.call(result, key) ? ++result[key] : result[key] = 1;
                    }), groupBy = createAggregator(function(result, value, key) {
                        hasOwnProperty.call(result, key) ? result[key].push(value) : result[key] = [ value ];
                    }), invokeMap = rest(function(collection, path, args) {
                        var index = -1, isFunc = "function" == typeof path, isProp = isKey(path), result = isArrayLike(collection) ? Array(collection.length) : [];
                        return baseEach(collection, function(value) {
                            var func = isFunc ? path : isProp && null != value ? value[path] : undefined;
                            result[++index] = func ? apply(func, value, args) : baseInvoke(value, path, args);
                        }), result;
                    }), keyBy = createAggregator(function(result, value, key) {
                        result[key] = value;
                    }), partition = createAggregator(function(result, value, key) {
                        result[key ? 0 : 1].push(value);
                    }, function() {
                        return [ [], [] ];
                    }), sortBy = rest(function(collection, iteratees) {
                        if (null == collection) return [];
                        var length = iteratees.length;
                        return length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1]) ? iteratees = [] : length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2]) && (iteratees.length = 1), 
                        baseOrderBy(collection, baseFlatten(iteratees), []);
                    }), now = Date.now, bind = rest(function(func, thisArg, partials) {
                        var bitmask = BIND_FLAG;
                        if (partials.length) {
                            var placeholder = lodash.placeholder || bind.placeholder, holders = replaceHolders(partials, placeholder);
                            bitmask |= PARTIAL_FLAG;
                        }
                        return createWrapper(func, bitmask, thisArg, partials, holders);
                    }), bindKey = rest(function(object, key, partials) {
                        var bitmask = BIND_FLAG | BIND_KEY_FLAG;
                        if (partials.length) {
                            var placeholder = lodash.placeholder || bindKey.placeholder, holders = replaceHolders(partials, placeholder);
                            bitmask |= PARTIAL_FLAG;
                        }
                        return createWrapper(key, bitmask, object, partials, holders);
                    }), defer = rest(function(func, args) {
                        return baseDelay(func, 1, args);
                    }), delay = rest(function(func, wait, args) {
                        return baseDelay(func, toNumber(wait) || 0, args);
                    }), overArgs = rest(function(func, transforms) {
                        transforms = arrayMap(baseFlatten(transforms), getIteratee());
                        var funcsLength = transforms.length;
                        return rest(function(args) {
                            for (var index = -1, length = nativeMin(args.length, funcsLength); ++index < length; ) args[index] = transforms[index].call(this, args[index]);
                            return apply(func, this, args);
                        });
                    }), partial = rest(function(func, partials) {
                        var placeholder = lodash.placeholder || partial.placeholder, holders = replaceHolders(partials, placeholder);
                        return createWrapper(func, PARTIAL_FLAG, undefined, partials, holders);
                    }), partialRight = rest(function(func, partials) {
                        var placeholder = lodash.placeholder || partialRight.placeholder, holders = replaceHolders(partials, placeholder);
                        return createWrapper(func, PARTIAL_RIGHT_FLAG, undefined, partials, holders);
                    }), rearg = rest(function(func, indexes) {
                        return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes));
                    }), isArray = Array.isArray, isBuffer = Buffer ? function(value) {
                        return value instanceof Buffer;
                    } : constant(!1), assign = createAssigner(function(object, source) {
                        copyObject(source, keys(source), object);
                    }), assignIn = createAssigner(function(object, source) {
                        copyObject(source, keysIn(source), object);
                    }), assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
                        copyObjectWith(source, keysIn(source), object, customizer);
                    }), assignWith = createAssigner(function(object, source, srcIndex, customizer) {
                        copyObjectWith(source, keys(source), object, customizer);
                    }), at = rest(function(object, paths) {
                        return baseAt(object, baseFlatten(paths));
                    }), defaults = rest(function(args) {
                        return args.push(undefined, assignInDefaults), apply(assignInWith, undefined, args);
                    }), defaultsDeep = rest(function(args) {
                        return args.push(undefined, mergeDefaults), apply(mergeWith, undefined, args);
                    }), invert = createInverter(function(result, value, key) {
                        result[value] = key;
                    }, constant(identity)), invertBy = createInverter(function(result, value, key) {
                        hasOwnProperty.call(result, value) ? result[value].push(key) : result[value] = [ key ];
                    }, getIteratee), invoke = rest(baseInvoke), merge = createAssigner(function(object, source, srcIndex) {
                        baseMerge(object, source, srcIndex);
                    }), mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
                        baseMerge(object, source, srcIndex, customizer);
                    }), omit = rest(function(object, props) {
                        return null == object ? {} : (props = arrayMap(baseFlatten(props), String), basePick(object, baseDifference(keysIn(object), props)));
                    }), pick = rest(function(object, props) {
                        return null == object ? {} : basePick(object, baseFlatten(props));
                    }), camelCase = createCompounder(function(result, word, index) {
                        return word = word.toLowerCase(), result + (index ? capitalize(word) : word);
                    }), kebabCase = createCompounder(function(result, word, index) {
                        return result + (index ? "-" : "") + word.toLowerCase();
                    }), lowerCase = createCompounder(function(result, word, index) {
                        return result + (index ? " " : "") + word.toLowerCase();
                    }), lowerFirst = createCaseFirst("toLowerCase"), upperFirst = createCaseFirst("toUpperCase"), snakeCase = createCompounder(function(result, word, index) {
                        return result + (index ? "_" : "") + word.toLowerCase();
                    }), startCase = createCompounder(function(result, word, index) {
                        return result + (index ? " " : "") + capitalize(word);
                    }), upperCase = createCompounder(function(result, word, index) {
                        return result + (index ? " " : "") + word.toUpperCase();
                    }), attempt = rest(function(func, args) {
                        try {
                            return apply(func, undefined, args);
                        } catch (e) {
                            return isObject(e) ? e : new Error(e);
                        }
                    }), bindAll = rest(function(object, methodNames) {
                        return arrayEach(baseFlatten(methodNames), function(key) {
                            object[key] = bind(object[key], object);
                        }), object;
                    }), flow = createFlow(), flowRight = createFlow(!0), method = rest(function(path, args) {
                        return function(object) {
                            return baseInvoke(object, path, args);
                        };
                    }), methodOf = rest(function(object, args) {
                        return function(path) {
                            return baseInvoke(object, path, args);
                        };
                    }), over = createOver(arrayMap), overEvery = createOver(arrayEvery), overSome = createOver(arraySome), range = createRange(), rangeRight = createRange(!0), ceil = createRound("ceil"), floor = createRound("floor"), round = createRound("round");
                    /*------------------------------------------------------------------------*/
                    // Ensure wrappers are instances of `baseLodash`.
                    // Avoid inheriting from `Object.prototype` when possible.
                    // Add functions to the `MapCache`.
                    // Add functions to the `SetCache`.
                    // Add functions to the `Stack` cache.
                    // Assign cache to `_.memoize`.
                    // Add functions that return wrapped values when chaining.
                    // Add aliases.
                    // Add functions to `lodash.prototype`.
                    /*------------------------------------------------------------------------*/
                    // Add functions that return unwrapped values when chaining.
                    // Add aliases.
                    /*------------------------------------------------------------------------*/
                    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */
                    // Assign default placeholders.
                    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
                    // Add `LazyWrapper` methods that accept an `iteratee` value.
                    // Add `LazyWrapper` methods for `_.head` and `_.last`.
                    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
                    // Add `LazyWrapper` methods to `lodash.prototype`.
                    // Add `Array` and `String` methods to `lodash.prototype`.
                    // Map minified function names to their real names.
                    // Add functions to the lazy wrapper.
                    // Add chaining functions to the `lodash` wrapper.
                    return lodash.prototype = baseLodash.prototype, LodashWrapper.prototype = baseCreate(baseLodash.prototype), 
                    LodashWrapper.prototype.constructor = LodashWrapper, LazyWrapper.prototype = baseCreate(baseLodash.prototype), 
                    LazyWrapper.prototype.constructor = LazyWrapper, Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto, 
                    MapCache.prototype.clear = mapClear, MapCache.prototype["delete"] = mapDelete, MapCache.prototype.get = mapGet, 
                    MapCache.prototype.has = mapHas, MapCache.prototype.set = mapSet, SetCache.prototype.push = cachePush, 
                    Stack.prototype.clear = stackClear, Stack.prototype["delete"] = stackDelete, Stack.prototype.get = stackGet, 
                    Stack.prototype.has = stackHas, Stack.prototype.set = stackSet, memoize.Cache = MapCache, 
                    lodash.after = after, lodash.ary = ary, lodash.assign = assign, lodash.assignIn = assignIn, 
                    lodash.assignInWith = assignInWith, lodash.assignWith = assignWith, lodash.at = at, 
                    lodash.before = before, lodash.bind = bind, lodash.bindAll = bindAll, lodash.bindKey = bindKey, 
                    lodash.chain = chain, lodash.chunk = chunk, lodash.compact = compact, lodash.concat = concat, 
                    lodash.cond = cond, lodash.conforms = conforms, lodash.constant = constant, lodash.countBy = countBy, 
                    lodash.create = create, lodash.curry = curry, lodash.curryRight = curryRight, lodash.debounce = debounce, 
                    lodash.defaults = defaults, lodash.defaultsDeep = defaultsDeep, lodash.defer = defer, 
                    lodash.delay = delay, lodash.difference = difference, lodash.differenceBy = differenceBy, 
                    lodash.differenceWith = differenceWith, lodash.drop = drop, lodash.dropRight = dropRight, 
                    lodash.dropRightWhile = dropRightWhile, lodash.dropWhile = dropWhile, lodash.fill = fill, 
                    lodash.filter = filter, lodash.flatMap = flatMap, lodash.flatten = flatten, lodash.flattenDeep = flattenDeep, 
                    lodash.flip = flip, lodash.flow = flow, lodash.flowRight = flowRight, lodash.fromPairs = fromPairs, 
                    lodash.functions = functions, lodash.functionsIn = functionsIn, lodash.groupBy = groupBy, 
                    lodash.initial = initial, lodash.intersection = intersection, lodash.intersectionBy = intersectionBy, 
                    lodash.intersectionWith = intersectionWith, lodash.invert = invert, lodash.invertBy = invertBy, 
                    lodash.invokeMap = invokeMap, lodash.iteratee = iteratee, lodash.keyBy = keyBy, 
                    lodash.keys = keys, lodash.keysIn = keysIn, lodash.map = map, lodash.mapKeys = mapKeys, 
                    lodash.mapValues = mapValues, lodash.matches = matches, lodash.matchesProperty = matchesProperty, 
                    lodash.memoize = memoize, lodash.merge = merge, lodash.mergeWith = mergeWith, lodash.method = method, 
                    lodash.methodOf = methodOf, lodash.mixin = mixin, lodash.negate = negate, lodash.nthArg = nthArg, 
                    lodash.omit = omit, lodash.omitBy = omitBy, lodash.once = once, lodash.orderBy = orderBy, 
                    lodash.over = over, lodash.overArgs = overArgs, lodash.overEvery = overEvery, lodash.overSome = overSome, 
                    lodash.partial = partial, lodash.partialRight = partialRight, lodash.partition = partition, 
                    lodash.pick = pick, lodash.pickBy = pickBy, lodash.property = property, lodash.propertyOf = propertyOf, 
                    lodash.pull = pull, lodash.pullAll = pullAll, lodash.pullAllBy = pullAllBy, lodash.pullAt = pullAt, 
                    lodash.range = range, lodash.rangeRight = rangeRight, lodash.rearg = rearg, lodash.reject = reject, 
                    lodash.remove = remove, lodash.rest = rest, lodash.reverse = reverse, lodash.sampleSize = sampleSize, 
                    lodash.set = set, lodash.setWith = setWith, lodash.shuffle = shuffle, lodash.slice = slice, 
                    lodash.sortBy = sortBy, lodash.sortedUniq = sortedUniq, lodash.sortedUniqBy = sortedUniqBy, 
                    lodash.split = split, lodash.spread = spread, lodash.tail = tail, lodash.take = take, 
                    lodash.takeRight = takeRight, lodash.takeRightWhile = takeRightWhile, lodash.takeWhile = takeWhile, 
                    lodash.tap = tap, lodash.throttle = throttle, lodash.thru = thru, lodash.toArray = toArray, 
                    lodash.toPairs = toPairs, lodash.toPairsIn = toPairsIn, lodash.toPath = toPath, 
                    lodash.toPlainObject = toPlainObject, lodash.transform = transform, lodash.unary = unary, 
                    lodash.union = union, lodash.unionBy = unionBy, lodash.unionWith = unionWith, lodash.uniq = uniq, 
                    lodash.uniqBy = uniqBy, lodash.uniqWith = uniqWith, lodash.unset = unset, lodash.unzip = unzip, 
                    lodash.unzipWith = unzipWith, lodash.values = values, lodash.valuesIn = valuesIn, 
                    lodash.without = without, lodash.words = words, lodash.wrap = wrap, lodash.xor = xor, 
                    lodash.xorBy = xorBy, lodash.xorWith = xorWith, lodash.zip = zip, lodash.zipObject = zipObject, 
                    lodash.zipObjectDeep = zipObjectDeep, lodash.zipWith = zipWith, lodash.extend = assignIn, 
                    lodash.extendWith = assignInWith, mixin(lodash, lodash), lodash.add = add, lodash.attempt = attempt, 
                    lodash.camelCase = camelCase, lodash.capitalize = capitalize, lodash.ceil = ceil, 
                    lodash.clamp = clamp, lodash.clone = clone, lodash.cloneDeep = cloneDeep, lodash.cloneDeepWith = cloneDeepWith, 
                    lodash.cloneWith = cloneWith, lodash.deburr = deburr, lodash.endsWith = endsWith, 
                    lodash.eq = eq, lodash.escape = escape, lodash.escapeRegExp = escapeRegExp, lodash.every = every, 
                    lodash.find = find, lodash.findIndex = findIndex, lodash.findKey = findKey, lodash.findLast = findLast, 
                    lodash.findLastIndex = findLastIndex, lodash.findLastKey = findLastKey, lodash.floor = floor, 
                    lodash.forEach = forEach, lodash.forEachRight = forEachRight, lodash.forIn = forIn, 
                    lodash.forInRight = forInRight, lodash.forOwn = forOwn, lodash.forOwnRight = forOwnRight, 
                    lodash.get = get, lodash.gt = gt, lodash.gte = gte, lodash.has = has, lodash.hasIn = hasIn, 
                    lodash.head = head, lodash.identity = identity, lodash.includes = includes, lodash.indexOf = indexOf, 
                    lodash.inRange = inRange, lodash.invoke = invoke, lodash.isArguments = isArguments, 
                    lodash.isArray = isArray, lodash.isArrayBuffer = isArrayBuffer, lodash.isArrayLike = isArrayLike, 
                    lodash.isArrayLikeObject = isArrayLikeObject, lodash.isBoolean = isBoolean, lodash.isBuffer = isBuffer, 
                    lodash.isDate = isDate, lodash.isElement = isElement, lodash.isEmpty = isEmpty, 
                    lodash.isEqual = isEqual, lodash.isEqualWith = isEqualWith, lodash.isError = isError, 
                    lodash.isFinite = isFinite, lodash.isFunction = isFunction, lodash.isInteger = isInteger, 
                    lodash.isLength = isLength, lodash.isMap = isMap, lodash.isMatch = isMatch, lodash.isMatchWith = isMatchWith, 
                    lodash.isNaN = isNaN, lodash.isNative = isNative, lodash.isNil = isNil, lodash.isNull = isNull, 
                    lodash.isNumber = isNumber, lodash.isObject = isObject, lodash.isObjectLike = isObjectLike, 
                    lodash.isPlainObject = isPlainObject, lodash.isRegExp = isRegExp, lodash.isSafeInteger = isSafeInteger, 
                    lodash.isSet = isSet, lodash.isString = isString, lodash.isSymbol = isSymbol, lodash.isTypedArray = isTypedArray, 
                    lodash.isUndefined = isUndefined, lodash.isWeakMap = isWeakMap, lodash.isWeakSet = isWeakSet, 
                    lodash.join = join, lodash.kebabCase = kebabCase, lodash.last = last, lodash.lastIndexOf = lastIndexOf, 
                    lodash.lowerCase = lowerCase, lodash.lowerFirst = lowerFirst, lodash.lt = lt, lodash.lte = lte, 
                    lodash.max = max, lodash.maxBy = maxBy, lodash.mean = mean, lodash.min = min, lodash.minBy = minBy, 
                    lodash.noConflict = noConflict, lodash.noop = noop, lodash.now = now, lodash.pad = pad, 
                    lodash.padEnd = padEnd, lodash.padStart = padStart, lodash.parseInt = parseInt, 
                    lodash.random = random, lodash.reduce = reduce, lodash.reduceRight = reduceRight, 
                    lodash.repeat = repeat, lodash.replace = replace, lodash.result = result, lodash.round = round, 
                    lodash.runInContext = runInContext, lodash.sample = sample, lodash.size = size, 
                    lodash.snakeCase = snakeCase, lodash.some = some, lodash.sortedIndex = sortedIndex, 
                    lodash.sortedIndexBy = sortedIndexBy, lodash.sortedIndexOf = sortedIndexOf, lodash.sortedLastIndex = sortedLastIndex, 
                    lodash.sortedLastIndexBy = sortedLastIndexBy, lodash.sortedLastIndexOf = sortedLastIndexOf, 
                    lodash.startCase = startCase, lodash.startsWith = startsWith, lodash.subtract = subtract, 
                    lodash.sum = sum, lodash.sumBy = sumBy, lodash.template = template, lodash.times = times, 
                    lodash.toInteger = toInteger, lodash.toLength = toLength, lodash.toLower = toLower, 
                    lodash.toNumber = toNumber, lodash.toSafeInteger = toSafeInteger, lodash.toString = toString, 
                    lodash.toUpper = toUpper, lodash.trim = trim, lodash.trimEnd = trimEnd, lodash.trimStart = trimStart, 
                    lodash.truncate = truncate, lodash.unescape = unescape, lodash.uniqueId = uniqueId, 
                    lodash.upperCase = upperCase, lodash.upperFirst = upperFirst, lodash.each = forEach, 
                    lodash.eachRight = forEachRight, lodash.first = head, mixin(lodash, function() {
                        var source = {};
                        return baseForOwn(lodash, function(func, methodName) {
                            hasOwnProperty.call(lodash.prototype, methodName) || (source[methodName] = func);
                        }), source;
                    }(), {
                        chain: !1
                    }), lodash.VERSION = VERSION, arrayEach([ "bind", "bindKey", "curry", "curryRight", "partial", "partialRight" ], function(methodName) {
                        lodash[methodName].placeholder = lodash;
                    }), arrayEach([ "drop", "take" ], function(methodName, index) {
                        LazyWrapper.prototype[methodName] = function(n) {
                            var filtered = this.__filtered__;
                            if (filtered && !index) return new LazyWrapper(this);
                            n = n === undefined ? 1 : nativeMax(toInteger(n), 0);
                            var result = this.clone();
                            return filtered ? result.__takeCount__ = nativeMin(n, result.__takeCount__) : result.__views__.push({
                                size: nativeMin(n, MAX_ARRAY_LENGTH),
                                type: methodName + (result.__dir__ < 0 ? "Right" : "")
                            }), result;
                        }, LazyWrapper.prototype[methodName + "Right"] = function(n) {
                            return this.reverse()[methodName](n).reverse();
                        };
                    }), arrayEach([ "filter", "map", "takeWhile" ], function(methodName, index) {
                        var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
                        LazyWrapper.prototype[methodName] = function(iteratee) {
                            var result = this.clone();
                            return result.__iteratees__.push({
                                iteratee: getIteratee(iteratee, 3),
                                type: type
                            }), result.__filtered__ = result.__filtered__ || isFilter, result;
                        };
                    }), arrayEach([ "head", "last" ], function(methodName, index) {
                        var takeName = "take" + (index ? "Right" : "");
                        LazyWrapper.prototype[methodName] = function() {
                            return this[takeName](1).value()[0];
                        };
                    }), arrayEach([ "initial", "tail" ], function(methodName, index) {
                        var dropName = "drop" + (index ? "" : "Right");
                        LazyWrapper.prototype[methodName] = function() {
                            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
                        };
                    }), LazyWrapper.prototype.compact = function() {
                        return this.filter(identity);
                    }, LazyWrapper.prototype.find = function(predicate) {
                        return this.filter(predicate).head();
                    }, LazyWrapper.prototype.findLast = function(predicate) {
                        return this.reverse().find(predicate);
                    }, LazyWrapper.prototype.invokeMap = rest(function(path, args) {
                        return "function" == typeof path ? new LazyWrapper(this) : this.map(function(value) {
                            return baseInvoke(value, path, args);
                        });
                    }), LazyWrapper.prototype.reject = function(predicate) {
                        return predicate = getIteratee(predicate, 3), this.filter(function(value) {
                            return !predicate(value);
                        });
                    }, LazyWrapper.prototype.slice = function(start, end) {
                        start = toInteger(start);
                        var result = this;
                        return result.__filtered__ && (start > 0 || 0 > end) ? new LazyWrapper(result) : (0 > start ? result = result.takeRight(-start) : start && (result = result.drop(start)), 
                        end !== undefined && (end = toInteger(end), result = 0 > end ? result.dropRight(-end) : result.take(end - start)), 
                        result);
                    }, LazyWrapper.prototype.takeRightWhile = function(predicate) {
                        return this.reverse().takeWhile(predicate).reverse();
                    }, LazyWrapper.prototype.toArray = function() {
                        return this.take(MAX_ARRAY_LENGTH);
                    }, baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                        var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + ("last" == methodName ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
                        lodashFunc && (lodash.prototype[methodName] = function() {
                            var value = this.__wrapped__, args = isTaker ? [ 1 ] : arguments, isLazy = value instanceof LazyWrapper, iteratee = args[0], useLazy = isLazy || isArray(value), interceptor = function(value) {
                                var result = lodashFunc.apply(lodash, arrayPush([ value ], args));
                                return isTaker && chainAll ? result[0] : result;
                            };
                            useLazy && checkIteratee && "function" == typeof iteratee && 1 != iteratee.length && (// Avoid lazy use if the iteratee has a "length" value other than `1`.
                            isLazy = useLazy = !1);
                            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
                            if (!retUnwrapped && useLazy) {
                                value = onlyLazy ? value : new LazyWrapper(this);
                                var result = func.apply(value, args);
                                return result.__actions__.push({
                                    func: thru,
                                    args: [ interceptor ],
                                    thisArg: undefined
                                }), new LodashWrapper(result, chainAll);
                            }
                            return isUnwrapped && onlyLazy ? func.apply(this, args) : (result = this.thru(interceptor), 
                            isUnwrapped ? isTaker ? result.value()[0] : result.value() : result);
                        });
                    }), arrayEach([ "pop", "push", "shift", "sort", "splice", "unshift" ], function(methodName) {
                        var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
                        lodash.prototype[methodName] = function() {
                            var args = arguments;
                            return retUnwrapped && !this.__chain__ ? func.apply(this.value(), args) : this[chainName](function(value) {
                                return func.apply(value, args);
                            });
                        };
                    }), baseForOwn(LazyWrapper.prototype, function(func, methodName) {
                        var lodashFunc = lodash[methodName];
                        if (lodashFunc) {
                            var key = lodashFunc.name + "", names = realNames[key] || (realNames[key] = []);
                            names.push({
                                name: methodName,
                                func: lodashFunc
                            });
                        }
                    }), realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [ {
                        name: "wrapper",
                        func: undefined
                    } ], LazyWrapper.prototype.clone = lazyClone, LazyWrapper.prototype.reverse = lazyReverse, 
                    LazyWrapper.prototype.value = lazyValue, lodash.prototype.at = wrapperAt, lodash.prototype.chain = wrapperChain, 
                    lodash.prototype.commit = wrapperCommit, lodash.prototype.flatMap = wrapperFlatMap, 
                    lodash.prototype.next = wrapperNext, lodash.prototype.plant = wrapperPlant, lodash.prototype.reverse = wrapperReverse, 
                    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue, 
                    iteratorSymbol && (lodash.prototype[iteratorSymbol] = wrapperToIterator), lodash;
                }
                /** Used as a safe reference for `undefined` in pre-ES5 environments. */
                var undefined, VERSION = "4.3.0", BIND_FLAG = 1, BIND_KEY_FLAG = 2, CURRY_BOUND_FLAG = 4, CURRY_FLAG = 8, CURRY_RIGHT_FLAG = 16, PARTIAL_FLAG = 32, PARTIAL_RIGHT_FLAG = 64, ARY_FLAG = 128, REARG_FLAG = 256, FLIP_FLAG = 512, UNORDERED_COMPARE_FLAG = 1, PARTIAL_COMPARE_FLAG = 2, DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...", HOT_COUNT = 150, HOT_SPAN = 16, LARGE_ARRAY_SIZE = 200, LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3, FUNC_ERROR_TEXT = "Expected a function", HASH_UNDEFINED = "__lodash_hash_undefined__", INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 1.7976931348623157e308, NAN = NaN, MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1, PLACEHOLDER = "__lodash_placeholder__", argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]", arrayBufferTag = "[object ArrayBuffer]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]", reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g, reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g, reUnescapedHtml = /[&<>"'`]/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source), reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g, reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g, reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source), reTrim = /^\s+|\s+$/g, reTrimStart = /^\s+/, reTrimEnd = /\s+$/, reEscapeChar = /\\(\\)?/g, reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, reFlags = /\w*$/, reHasHexPrefix = /^0x/i, reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsHostCtor = /^\[object .+?Constructor\]$/, reIsOctal = /^0o[0-7]+$/i, reIsUint = /^(?:0|[1-9]\d*)$/, reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g, reNoMatch = /($^)/, reUnescapedString = /['\n\r\u2028\u2029\\]/g, rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23", rsComboSymbolsRange = "\\u20d0-\\u20f0", rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsQuoteRange = "\\u2018\\u2019\\u201c\\u201d", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsQuoteRange + rsSpaceRange, rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d", rsLowerMisc = "(?:" + rsLower + "|" + rsMisc + ")", rsUpperMisc = "(?:" + rsUpper + "|" + rsMisc + ")", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [ rsNonAstral, rsRegional, rsSurrPair ].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [ rsDingbat, rsRegional, rsSurrPair ].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [ rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral ].join("|") + ")", reComboMark = RegExp(rsCombo, "g"), reComplexSymbol = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g"), reHasComplexSymbol = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]"), reBasicWord = /[a-zA-Z0-9]+/g, reComplexWord = RegExp([ rsUpper + "?" + rsLower + "+(?=" + [ rsBreak, rsUpper, "$" ].join("|") + ")", rsUpperMisc + "+(?=" + [ rsBreak, rsUpper + rsLowerMisc, "$" ].join("|") + ")", rsUpper + "?" + rsLowerMisc + "+", rsUpper + "+", rsDigits, rsEmoji ].join("|"), "g"), reHasComplexWord = /[a-z][A-Z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, contextProps = [ "Array", "Buffer", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Reflect", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout" ], templateCounter = -1, typedArrayTags = {};
                typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = !0, 
                typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = !1;
                /** Used to identify `toStringTag` values supported by `_.clone`. */
                var cloneableTags = {};
                cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = !0, 
                cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = !1;
                /** Used to map latin-1 supplementary letters to basic latin letters. */
                var deburredLetters = {
                    "À": "A",
                    "Á": "A",
                    "Â": "A",
                    "Ã": "A",
                    "Ä": "A",
                    "Å": "A",
                    "à": "a",
                    "á": "a",
                    "â": "a",
                    "ã": "a",
                    "ä": "a",
                    "å": "a",
                    "Ç": "C",
                    "ç": "c",
                    "Ð": "D",
                    "ð": "d",
                    "È": "E",
                    "É": "E",
                    "Ê": "E",
                    "Ë": "E",
                    "è": "e",
                    "é": "e",
                    "ê": "e",
                    "ë": "e",
                    "Ì": "I",
                    "Í": "I",
                    "Î": "I",
                    "Ï": "I",
                    "ì": "i",
                    "í": "i",
                    "î": "i",
                    "ï": "i",
                    "Ñ": "N",
                    "ñ": "n",
                    "Ò": "O",
                    "Ó": "O",
                    "Ô": "O",
                    "Õ": "O",
                    "Ö": "O",
                    "Ø": "O",
                    "ò": "o",
                    "ó": "o",
                    "ô": "o",
                    "õ": "o",
                    "ö": "o",
                    "ø": "o",
                    "Ù": "U",
                    "Ú": "U",
                    "Û": "U",
                    "Ü": "U",
                    "ù": "u",
                    "ú": "u",
                    "û": "u",
                    "ü": "u",
                    "Ý": "Y",
                    "ý": "y",
                    "ÿ": "y",
                    "Æ": "Ae",
                    "æ": "ae",
                    "Þ": "Th",
                    "þ": "th",
                    "ß": "ss"
                }, htmlEscapes = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "`": "&#96;"
                }, htmlUnescapes = {
                    "&amp;": "&",
                    "&lt;": "<",
                    "&gt;": ">",
                    "&quot;": '"',
                    "&#39;": "'",
                    "&#96;": "`"
                }, objectTypes = {
                    "function": !0,
                    object: !0
                }, stringEscapes = {
                    "\\": "\\",
                    "'": "'",
                    "\n": "n",
                    "\r": "r",
                    "\u2028": "u2028",
                    "\u2029": "u2029"
                }, freeParseFloat = parseFloat, freeParseInt = parseInt, freeExports = objectTypes[typeof exports] && exports && !exports.nodeType ? exports : null, freeModule = objectTypes[typeof module] && module && !module.nodeType ? module : null, freeGlobal = checkGlobal(freeExports && freeModule && "object" == typeof global && global), freeSelf = checkGlobal(objectTypes[typeof self] && self), freeWindow = checkGlobal(objectTypes[typeof window] && window), moduleExports = freeModule && freeModule.exports === freeExports ? freeExports : null, thisGlobal = checkGlobal(objectTypes[typeof this] && this), root = freeGlobal || freeWindow !== (thisGlobal && thisGlobal.window) && freeWindow || freeSelf || thisGlobal || Function("return this")(), _ = runInContext();
                // Expose lodash on the free variable `window` or `self` when available. This
                // prevents errors in cases where lodash is loaded by a script tag in the presence
                // of an AMD loader. See http://requirejs.org/docs/errors.html#mismatch for more details.
                (freeWindow || freeSelf || {})._ = _, __WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return _;
                }.call(exports, __webpack_require__, exports, module), !(__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }).call(this);
        }).call(exports, __webpack_require__(9)(module), function() {
            return this;
        }());
    }, /* 7 */
    /***/
    function(module, exports) {
        function cleanUpNextTick() {
            draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue();
        }
        function drainQueue() {
            if (!draining) {
                var timeout = setTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, clearTimeout(timeout);
            }
        }
        // v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        // shim for using process in browser
        var currentQueue, process = module.exports = {}, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || setTimeout(drainQueue, 0);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", // empty string to avoid regexp issues
        process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, 
        process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, /* 8 */
    /***/
    function(module, exports) {
        function normalize(str) {
            return str.replace(/[\/]+/g, "/").replace(/\/\?/g, "?").replace(/\/\#/g, "#").replace(/\:\//g, "://");
        }
        module.exports = function() {
            var joined = [].slice.call(arguments, 0).join("/");
            return normalize(joined);
        };
    }, /* 9 */
    /***/
    function(module, exports) {
        module.exports = function(module) {
            // module.parent = undefined by default
            return module.webpackPolyfill || (module.deprecate = function() {}, module.paths = [], 
            module.children = [], module.webpackPolyfill = 1), module;
        };
    }, /* 10 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _resource = __webpack_require__(1), _resource2 = _interopRequireDefault(_resource), Channel = function(_Resource) {
            function Channel(client, id) {
                return _classCallCheck(this, Channel), _possibleConstructorReturn(this, Object.getPrototypeOf(Channel).call(this, client, "channel", id));
            }
            return _inherits(Channel, _Resource), Channel;
        }(_resource2["default"]);
        exports["default"] = Channel;
    }, /* 11 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function makeResource(client, singleName, collectionName, id) {
            switch (collectionName.toLowerCase()) {
              case "users":
                return new _user2["default"](client, id);

              case "channels":
                return new _channel2["default"](client, id);

              case "threads":
                return new _thread2["default"](client, id);

              case "messages":
                return new _message2["default"](client, id);

              default:
                return new _resource2["default"](client, singleName, id);
            }
        }
        function makeCollection(client, collectionName) {
            var collection = new _collection2["default"](client, collectionName), documentFn = function(id) {
                return id ? makeResource(client, collectionName, id) : collection;
            }, _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
            try {
                for (var _step, _iterator = Object.getOwnPropertyNames(Object.getPrototypeOf(collection))[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                    var name = _step.value, method = collection[name];
                    _lodash2["default"].isFunction(method) && (documentFn[name] = collection[name].bind(collection));
                }
            } catch (err) {
                _didIteratorError = !0, _iteratorError = err;
            } finally {
                try {
                    !_iteratorNormalCompletion && _iterator["return"] && _iterator["return"]();
                } finally {
                    if (_didIteratorError) throw _iteratorError;
                }
            }
            return documentFn;
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
            }
            return target;
        }, _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _resource = __webpack_require__(1), _resource2 = _interopRequireDefault(_resource), _user = __webpack_require__(17), _user2 = _interopRequireDefault(_user), _channel = __webpack_require__(10), _channel2 = _interopRequireDefault(_channel), _thread = __webpack_require__(16), _thread2 = _interopRequireDefault(_thread), _message = __webpack_require__(14), _message2 = _interopRequireDefault(_message), _collection = __webpack_require__(12), _collection2 = _interopRequireDefault(_collection), _mimeType = __webpack_require__(15), _mimeType2 = _interopRequireDefault(_mimeType), _urlJoin = __webpack_require__(8), _urlJoin2 = _interopRequireDefault(_urlJoin), _lodash = __webpack_require__(6), _lodash2 = _interopRequireDefault(_lodash);
        __webpack_require__(21).polyfill(), __webpack_require__(23);
        var defaultOptions = {
            endpoint: "",
            token: ""
        }, HubClient = function() {
            function HubClient() {
                var options = arguments.length <= 0 || void 0 === arguments[0] ? defaultOptions : arguments[0];
                _classCallCheck(this, HubClient), this.options = options, this.token = options.token, 
                this.endpoint = options.endpoint, this.users = makeCollection(this, "user", "users"), 
                this.channels = makeCollection(this, "channel", "channels"), this.threads = makeCollection(this, "thread", "threads"), 
                this.messages = makeCollection(this, "message", "messages");
            }
            return _createClass(HubClient, [ {
                key: "absurl",
                value: function(url) {
                    return this.endpoint ? (0, _urlJoin2["default"])(this.endpoint, url) : url;
                }
            }, {
                key: "fetchJSON",
                value: function(url) {
                    var options = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], opts = _extends({
                        headers: {
                            // TODO support basic auth
                            Authorization: "Bearer  " + this.token,
                            Accept: _mimeType2["default"].json
                        }
                    }, options);
                    return fetch(this.absurl(url), opts).then(function(response) {
                        return response.json();
                    });
                }
            }, {
                key: "delete",
                value: function(url) {
                    return this.fetchJSON(url, {
                        method: "delete"
                    });
                }
            }, {
                key: "logout",
                value: function() {
                    return this.fetchJSON("/api/logout", {
                        method: "post"
                    });
                }
            } ]), HubClient;
        }();
        exports["default"] = HubClient;
    }, /* 12 */
    /***/
    function(module, exports) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), ResourceCollection = function() {
            function ResourceCollection(client, name) {
                _classCallCheck(this, ResourceCollection), this.client = client, this.name = name;
            }
            return _createClass(ResourceCollection, [ {
                key: "load",
                value: function() {
                    return this.client.fetchJSON("/api/" + this.name);
                }
            }, {
                key: "scan",
                value: function() {
                    return this.load();
                }
            } ]), ResourceCollection;
        }();
        exports["default"] = ResourceCollection;
    }, /* 13 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                    "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
                Constructor;
            };
        }(), _eventemitter = __webpack_require__(22), _eventemitter2 = _interopRequireDefault(_eventemitter), _callbackQueue = __webpack_require__(18), _callbackQueue2 = _interopRequireDefault(_callbackQueue), _urlJoin = __webpack_require__(8), _urlJoin2 = _interopRequireDefault(_urlJoin), _queryString = __webpack_require__(38), _queryString2 = _interopRequireDefault(_queryString), _lodash = __webpack_require__(6), _lodash2 = _interopRequireDefault(_lodash), EventStream = function(_EventEmitter) {
            function EventStream(options) {
                _classCallCheck(this, EventStream);
                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventStream).call(this));
                return options && options.url && options.token && _this.open(options), _this;
            }
            return _inherits(EventStream, _EventEmitter), _createClass(EventStream, [ {
                key: "open",
                value: function(options) {
                    this.close();
                    var params = _queryString2["default"].stringify({
                        auth_token: options.token
                    }), url = (0, _urlJoin2["default"])(options.url, "?" + params), source = new EventSource(url), self = this;
                    this.source = source, source.onerror = function(err) {
                        console.log("SSE error:", err), self.emit("error", err);
                    }, source.onmessage = function(e) {
                        var msg = _lodash2["default"].isString(e.data) ? JSON.parse(e.data) : e.data;
                        console.log("SSE message:", msg), self.handleEvent(msg);
                    };
                }
            }, {
                key: "close",
                value: function() {
                    var source = this.source;
                    this.source = null, source && source.close();
                }
            }, {
                key: "handleEvent",
                value: function(e) {
                    var action = (e.action || "").toLowerCase(), id = e.resource_id, data = e.body, type = (e.type || "").toUpperCase(), eventType = action.toUpperCase() + "_" + type;
                    "delete" === action && (data = id);
                    var self = this, cb = _callbackQueue2["default"].add(e.id, function() {
                        self.emit(eventType, data);
                    });
                    cb();
                }
            } ]), EventStream;
        }(_eventemitter2["default"]);
        exports["default"] = EventStream;
    }, /* 14 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _resource = __webpack_require__(1), _resource2 = _interopRequireDefault(_resource), Message = function(_Resource) {
            function Message(client, id) {
                return _classCallCheck(this, Message), _possibleConstructorReturn(this, Object.getPrototypeOf(Message).call(this, client, "message", id));
            }
            return _inherits(Message, _Resource), Message;
        }(_resource2["default"]);
        exports["default"] = Message;
    }, /* 15 */
    /***/
    function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var mimeType = exports.mimeType = {
            json: "application/json"
        };
        exports["default"] = mimeType;
    }, /* 16 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _resource = __webpack_require__(1), _resource2 = _interopRequireDefault(_resource), Thread = function(_Resource) {
            function Thread(client, id) {
                return _classCallCheck(this, Thread), _possibleConstructorReturn(this, Object.getPrototypeOf(Thread).call(this, client, "thread", id));
            }
            return _inherits(Thread, _Resource), Thread;
        }(_resource2["default"]);
        exports["default"] = Thread;
    }, /* 17 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                "default": obj
            };
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" != typeof call && "function" != typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _resource = __webpack_require__(1), _resource2 = _interopRequireDefault(_resource), User = function(_Resource) {
            function User(client, id) {
                return _classCallCheck(this, User), _possibleConstructorReturn(this, Object.getPrototypeOf(User).call(this, client, "user", id));
            }
            return _inherits(User, _Resource), User;
        }(_resource2["default"]);
        exports["default"] = User;
    }, /* 18 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(setImmediate, process) {
            "use strict";
            /**
	 * Performs cleanup on queue object
	 * @param  {String} key
	 */
            function cleanup(key) {
                callbackQueue[key] = null, ++nulls > nullThreshold && (callbackQueue = omit(callbackQueue, function(datum) {
                    return null === datum;
                }));
            }
            /**
	 * Iterates over callbacks and calls them with passed args
	 * @param {Array} bucket
	 * @param {Array} args
	 */
            function iterateOverCallbacks(bucket, args) {
                bucket.forEach(function(callback) {
                    nextTick(function() {
                        callback.apply(null, args);
                    });
                });
            }
            var omit = __webpack_require__(35), debug = __webpack_require__(19)("callback-queue"), callbackQueue = {}, nulls = 0, nextTick = "function" == typeof setImmediate && setImmediate || process.nextTick, isArray = Array.isArray, nullThreshold = process && {
                NODE_ENV: "production"
            } && {
                NODE_ENV: "production"
            }.NULL_THRESHOLD || 100;
            /**
	 * Adds callback into queue based on `key` argument
	 * If this is the first callback in the queue, wrapped callback will
	 * be returned, which should be called when any function that you want to perform
	 * will complete. If there are already callbacks in the queue, returns Boolean false,
	 * which indicates that you must not call the function, as it was already called and is
	 * currently in progress
	 *
	 * @param {String}   key      - unique key, based on which requests are bucketed
	 * @param {Function} callback - callback that should be added into requests queue
	 */
            exports.add = function(key, callback) {
                if ("string" != typeof key || !key) throw new Error("key must be a truthy string");
                if ("function" != typeof callback) throw new Error("callback must be a function");
                var bucket = callbackQueue[key];
                return isArray(bucket) ? (bucket.push(callback), !1) : (callbackQueue[key] = [ callback ], 
                function() {
                    // its essential that we do not use any reference, because of garbabe collection
                    // when object reaches certain number of nullified values - its recreated using compactObject
                    // function. Therefore we need to grab a reference when callback needs to be invoked and not at
                    // other time
                    var callbacks = callbackQueue[key];
                    if (debug("calling callback for key %s", key), !isArray(callbacks)) return debug("Callbacks couldn't be invoked: ", callbacks), 
                    void (bucket = null);
                    debug("Invoked callback %s", key);
                    for (var len = arguments.length, args = new Array(len), i = 0; len > i; i++) args[i] = arguments[i];
                    iterateOverCallbacks(callbacks, args), cleanup(key);
                });
            }, /**
	 * Call this if you are absolutely sure you need to abort the request
	 * Every callback in the queue will be called with a passed error object.
	 * Make sure that previously returned callback is not called at a later time,
	 * because if you create a bucket after removing it and then previously returned
	 * callback is executed, it will introduces bugs into your code
	 *
	 * @param  {String} key
	 * @param  {Error}  error
	 */
            exports.remove = function(key, error) {
                var bucket = callbackQueue[key];
                // possibly it was already called -> return false
                if (!isArray(bucket)) return !1;
                if (error instanceof Error != !0) throw new Error("you must pass an instance of Error object when canceling requests");
                iterateOverCallbacks(bucket, [ error ]), cleanup(key);
            };
        }).call(exports, __webpack_require__(2).setImmediate, __webpack_require__(7));
    }, /* 19 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
        function useColors() {
            // is webkit? http://stackoverflow.com/a/16459606/376773
            // is firebug? http://stackoverflow.com/a/398120/376773
            // is firefox >= v31?
            // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
            return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
        }
        /**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
        function formatArgs() {
            var args = arguments, useColors = this.useColors;
            if (args[0] = (useColors ? "%c" : "") + this.namespace + (useColors ? " %c" : " ") + args[0] + (useColors ? "%c " : " ") + "+" + exports.humanize(this.diff), 
            !useColors) return args;
            var c = "color: " + this.color;
            args = [ args[0], c, "color: inherit" ].concat(Array.prototype.slice.call(args, 1));
            // the final "%c" is somewhat tricky, because there could be other
            // arguments passed either before or after the %c, so we need to
            // figure out the correct index to insert the CSS into
            var index = 0, lastC = 0;
            return args[0].replace(/%[a-z%]/g, function(match) {
                "%%" !== match && (index++, "%c" === match && (// we only are interested in the *last* %c
                // (the user may have provided their own)
                lastC = index));
            }), args.splice(lastC, 0, c), args;
        }
        /**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
        function log() {
            // this hackery is required for IE8/9, where
            // the `console.log` function doesn't have 'apply'
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
        }
        /**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
        function save(namespaces) {
            try {
                null == namespaces ? exports.storage.removeItem("debug") : exports.storage.debug = namespaces;
            } catch (e) {}
        }
        /**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
        function load() {
            var r;
            try {
                r = exports.storage.debug;
            } catch (e) {}
            return r;
        }
        /**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
        function localstorage() {
            try {
                return window.localStorage;
            } catch (e) {}
        }
        exports = module.exports = __webpack_require__(20), exports.log = log, exports.formatArgs = formatArgs, 
        exports.save = save, exports.load = load, exports.useColors = useColors, exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage(), 
        exports.colors = [ "lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson" ], 
        exports.formatters.j = function(v) {
            return JSON.stringify(v);
        }, exports.enable(load());
    }, /* 20 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
        function selectColor() {
            return exports.colors[prevColor++ % exports.colors.length];
        }
        /**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
        function debug(namespace) {
            // define the `disabled` version
            function disabled() {}
            // define the `enabled` version
            function enabled() {
                var self = enabled, curr = +new Date(), ms = curr - (prevTime || curr);
                self.diff = ms, self.prev = prevTime, self.curr = curr, prevTime = curr, null == self.useColors && (self.useColors = exports.useColors()), 
                null == self.color && self.useColors && (self.color = selectColor());
                var args = Array.prototype.slice.call(arguments);
                args[0] = exports.coerce(args[0]), "string" != typeof args[0] && (// anything else let's inspect with %o
                args = [ "%o" ].concat(args));
                // apply any `formatters` transformations
                var index = 0;
                args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
                    // if we encounter an escaped % then don't increase the array index
                    if ("%%" === match) return match;
                    index++;
                    var formatter = exports.formatters[format];
                    if ("function" == typeof formatter) {
                        var val = args[index];
                        match = formatter.call(self, val), // now we need to remove `args[index]` since it's inlined in the `format`
                        args.splice(index, 1), index--;
                    }
                    return match;
                }), "function" == typeof exports.formatArgs && (args = exports.formatArgs.apply(self, args));
                var logFn = enabled.log || exports.log || console.log.bind(console);
                logFn.apply(self, args);
            }
            disabled.enabled = !1, enabled.enabled = !0;
            var fn = exports.enabled(namespace) ? enabled : disabled;
            return fn.namespace = namespace, fn;
        }
        /**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
        function enable(namespaces) {
            exports.save(namespaces);
            for (var split = (namespaces || "").split(/[\s,]+/), len = split.length, i = 0; len > i; i++) split[i] && (namespaces = split[i].replace(/\*/g, ".*?"), 
            "-" === namespaces[0] ? exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$")) : exports.names.push(new RegExp("^" + namespaces + "$")));
        }
        /**
	 * Disable debug output.
	 *
	 * @api public
	 */
        function disable() {
            exports.enable("");
        }
        /**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
        function enabled(name) {
            var i, len;
            for (i = 0, len = exports.skips.length; len > i; i++) if (exports.skips[i].test(name)) return !1;
            for (i = 0, len = exports.names.length; len > i; i++) if (exports.names[i].test(name)) return !0;
            return !1;
        }
        /**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
        function coerce(val) {
            return val instanceof Error ? val.stack || val.message : val;
        }
        exports = module.exports = debug, exports.coerce = coerce, exports.disable = disable, 
        exports.enable = enable, exports.enabled = enabled, exports.humanize = __webpack_require__(37), 
        exports.names = [], exports.skips = [], exports.formatters = {};
        /**
	 * Previously assigned color.
	 */
        var prevTime, prevColor = 0;
    }, /* 21 */
    /***/
    function(module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_RESULT__;
        /* WEBPACK VAR INJECTION */ (function(process, global, module) {
            /*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.1.2
	 */
            (function() {
                "use strict";
                function lib$es6$promise$utils$$objectOrFunction(x) {
                    return "function" == typeof x || "object" == typeof x && null !== x;
                }
                function lib$es6$promise$utils$$isFunction(x) {
                    return "function" == typeof x;
                }
                function lib$es6$promise$asap$$setScheduler(scheduleFn) {
                    lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
                }
                function lib$es6$promise$asap$$setAsap(asapFn) {
                    lib$es6$promise$asap$$asap = asapFn;
                }
                // node
                function lib$es6$promise$asap$$useNextTick() {
                    // node version 0.10.x displays a deprecation warning when nextTick is used recursively
                    // see https://github.com/cujojs/when/issues/410 for details
                    return function() {
                        process.nextTick(lib$es6$promise$asap$$flush);
                    };
                }
                // vertx
                function lib$es6$promise$asap$$useVertxTimer() {
                    return function() {
                        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
                    };
                }
                function lib$es6$promise$asap$$useMutationObserver() {
                    var iterations = 0, observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush), node = document.createTextNode("");
                    return observer.observe(node, {
                        characterData: !0
                    }), function() {
                        node.data = iterations = ++iterations % 2;
                    };
                }
                // web worker
                function lib$es6$promise$asap$$useMessageChannel() {
                    var channel = new MessageChannel();
                    return channel.port1.onmessage = lib$es6$promise$asap$$flush, function() {
                        channel.port2.postMessage(0);
                    };
                }
                function lib$es6$promise$asap$$useSetTimeout() {
                    return function() {
                        setTimeout(lib$es6$promise$asap$$flush, 1);
                    };
                }
                function lib$es6$promise$asap$$flush() {
                    for (var i = 0; lib$es6$promise$asap$$len > i; i += 2) {
                        var callback = lib$es6$promise$asap$$queue[i], arg = lib$es6$promise$asap$$queue[i + 1];
                        callback(arg), lib$es6$promise$asap$$queue[i] = void 0, lib$es6$promise$asap$$queue[i + 1] = void 0;
                    }
                    lib$es6$promise$asap$$len = 0;
                }
                function lib$es6$promise$asap$$attemptVertx() {
                    try {
                        var vertx = __webpack_require__(43);
                        return lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext, 
                        lib$es6$promise$asap$$useVertxTimer();
                    } catch (e) {
                        return lib$es6$promise$asap$$useSetTimeout();
                    }
                }
                function lib$es6$promise$then$$then(onFulfillment, onRejection) {
                    var parent = this, state = parent._state;
                    if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) return this;
                    var child = new this.constructor(lib$es6$promise$$internal$$noop), result = parent._result;
                    if (state) {
                        var callback = arguments[state - 1];
                        lib$es6$promise$asap$$asap(function() {
                            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
                        });
                    } else lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
                    return child;
                }
                function lib$es6$promise$promise$resolve$$resolve(object) {
                    /*jshint validthis:true */
                    var Constructor = this;
                    if (object && "object" == typeof object && object.constructor === Constructor) return object;
                    var promise = new Constructor(lib$es6$promise$$internal$$noop);
                    return lib$es6$promise$$internal$$resolve(promise, object), promise;
                }
                function lib$es6$promise$$internal$$noop() {}
                function lib$es6$promise$$internal$$selfFulfillment() {
                    return new TypeError("You cannot resolve a promise with itself");
                }
                function lib$es6$promise$$internal$$cannotReturnOwn() {
                    return new TypeError("A promises callback cannot return that same promise.");
                }
                function lib$es6$promise$$internal$$getThen(promise) {
                    try {
                        return promise.then;
                    } catch (error) {
                        return lib$es6$promise$$internal$$GET_THEN_ERROR.error = error, lib$es6$promise$$internal$$GET_THEN_ERROR;
                    }
                }
                function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
                    try {
                        then.call(value, fulfillmentHandler, rejectionHandler);
                    } catch (e) {
                        return e;
                    }
                }
                function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
                    lib$es6$promise$asap$$asap(function(promise) {
                        var sealed = !1, error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
                            sealed || (sealed = !0, thenable !== value ? lib$es6$promise$$internal$$resolve(promise, value) : lib$es6$promise$$internal$$fulfill(promise, value));
                        }, function(reason) {
                            sealed || (sealed = !0, lib$es6$promise$$internal$$reject(promise, reason));
                        }, "Settle: " + (promise._label || " unknown promise"));
                        !sealed && error && (sealed = !0, lib$es6$promise$$internal$$reject(promise, error));
                    }, promise);
                }
                function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
                    thenable._state === lib$es6$promise$$internal$$FULFILLED ? lib$es6$promise$$internal$$fulfill(promise, thenable._result) : thenable._state === lib$es6$promise$$internal$$REJECTED ? lib$es6$promise$$internal$$reject(promise, thenable._result) : lib$es6$promise$$internal$$subscribe(thenable, void 0, function(value) {
                        lib$es6$promise$$internal$$resolve(promise, value);
                    }, function(reason) {
                        lib$es6$promise$$internal$$reject(promise, reason);
                    });
                }
                function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
                    maybeThenable.constructor === promise.constructor && then === lib$es6$promise$then$$default && constructor.resolve === lib$es6$promise$promise$resolve$$default ? lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable) : then === lib$es6$promise$$internal$$GET_THEN_ERROR ? lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error) : void 0 === then ? lib$es6$promise$$internal$$fulfill(promise, maybeThenable) : lib$es6$promise$utils$$isFunction(then) ? lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then) : lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
                }
                function lib$es6$promise$$internal$$resolve(promise, value) {
                    promise === value ? lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment()) : lib$es6$promise$utils$$objectOrFunction(value) ? lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value)) : lib$es6$promise$$internal$$fulfill(promise, value);
                }
                function lib$es6$promise$$internal$$publishRejection(promise) {
                    promise._onerror && promise._onerror(promise._result), lib$es6$promise$$internal$$publish(promise);
                }
                function lib$es6$promise$$internal$$fulfill(promise, value) {
                    promise._state === lib$es6$promise$$internal$$PENDING && (promise._result = value, 
                    promise._state = lib$es6$promise$$internal$$FULFILLED, 0 !== promise._subscribers.length && lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise));
                }
                function lib$es6$promise$$internal$$reject(promise, reason) {
                    promise._state === lib$es6$promise$$internal$$PENDING && (promise._state = lib$es6$promise$$internal$$REJECTED, 
                    promise._result = reason, lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise));
                }
                function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
                    var subscribers = parent._subscribers, length = subscribers.length;
                    parent._onerror = null, subscribers[length] = child, subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment, 
                    subscribers[length + lib$es6$promise$$internal$$REJECTED] = onRejection, 0 === length && parent._state && lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
                }
                function lib$es6$promise$$internal$$publish(promise) {
                    var subscribers = promise._subscribers, settled = promise._state;
                    if (0 !== subscribers.length) {
                        for (var child, callback, detail = promise._result, i = 0; i < subscribers.length; i += 3) child = subscribers[i], 
                        callback = subscribers[i + settled], child ? lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail) : callback(detail);
                        promise._subscribers.length = 0;
                    }
                }
                function lib$es6$promise$$internal$$ErrorObject() {
                    this.error = null;
                }
                function lib$es6$promise$$internal$$tryCatch(callback, detail) {
                    try {
                        return callback(detail);
                    } catch (e) {
                        return lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e, lib$es6$promise$$internal$$TRY_CATCH_ERROR;
                    }
                }
                function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
                    var value, error, succeeded, failed, hasCallback = lib$es6$promise$utils$$isFunction(callback);
                    if (hasCallback) {
                        if (value = lib$es6$promise$$internal$$tryCatch(callback, detail), value === lib$es6$promise$$internal$$TRY_CATCH_ERROR ? (failed = !0, 
                        error = value.error, value = null) : succeeded = !0, promise === value) return void lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
                    } else value = detail, succeeded = !0;
                    promise._state !== lib$es6$promise$$internal$$PENDING || (hasCallback && succeeded ? lib$es6$promise$$internal$$resolve(promise, value) : failed ? lib$es6$promise$$internal$$reject(promise, error) : settled === lib$es6$promise$$internal$$FULFILLED ? lib$es6$promise$$internal$$fulfill(promise, value) : settled === lib$es6$promise$$internal$$REJECTED && lib$es6$promise$$internal$$reject(promise, value));
                }
                function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
                    try {
                        resolver(function(value) {
                            lib$es6$promise$$internal$$resolve(promise, value);
                        }, function(reason) {
                            lib$es6$promise$$internal$$reject(promise, reason);
                        });
                    } catch (e) {
                        lib$es6$promise$$internal$$reject(promise, e);
                    }
                }
                function lib$es6$promise$promise$all$$all(entries) {
                    return new lib$es6$promise$enumerator$$default(this, entries).promise;
                }
                function lib$es6$promise$promise$race$$race(entries) {
                    function onFulfillment(value) {
                        lib$es6$promise$$internal$$resolve(promise, value);
                    }
                    function onRejection(reason) {
                        lib$es6$promise$$internal$$reject(promise, reason);
                    }
                    /*jshint validthis:true */
                    var Constructor = this, promise = new Constructor(lib$es6$promise$$internal$$noop);
                    if (!lib$es6$promise$utils$$isArray(entries)) return lib$es6$promise$$internal$$reject(promise, new TypeError("You must pass an array to race.")), 
                    promise;
                    for (var length = entries.length, i = 0; promise._state === lib$es6$promise$$internal$$PENDING && length > i; i++) lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), void 0, onFulfillment, onRejection);
                    return promise;
                }
                function lib$es6$promise$promise$reject$$reject(reason) {
                    /*jshint validthis:true */
                    var Constructor = this, promise = new Constructor(lib$es6$promise$$internal$$noop);
                    return lib$es6$promise$$internal$$reject(promise, reason), promise;
                }
                function lib$es6$promise$promise$$needsResolver() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                }
                function lib$es6$promise$promise$$needsNew() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                }
                /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
                function lib$es6$promise$promise$$Promise(resolver) {
                    this._id = lib$es6$promise$promise$$counter++, this._state = void 0, this._result = void 0, 
                    this._subscribers = [], lib$es6$promise$$internal$$noop !== resolver && ("function" != typeof resolver && lib$es6$promise$promise$$needsResolver(), 
                    this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew());
                }
                function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
                    this._instanceConstructor = Constructor, this.promise = new Constructor(lib$es6$promise$$internal$$noop), 
                    Array.isArray(input) ? (this._input = input, this.length = input.length, this._remaining = input.length, 
                    this._result = new Array(this.length), 0 === this.length ? lib$es6$promise$$internal$$fulfill(this.promise, this._result) : (this.length = this.length || 0, 
                    this._enumerate(), 0 === this._remaining && lib$es6$promise$$internal$$fulfill(this.promise, this._result))) : lib$es6$promise$$internal$$reject(this.promise, this._validationError());
                }
                function lib$es6$promise$polyfill$$polyfill() {
                    var local;
                    if ("undefined" != typeof global) local = global; else if ("undefined" != typeof self) local = self; else try {
                        local = Function("return this")();
                    } catch (e) {
                        throw new Error("polyfill failed because global object is unavailable in this environment");
                    }
                    var P = local.Promise;
                    (!P || "[object Promise]" !== Object.prototype.toString.call(P.resolve()) || P.cast) && (local.Promise = lib$es6$promise$promise$$default);
                }
                var lib$es6$promise$utils$$_isArray;
                lib$es6$promise$utils$$_isArray = Array.isArray ? Array.isArray : function(x) {
                    return "[object Array]" === Object.prototype.toString.call(x);
                };
                var lib$es6$promise$asap$$vertxNext, lib$es6$promise$asap$$customSchedulerFn, lib$es6$promise$asap$$scheduleFlush, lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray, lib$es6$promise$asap$$len = 0, lib$es6$promise$asap$$asap = function(callback, arg) {
                    lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback, lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg, 
                    lib$es6$promise$asap$$len += 2, 2 === lib$es6$promise$asap$$len && (lib$es6$promise$asap$$customSchedulerFn ? lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush) : lib$es6$promise$asap$$scheduleFlush());
                }, lib$es6$promise$asap$$browserWindow = "undefined" != typeof window ? window : void 0, lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {}, lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver, lib$es6$promise$asap$$isNode = "undefined" != typeof process && "[object process]" === {}.toString.call(process), lib$es6$promise$asap$$isWorker = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, lib$es6$promise$asap$$queue = new Array(1e3);
                // Decide what async method to use to triggering processing of queued callbacks:
                lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$isNode ? lib$es6$promise$asap$$useNextTick() : lib$es6$promise$asap$$BrowserMutationObserver ? lib$es6$promise$asap$$useMutationObserver() : lib$es6$promise$asap$$isWorker ? lib$es6$promise$asap$$useMessageChannel() : void 0 === lib$es6$promise$asap$$browserWindow ? lib$es6$promise$asap$$attemptVertx() : lib$es6$promise$asap$$useSetTimeout();
                var lib$es6$promise$then$$default = lib$es6$promise$then$$then, lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve, lib$es6$promise$$internal$$PENDING = void 0, lib$es6$promise$$internal$$FULFILLED = 1, lib$es6$promise$$internal$$REJECTED = 2, lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject(), lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject(), lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all, lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race, lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject, lib$es6$promise$promise$$counter = 0, lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
                lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default, lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default, 
                lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default, 
                lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default, 
                lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler, 
                lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap, lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap, 
                lib$es6$promise$promise$$Promise.prototype = {
                    constructor: lib$es6$promise$promise$$Promise,
                    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
                    then: lib$es6$promise$then$$default,
                    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
                    "catch": function(onRejection) {
                        return this.then(null, onRejection);
                    }
                };
                var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
                lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
                    return new Error("Array Methods must be provided an Array");
                }, lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
                    for (var length = this.length, input = this._input, i = 0; this._state === lib$es6$promise$$internal$$PENDING && length > i; i++) this._eachEntry(input[i], i);
                }, lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
                    var c = this._instanceConstructor, resolve = c.resolve;
                    if (resolve === lib$es6$promise$promise$resolve$$default) {
                        var then = lib$es6$promise$$internal$$getThen(entry);
                        if (then === lib$es6$promise$then$$default && entry._state !== lib$es6$promise$$internal$$PENDING) this._settledAt(entry._state, i, entry._result); else if ("function" != typeof then) this._remaining--, 
                        this._result[i] = entry; else if (c === lib$es6$promise$promise$$default) {
                            var promise = new c(lib$es6$promise$$internal$$noop);
                            lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then), this._willSettleAt(promise, i);
                        } else this._willSettleAt(new c(function(resolve) {
                            resolve(entry);
                        }), i);
                    } else this._willSettleAt(resolve(entry), i);
                }, lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
                    var promise = this.promise;
                    promise._state === lib$es6$promise$$internal$$PENDING && (this._remaining--, state === lib$es6$promise$$internal$$REJECTED ? lib$es6$promise$$internal$$reject(promise, value) : this._result[i] = value), 
                    0 === this._remaining && lib$es6$promise$$internal$$fulfill(promise, this._result);
                }, lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
                    var enumerator = this;
                    lib$es6$promise$$internal$$subscribe(promise, void 0, function(value) {
                        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
                    }, function(reason) {
                        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
                    });
                };
                var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill, lib$es6$promise$umd$$ES6Promise = {
                    Promise: lib$es6$promise$promise$$default,
                    polyfill: lib$es6$promise$polyfill$$default
                };
                /* global define:true module:true window: true */
                __webpack_require__(41).amd ? (__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                    return lib$es6$promise$umd$$ES6Promise;
                }.call(exports, __webpack_require__, exports, module), !(void 0 !== __WEBPACK_AMD_DEFINE_RESULT__ && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))) : "undefined" != typeof module && module.exports ? module.exports = lib$es6$promise$umd$$ES6Promise : "undefined" != typeof this && (this.ES6Promise = lib$es6$promise$umd$$ES6Promise), 
                lib$es6$promise$polyfill$$default();
            }).call(this);
        }).call(exports, __webpack_require__(7), function() {
            return this;
        }(), __webpack_require__(9)(module));
    }, /* 22 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        /**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
        function EE(fn, context, once) {
            this.fn = fn, this.context = context, this.once = once || !1;
        }
        /**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
        function EventEmitter() {}
        //
        // We store our EE objects in a plain object whose properties are event names.
        // If `Object.create(null)` is not supported we prefix the event names with a
        // `~` to make sure that the built-in object properties are not overridden or
        // used as an attack vector.
        // We also assume that `Object.create(null)` is available when the event name
        // is an ES6 Symbol.
        //
        var prefix = "function" != typeof Object.create ? "~" : !1;
        /**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
        EventEmitter.prototype._events = void 0, /**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
        EventEmitter.prototype.listeners = function(event, exists) {
            var evt = prefix ? prefix + event : event, available = this._events && this._events[evt];
            if (exists) return !!available;
            if (!available) return [];
            if (available.fn) return [ available.fn ];
            for (var i = 0, l = available.length, ee = new Array(l); l > i; i++) ee[i] = available[i].fn;
            return ee;
        }, /**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
        EventEmitter.prototype.emit = function(event, a1, a2, a3, a4, a5) {
            var evt = prefix ? prefix + event : event;
            if (!this._events || !this._events[evt]) return !1;
            var args, i, listeners = this._events[evt], len = arguments.length;
            if ("function" == typeof listeners.fn) {
                switch (listeners.once && this.removeListener(event, listeners.fn, void 0, !0), 
                len) {
                  case 1:
                    return listeners.fn.call(listeners.context), !0;

                  case 2:
                    return listeners.fn.call(listeners.context, a1), !0;

                  case 3:
                    return listeners.fn.call(listeners.context, a1, a2), !0;

                  case 4:
                    return listeners.fn.call(listeners.context, a1, a2, a3), !0;

                  case 5:
                    return listeners.fn.call(listeners.context, a1, a2, a3, a4), !0;

                  case 6:
                    return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), !0;
                }
                for (i = 1, args = new Array(len - 1); len > i; i++) args[i - 1] = arguments[i];
                listeners.fn.apply(listeners.context, args);
            } else {
                var j, length = listeners.length;
                for (i = 0; length > i; i++) switch (listeners[i].once && this.removeListener(event, listeners[i].fn, void 0, !0), 
                len) {
                  case 1:
                    listeners[i].fn.call(listeners[i].context);
                    break;

                  case 2:
                    listeners[i].fn.call(listeners[i].context, a1);
                    break;

                  case 3:
                    listeners[i].fn.call(listeners[i].context, a1, a2);
                    break;

                  default:
                    if (!args) for (j = 1, args = new Array(len - 1); len > j; j++) args[j - 1] = arguments[j];
                    listeners[i].fn.apply(listeners[i].context, args);
                }
            }
            return !0;
        }, /**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
        EventEmitter.prototype.on = function(event, fn, context) {
            var listener = new EE(fn, context || this), evt = prefix ? prefix + event : event;
            return this._events || (this._events = prefix ? {} : Object.create(null)), this._events[evt] ? this._events[evt].fn ? this._events[evt] = [ this._events[evt], listener ] : this._events[evt].push(listener) : this._events[evt] = listener, 
            this;
        }, /**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
        EventEmitter.prototype.once = function(event, fn, context) {
            var listener = new EE(fn, context || this, !0), evt = prefix ? prefix + event : event;
            return this._events || (this._events = prefix ? {} : Object.create(null)), this._events[evt] ? this._events[evt].fn ? this._events[evt] = [ this._events[evt], listener ] : this._events[evt].push(listener) : this._events[evt] = listener, 
            this;
        }, /**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
        EventEmitter.prototype.removeListener = function(event, fn, context, once) {
            var evt = prefix ? prefix + event : event;
            if (!this._events || !this._events[evt]) return this;
            var listeners = this._events[evt], events = [];
            if (fn) if (listeners.fn) (listeners.fn !== fn || once && !listeners.once || context && listeners.context !== context) && events.push(listeners); else for (var i = 0, length = listeners.length; length > i; i++) (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) && events.push(listeners[i]);
            //
            // Reset the array, or remove it completely if we have no more listeners.
            //
            return events.length ? this._events[evt] = 1 === events.length ? events[0] : events : delete this._events[evt], 
            this;
        }, /**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
        EventEmitter.prototype.removeAllListeners = function(event) {
            return this._events ? (event ? delete this._events[prefix ? prefix + event : event] : this._events = prefix ? {} : Object.create(null), 
            this) : this;
        }, //
        // Alias methods names because people roll like that.
        //
        EventEmitter.prototype.off = EventEmitter.prototype.removeListener, EventEmitter.prototype.addListener = EventEmitter.prototype.on, 
        //
        // This function doesn't apply anymore.
        //
        EventEmitter.prototype.setMaxListeners = function() {
            return this;
        }, //
        // Expose the prefix.
        //
        EventEmitter.prefixed = prefix, module.exports = EventEmitter;
    }, /* 23 */
    /***/
    function(module, exports, __webpack_require__) {
        // the whatwg-fetch polyfill installs the fetch() function
        // on the global object (window or self)
        //
        // Return that as the export for use in Webpack, Browserify etc.
        __webpack_require__(42), module.exports = self.fetch.bind(self);
    }, /* 24 */
    /***/
    function(module, exports) {
        /**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands or `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
        function arrayMap(array, iteratee) {
            for (var index = -1, length = array.length, result = Array(length); ++index < length; ) result[index] = iteratee(array[index], index, array);
            return result;
        }
        module.exports = arrayMap;
    }, /* 25 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * The base implementation of `_.difference` which accepts a single array
	 * of values to exclude.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 */
        function baseDifference(array, values) {
            var length = array ? array.length : 0, result = [];
            if (!length) return result;
            var index = -1, indexOf = baseIndexOf, isCommon = !0, cache = isCommon && values.length >= LARGE_ARRAY_SIZE ? createCache(values) : null, valuesLength = values.length;
            cache && (indexOf = cacheIndexOf, isCommon = !1, values = cache);
            outer: for (;++index < length; ) {
                var value = array[index];
                if (isCommon && value === value) {
                    for (var valuesIndex = valuesLength; valuesIndex--; ) if (values[valuesIndex] === value) continue outer;
                    result.push(value);
                } else indexOf(values, value, 0) < 0 && result.push(value);
            }
            return result;
        }
        /**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        var baseIndexOf = __webpack_require__(28), cacheIndexOf = __webpack_require__(30), createCache = __webpack_require__(31), LARGE_ARRAY_SIZE = 200;
        module.exports = baseDifference;
    }, /* 26 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
        function isObjectLike(value) {
            return !!value && "object" == typeof value;
        }
        /**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
        function arrayPush(array, values) {
            for (var index = -1, length = values.length, offset = array.length; ++index < length; ) array[offset + index] = values[index];
            return array;
        }
        /**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
        function baseFlatten(array, isDeep, isStrict, result) {
            result || (result = []);
            for (var index = -1, length = array.length; ++index < length; ) {
                var value = array[index];
                isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value)) ? isDeep ? // Recursively flatten arrays (susceptible to call stack limits).
                baseFlatten(value, isDeep, isStrict, result) : arrayPush(result, value) : isStrict || (result[result.length] = value);
            }
            return result;
        }
        /**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
        function baseProperty(key) {
            return function(object) {
                return null == object ? void 0 : object[key];
            };
        }
        /**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
        function isArrayLike(value) {
            return null != value && isLength(getLength(value));
        }
        /**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
        function isLength(value) {
            return "number" == typeof value && value > -1 && value % 1 == 0 && MAX_SAFE_INTEGER >= value;
        }
        /**
	 * lodash 3.1.4 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        var isArguments = __webpack_require__(3), isArray = __webpack_require__(4), MAX_SAFE_INTEGER = 9007199254740991, getLength = baseProperty("length");
        module.exports = baseFlatten;
    }, /* 27 */
    /***/
    function(module, exports) {
        /**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
        function createBaseFor(fromRight) {
            return function(object, iteratee, keysFunc) {
                for (var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length; length--; ) {
                    var key = props[fromRight ? length : ++index];
                    if (iteratee(iterable[key], key, iterable) === !1) break;
                }
                return object;
            };
        }
        /**
	 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
        var baseFor = createBaseFor();
        module.exports = baseFor;
    }, /* 28 */
    /***/
    function(module, exports) {
        /**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
        function baseIndexOf(array, value, fromIndex) {
            if (value !== value) return indexOfNaN(array, fromIndex);
            for (var index = fromIndex - 1, length = array.length; ++index < length; ) if (array[index] === value) return index;
            return -1;
        }
        /**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 * If `fromRight` is provided elements of `array` are iterated from right to left.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
        function indexOfNaN(array, fromIndex, fromRight) {
            for (var length = array.length, index = fromIndex + (fromRight ? 0 : -1); fromRight ? index-- : ++index < length; ) {
                var other = array[index];
                if (other !== other) return index;
            }
            return -1;
        }
        module.exports = baseIndexOf;
    }, /* 29 */
    /***/
    function(module, exports) {
        /**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
        function bindCallback(func, thisArg, argCount) {
            if ("function" != typeof func) return identity;
            if (void 0 === thisArg) return func;
            switch (argCount) {
              case 1:
                return function(value) {
                    return func.call(thisArg, value);
                };

              case 3:
                return function(value, index, collection) {
                    return func.call(thisArg, value, index, collection);
                };

              case 4:
                return function(accumulator, value, index, collection) {
                    return func.call(thisArg, accumulator, value, index, collection);
                };

              case 5:
                return function(value, other, key, object, source) {
                    return func.call(thisArg, value, other, key, object, source);
                };
            }
            return function() {
                return func.apply(thisArg, arguments);
            };
        }
        /**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
        function identity(value) {
            return value;
        }
        module.exports = bindCallback;
    }, /* 30 */
    /***/
    function(module, exports) {
        /**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
        function cacheIndexOf(cache, value) {
            var data = cache.data, result = "string" == typeof value || isObject(value) ? data.set.has(value) : data.hash[value];
            return result ? 0 : -1;
        }
        /**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && ("object" == type || "function" == type);
        }
        module.exports = cacheIndexOf;
    }, /* 31 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            /**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
            function SetCache(values) {
                var length = values ? values.length : 0;
                for (this.data = {
                    hash: nativeCreate(null),
                    set: new Set()
                }; length--; ) this.push(values[length]);
            }
            /**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
            function cachePush(value) {
                var data = this.data;
                "string" == typeof value || isObject(value) ? data.set.add(value) : data.hash[value] = !0;
            }
            /**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
            function createCache(values) {
                return nativeCreate && Set ? new SetCache(values) : null;
            }
            /**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
            function isObject(value) {
                // Avoid a V8 JIT bug in Chrome 19-20.
                // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
                var type = typeof value;
                return !!value && ("object" == type || "function" == type);
            }
            /**
	 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
            var getNative = __webpack_require__(32), Set = getNative(global, "Set"), nativeCreate = getNative(Object, "create");
            // Add functions to the `Set` cache.
            SetCache.prototype.push = cachePush, module.exports = createCache;
        }).call(exports, function() {
            return this;
        }());
    }, /* 32 */
    /***/
    function(module, exports) {
        /**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
        function isObjectLike(value) {
            return !!value && "object" == typeof value;
        }
        /**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
        function getNative(object, key) {
            var value = null == object ? void 0 : object[key];
            return isNative(value) ? value : void 0;
        }
        /**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
        function isFunction(value) {
            // The use of `Object#toString` avoids issues with the `typeof` operator
            // in older versions of Chrome and Safari which return 'function' for regexes
            // and Safari 8 equivalents which return 'object' for typed array constructors.
            return isObject(value) && objToString.call(value) == funcTag;
        }
        /**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && ("object" == type || "function" == type);
        }
        /**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
        function isNative(value) {
            return null == value ? !1 : isFunction(value) ? reIsNative.test(fnToString.call(value)) : isObjectLike(value) && reIsHostCtor.test(value);
        }
        /**
	 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /** `Object#toString` result references. */
        var funcTag = "[object Function]", reIsHostCtor = /^\[object .+?Constructor\]$/, objectProto = Object.prototype, fnToString = Function.prototype.toString, hasOwnProperty = objectProto.hasOwnProperty, objToString = objectProto.toString, reIsNative = RegExp("^" + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        module.exports = getNative;
    }, /* 33 */
    /***/
    function(module, exports) {
        /**
	 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /**
	 * A specialized version of `_.pick` which picks `object` properties specified
	 * by `props`.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
        function pickByArray(object, props) {
            object = toObject(object);
            for (var index = -1, length = props.length, result = {}; ++index < length; ) {
                var key = props[index];
                key in object && (result[key] = object[key]);
            }
            return result;
        }
        /**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
        function toObject(value) {
            return isObject(value) ? value : Object(value);
        }
        /**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
        function isObject(value) {
            // Avoid a V8 JIT bug in Chrome 19-20.
            // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
            var type = typeof value;
            return !!value && ("object" == type || "function" == type);
        }
        module.exports = pickByArray;
    }, /* 34 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
        function baseForIn(object, iteratee) {
            return baseFor(object, iteratee, keysIn);
        }
        /**
	 * A specialized version of `_.pick` that picks `object` properties `predicate`
	 * returns truthy for.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Object} Returns the new object.
	 */
        function pickByCallback(object, predicate) {
            var result = {};
            return baseForIn(object, function(value, key, object) {
                predicate(value, key, object) && (result[key] = value);
            }), result;
        }
        /**
	 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        var baseFor = __webpack_require__(27), keysIn = __webpack_require__(5);
        module.exports = pickByCallback;
    }, /* 35 */
    /***/
    function(module, exports, __webpack_require__) {
        /**
	 * lodash 3.1.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        var arrayMap = __webpack_require__(24), baseDifference = __webpack_require__(25), baseFlatten = __webpack_require__(26), bindCallback = __webpack_require__(29), pickByArray = __webpack_require__(33), pickByCallback = __webpack_require__(34), keysIn = __webpack_require__(5), restParam = __webpack_require__(36), omit = restParam(function(object, props) {
            if (null == object) return {};
            if ("function" != typeof props[0]) {
                var props = arrayMap(baseFlatten(props), String);
                return pickByArray(object, baseDifference(keysIn(object), props));
            }
            var predicate = bindCallback(props[0], props[1], 3);
            return pickByCallback(object, function(value, key, object) {
                return !predicate(value, key, object);
            });
        });
        module.exports = omit;
    }, /* 36 */
    /***/
    function(module, exports) {
        /**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
        function restParam(func, start) {
            if ("function" != typeof func) throw new TypeError(FUNC_ERROR_TEXT);
            return start = nativeMax(void 0 === start ? func.length - 1 : +start || 0, 0), function() {
                for (var args = arguments, index = -1, length = nativeMax(args.length - start, 0), rest = Array(length); ++index < length; ) rest[index] = args[start + index];
                switch (start) {
                  case 0:
                    return func.call(this, rest);

                  case 1:
                    return func.call(this, args[0], rest);

                  case 2:
                    return func.call(this, args[0], args[1], rest);
                }
                var otherArgs = Array(start + 1);
                for (index = -1; ++index < start; ) otherArgs[index] = args[index];
                return otherArgs[start] = rest, func.apply(this, otherArgs);
            };
        }
        /**
	 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
        /** Used as the `TypeError` message for "Functions" methods. */
        var FUNC_ERROR_TEXT = "Expected a function", nativeMax = Math.max;
        module.exports = restParam;
    }, /* 37 */
    /***/
    function(module, exports) {
        /**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
        function parse(str) {
            if (str = "" + str, !(str.length > 1e4)) {
                var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
                if (match) {
                    var n = parseFloat(match[1]), type = (match[2] || "ms").toLowerCase();
                    switch (type) {
                      case "years":
                      case "year":
                      case "yrs":
                      case "yr":
                      case "y":
                        return n * y;

                      case "days":
                      case "day":
                      case "d":
                        return n * d;

                      case "hours":
                      case "hour":
                      case "hrs":
                      case "hr":
                      case "h":
                        return n * h;

                      case "minutes":
                      case "minute":
                      case "mins":
                      case "min":
                      case "m":
                        return n * m;

                      case "seconds":
                      case "second":
                      case "secs":
                      case "sec":
                      case "s":
                        return n * s;

                      case "milliseconds":
                      case "millisecond":
                      case "msecs":
                      case "msec":
                      case "ms":
                        return n;
                    }
                }
            }
        }
        /**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
        function short(ms) {
            return ms >= d ? Math.round(ms / d) + "d" : ms >= h ? Math.round(ms / h) + "h" : ms >= m ? Math.round(ms / m) + "m" : ms >= s ? Math.round(ms / s) + "s" : ms + "ms";
        }
        /**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
        function long(ms) {
            return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
        }
        /**
	 * Pluralization helper.
	 */
        function plural(ms, n, name) {
            return n > ms ? void 0 : 1.5 * n > ms ? Math.floor(ms / n) + " " + name : Math.ceil(ms / n) + " " + name + "s";
        }
        /**
	 * Helpers.
	 */
        var s = 1e3, m = 60 * s, h = 60 * m, d = 24 * h, y = 365.25 * d;
        /**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
        module.exports = function(val, options) {
            return options = options || {}, "string" == typeof val ? parse(val) : options["long"] ? long(val) : short(val);
        };
    }, /* 38 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var strictUriEncode = __webpack_require__(39);
        exports.extract = function(str) {
            return str.split("?")[1] || "";
        }, exports.parse = function(str) {
            return "string" != typeof str ? {} : (str = str.trim().replace(/^(\?|#|&)/, ""), 
            str ? str.split("&").reduce(function(ret, param) {
                var parts = param.replace(/\+/g, " ").split("="), key = parts.shift(), val = parts.length > 0 ? parts.join("=") : void 0;
                return key = decodeURIComponent(key), val = void 0 === val ? null : decodeURIComponent(val), 
                ret.hasOwnProperty(key) ? Array.isArray(ret[key]) ? ret[key].push(val) : ret[key] = [ ret[key], val ] : ret[key] = val, 
                ret;
            }, {}) : {});
        }, exports.stringify = function(obj) {
            return obj ? Object.keys(obj).sort().map(function(key) {
                var val = obj[key];
                return void 0 === val ? "" : null === val ? key : Array.isArray(val) ? val.sort().map(function(val2) {
                    return strictUriEncode(key) + "=" + strictUriEncode(val2);
                }).join("&") : strictUriEncode(key) + "=" + strictUriEncode(val);
            }).filter(function(x) {
                return x.length > 0;
            }).join("&") : "";
        };
    }, /* 39 */
    /***/
    function(module, exports) {
        "use strict";
        module.exports = function(str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
                return "%" + c.charCodeAt(0).toString(16).toUpperCase();
            });
        };
    }, /* 40 */
    /***/
    function(module, exports) {
        function cleanUpNextTick() {
            draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, 
            queue.length && drainQueue();
        }
        function drainQueue() {
            if (!draining) {
                var timeout = setTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len; ) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len; ) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length;
                }
                currentQueue = null, draining = !1, clearTimeout(timeout);
            }
        }
        // v8 likes predictible objects
        function Item(fun, array) {
            this.fun = fun, this.array = array;
        }
        function noop() {}
        // shim for using process in browser
        var currentQueue, process = module.exports = {}, queue = [], draining = !1, queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || setTimeout(drainQueue, 0);
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array);
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], 
        process.version = "", // empty string to avoid regexp issues
        process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, 
        process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, 
        process.emit = noop, process.binding = function(name) {
            throw new Error("process.binding is not supported");
        }, process.cwd = function() {
            return "/";
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported");
        }, process.umask = function() {
            return 0;
        };
    }, /* 41 */
    /***/
    function(module, exports) {
        module.exports = function() {
            throw new Error("define cannot be used indirect");
        };
    }, /* 42 */
    /***/
    function(module, exports) {
        !function(self) {
            "use strict";
            function normalizeName(name) {
                if ("string" != typeof name && (name = String(name)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) throw new TypeError("Invalid character in header field name");
                return name.toLowerCase();
            }
            function normalizeValue(value) {
                return "string" != typeof value && (value = String(value)), value;
            }
            function Headers(headers) {
                this.map = {}, headers instanceof Headers ? headers.forEach(function(value, name) {
                    this.append(name, value);
                }, this) : headers && Object.getOwnPropertyNames(headers).forEach(function(name) {
                    this.append(name, headers[name]);
                }, this);
            }
            function consumed(body) {
                return body.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (body.bodyUsed = !0);
            }
            function fileReaderReady(reader) {
                return new Promise(function(resolve, reject) {
                    reader.onload = function() {
                        resolve(reader.result);
                    }, reader.onerror = function() {
                        reject(reader.error);
                    };
                });
            }
            function readBlobAsArrayBuffer(blob) {
                var reader = new FileReader();
                return reader.readAsArrayBuffer(blob), fileReaderReady(reader);
            }
            function readBlobAsText(blob) {
                var reader = new FileReader();
                return reader.readAsText(blob), fileReaderReady(reader);
            }
            function Body() {
                return this.bodyUsed = !1, this._initBody = function(body) {
                    if (this._bodyInit = body, "string" == typeof body) this._bodyText = body; else if (support.blob && Blob.prototype.isPrototypeOf(body)) this._bodyBlob = body; else if (support.formData && FormData.prototype.isPrototypeOf(body)) this._bodyFormData = body; else if (body) {
                        if (!support.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(body)) throw new Error("unsupported BodyInit type");
                    } else this._bodyText = "";
                    this.headers.get("content-type") || ("string" == typeof body ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type && this.headers.set("content-type", this._bodyBlob.type));
                }, support.blob ? (this.blob = function() {
                    var rejected = consumed(this);
                    if (rejected) return rejected;
                    if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                    if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                    return Promise.resolve(new Blob([ this._bodyText ]));
                }, this.arrayBuffer = function() {
                    return this.blob().then(readBlobAsArrayBuffer);
                }, this.text = function() {
                    var rejected = consumed(this);
                    if (rejected) return rejected;
                    if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
                    if (this._bodyFormData) throw new Error("could not read FormData body as text");
                    return Promise.resolve(this._bodyText);
                }) : this.text = function() {
                    var rejected = consumed(this);
                    return rejected ? rejected : Promise.resolve(this._bodyText);
                }, support.formData && (this.formData = function() {
                    return this.text().then(decode);
                }), this.json = function() {
                    return this.text().then(JSON.parse);
                }, this;
            }
            function normalizeMethod(method) {
                var upcased = method.toUpperCase();
                return methods.indexOf(upcased) > -1 ? upcased : method;
            }
            function Request(input, options) {
                options = options || {};
                var body = options.body;
                if (Request.prototype.isPrototypeOf(input)) {
                    if (input.bodyUsed) throw new TypeError("Already read");
                    this.url = input.url, this.credentials = input.credentials, options.headers || (this.headers = new Headers(input.headers)), 
                    this.method = input.method, this.mode = input.mode, body || (body = input._bodyInit, 
                    input.bodyUsed = !0);
                } else this.url = input;
                if (this.credentials = options.credentials || this.credentials || "omit", (options.headers || !this.headers) && (this.headers = new Headers(options.headers)), 
                this.method = normalizeMethod(options.method || this.method || "GET"), this.mode = options.mode || this.mode || null, 
                this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && body) throw new TypeError("Body not allowed for GET or HEAD requests");
                this._initBody(body);
            }
            function decode(body) {
                var form = new FormData();
                return body.trim().split("&").forEach(function(bytes) {
                    if (bytes) {
                        var split = bytes.split("="), name = split.shift().replace(/\+/g, " "), value = split.join("=").replace(/\+/g, " ");
                        form.append(decodeURIComponent(name), decodeURIComponent(value));
                    }
                }), form;
            }
            function headers(xhr) {
                var head = new Headers(), pairs = xhr.getAllResponseHeaders().trim().split("\n");
                return pairs.forEach(function(header) {
                    var split = header.trim().split(":"), key = split.shift().trim(), value = split.join(":").trim();
                    head.append(key, value);
                }), head;
            }
            function Response(bodyInit, options) {
                options || (options = {}), this.type = "default", this.status = options.status, 
                this.ok = this.status >= 200 && this.status < 300, this.statusText = options.statusText, 
                this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers), 
                this.url = options.url || "", this._initBody(bodyInit);
            }
            if (!self.fetch) {
                Headers.prototype.append = function(name, value) {
                    name = normalizeName(name), value = normalizeValue(value);
                    var list = this.map[name];
                    list || (list = [], this.map[name] = list), list.push(value);
                }, Headers.prototype["delete"] = function(name) {
                    delete this.map[normalizeName(name)];
                }, Headers.prototype.get = function(name) {
                    var values = this.map[normalizeName(name)];
                    return values ? values[0] : null;
                }, Headers.prototype.getAll = function(name) {
                    return this.map[normalizeName(name)] || [];
                }, Headers.prototype.has = function(name) {
                    return this.map.hasOwnProperty(normalizeName(name));
                }, Headers.prototype.set = function(name, value) {
                    this.map[normalizeName(name)] = [ normalizeValue(value) ];
                }, Headers.prototype.forEach = function(callback, thisArg) {
                    Object.getOwnPropertyNames(this.map).forEach(function(name) {
                        this.map[name].forEach(function(value) {
                            callback.call(thisArg, value, name, this);
                        }, this);
                    }, this);
                };
                var support = {
                    blob: "FileReader" in self && "Blob" in self && function() {
                        try {
                            return new Blob(), !0;
                        } catch (e) {
                            return !1;
                        }
                    }(),
                    formData: "FormData" in self,
                    arrayBuffer: "ArrayBuffer" in self
                }, methods = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
                Request.prototype.clone = function() {
                    return new Request(this);
                }, Body.call(Request.prototype), Body.call(Response.prototype), Response.prototype.clone = function() {
                    return new Response(this._bodyInit, {
                        status: this.status,
                        statusText: this.statusText,
                        headers: new Headers(this.headers),
                        url: this.url
                    });
                }, Response.error = function() {
                    var response = new Response(null, {
                        status: 0,
                        statusText: ""
                    });
                    return response.type = "error", response;
                };
                var redirectStatuses = [ 301, 302, 303, 307, 308 ];
                Response.redirect = function(url, status) {
                    if (-1 === redirectStatuses.indexOf(status)) throw new RangeError("Invalid status code");
                    return new Response(null, {
                        status: status,
                        headers: {
                            location: url
                        }
                    });
                }, self.Headers = Headers, self.Request = Request, self.Response = Response, self.fetch = function(input, init) {
                    return new Promise(function(resolve, reject) {
                        function responseURL() {
                            // Avoid security warnings on getResponseHeader when not allowed by CORS
                            return "responseURL" in xhr ? xhr.responseURL : /^X-Request-URL:/m.test(xhr.getAllResponseHeaders()) ? xhr.getResponseHeader("X-Request-URL") : void 0;
                        }
                        var request;
                        request = Request.prototype.isPrototypeOf(input) && !init ? input : new Request(input, init);
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function() {
                            var status = 1223 === xhr.status ? 204 : xhr.status;
                            if (100 > status || status > 599) return void reject(new TypeError("Network request failed"));
                            var options = {
                                status: status,
                                statusText: xhr.statusText,
                                headers: headers(xhr),
                                url: responseURL()
                            }, body = "response" in xhr ? xhr.response : xhr.responseText;
                            resolve(new Response(body, options));
                        }, xhr.onerror = function() {
                            reject(new TypeError("Network request failed"));
                        }, xhr.open(request.method, request.url, !0), "include" === request.credentials && (xhr.withCredentials = !0), 
                        "responseType" in xhr && support.blob && (xhr.responseType = "blob"), request.headers.forEach(function(value, name) {
                            xhr.setRequestHeader(name, value);
                        }), xhr.send("undefined" == typeof request._bodyInit ? null : request._bodyInit);
                    });
                }, self.fetch.polyfill = !0;
            }
        }("undefined" != typeof self ? self : this);
    }, /* 43 */
    /***/
    function(module, exports) {} ]);
});
//# sourceMappingURL=fuhub-client.js.map