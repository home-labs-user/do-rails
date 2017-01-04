// require ./iterator

// para impetir que o Extensor seja excluído, ele deve ser incluído a window
// primeiro de tudo criar o space name esPhinx em window.

var
    Extensor = {},
    Iterator;

(function ($) {
    "use strict";

    Object.defineProperties($, {

        new: {

            value: function (object, final, structure) {
                var
                    ConstructorReference = Extensor.new,

                    verbose = false,
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

                if (!structure && (typeof final == "object" ||
                    typeof final == "function")) {
                    structure = final;
                }

                if (typeof final != "boolean") {
                    final = false;
                }

                Iterator.selectEach(structure, true, function (body, name,
                                                               trace) {
                    if (trace.length) {
                        context = composeContext(trace);
                    } else if (!context) {
                        context = object;
                    }

                    // Object.getOwnPropertyDescriptor(context, name).writable
                    if (Object.getPrototypeOf(body) !=
                         Object.getPrototypeOf({}) ||
                        (!context[name] ||
                         Object.getOwnPropertyNames(body).length === 0)) {

                        if (typeof body == "function") {
                            enumerable = false;
                        } else if (Object.getPrototypeOf(body) ==
                         Object.getPrototypeOf({}) && !context[name]) {
                            body = {};
                            final = false;
                        }

                        try {
                            Object.defineProperty(context, name, {
                                value: body,
                                writable: !final,
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
