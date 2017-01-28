var
    // mudar para APIece ("apiês")
    esPhinx,
    Iterable,
    Extensor,
    Search,
    BFS;

// IIFE
(function ($module) {
    "use strict";

    const
        name = "esPhinx";

    var
        iteratorSymbolExists = function () {
            if (window.hasOwnProperty("Symbol") &&
                    window.Symbol.hasOwnProperty("iterator")) {
                return true;
            }

            return false;
        },

        isIterable = function (object) {
            if (object) {
                if (iteratorSymbolExists() &&
                    object[window.Symbol.iterator] ==
                    Array.prototype[window.Symbol.iterator]) {
                    return true;
                } else {
                    if ((typeof object == "object" ||
                         typeof object == "string") &&
                        object.hasOwnProperty("length")) {
                        return true;
                    }
                }
            }

            return false;
        },

        selectInBreadth = function (iterable, callback) {
            var
                returned,
                strategy = Search.Factory.new(BFS.new(iterable)),
                selected = [];

            strategy.each(function (value, key, trace) {
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

        resolveContext = function (context) {
            if (typeof context == "object") {
                if (context instanceof esPhinx ||
                    context instanceof Element) {
                    return context;
                }
            } else if (typeof context == "string") {
                return esPhinx(context);
            }

            return window.document;
        };

    Object.defineProperties($module, {

        esPhinx: {

            // ver por que o nome na função está sendo necessário para alguns casos
            value: function esPhinx(selector, context) {
            // value: (function esPhinx(selector, context) {


                var
                    self = esPhinx,
                    mainReference = this,
                    collection = [],

                    has_element = function (iterable) {
                        for (var i in iterable) {
                            if (iterable.hasOwnProperty(i)) {
                                if (iterable[i] instanceof window.Element) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    };

                if (!(mainReference instanceof self)) {
                    return new self(selector, context);
                }

                context = resolveContext(context);

                // if (!context || context.constructor == window.Text) {
                //     context = window.document;
                // } else {
                //     if (typeof context == "string") {
                //         context = self(context);
                //     } else if (!(context instanceof self)) {
                //         if (!(context instanceof window.Element)) {
                //             throw new Error("An invalid or illegal context " +
                //                             "was specified.");
                //         }
                //     }
                // }

                if (selector) {
                    // recognize a tagName
                    // ([^<][^ >]+)
                    // to get attributes?
                    // selector.match(/[^< ]+[\=]+[^ >]+)|([^< ]+[^ >]/g)
                    // get children "".match(/(>)(<.(?=(<\/)))/)[0]
                    if (selector instanceof self) {
                        return selector;
                    } else if (typeof selector == "function") {
                        return window.document
                            .addEventListener("DOMContentLoaded", function (e) {
                            selector.call(self, e);
                        });
                    // add support to XPath
                    } else if (typeof selector == "string") {
                        collection = Array.from((new window.DOMParser())
                            .parseFromString(selector, "text/html").body
                            .childNodes);

                        if (!has_element(collection)) {
                            collection = [];
                            if (isIterable(context)) {
                                Array.from(context).forEach(function (node) {
                                    collection = collection.concat(Array
                                        .from(node.querySelectorAll(selector)))
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

                        if (selector.constructor != window.HTMLCollection &&
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
                        value: function () {
                            return name;
                        }
                    }
                });
                Iterable.toIterable(mainReference);

                return mainReference;
            }

        }

    });

    Object.defineProperties(esPhinx, {
        Extensor: {
            value: {},
            enumerable: true
        }
    });

    Extensor.new(esPhinx.Extensor, true, {
        new: function (object, final, structure) {
            Extensor.new(object, final, structure);
        }
    });

    esPhinx.Extensor.new(esPhinx, true, {
        extend: function () {
            this.Extensor.new(this, arguments[0], arguments[1]);
        }
    });

    esPhinx.Extensor.new(esPhinx.prototype, true, {
        extend: function () {
            esPhinx.Extensor.new(this, arguments[0], arguments[1]);
        }
    });

    esPhinx.extend(true, {
        isIterable: function(object) {
            return isIterable(object);
        },

        asIterable: function(object) {
            return Iterable.parse(object);
        },

        selectInBreadth: function(collection, callback) {
            return selectInBreadth(collection, callback);
        },

        select: function(collection, callback) {
            var
                returned,
                selected = [],
                iterator = Iterable.new(collection),
                keys = Object.keys(collection);

            iterator.select(function(item) {
                returned = callback.call(collection, item,
                                             keys[iterator.index()]);
                if (returned) {
                    selected.push(item);
                }
            });

            return selected;
        },

        selectByText: function (text, context) {
            var
                collection = [];

            this.select(this(resolveContext(context)), function (element) {
                collection = collection.concat(document.evaluate(
                    "descendant-or-self::*[normalize-space(text())='" +
                    text.trim() + "']", element).elements()).flatten();
            });

            return esPhinx(collection);
        },

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
