//= require ./singleton
//= require ./array

"use strict";
var Singleton;

// Object: javascript literal object
(function ($) {

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

    if (!Object.prototype.isEquivalent) {
        $.defineProperty($.prototype, "isEquivalent", {
            value: function () {
                var
                    self = this,
                    primitiveTypes =
                        /(number|string|boolean|null|undefined|symbol)/,
                    i;

                if ((arguments[0]).constructor === self.constructor) {
                    if (self instanceof Object && !(self instanceof Function)) {
                        for (i in self) {
                            if (self.hasOwnProperty(i)) {
                                // se o tipo for function a comparação será desprezada
                                if (typeof self[i] !== "function") {
                                    if ((self[i]).constructor ===
                                        (arguments[0][i]).constructor) {
                                        if (self[i].constructor === Object) {
                                            if (self[i]
                                                .isEquivalent(arguments[0][i])=== false) {
                                                return false;
                                            }
                                        } else {
                                            if (self[i] !== arguments[0][i]) {
                                                return false;
                                            }
                                        }
                                    } else {
                                        return false;
                                    }
                                }
                            }
                        }
                    } else {
                        if (primitiveTypes.test(typeof self)) {
                            if (self !== arguments[0]) {
                                return false;
                            }
                        }
                    }
                } else {
                    return false;
                }

                return true;
            }
        });
    }

    if (!Object.prototype.flatten) {
        $.defineProperty($.prototype, "flatten", {
            value: function () {
                var
                    flat = [],
                    self = this,
                    i,
                    type;

                for (i in self) {
                    if (self.hasOwnProperty(i)) {
                        type = Object.prototype.toString.call(self[i])
                            .split(" ").pop().split("]").shift().toLowerCase();
                        if (type) {
                            flat = flat
                                .concat(/^(array|arguments|collection)$/
                                    .test(type) ? self.flatten
                                        .call(self[i]) : self[i]);
                        }
                    }
                }

                return flat;
            }
        });
    }

    if (!Object.prototype.eachNodes) {
        $.defineProperty($.prototype, "eachNodes", {
            value: function (callback, trail) {
                trail = trail || [];

                var
                    self = this,
                    value;

                //for (var key in self) {
                Object.getOwnPropertyNames(self).forEach(function (key) {
                // Object.keys(self).forEach(function (key) {
                    value = self[key];

                    if (Object.getPrototypeOf(value) === Object.prototype) {
                        // chamar uma função recursivamente não substitui os valores do atual loop, nem o interrompe (salvo quando a instrução return é chamada), apenas define um novo loop com um novo valor para ser executado
                        // eachNodes(callback, trail.concat(key));
                        value.eachNodes(callback, trail.concat(key));
                    } else {
                        callback({name: key, value: value, trail: trail});
                    }
                });
                // }
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

    if (!Object.prototype.eachAttrs) {
        $.defineProperty($.prototype, "eachAttrs", {
            value: function () {
                var
                    self = this,
                    callback = arguments[0],
                    i;

                // o for...in é para a possibilidade de se usar break
                for (i in self) {
                    if (typeof self[i] !== "function") {
                        callback(self[i], i);
                    } else {
                        break;
                    }
                }
            }
        });
    }

    // if (!Object.prototype.indexOfConstructor) {
    //     $.defineProperty($.prototype, "indexOfConstructor", {
    //         value: function () {
    //             var
    //                 self = this,
    //                 calleeArgs = self.callee.arguments,
    //                 arg = arguments[0],
    //                 i;

    //             for(i in calleeArgs) {
    //                 if (calleeArgs[i].constructor === arg) {
    //                     return parseFloat(i);
    //                 }
    //             }

    //             return false;
    //         }
    //     });
    // }

}(Object));
