//= require_tree ./lib/patterns
//= require_directory ./lib/extensions

// See how that must be resolved without compromising the builder pattern

var
    esPhinx,
    Iterable,
    SearchContext,
    Search;

// IIFE
(function($module) {
    "use strict";

    // closure (private static attribute)
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

            return strategy.research(callback);
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
                    propertyDescriptors = {enumerable: true},
                    value = null,
                    verbose = false,

                    isAnAccessor = function(methodName, trace) {
                        return (methodName == "get" || methodName == "set") &&
                            trace.length;
                    },

                    // create or mount the context. If there is trace and object type is an Object, but it doesn't exists, it will be created, else it will be mounted.
                    mountContext = function(methodName, trace, object) {
                        var
                            context = object;

                        if ((trace.length &&
                             !isAnAccessor(methodName, trace)) ||
                            methodName != "get" && methodName != "set") {
                            trace.forEach(function(v) {
                                if (!context[v]) {
                                    context[v] = {};
                                }

                                context = context[v];
                            });
                        }

                        return context;
                    },

                    informeIf = function(verbose) {
                        if (verbose) {
                            console.warn("Property \"" + name +
                                "\" of class \"" +
                                Object.className(context) +
                                "\" can't be redefined because " +
                                "it's configured as read-only.");
                        }
                    },

                    hasAnyAccessor = function(body) {
                        return Object.implementsMethods(body, "get") ||
                         Object.implementsMethods(body, "set");
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

                    if (!Object.isFromClass(body, Object) ||
                        // otherwise it will arrive there still
                        Object.isEmpty(body) || hasAnyAccessor(body)) {

                        context = mountContext(name, trace, object);

                        if (Object.isFromClass(body, Object)){
                            if (hasAnyAccessor(body)) {
                                propertyDescriptors.get = body.get ||
                                    function() {};
                                propertyDescriptors.set = body.set ||
                                    function() {};
                            } else if (Object.isEmpty(body)) {
                                propertyDescriptors.value = {};
                            }
                        } else {
                            if (typeof body == "function") {
                                propertyDescriptors.enumerable = false;
                            }

                            propertyDescriptors.value = body;
                        }

                        try {
                            Object.defineProperty(context, name,
                                                  propertyDescriptors);
                        } catch (e) {
                            informeIf(verbose);
                        }

                        propertyDescriptors = {enumerable: true};
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

                                if (!Object.isFromClass(selector,
                                    window.HTMLCollection) &&
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
            this.Extender.extend(this, arguments[0], arguments[1]);
        }
    });

    esPhinx.Extender.extend(esPhinx.prototype, true, {
        extend: function() {
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

        each: function(collection, startingIndex, finalIndex, callback) {
            var
                iterator = Iterable.Proxy.new(collection);

            iterator.each(startingIndex, finalIndex, callback);
        },

        reverseEach: function(collection, startingIndex, callback) {
            var
                iterator = Iterable.Proxy.new(collection);

            if (typeof startingIndex == "function") {
                callback = startingIndex;
            }

            iterator.reverseEach(startingIndex, callback);
        },

        select: function(collection, callback) {
            var
                iterator = Iterable.Proxy.new(collection);

            return iterator.select(callback);
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
