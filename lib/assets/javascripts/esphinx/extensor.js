//= require ./iterator

"use strict";

var
    Extensor,
    Iterator;

Extensor = (function () {

    return {

        new: function (object, writable, structure) {

            var
                Constructor = Extensor.new,
                enumerable = true,
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

            if (!structure && (typeof writable === "object" ||
                typeof writable === "function")) {
                structure = writable;
            }

            if (typeof writable !== "boolean") {
                writable = false;
            }

            Iterator.each(structure, true, function (body, name, trail) {
                if (trail.length) {
                    context = resolveModule(trail);
                } else if (!context) {
                    context = object;
                }

                if (typeof body === "function") {
                    enumerable = false;
                    writable = true;
                }
                Object.defineProperty(context, name, {
                    value: body,
                    enumerable: enumerable,
                    writable: writable,
                    configurable: writable
                });

            });

        }

    };

})();
