// Object: javascript literal object
(function ($) {
    "use strict";

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
                                .concat(/^(array|collection|arguments|object)$/
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
