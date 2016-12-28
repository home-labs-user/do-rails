// require ./iterator

var
    Extensor = {},
    Iterator;

(function ($) {
    "use strict";

    Object.defineProperties($, {

        new: {

            value: function (object, writable, structure) {
                var
                    ConstructorReference = Extensor.new,

                    verbose = false,
                    enumerable,
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
                    writable = true;
                }

                Iterator.selectEach(structure, true, function (body, name,
                                                               trace) {
                    if (trace.length) {
                        context = resolveModule(trace);
                    } else if (!context) {
                        context = object;
                    }

                    if (typeof body === "function") {
                        enumerable = false;
                    }

                    // Object.getOwnPropertyDescriptor(context, name).configurable
                    try {
                        Object.defineProperty(context, name, {
                            value: body,
                            writable: writable,
                            configurable: writable,
                            enumerable: enumerable
                        });
                    } catch (e) {
                        if (verbose) {
                            console.warn("Property \"" + name +
                                "\" of class \"" + context.name +
                                "\" can't be redefined because " +
                                "it's configured as read-only.");
                        }
                    }

                });

            }

        }

    });

})(Extensor);
