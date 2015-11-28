(function () {

    jTime = function (selector) {
        "use strict";

        if (!(this instanceof jTime)) {
            return new jTime(selector);
        }

        var
            self = this,
            collection;

        if (selector) {
            if (typeof selector === "string") {
                collection = Array.prototype.slice
                    .call(document.querySelectorAll(selector));
            } else if (selector instanceof HTMLElement) {
                collection = Array.prototype.slice
                    .call([selector]);
            } else if (selector instanceof Array) {
                collection = selector;
            } else if (selector instanceof jTime) {
                return selector;
            }

            // attrs
            collection.forEach(function (v, i) {
                self[i] = v;
            });

            Object.defineProperties(self, {
                splice: {
                    value: Function,
                },
                length: {
                    value: collection.length
                }
            });
        }

        return self;
    };

    jTime.extend = function () {
        var
            self = jTime,
            args = arguments[0],
            context = self.prototype,
            i;

        if (args.module) {
            context = args.module
            args = args.args
        }

        for (i in args) {

            if (args[i].constructor.name !== "Function") {
                context = self;
            }

            Object.defineProperty(context, i, {
                value: args[i]
            });
        }
    };

})();
