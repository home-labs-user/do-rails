// require ./singleton
// require ./array

"use strict";

var
    Singleton;

// Object: javascript literal object
(function ($) {

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

}(Object));
