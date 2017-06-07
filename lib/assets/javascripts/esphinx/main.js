// alguns métodos não devem ser herdados por todos, como check e uncheck. Ver como isso seria resolvido sem comprometimento do padrão builder

var
    // mudar para APIece ("apaiês")
    esPhinx,
    Iterable,
    Extensor,
    SearchContext,
    Search;

// IIFE
(function($module) {
    "use strict";

    const
        name = "esPhinx";

    var
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
                                for (var i in iterable) {
                                    if (iterable.hasOwnProperty(i)) {
                                        return iterable[i] instanceof
                                        window.Element;
                                    }
                                }
                            };

                        if (!(mainReference instanceof self)) {
                            return new self(selector, context);
                        }

                        context = resolveContext(context);

                        if (selector) {
                            // recognize a tagName
                            // ([^<][^ >]+)
                            // to get attributes?
                            // selector.match(/[^< ]+[\=]+[^ >]+)|([^< ]+[^ >]/g)
                            // get children "".match(/(>)(<.(?=(<\/)))/)[0]
                            if (selector instanceof self) {
                                return selector;
                            } else if (typeof selector == "function") {
                                // don't never pass a autoexecutable function as parameter
                                return window.document
                                    .addEventListener("DOMContentLoaded",
                                                      function(e) {
                                    selector.call(self, self, e);
                                });
                            // add support to XPath
                            } else if (typeof selector == "string") {
                                collection = Array.from((new window.DOMParser())
                                    .parseFromString(selector, "text/html").body
                                    .childNodes);

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
                                    return name;
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
            Extensor: {
                value: {},
                enumerable: true
            }
        });
    }

    Extensor.new(esPhinx.Extensor, true, {
        new: function(object, final, structure) {
            Extensor.new(object, final, structure);
        }
    });

    esPhinx.Extensor.new(esPhinx, true, {
        extend: function() {
            // debugger
            this.Extensor.new(this, arguments[0], arguments[1]);
        }
    });

    esPhinx.Extensor.new(esPhinx.prototype, true, {
        extend: function() {
            // debugger
            esPhinx.Extensor.new(this, arguments[0], arguments[1]);
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
                keys = Object.keys(collection),
                iterator = Iterable.Proxy.new(collection);

            if (typeof startIndex == "function" ) {
                callback = startIndex;
            }

            iterator.each(startIndex, function(item) {
                callback.call(this, item, keys[this.index()]);
            });
        },

        reverseEach: function(collection, startIndex, callback) {
            var
                keys = Object.keys(collection),
                iterator = Iterable.Proxy.new(collection);

            if (typeof startIndex == "function") {
                callback = startIndex;
            }

            iterator.reverseEach(startIndex, function(item) {
                callback.call(this, item, keys[this.index()]);
            });
        },

        select: function(collection, callback) {
            var
                returned,
                selected = [],
                keys = Object.keys(collection),
                iterator = Iterable.Proxy.new(collection);

            iterator.each(function(item) {
                returned = callback.call(this, item,
                                         keys[this.index()]);
                if (returned) {
                    selected.push(item);
                }
            });

            // esPhinx.each(collection, 0, function(item, i) {
            //     returned = callback.call(collection, item, i);

            //     if (returned) {
            //         selected.push(item);
            //     }
            // });

            if (selected.length) {
                return selected;
            }
        }

    });


})(window);

// element_pattern = /([\n ]*<(([a-zA-Z]+( +(\w+-*)* *(= *((" *((\w+-*)|(((\w+-*)+ *: *((\w+-*)+|((\/?(\w+-*))*(\w+-*)+\.\w+))) *;? *)|((\/?(\w+-*))*(\w+-*)+\.\w+))+ *")|(' *((\w+-*)|((\w+-*)+ *: *((\w+-*)+|((\/?(\w+-*))*(\w+-*)+\.\w+)))|((\/?(\w+-*))*(\w+-*)+\.\w+))+ *')|(\\" *((\w+-*)|((\w+-*)+ *: *((\w+-*)+|((\/?(\w+-*))*(\w+-*)+\.\w+)))|((\/?(\w+-*))*(\w+-*)+\.\w+))+ *\\")|(\\' *((\w+-*)|((\w+-*)+ *: *((\w+-*)+|((\/?(\w+-*))*(\w+-*)+\.\w+)))|((\/?(\w+-*))*(\w+-*)+\.\w+))+ *\\')))?)* *(\/|(>(\n|.)*<\/[a-zA-Z]+)))|(!--(\n|.)*--))>[\n ]*)+$/g;

// recognize a Element
// selector_pattern = /( *(([a-zA-Z]+)|([.#](\w+-*)+)|(:(\w+-*)+(\([a-zA-Z0-9]+\))?)|(:{2}(\w+-*)+)|(\*)|(\w*\[ *(\w+-*)+ *([\^$|~*]?= *(((\\?["'])?((\w+-*)+:((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))(;(\w+-*)+:((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))*;?(\\?["'])?)|((\\?["']) *((\w+-*)+ *: *((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))( *; *(\w+-*)+ *: *((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))* *;? *(\\?["'])))) *\]))(( *([,~>+] *)?(([.#](\w+-*)+)|(:(\w+-*)+(\([a-zA-Z0-9]+\))?)|(:{2}(\w+-*)+)|(\w*\[ *(\w+-*)+ *([\^$|~*]?= *(((\\?["'])?((\w+-*)+:((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))(;(\w+-*)+:((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))*;?(\\?["'])?)|((\\?["']) *((\w+-*)+ *: *((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))( *; *(\w+-*)+ *: *((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))* *;? *(\\?["']))))? *(\\?["'])? *\])))|((( *[,~>+] *)| +)(([a-zA-Z]+)|\*)))* *(?!.))/;

// element_pattern = /<(([a-zA-Z]+.*\/?)|(!--(\n|.)*--))>/;

// if (RegExp.prototype.hasOwnProperty("sticky")) {
//     element_pattern = new RegExp(element_pattern, "gy");
//     // selector_pattern = new RegExp(selector_pattern, "gy");
// } else {
//     element_pattern = new RegExp(element_pattern, "g");
//     // selector_pattern = new RegExp(selector_pattern, "g");
// }
