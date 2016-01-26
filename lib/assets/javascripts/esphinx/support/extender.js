//= require ./object


"use strict";

var
    Extender;

Extender = (function () {

    return {
        // plugin for extend as not enumerable
        extendWith: function () {
            var
                obj = arguments[0],
                namespace = arguments[1],
                context,

                resolveModule = function () {
                    var
                        context = obj,
                        arg = arguments[0];

                    arg.forEach(function (v) {
                        if (!context[v]) {
                            context[v] = {};
                        }
                        context = context[v];
                    });

                    return context;
                };

            if (this instanceof Extender.extendWith) {
                throw new Error("Illegal constructor");
            }

            // if (Object.getPrototypeOf(namespace) === Array.prototype) {
            //     context = namespace[0].module;
            //     namespace = namespace[0].args;
            // }

            namespace.eachNodes(function (answer) {
                if (answer.trail.length) {
                    context = resolveModule(answer.trail);
                } else if (!context) {
                    context = obj;
                }

                Object.defineProperty(context, answer.name, {
                    value: answer.value
                });
            });
        }
    }

}());
