// alguns métodos não devem ser herdados por todos, como check e uncheck. Ver como isso seria resolvido sem comprometimento do padrão builder

var
    // mudar para APIece ("apaiês")
    esPhinx,
    Iterable,
    Extender,
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
        };

    if (!$module["esPhinx"]) {
        try {
            Object.defineProperties($module, {

                esPhinx: {

                    // ver por que o nome na função está sendo necessário para alguns casos
                    value: function esPhinx(selector, context) {
                    // value: (function esPhinx(selector, context) {

                        var
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
                                collection = Array.from((new window.DOMParser())
                                    .parseFromString(selector, "text/html").body
                                    .childNodes);
                                // debugger
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
                    }

                }

            });
        } catch(e) {};

        Object.defineProperties(esPhinx, {
            Extender: {
                value: {},
                enumerable: true
            }
        });
    }

    Extender.new(esPhinx.Extender, true, {
        new: function(object, final, structure) {
            Extender.new(object, final, structure);
        }
    });

    esPhinx.Extender.new(esPhinx, true, {
        extend: function() {
            // debugger
            this.Extender.new(this, arguments[0], arguments[1]);
        }
    });

    esPhinx.Extender.new(esPhinx.prototype, true, {
        extend: function() {
            // debugger
            esPhinx.Extender.new(this, arguments[0], arguments[1]);
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
// ^( *<)[a-z]+ *((\/)|(>.*<\/[a-z]+))(> *)$

// recognize attributes and values
// (([\w\$][\-]*)+ *= *(((?=").+")|((?=').+')|((?=\\").+\\")|((?=\\').+\\')))|([\w\$][\-]*)+
