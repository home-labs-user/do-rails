// Object: javascript literal object
(function ($) {
    "use strict";

    if (!Object["eachAttrs"]) {
        $.defineProperty($.prototype, "eachAttrs", {
            value: function () {
                var
                    self = this,
                    attrs = Object.getOwnPropertyNames(self),
                    attr,
                    callback = arguments[0],
                    obj;

                // o for...in é para se usar break;
                for (attr in attrs) {
                    if (!isNaN(parseInt(attrs[attr], 10))) {
                        callback(self[attr], attr);
                    } else {
                        break;
                    }
                }
            }
        });
    }

    if (!Object["isEquivalent"]) {
        $.defineProperty($.prototype, "isEquivalent", {
            value: function () {
                var
                    self = this,
                    i;

                if (self instanceof Object && !(self instanceof Function)) {
                    if ((arguments[0]).constructor === self.constructor) {
                        for (i in self) {
                            if (self.hasOwnProperty(i)) {
                                // se o tipo for function a comparação será desprezada
                                if (typeof self[i] !== "function") {
                                    if ((self[i]).constructor ===
                                        (arguments[0][i]).constructor) {
                                        if (self[i].constructor === Object) {
                                            if (self[i]
                                                .isEquivalent(arguments[0][i])
                                                === false) {
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
                        return false;
                    }
                }

                return true;
            }
        });
    }

    if (!Object["flatten"]) {
        $.defineProperty($.prototype, "flatten", {
            value: function () {
                var
                    flat = [],
                    self = this,
                    i,
                    type;

                for (i in self) {
                    if (self.hasOwnProperty(i)) {
                        type = Object.prototype.toString.call(self[i]).split(' ')
                            .pop().split(']').shift().toLowerCase();
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

    if (!Object["eachNodes"]) {
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

    if (!Object["merge"]) {
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

    if (!Object["indexOfConstructor"]) {
        $.defineProperty($.prototype, "indexOfConstructor", {
            value: function () {
                var
                    self = this,
                    calleeArgs = self.callee.arguments,
                    arg = arguments[0],
                    i;

                for(i in calleeArgs) {
                    if (calleeArgs[i].constructor === arg) {
                        return parseFloat(i);
                    }
                }

                return false;
            }
        });
    }

}(Object));
