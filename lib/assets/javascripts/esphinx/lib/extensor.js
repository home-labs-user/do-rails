// require ./iterator

var
    Extensor,
    Iterator;

Extensor = (function () {
        "use strict";

    return {

        new: function (object, writable, structure) {
            var
                ConstructorReference = Extensor.new,

                enumerable = true,
                verbose = false,
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

            if (this instanceof ConstructorReference) {
                throw new Error("Illegal constructor");
            }

            if (!structure && (typeof writable == "object" ||
                typeof writable === "function")) {
                structure = writable;
            }

            if (typeof writable !== "boolean") {
                writable = false;
            }

            Iterator.selectEach(structure, true, function (body, name, trail) {
                if (trail.length) {
                    context = resolveModule(trail);
                } else if (!context) {
                    context = object;
                }

                if (typeof body === "function") {
                    enumerable = false;
                    writable = true;
                }

                if (!context.hasOwnProperty(name) ||
                    Object.getOwnPropertyDescriptor(context, name)
                    .configurable) {
                    try {
                        Object.defineProperty(context, name, {
                            value: body,
                            writable: writable,
                            configurable: writable,
                            enumerable: enumerable
                        });
                    } catch (e) {}
                } else if (verbose && context.name) {
                    console.warn("Property \"" + name + "\" of class \"" +
                                 context.name + "\" can't be redefined because " +
                                 "it's configured as read-only.");
                }

            });

        }

    };

})();

// Object.freeze(Extensor);
