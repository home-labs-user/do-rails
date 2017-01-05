// require ./extensor

var
    Extensor,
    esPhinx;

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
        },

        selectEach = function (enumerable, deepSearch, callback) {
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

    Object.defineProperties($module, {

        esPhinx: {

            // ver por que o nome na função está sendo necessário
            value: function esPhinx(selector, context) {
            // value: (function esPhinx(selector, context) {

                var
                    $ = esPhinx,
                    mainReference = this,
                    collection = [],

                    has_element = function (enumerable) {
                        for (var i in collection) {
                            if (collection.hasOwnProperty(i)) {
                                if (collection[i] instanceof Element) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    };

                if (!(mainReference instanceof $)) {
                    return new $(selector, context);
                }

                if (!context || context.constructor == Text) {
                    context = document;
                } else {
                    if (typeof context == "string") {
                        // context = esPhinx(context);
                        context = $(context);
                    } else if (!(context instanceof $)) {
                        if (!(context instanceof Element)) {
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
                    if (selector instanceof $) {
                        return selector;
                    } else if (typeof selector == "function") {
                        return document
                            .addEventListener("DOMContentLoaded", function (e) {
                            selector.call($, e);
                        });
                    } else if (typeof selector == "string") {
                        collection = Array.from((new DOMParser())
                            .parseFromString(selector, "text/html").body
                            .childNodes);

                        if (!has_element(collection)) {
                            collection = [];
                            // if (Iterator.isIterable(context)) {
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
                    } else if (selector instanceof Node) {
                        collection = [selector];
                    } else if (selector instanceof Object) {
                        collection = Array.from(selector);

                        if (selector.constructor !== HTMLCollection) {
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
            },

            writable: true

        }

    });


    // refazer o extensor aqui
    Extensor.new(esPhinx, true, {
        extend: function () {
            Extensor.new(this, arguments[0], arguments[1]);
            // Extensor.new.apply(null, [this, arguments].flatten());
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
            return selectEach(enumerable, deepSearch, callback);
        }

    });


})(window);
