require("support/object");

var jTime = (function jTime () {
    "use strict";

    return function (selector) {

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
                    value: Function
                },
                length: {
                    value: collection.length
                }
            });
        }

        return self;
    };
})();

// plugin para extender de forma não enumerável
(function ($) {
    "use strict";

    $.extend = function () {
        var
            self = jTime,
            args = arguments[0],
            context,

            resolveModule = function () {
                var
                    context = self,
                    arg = arguments[0];

                arg.forEach(function (v) {
                    if (!context[v]) {
                        context[v] = {};
                    }
                    context = context[v];
                });

                return context;
            };

        if (this instanceof self.extend) {
            throw new Error("Illegal constructor");
        }

        if (Object.getPrototypeOf(args) === Array.prototype) {
            context = args[0].module;
            args = args[0].args;
        }

        args.eachNodes(function (answer) {
            if (answer.trail.length) {
                context = resolveModule(answer.trail);
            } else if (!context) {
                context = self;
            }

            Object.defineProperty(context, answer.name, {
                value: answer.value
            });
        });

    };
})(jTime);
