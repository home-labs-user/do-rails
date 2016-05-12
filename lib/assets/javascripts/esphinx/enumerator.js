"use strict";

var
    Enumerator;

Enumerator = (function () {

    return {

        each: function (enumerable, callback, trail) {
            trail = trail || [];

            var
                value;

            Object.keys(enumerable).forEach(function (key) {
            // Object.getOwnPropertyNames(enumerable).forEach(function (key) {
                value = enumerable[key];

                if (value) {
                    if (Object.getPrototypeOf(value) === Object.prototype) {
                        // call a function recursively doesn't replace values
                        // of the current loop, neither break it, unless the return instruction is called, but just defines a new
                        // loop with a new value to be run.
                        // value.recursiveEach(callback, trail.concat(key));
                        Enumerator.each(value, callback, trail.concat(key));
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
