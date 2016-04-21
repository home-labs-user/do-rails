//= require ./support/object

"use strict";

var
    Extender;

Extender = (function () {

    return {
        // colocar a opção de enumerable ou não
        new: function (object, structure, options) {
            options = options || {};

            if (!options.enumerable ||
                typeof options.enumerable !== "boolean") {
                options.enumerable = true;
            }

            var
                // obj = arguments[0],
                // structure = arguments[1],
                context,

                resolveModule = function () {
                    var
                        context = object,
                        arg = arguments[0];

                    arg.forEach(function (v) {
                        if (!context[v]) {
                            context[v] = {};
                        }
                        context = context[v];
                    });

                    return context;
                };

            if (this instanceof Extender.new) {
                throw new Error("Illegal constructor");
            }

            structure.eachNodes(function (answer) {
                if (answer.trail.length) {
                    context = resolveModule(answer.trail);
                } else if (!context) {
                    context = object;
                }

                if (options.enumerable === true) {
                    context[answer.name] = answer.value;
                } else {
                    if (!context[answer.name]) {
                        Object.defineProperty(context, answer.name, {
                            value: answer.value
                        });
                    }
                }

            });
        }
    };

})();
