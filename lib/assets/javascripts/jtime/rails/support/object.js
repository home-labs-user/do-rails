// Object: javascript literal object
(function ($) {
    "use strict";

    $.defineProperties($.prototype, {
        indexOfConstructor: {
            value: function () {
                var
                    self = this,
                    calleeArgs = self.callee.arguments,
                    arg = arguments[0],
                    i;

                for(i in calleeArgs) {
                    if (calleeArgs[i].constructor === arg) {
                        return parseFloat(i);
                    }
                }

                return false;
            },
        },

        merge: {
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
        },

        delete: {
            value: function () {
                var
                    key = arguments[0];

                delete this[key];
                return this;
            }
        }

    });

}(Object));
