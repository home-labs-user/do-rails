"use strict";

var
    Iterator;

Iterator = (function () {

    return {

        isIterable: function (object) {
            if (object[Symbol.iterator]) {
                return true;
            }

            return false;
        },

        each: function (enumerable, recursive = false, callback) {
            var
                trail = [],
                value,
                children;

            if (Iterator.isIterable(enumerable)) {
                enumerable = Array.from(enumerable);
            }

            if (arguments[3] instanceof Array) {
                trail = arguments[3];
            }

            if (typeof recursive === "function") {
                callback = recursive;
                recursive = false;
            }

            Object.keys(enumerable).forEach(function (key) {
                value = enumerable[key];
                if (value) {

                    if (value instanceof Node) {
                        children = value.children;
                        if (children.length) {
                            value = children;
                        }
                    }

                    if (Iterator.isIterable(value)
                        || Object.getPrototypeOf(value) === Object.prototype) {
                        // call a function recursively doesn't replace values
                        // of the current loop, neither break it, unless the return instruction is called, but just defines a new
                        // loop with a new value to be run.
                        Iterator.each(value, recursive, callback, trail.concat(key));
                    } else {
                        callback(value, key, trail);
                    }
                } else {
                    callback(value, key, trail);
                }
            });

        }
    };

})();
