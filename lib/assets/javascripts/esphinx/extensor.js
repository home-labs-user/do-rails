//= require ./support/object


"use strict";


var
    Extensor;

Extensor = (function () {

    return {

        new: function (object, enumerable, structure) {

            if (!structure && (typeof enumerable === "object" ||
                typeof enumerable === "function")) {
                structure = enumerable;
            }

            if (typeof enumerable !== "boolean") {
                enumerable = true;
            }

            var
                Constructor = Extensor.new,
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

            if (this instanceof Constructor) {
                throw new Error("Illegal constructor");
            }

            structure.recursiveEach(function (answer) {
                if (answer.trail.length) {
                    context = resolveModule(answer.trail);
                } else if (!context) {
                    context = object;
                }

                if (enumerable) {
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
