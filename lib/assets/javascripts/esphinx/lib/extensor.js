var
    Iterable,
    SearchContext,
    Search,
    Extensor;

(function ($module) {
    "use strict";

    Object.defineProperties($module, {
        Extensor: {
            value: {}
        }
    });

    Object.defineProperties(Extensor, {

        new: {

            value: function (object, final, structure) {
                var
                    context,
                    strategy,
                    verbose = false,
                    enumerable = true,

                    mountContext = function (trace) {
                        var
                            context = object;

                        trace.forEach(function (v) {
                            if (!context[v]) {
                                context[v] = {};
                            }
                            context = context[v];
                        });

                        return context;
                    };

                if (!structure && (typeof final == "object" ||
                    typeof final == "function")) {
                    structure = final;
                }

                if (typeof final != "boolean") {
                    final = false;
                }

                strategy = SearchContext.Proxy
                    .new(Search.Graphs.BFS.new(structure));
                strategy.research(function (body, name, trace) {

                    if (trace.length) {
                        context = mountContext(trace);
                    } else if (!context) {
                        context = object;
                    }

                    // if (esPhinx && context == esPhinx.prototype) debugger;
                    // Object.getOwnPropertyDescriptor(context, name).writable
                    if (Object.getPrototypeOf(body) !=
                         Object.getPrototypeOf({}) ||
                        (!context[name] ||
                         Object.getOwnPropertyNames(context[name]) === 0)) {

                        if (typeof body == "function") {
                            enumerable = false;
                        } else if (Object.getPrototypeOf(body) ==
                         Object.getPrototypeOf({}) && !context[name]) {
                            body = {};
                            final = false;
                        }
                        try {
                            // change to recognize if name is get or set
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

})(window);
