// require ./extentions/array

var
    esPhinx,
    Iterable,
    BFS,
    Iterator;

// IIFE
(function ($module) {
    "use strict";

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

        setAccessors = function (object) {
            var
                iterator,
                length = Object.keys(object).length,

                accessors = function (length) {
                    return {
                        get: function () {
                            return length;
                        },
                        set: function () {
                            length = Object.keys(object).length;
                        }
                    };
                };

            Object.defineProperties(object, {
                length: accessors(length)
            });

            // if (iteratorSymbolExists()) {
            //     Object.defineProperties(newObject, {
            //         // js iterator protocol
            //         [window.Symbol.iterator]: {
            //             value: function () {
            //                 var
            //                     iterator = Iterator.new(newObject);

            //                 return {
            //                     next: function () {
            //                         return {
            //                             value: iterator.next(),
            //                             done: iterator.done()
            //                         };
            //                     }
            //                 };
            //             }
            //         }
            //     });
            // }

            iterator = Iterator.new(object);
            Object.defineProperties(object, {
                next: {
                    value: function () {
                        return {
                            value: iterator.next(),
                            done: iterator.done()
                        };
                    }
                }
            });
        },

        asIterable = function (object) {
            var
                newObject = {};

            Object.assign(newObject, object);
            setAccessors(newObject);

            return newObject;
        },

        toIterable = function (object) {
            setAccessors(object);
            return object;
        },

        selectInBreadth = function (enumerable, callback) {
            var
                returned,
                strategy = Iterable.Factory.new(BFS.new(enumerable)),
                selected = [];

            strategy.each(function (value, key, trace) {
                if (value instanceof window.Node) {
                    returned = callback.call(enumerable, value, key);
                } else {
                    returned = callback.call(enumerable, value, key, trace);
                }

                if (returned) {
                    selected.push(value);
                }
            });

            return selected;
        };

    Object.defineProperties($module, {

        esPhinx: {

            // ver por que o nome na função está sendo necessário
            value: function esPhinx(selector, context) {
            // value: (function esPhinx(selector, context) {

                var
                    xPathResult,
                    self = esPhinx,
                    mainReference = this,
                    collection = [],

                    has_element = function (enumerable) {
                        for (var i in collection) {
                            if (collection.hasOwnProperty(i)) {
                                if (collection[i] instanceof window.Element) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    },

                    // estender a classe XPathResult
                    xPathResultToArray = function (xPathResult) {
                        var
                            collection = [],
                            next;

                        do {
                            next = xPathResult.iterateNext();
                            if (next) {
                                collection.push(next);
                            }
                        } while(next)

                        return collection;
                    };

                if (!(mainReference instanceof self)) {
                    return new self(selector, context);
                }

                if (!context || context.constructor == window.Text) {
                    context = window.document;
                } else {
                    if (typeof context == "string") {
                        context = self(context);
                    } else if (!(context instanceof self)) {
                        if (!(context instanceof window.Element)) {
                            throw new Error("An invalid or illegal context " +
                                            "was specified.");
                        }
                    }
                }

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
                    } else if (typeof selector == "string") {
                        collection = Array.from((new window.DOMParser())
                            .parseFromString(selector, "text/html").body
                            .childNodes);

                        // encaixar isso nalgum lugar
                        // collection = [document.evaluate("//*[text()=" + selector + "]",
                                          // context).iterateNext()];
                        if (!has_element(collection)) {
                            collection = [];
                            if (isIterable(context)) {
                                Array.from(context).forEach(function (node) {
                                    collection = collection.concat(Array
                                        .from(node.querySelectorAll(selector)))
                                        .flatten();

                                    if (!collection.length) {
                                        xPathResult = document
                                            .evaluate("//*[text()='" +
                                                      selector + "']", node);
                                        collection = collection.concat(
                                        xPathResultToArray(xPathResult));
                                    }
                                });
                            } else {
                                try {
                                    collection = Array.from(context
                                        .querySelectorAll(selector));
                                } catch (e) {}

                                if (!collection.length) {
                                    xPathResult = document
                                        .evaluate("//*[text()='" + selector +
                                                  "']", context);
                                    collection = collection.concat(
                                        xPathResultToArray(xPathResult));
                                }
                            }
                        }
                    } else if (selector instanceof window.Node) {
                        collection = [selector];
                    } else if (selector instanceof Object) {
                        collection = Array.from(selector);

                        if (selector.constructor != window.HTMLCollection) {
                            mainReference[0] = selector;

                            if (selector == window) {
                                collection = [];
                            }
                        }
                    }

                    if (collection.length) {
                        Object.assign(mainReference, collection);
                    }
                }

                Object.defineProperties(mainReference, {
                    splice: {
                        value: Array.prototype.splice
                    }
                });
                toIterable(mainReference);

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
            esPhinx.Extensor.new(this, arguments[0], arguments[1]);
        }
    });

    esPhinx.extend(true, {
        isIterable: function(object) {
            return isIterable(object);
        },

        asIterable: function(object) {
            return asIterable(object);
        },

        toIterable: function(object) {
            return toIterable(object);
        },

        select: function(enumerable, callback) {
            var
                returned,
                current,
                selected = [],
                iterator = Iterator.new(enumerable),
                keys = Object.keys(enumerable),
                count = keys.length;

            if (count) {
                do {
                    current = iterator.current();

                    returned = callback.call(enumerable, current,
                                             keys[iterator.index()]);
                    if (returned) {
                        selected.push(current);
                    }
                } while (iterator.next());
            }

            return selected;
        },

        selectInBreadth: function(enumerable, callback) {
            return selectInBreadth(enumerable, callback);
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
