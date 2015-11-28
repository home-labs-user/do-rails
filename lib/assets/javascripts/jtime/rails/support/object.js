// Object: javascript literal object(hash table or JSON)
(function ($) {
    "use strict";

    $.defineProperty($.prototype, "merge", {
        value: function () {
            var
                self = this,
                merged = {},
                i;

            // modificar para for in
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
