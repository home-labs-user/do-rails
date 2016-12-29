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
                    // não existe o modificador de acesso private explicitamente, então deixa enumerar a priori, no entanto será se, e somente se, caso seja um atributo
                    enumerable = true,
                    context,

                    composeContext = function () {
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

                // Object.getOwnPropertyDescriptor(context, name).writable
                Iterator.selectEach(structure, true, function (body, name,
                                                               trace) {

                    if (trace.length) {
                        context = composeContext(trace);
                    } else if (!context) {
                        context = object;
                    }

                    if (Object.getPrototypeOf(body) !=
                         Object.getPrototypeOf({}) ||
                        (!context[name] ||
                         Object.getOwnPropertyNames(body).length == 0)) {

                        if (typeof body == "function") {
                            enumerable = false;
                        } else if (!context[name]) {
                            body = {};
                            writable = true;
                        }

                        try {
                            Object.defineProperty(context, name, {
                                value: body,
                                writable: writable,
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

                    }

                });

            }

        }

    });

})(Extensor);
