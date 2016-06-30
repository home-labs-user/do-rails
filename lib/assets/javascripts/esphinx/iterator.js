//= require ./main

"use strict";

var
    Iterator,
    esPhinx;

Iterator = (function () {

    return {

        each: function (enumerable, callback, trail = []) {
            var
                value,
                asArray = Array.from(enumerable);

            if (asArray.length) {
                enumerable = asArray;
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

(function ($) {

    // see how to implements a delegate method
    $.extend({

        each: function (enumerable, callback) {
            var
                self = this,
                i;

            Iterator.each(enumerable, function (v, i) {
                callback(v, parseInt(i));
            });

            return enumerable;
        },

        prototype: {
            each: function (callback) {
                var
                    self = this;

                $.each(self, callback);

                return self;
            }
        }

    });

}(esPhinx));
