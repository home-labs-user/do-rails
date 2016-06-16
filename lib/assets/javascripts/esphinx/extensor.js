//= require ./enumerator

"use strict";

var
    Extensor,
    Enumerator;

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

            Enumerator.each(structure, function (body, name, trail) {
                if (trail.length) {
                    context = resolveModule(trail);
                } else if (!context) {
                    context = object;
                }

                if (enumerable) {
                    context[name] = body;
                } else {
                    if (!context[name]) {
                        Object.defineProperty(context, name, {
                            value: body
                        });
                    }
                }

            });

        }

    };

})();
