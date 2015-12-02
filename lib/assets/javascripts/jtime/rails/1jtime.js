//= require ./support/1object

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
            modules,
            name,

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
            throw new Error("jTime.extend noninstantiable!");
        }

        // resolve arguments
        // if(args.context) {
        //     self = args.context;
        //     args = args.argument;
        // }
        // context = self;

        args.eachNodes(function (answer) {
            // console.log("name: " + answer.name + ", value: " + answer.value + ", trail: " + answer.trail.join(", "));

            context = resolveModule(answer.trail);

            Object.defineProperty(context, answer.name, {
                value: answer.value
            });
        });

        // modules = args;
        // if (modules.prototype) {
        //     modules = modules.prototype;
        //     context = self.prototype;

        //     for(key in modules) {
        //         value = modules[key];
        //         Object.defineProperty(context, key, {
        //             value: value
        //         });
        //     }

        // } else {
        //     for (i in args) {
        //         value = modules[i];
        //         constructorName = value.constructor.name;

        //         if (constructorName === "Object") {
        //             while (constructorName !== "Function") {
        //                 for (key in modules) {

        //                     if (!value.prototype) {
        //                         constructorName = modules[key].constructor.name
        //                         if (constructorName !== "Function") {
        //                             self[i] = modules;
        //                             context = self[i];
        //                         }
        //                         name = key;
        //                     } else {
        //                         context = self.prototype;
        //                         name = i;
        //                     }

        //                     value = modules[key];
        //                 }
        //                 constructorName = value.constructor.name;
        //                 modules = value;
        //             }

        //         } else if (constructorName === "Function") {
        //             name = i;
        //         }
        //     }

        //     Object.defineProperty(context, name, {
        //         value: value
        //     });
        // }

    };

})();
