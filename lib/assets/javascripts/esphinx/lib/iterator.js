var
    Iterator;

Iterator = (function () {
    "use strict";

    var

        count = function (object, value) {
            var
                length = Object.keys(object).length,

                iterator = function (length) {
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
                    length: iterator(length)
                });
            }

            return length;
        },

        symbolIteratorExists = function () {
            if (window.hasOwnProperty("Symbol") &&
                    window.Symbol.hasOwnProperty("iterator")) {
                return true;
            }

            return false;
        };

    return {

        isIterable: function (object) {
            if (object) {
                if (symbolIteratorExists() &&
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

        // break make sense only in superficial search
        select: function (object, deepSearch, callback) {
            var
                queue = [{trace: [], enumerable: object}],
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
                                    returned = callback.call(object,
                                                             enumerable[key]);

                                    if (deepSearch &&
                                        enumerable[key].childElementCount) {
                                        queue.push({
                                            enumerable: enumerable[key].children
                                        });
                                    }
                                } else {
                                    returned = callback.call(object,
                                                             enumerable[key],
                                                             key,
                                                             map.trace);

                                    if (deepSearch && typeof enumerable[key] ==
                                        "object") {
                                        // put on queue
                                        queue.push({
                                            trace: map.trace.concat(key),
                                            enumerable: enumerable[key]
                                        });
                                    }
                                }

                                if (returned) { selected.push(returned); }
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
        },

        asIterable: function (object) {
            var
                length = count(object),
                newObject = {},
                iterator = {
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
                length: iterator

                // [Symbol.iterator]: {
                //     value: Array.prototype[Symbol.iterator]
                // }
            });

            return newObject;
        },

        toIterable: function (object) {
            var
                // length = count(object);
                // _iterator = iterator(length);
                length = count(object),
                iterator = {
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
                length: iterator
                // length: _iterator
                // length: iterator(length)

                // [Symbol.iterator]: {
                //     value: Array.prototype[Symbol.iterator]
                // }
            });

            return object;
        }

    };

})();

// correto e atual (recursivo)

// a: a; trail:
// a1: [object Object]; trail:
// b: b; trail:
// c: c; trail:
// a11: a11; trail: a1
// a12: [object Object]; trail: a1
// a121: a121; trail: a1,a12

// a: a; trail:
// a1: [object Object]; trail:
// // um retorno correto mas um meio errado mostra que, sim, deve ser, nalgum momento, reiniciado. Mas quando? Qual é critério?
// b: b; trail: a1
// c: c; trail: a1
// //
// a11: a11; trail: a1
// a12: [object Object]; trail: a1
// a121: a121; trail: a1,a12
