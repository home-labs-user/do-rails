// Object: javascript literal object
(function ($) {
    "use strict";

    $.defineProperty($.prototype, "merge", {
        value: function () {
            var
                self = this,
                merged = {},
                i,
                arg;

            for (i in self) {
                if (self.hasOwnProperty(i)) {
                    merged[i] = self[i];
                }
            }

            for (arg in arguments) {
                if (arguments.hasOwnProperty(arg)) {
                    if (arguments[arg] instanceof Object) {
                        for (i in arguments[arg]) {
                            if (arguments[arg].hasOwnProperty(i)) {
                                merged[i] = arguments[arg][i];
                            }
                        }
                    }
                }
            }

            return merged;
        }
    });

    $.defineProperty($.prototype, "delete", {
        value: function (key) {
            delete this[key];
            return this;
        }
    });

}(Object));
