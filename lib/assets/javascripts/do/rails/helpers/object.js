// Object: javascript literal object(hash table or JSON)
(function ($) {
    "use strict";

    $.defineProperty($.prototype, "merge", {
        value: function () {
            var merged,
                i,
                i2;

            merged = this;
            for (i in arguments) {
                if (arguments.hasOwnProperty(i)) {
                    if (arguments[i] instanceof Object) {
                        for (i2 in arguments[i]) {
                            merged[i2] = arguments[i][i2];
                        }
                    }
                }
            }

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
