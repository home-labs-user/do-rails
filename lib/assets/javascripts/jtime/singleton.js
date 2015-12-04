// Futuramente ver se é viável extinguir esse objeto,
// e dar poder a cada objeto de ter seu próprio singleton

// testing
// body = $("body")
// sing = jTime.singleton(body, "body")
// sing.recover("id")

require("jtime");
require("support/array");

(function ($) {
    "use strict";

    var
        instances = [];

    $.extend({
        singleton: function () {
            var
                self = this,
                args = arguments[0],
                newObject = {},
                id,
                key,
                instance,

                keyExists = function () {
                    // self = $.singleton;

                    // self.instances.map(function (i) {
                    instances.forEach(function (i) {
                        if (i.key === key) {
                            // id = true;
                            return true;
                        }
                    });

                    // if (id) {
                    //     return true;
                    // }
                    return false;
                },

                instanceExists = function () {
                        // self = $.singleton;

                    // self.instances.map(function (i) {
                    instances.forEach(function (i) {
                        if (i.instance === instance) {
                            return true;
                        }
                    });

                    // if (id) {
                    //     return true;
                    // }
                    return false;
                },

                resolve = function () {
                    if (Object.getPrototypeOf(args) === Object.prototype) {
                        key = args.key;
                        instance = args.instance;
                    } else {
                        key = arguments[0];
                        if (arguments[1]) {
                            instance = arguments[1];
                        } else {
                            instance = key;
                            window.console
                                .warn("Identifier has not been defined!");
                        }
                    }
                    debugger
                };

            resolve();

            // add a new
            if (!instanceExists()) {
                if (!keyExists()) {
                    newObject.key = key;
                    newObject.instance = instance;
                    instances.push(newObject);
                } else {
                    window.console
                        .error("Identifier already exists!");
                    return false;
                }
            // resolve key of object already saved
            } else {
                if (!keyExists()) {
                    newObject.key = key;
                    newObject.instance = instance;
                    instances = instances.without(instance);
                    instances.push(newObject);
                } else {
                    window.console.warning("Identifier already exists!");
                    return false;
                }
            }

            return self;
        },


    });

        // instances: [],

        // poderá receber um número arbitrário de parâmetros para recuperar um array de instâncias
        // recover: function (identifier) {

        //     var obj = null;

        //     this.instances.map(function (i) {
        //         if (typeof key === "object") {
        //             if (i[key] === key) {
        //                 obj = i[key];
        //             }
        //         } else {
        //             if (i.key === key) {
        //                 obj = i.instance;
        //             }
        //         }
        //     });

        //     if (obj) {
        //         return obj;
        //     }
        //     window.console.error("Instance not found!");
        //     return false;
        // },

        // // instanciar primeiro e guardar depois
        // // parâmetros polimórficos
        // saveState: function (instance, identifier) {


        //     return this.instances[this.instances.length - 1];

        // }

    // };

})(jTime);
