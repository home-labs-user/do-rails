// Object: javascript literal object(hash table or JSON)
(function ($) {
    "use strict";

    $.defineProperty($.prototype, "each", {
        value: function (callback) {
            var
                self = this,
                i;

            if (self instanceof Object) {
                for (i in self) {
                    if (self.hasOwnProperty(i)) {
                        callback(self[i], i);
                    }
                }
            }

            return self;
        },

        enumerable: false
    });

    $.defineProperty($.prototype, "merge", {
        value: function () {
            var
                self = this,
                merged = {},
                i;

            self.each(function (v, i) {
               merged[i] = v ;
            });

            arguments.each(function (arg) {
                if (arg instanceof Object) {
                    arg.each(function (v, i) {
                        merged[i] = arg[i];
                    });
                }
            });

            return merged;
        },

        enumerable: false
    });

    $.defineProperty($.prototype, "deleteProperty", {
        value: function (key) {
            delete this[key];
            return this;
        },

        enumerable: false
    });

}(Object));
