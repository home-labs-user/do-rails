// require ./singleton
// require ./array

"use strict";

var
    Singleton,
    Extensor;

// Object: javascript literal object
(function ($) {

    // Object.compare();
    if (!Object.prototype.isEqualTo) {
        $.defineProperty($.prototype, "isEqualTo", {
            value: function () {
                var
                    self = this,
                    primitiveTypes =
                        /(number|string|boolean|null|undefined|symbol)/,
                    i;

                if ((arguments[0]).constructor === self.constructor) {
                    if (self instanceof Object &&
                        !(self instanceof Function)) {
                        if (self instanceof Node) {
                            if (self.isEqualNode(arguments[0])) {
                                return true;
                            }
                        } else {
                            for (i in self) {
                                if (self.hasOwnProperty(i)) {
                                    if (typeof self[i] !== "function") {
                                        if ((self[i]).constructor ===
                                            (arguments[0][i]).constructor) {
                                            if (self[i].constructor ===
                                                Object) {
                                                if (self[i]
                                                    .isEqualTo(arguments[0][i])
                                                    ) {
                                                    return true;
                                                }
                                            } else {
                                                if (self[i] === arguments[0][i]
                                                    ) {
                                                    return true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if (primitiveTypes.test(typeof self)) {
                            if (self === arguments[0]) {
                                return true;
                            }
                        }
                    }
                }

                return false;
            }
        });
    }

    if (!Object.prototype.deleteSingleton) {
        $.defineProperty($.prototype, "deleteSingleton", {
            value: function () {
                var
                    self = this;

                Singleton.destroy.apply(self, Array.flatten(arguments));

                return Singleton.instances();
            }
        });
    }

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
