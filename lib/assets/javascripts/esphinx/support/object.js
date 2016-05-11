// require ./singleton
// require ./array

"use strict";

var
    Singleton;

// Object: javascript literal object
(function ($) {

    if (!Object.prototype.recursiveEach) {
        $.defineProperty($.prototype, "recursiveEach", {
            value: function (callback, trail) {
                trail = trail || [];

                var
                    self = this,
                    value;

                Object.getOwnPropertyNames(self).forEach(function (key) {
                // Object.keys(self).forEach(function (key) {
                    value = self[key];

                    if (value) {
                        if (Object.getPrototypeOf(value) === Object.prototype) {
                            // call a function recursively doesn't replace values
                            // of the current loop, neither break it, unless the return instruction is called, but just defines a new
                            // loop with a new value to be run.
                            // recursiveEach(callback, trail.concat(key));
                            value.recursiveEach(callback, trail.concat(key));
                        } else {
                            callback(value, key, trail);
                        }
                    } else {
                        callback(value, key, trail);
                    }
                });
                // }
            }
        });
    }

    if (!Object.prototype.flatten) {
        $.defineProperty($.prototype, "flatten", {
            value: function () {
                var
                    flattened = [],
                    self = this,
                    allowed_pattern = /^(array|arguments)$/,
                    i,
                    type,
                    propertyType;

                type = Object.prototype.toString.call(self)
                    .split(" ").pop().split("]").shift().toLowerCase();

                if (!allowed_pattern.test(type)) {
                    return self;
                }

                for (i in self) {
                    if (self.hasOwnProperty(i)) {
                        propertyType = Object.prototype.toString.call(self[i])
                            .split(" ").pop().split("]").shift().toLowerCase();
                        flattened = flattened
                            .concat(
                                allowed_pattern.test(propertyType) ? self.flatten
                                    .call(self[i]) : self[i]);
                    }
                }

                return flattened;
            }
        });
    }

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
                                    // se o tipo for function a comparação será desprezada
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

    if (!Object.prototype.eachAttrs) {
        $.defineProperty($.prototype, "eachAttrs", {
            value: function () {
                var
                    self = this,
                    callback = arguments[0],
                    i;

                for (i in self) {
                    if (self.hasOwnProperty(i)) {
                        if (typeof self[i] !== "function" && !isNaN(i)) {
                            callback(self[i], parseInt(i));
                        } else {
                            break;
                        }
                    }
                }
            }
        });
    }

    if (!Object.prototype.deleteSingleton) {
        $.defineProperty($.prototype, "deleteSingleton", {
            value: function () {
                var
                    self = this;

                Singleton.destroy.apply(self, arguments.flatten());

                return Singleton.instances();
            }
        });
    }

    if (!Object.prototype.merge) {
        $.defineProperty($.prototype, "merge", {
            value: function () {
                var
                    self = this,
                    merged = {},
                    i,
                    arg;

                for (i in self) {
                    if (self.hasOwnProperty(i)) {
                        merged[i] = self[i];
                    }
                }

                for (arg in arguments) {
                    if (arguments.hasOwnProperty(arg)) {
                        if (arguments[arg] instanceof Object) {
                            for (i in arguments[arg]) {
                                if (arguments[arg].hasOwnProperty(i)) {
                                    merged[i] = arguments[arg][i];
                                }
                            }
                        }
                    }
                }

                return merged;
            }
        });
    }

}(Object));
