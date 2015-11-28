// Object: javascript literal object(hash table or JSON)
(function ($) {
    "use strict";

    $.defineProperty(Object.prototype, "forforEach", {
        value: function (callback) {
            var
                self = this,
                i;

            for (i in self) {
                if (self.hasOwnProperty(i)) {
                    callback(self[i], i);
                }
            }
        },

        enumerable: false
    });

    $.defineProperty($.prototype, "merge", {
        value: function () {
            var
                self = this,
                merged = {},
                i;

            self.forEach(function (v, i) {
               merged[i] = v ;
            });

            arguments.forEach(function (arg) {
                if (arg instanceof Object) {
                    arg.forEach(function (v, i) {
                        merged[i] = arg[i];
                    });
                }
            });

            return merged;
        },

        enumerable: false
    });

    $.defineProperty($.prototype, "delete", {
        value: function (key) {
            delete this[key];
            return this;
        },

        enumerable: false
    });

}(Object));
