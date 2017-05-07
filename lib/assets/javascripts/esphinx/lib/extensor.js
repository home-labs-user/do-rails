//= require ./extensions/object


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

                strategy = SearchContext.Proxy.new(Search.Graphs.BFS
                                                   .new(structure));
                strategy.research(function (body, name, trace) {

                    if (trace.length) {
                        context = mountContext(trace);
                    } else if (!context) {
                        context = object;
                    }

                    // debugger
                    if (Object.getPrototypeOf(body) != Object.prototype &&
                        name != "get" &&
                        name != "set") {

                        if (typeof body == "function") {
                            enumerable = false;
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
                                    "\" of class \"" +
                                    Object.className(context) +
                                    "\" can't be redefined because " +
                                    "it's configured as read-only.");
                            }
                        }

                    } else if (Object.includeKeys(body, "get") ||
                          Object.includeKeys(body, "set")) {
                        try {
                            Object.defineProperty(context, name, {
                                get: body.get,
                                set: body.set,
                                enumerable: enumerable
                            });
                        } catch (e) {}
                    }

                });

            }
        }

    });

})(window);
