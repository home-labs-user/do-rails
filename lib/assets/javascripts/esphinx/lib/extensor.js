// require ./iterator

// para impetir que o Extensor seja excluído, ele deve ser incluído a window
// primeiro de tudo criar o space name esPhinx em window.

var
    Extensor = {};

(function ($) {
    "use strict";

    var
        selectEach = function (enumerable, deepSearch, callback) {
            // return Iterator.selectEach(enumerable, deepSearch, callback);

            var
                // talvez um objeto tipo Map poderá ser usado para fazer associação ao invés de um array literal, guardando um objeto literal
                queue = [{trace: [], enumerable: enumerable}],
                selected = [],

                block = function () {
                    var
                        enumerable,
                        returned;

                    // clean the queue
                    queue = [];
                    return function (map) {
                        enumerable = map.enumerable;
                        if (enumerable instanceof Node && deepSearch &&
                            enumerable.childElementCount) {
                            queue.push({enumerable: enumerable.children});
                        } else {
                            Object.keys(enumerable).forEach(function (key) {
                                if (enumerable[key] instanceof Node) {
                                    returned = callback.call(enumerable,
                                                             enumerable[key],
                                                             key);
                                    if (deepSearch &&
                                        enumerable[key].childElementCount) {
                                        queue.push({
                                            enumerable: enumerable[key].children
                                        });
                                    }
                                } else {
                                    if (deepSearch) {
//                                         if (Object.getPrototypeOf(enumerable[key]) ==
//                                         Object.getPrototypeOf({})) {}
                                        returned = callback.call(enumerable,
                                                                 enumerable[key],
                                                                 key,
                                                                 map.trace);

                                        if (typeof enumerable[key] == "object") {
                                            // put on queue
                                            queue.push({
                                                trace: map.trace.concat(key),
                                                enumerable: enumerable[key]
                                            });
                                        }
                                    } else {
                                        returned = callback.call(enumerable,
                                                                 enumerable[key],
                                                                 key);
                                    }
                                }

                                if (returned) {
                                    selected.push(enumerable[key]);
                                }
                            });
                        }
                    };
                };

            if (typeof deepSearch == "function") { callback = deepSearch; }
            if (typeof deepSearch != "boolean") { deepSearch = false; }

            while(true) {
                if (queue.length) {
                    queue.forEach(block());
                } else {
                    break;
                }
            }

            return selected;
        };

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

                // Iterator.selectEach(structure, true, function (body, name,
                selectEach(structure, true, function (body, name,
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
                         Object.getOwnPropertyNames(context[name]) === 0)) {

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
