// Object: javascript literal object(hash table or JSON)
(function ($) {
    "use strict";

    $.defineProperty($.prototype, "merge", {
        value: function (hash) {
            var merged = {},
                i = 0,
                obj = null;

            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    merged[i] = obj[i];
                }
            }
            for (i in hash) {
                if (hash.hasOwnProperty(i)) {
                    merged[i] = hash[i];
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