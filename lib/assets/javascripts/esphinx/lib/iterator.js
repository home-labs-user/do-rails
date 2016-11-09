var
    Iterator;

Iterator = (function () {
    "use strict";

    var

        count = function (object, value) {
            var
                length = Object.keys(object).length,

                iterator = function (length) {
                    return {
                        get: function () {
                            return length;
                        },
                        set: function (value) {
                            if (value == length) {
                                length = value;
                            }
                        }
                    };
                };

            if (value) {
                Object.defineProperties(object, {
                    length: iterator(length)
                });
            }

            return length;
        },

        symbolIteratorExists = function () {
            if (window.hasOwnProperty("Symbol") &&
                    window.Symbol.hasOwnProperty("iterator")) {
                return true;
            }

            return false;
        };

    return {

        isIterable: function (object) {
            if (object) {
                if (symbolIteratorExists() &&
                    object[window.Symbol.iterator] ==
                    Array.prototype[window.Symbol.iterator]) {
                    return true;
                } else {
                    if ((typeof object == "object" ||
                         typeof object == "string") &&
                        object.hasOwnProperty("length")) {
                        return true;
                    }
                }
            }

            return false;
        },

        // each: function (object, callback, recursive = false) {
        each: function (object, callback, recursive) {
            var
                trail = [],
                enumerable,
                keys,
                key,
                value,
                children;

            if (Iterator.isIterable(object)) {
                enumerable = Array.from(object);
            }

            if (arguments[3] instanceof Array) {
                trail = arguments[3];
            }

            if (typeof callback == "boolean") {
                callback = recursive;
                recursive = arguments[1];
            }

            if (typeof recursive !== "boolean") { recursive = false; }

            if (!enumerable) {
                enumerable = object;
            }
            // attributes non enumerable must not be counted. Because that don't use .getOwnPropertyNames()
            keys = Object.keys(enumerable);
            for (var i in keys) {
                if (keys.hasOwnProperty(i)) {
                    key = keys[i];
                    value = enumerable[key];

                    if (callback.call(object, value, key, trail)) {
                        break;
                    }

                    if (recursive && typeof value != "string") {
                        if (value instanceof Node) {
                            children = value.children;
                        } else if (Iterator.isIterable(value) ||
                                   (Object.getPrototypeOf(value) ==
                                    Object.getPrototypeOf({}))) {
                            children = value;
                        }

                        // call recursively only when on end i == keys.length -1, otherwise save to call (Iterator.each) later
                        if (children) {
                            // call a function recursively doesn't replace values of the current loop, neither break it, unless the return instruction is called, but just defines a new loop with a new value to be run.
                            Iterator.each(children, callback, recursive,
                            trail.concat(key));
                        }
                    }
                }
            }

        },

        asIterable: function (object) {
            var
                length = count(object),
                newObject = {},
                iterator = {
                                get: function () {
                                    return length;
                                },
                                set: function (value) {
                                    length = count(object);
                                    if (value == length) {
                                        length = value;
                                    }
                                }
                            };

            Object.assign(newObject, object);

            Object.defineProperties(newObject, {
                length: iterator

                // [Symbol.iterator]: {
                //     value: Array.prototype[Symbol.iterator]
                // }
            });

            return newObject;
        },

        toIterable: function (object) {
            var
                // length = count(object);
                // _iterator = iterator(length);
                length = count(object),
                iterator = {
                                get: function () {
                                    return length;
                                },
                                set: function (value) {
                                    length = count(object);
                                    if (value == length) {
                                        length = value;
                                    }
                                }
                            };

            Object.defineProperties(object, {
                length: iterator
                // length: _iterator
                // length: iterator(length)

                // [Symbol.iterator]: {
                //     value: Array.prototype[Symbol.iterator]
                // }
            });

            return object;
        }

    };

})();
