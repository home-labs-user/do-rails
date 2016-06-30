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

        each: function (enumerable, callback, trail = []) {
            var
                value;

            if (Iterator.isIterable(enumerable)) {
                enumerable = Array.from(enumerable);
            }

            Object.keys(enumerable).forEach(function (key) {
                value = enumerable[key];
                if (value) {
                    if (Object.getPrototypeOf(value) === Object.prototype) {
                        // call a function recursively doesn't replace values
                        // of the current loop, neither break it, unless the return instruction is called, but just defines a new
                        // loop with a new value to be run.
                        Iterator.each(value, callback, trail.concat(key));
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
