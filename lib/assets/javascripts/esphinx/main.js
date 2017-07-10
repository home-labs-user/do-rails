// alguns métodos não devem ser herdados por todos, como check e uncheck. Ver como isso seria resolvido sem comprometimento do padrão builder

var
    // mudar para APIece ("apaiês")
    esPhinx,
    Iterable,
    SearchContext,
    Search;

// IIFE
(function($module) {
    "use strict";

    var
        NAME = "esPhinx",

        selectInBreadth = function(iterable, callback) {
            var
                returned,
                strategy,
                selected = [];

            if (iterable instanceof window.Node) {
                strategy = SearchContext.Proxy.new(Search.Graphs.BFS.Element
                                                   .new(iterable));
            } else {
                strategy = SearchContext.Proxy.new(Search.Graphs.BFS.Object
                                                   .new(iterable));
            }

            strategy.research(function(value, key, trace) {
                if (value instanceof window.Node) {
                    returned = callback.call(iterable, value, key);
                } else {
                    returned = callback.call(iterable, value, key, trace);
                }

                if (returned) {
                    selected.push(value);
                }
            });

            return selected;
        },

        resolveContext = function(context) {
            if (typeof context == "object") {
                if (context instanceof esPhinx ||
                    context instanceof Element) {
                    return context;
                }
            } else if (typeof context == "string") {
                // recursivity
                return esPhinx(context);
            }

            return window.document;
        },
        // };

        Extender = {
            extend: function(object, final, structure) {
                var
                    context,
                    strategy,
                    verbose = false,
                    enumerable = true,

                    mountContext = function(trace) {
                        var
                            context = object;

                        trace.forEach(function(v) {
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

                strategy = SearchContext.Proxy.new(Search.Graphs.BFS.Object
                                                   .new(structure));
                strategy.research(function(body, name, trace) {

                    // create or mount the context. If there is trace and body type is an Object, but it doesn't exists, it're created, if exists, it're mounted. This operation is repeated until the body is a type function.
                    if (trace.length) {
                        context = mountContext(trace);
                    } else if (!context) {
                        context = object;
                    }

                    if (Object.getPrototypeOf(body) == Object.prototype) {

                        if (Object.includeKeys(body, "get") ||
                          Object.includeKeys(body, "set")) {
                            try {
                                Object.defineProperty(context, name, {
                                    get: body.get,
                                    set: body.set,
                                    enumerable: enumerable
                                });
                            } catch (e) {}
                        // allows to create an empty object ({})
                        } else if (!Object.some(body)) {
                            try {
                                Object.defineProperty(context, name, {
                                    value: {},
                                    writable: !final,
                                    enumerable: enumerable
                                });
                            } catch (e) {}
                        }

                    } else if (name != "get" && name != "set") {

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
                    }

                });
            }
        };

    if (!$module["esPhinx"]) {
        try {
            Object.defineProperties($module, {

                esPhinx: {

                    // ver por que o nome na função está sendo necessário para alguns casos
                    value: function esPhinx(selector, context) {
                    // value: (function esPhinx(selector, context) {

                        var
                            parsed,
                            self = esPhinx,
                            mainReference = this,
                            collection = [],

                            hasElement = function(iterable) {
                                var
                                    iterator,
                                    response = false;

                                iterator = Iterable.Proxy.new(iterable);
                                iterator.each(function(object) {
                                    if (object instanceof window.Element) {
                                        this.finalize();
                                        response = true;
                                    }
                                });
                                return response;
                            };

                        if (!(mainReference instanceof self)) {
                            return new self(selector, context);
                        }

                        context = resolveContext(context);

                        if (selector) {
                            if (selector instanceof self) {
                                return selector;
                            } else if (typeof selector == "function") {
                                // don't never pass a autoexecutable function as parameter
                                return window.document
                                    .addEventListener("DOMContentLoaded",
                                                      function(e) {
                                    selector.call(self, self, e);
                                });
                            // get children "".match(/(>)(<.(?=(<\/)))/)[0]
                            // add support to XPath
                            } else if (typeof selector == "string") {
                                parsed = (new window.DOMParser())
                                    .parseFromString(selector, "text/html");

                                if (parsed.head.childElementCount) {
                                    collection = Array.from(parsed.head
                                                            .childNodes);
                                } else {
                                    collection = Array.from(parsed.body
                                                            .childNodes);
                                }

                                if (!hasElement(collection)) {
                                    collection = [];
                                    if (Iterable.isIterable(context)) {
                                        Array.from(context)
                                            .forEach(function(node) {
                                            collection = collection.concat(Array
                                                .from(node
                                                .querySelectorAll(selector)))
                                            .flatten();
                                        });
                                    } else {
                                        try {
                                            collection = Array.from(context
                                                .querySelectorAll(selector));
                                        } catch (e) {}
                                    }
                                }
                            } else if (selector instanceof window.Node) {
                                collection = [selector];
                            } else if (selector instanceof Object) {
                                collection = Array.from(selector);

                                if (selector.constructor !=
                                    window.HTMLCollection &&
                                    collection.length) {
                                    mainReference[0] = selector;

                                    if (selector == window) {
                                        collection = [];
                                    }
                                }
                            }

                            Object.assign(mainReference, collection);
                        }

                        Object.defineProperties(mainReference, {
                            splice: {
                                value: Array.prototype.splice
                            },

                            toString: {
                                value: function() {
                                    return "[object " + NAME + "]";
                                }
                            }
                        });
                        Iterable.toIterable(mainReference);

                        return mainReference;
                    },

                    writable: true,
                    configurable: false

                }

            });
        } catch(e) {};

        Object.defineProperties(esPhinx, {
            Extender: {
                value: {}
            }
        });

        Object.defineProperties(esPhinx.Extender, {
            extend: {
                value: function(object, final, structure) {
                    Extender.extend(object, final, structure);
                }
            }
        });
    }

    esPhinx.Extender.extend(esPhinx, true, {
        extend: function() {
            // debugger
            this.Extender.extend(this, arguments[0], arguments[1]);
        }
    });

    esPhinx.Extender.extend(esPhinx.prototype, true, {
        extend: function() {
            // debugger
            esPhinx.Extender.extend(this, arguments[0], arguments[1]);
        }
    });

    esPhinx.extend(true, {

        selectByText: function(text, context) {
            var
                collection = [];

            this.select(this(resolveContext(context)), function(element) {
                collection = collection.concat(document.evaluate(
                    "descendant-or-self::*[normalize-space(text())='" +
                    text.trim() + "']", element).elements()).flatten();
            });

            return esPhinx(collection);
        },

        isIterable: function(object) {
            return isIterable(object);
        },

        selectInBreadth: function(collection, callback) {
            return selectInBreadth(collection, callback);
        },

        each: function(collection, startIndex, callback) {
            var
                iterator = Iterable.Proxy.new(collection);

            if (typeof startIndex == "function" ) {
                callback = startIndex;
            }

            iterator.each(startIndex, function(item, i) {
                callback.call(this, item, i);
            });
        },

        reverseEach: function(collection, startIndex, callback) {
            var
                iterator = Iterable.Proxy.new(collection);

            if (typeof startIndex == "function") {
                callback = startIndex;
            }

            iterator.reverseEach(startIndex, function(item, i) {
                callback.call(this, item, i);
            });
        },

        select: function(collection, callback) {
            var
                returned,
                selected = [];

            esPhinx.each(collection, function(item, i) {
                returned = callback.call(collection, item, i);

                if (returned) {
                    selected.push(item);
                }
            });

            return selected;
        }

    });


})(window);

// recognize element, his attributes, properties and his values

// recognize a element
// (^( *<)[a-z]+ *)( *((\/)|(>.*<\/[a-z]+))(> *)$)

// recognize attributes and values
// It's not possible capture attributes and their values, because their values can be given any character, which forces them to use ".+".

// pós vendas
// 4523
