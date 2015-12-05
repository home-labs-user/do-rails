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
                newObject = {},
                id,
                key,
                instance,
                i,

                keyExists = function () {
                    for (i in instances) {
                        if (instances.hasOwnProperty(i)) {
                            if (instances[i].key === key) {
                                return true;
                                break;
                            }
                        }
                    }

                    return false;
                },

                instanceExists = function () {
                    for (i in instances) {
                        if (instances.hasOwnProperty(i)) {
                            if (instances[i].instance === instance) {
                                return true;
                                break;
                            }
                        }
                    }

                    return false;
                },

                resolve = function (args) {
                    if (args.length === 2) {
                        key = args[0];
                        if (args[1]) {
                            instance = args[1];
                        }
                    } else {
                        key = args[0].key;
                        instance = args[0].instance;
                    }
                };

            resolve(arguments);

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
                    for (i in instances) {
                        if (instances.hasOwnProperty(i)) {
                            if (instances[i].instance === instance) {
                                instances[i].key = key;
                            }
                        }
                    }
                } else {
                    window.console
                        .warn("Identifier already exists!");
                    return false;
                }
            }

            return instances.last();
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
