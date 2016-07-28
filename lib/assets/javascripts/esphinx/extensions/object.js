// require ./singleton
// require ./array

"use strict";

var
    Singleton,
    Extensor;

// Object: javascript literal object
(function ($) {

    // Object.compare();
    Extensor.new($.prototype, {
        isEqualTo: function (comparator) {
            var
                self = this,
                primitiveTypes =
                    /(number|string|boolean|null|undefined|symbol)/;

            // colocar um contador para ficar mais eficiente a resposta
            if ((comparator).constructor === self.constructor) {
                if (self instanceof Object && !(self instanceof Function)) {
                    if (self instanceof Node) {
                        if (!self.isEqualNode(comparator)) {
                            return false;
                        }
                    } else {
                        for (let i of Object.keys(self)) {
                            if (typeof self[i] !== "function"
                                && typeof comparator[i] !== "function" ) {
                                if (self[i] && comparator[i]) {
                                    if ((self[i]).constructor
                                        === (comparator[i]).constructor) {
                                        if (self[i] instanceof Object) {
                                            if (!self[i].isEqualTo(
                                                comparator[i])) {
                                                return false;
                                            }
                                        } else if (self[i]
                                            !== comparator[i]) {
                                            return false;
                                        }
                                    }
                                } else if (self[i] !== comparator[i]) {
                                    return false;
                                }
                            }
                        }
                    }
                } else {
                    if (primitiveTypes.test(typeof self)) {
                        if (self !== comparator) {
                            return false;
                        }
                    }
                }
            }

            return true;
        }
    });

    Extensor.new($, {
        arrayToObject: function (array) {
            var
                object = {};

            array.forEach(function (v, i) {
                object[i] = v;
            });

            $.defineProperties(object, {
                length: {
                    value: array.length,
                    writable: true,
                    configurable: true
                }
            });

            return object;
        },

        delete: function (object, index) {
            delete object[index];
            if (object.length) {
                object.length -= 1;
            }
            return object;
        },

        indexOf: function (object, value) {
            for (let key of Object.keys(object)) {
                if (object[key] === value) {
                    return key;
                }
            }

            return undefined;
        },

        firstOfSlice: function (object, slice) {
            for (let key of Object.keys(object)) {
                if (object[key].search(slice) !== -1) {
                    return key;
                }
            }

            return undefined;
        },

        lastOfSlice: function (object, slice) {
            for (let key of Object.keys(object).desc()) {
                if (object[key].search(slice) !== -1) {
                    return key;
                }
            }

            return undefined;
        }
    });

}(Object));
