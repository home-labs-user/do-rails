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
                    writable = false;
                }

                Iterator.selectEach(structure, true, function (body, name,
                                                               trace) {

                    if (trace.length) {
                        context = resolveModule(trace);
                    } else if (!context) {
                        context = object;
                    }

                    // if (name == "modal") debugger

                    if (Object.getPrototypeOf(body) ==
                        Object.getPrototypeOf({}) && !context[name]) {
                        body = {};
                        writable = false;
                    } else if (typeof body === "function") {
                        enumerable = false;
                        writable = true;
                    }

                    // Object.getOwnPropertyDescriptor(context, name).configurable
                    try {
                        // está sendo reescrito o windows, por algum motivo.
                        // se uma chave já existe, no caso esPhinx.ui.windows, ela pode receber um objeto, caso, sendo um hash, não faria sentido uma chave ser reescrita, porque um hash pode ter multiplas chaves e valores

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

                    // if (name == "modal") debugger

                });

            }

        }

    });

})(Extensor);
