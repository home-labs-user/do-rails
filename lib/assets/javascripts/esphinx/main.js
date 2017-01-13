var
    esPhinx,
    window;

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

        count = function (object, value) {
            var
                length = Object.keys(object).length,

                lengthAccessor = function (length) {
                    return {
                        get: function () {
                            return length;
                        },
                        set: function (value) {
                            if (value == length) {
                                length = value;
                            }
                        }
                    };
                };

            if (value) {
                Object.defineProperties(object, {
                    length: lengthAccessor(length)
                });
            }

            return length;
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

        asIterable = function (object) {
            var
                length = count(object),
                newObject = {},
                lengthAccessor = {
                    get: function () {
                        return length;
                    },
                    set: function (value) {
                        length = count(object);
                        if (value == length) {
                            length = value;
                        }
                    }
                };

            Object.assign(newObject, object);

            Object.defineProperties(newObject, {
                length: lengthAccessor

                // [Symbol.iterator]: {
                //     value: Array.prototype[Symbol.iterator]
                // }
            });

            return newObject;
        },

        toIterable = function (object) {
            var
                // length = count(object);
                // lengthAccessor = lengthAccessor(length);
                length = count(object),
                lengthAccessor = {
                    get: function () {
                        return length;
                    },
                    set: function (value) {
                        length = count(object);
                        if (value == length) {
                            length = value;
                        }
                    }
                };

            Object.defineProperties(object, {
                length: lengthAccessor
                // length: lengthAccessor
                // length: lengthAccessor(length)

                // [Symbol.iterator]: {
                //     value: Array.prototype[Symbol.iterator]
                // }
            });

            return object;
        };

    Object.defineProperties($module, {

        esPhinx: {

            // ver por que o nome na função está sendo necessário
            value: function esPhinx(selector, context) {
            // value: (function esPhinx(selector, context) {

                var
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

    Object.defineProperties(esPhinx.Extensor, {
        new: {
            value: function (object, final, structure) {
                var
                    ConstructorReference = this.new,
                    verbose = false,
                    enumerable = true,
                    context,
                    iterator,

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

                iterator = Iterator.new(structure);
                iterator.selectEach(true, function (body, name, trace) {

                    if (trace.length) {
                        context = mountContext(trace);
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

    esPhinx.Extensor.new(esPhinx, true, {
        extend: function () {
            esPhinx.Extensor.new(this, arguments[0], arguments[1]);
            // esPhinx.Extensor.new.apply(null, [this, arguments].flatten());
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

        selectEach: function(enumerable, deepSearch, callback) {
            var
                iterator = Iterator.new(enumerable);
            return iterator.selectEach(deepSearch, callback);
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
