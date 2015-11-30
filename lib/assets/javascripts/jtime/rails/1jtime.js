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
            context,
            i,
            constructorName,
            value,
            key,
            module,
            name;

        // resolve arguments
        if(args.context) {
            self = args.context;
            args = args.argument;
        }
        context = self;

        for (i in args) {
            module = args;
            value = module[i];
            constructorName = value.constructor.name;

            if (constructorName === "Object") {
                while (constructorName !== "Function") {
                    for (key in module) {
                        if (value.prototype) {
                            context = self.prototype;
                            name = i;
                        } else {
                            self[i] = module;
                            context = self[i][key];
                            name = key;
                        }

                        value = module[key];
                    }
                    module = value;
                    constructorName = value.constructor.name;
                }

            } else if (constructorName === "Function") {
                name = i;
            }

            Object.defineProperty(context, name, {
                value: value
            });
        }

    };

})();
