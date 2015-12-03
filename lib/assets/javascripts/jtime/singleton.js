// Futuramente ver se é viável extinguir esse objeto,
// e dar poder a cada objeto de ter seu próprio singleton

// testing
// b = $("body")
// sing = DO.singleton
// sing.saveState(b, "id")
// sing.recover("id")

(function ($) {
    "use strict";

    var
        instances = [];

    // $.extend({
    //     singleton: function () {
    //         var
    //             self = this,
    //             args = arguments[0],
    //             id,

    //             keyExists = function () {
    //                 // self = $.singleton;

    //                 // self.instances.map(function (i) {
    //                 instances.forEach(function (i) {
    //                     if (i.key === key) {
    //                         id = true;
    //                     }
    //                 });

    //                 if (id) {
    //                     return true;
    //                 }
    //                 return false;
    //             },

    //             objectExists = function () {
    //                     // self = $.singleton;

    //                 // self.instances.map(function (i) {
    //                 instances.forEach(function (i) {
    //                     if (i.object === instance) {
    //                         id = true;
    //                     }
    //                 });

    //                 if (id) {
    //                     return true;
    //                 }
    //                 return false;
    //             },

    //             newObject = {};

    //         // adds a new
    //         if (!objectExists()) {
    //             if (key) {
    //                 if (!keyExists()) {
    //                     newObject.key = key;
    //                     newObject.object = instance;
    //                 } else {
    //                     window.console.error("Identifier already exists!");
    //                     return false;
    //                 }
    //             } else {
    //                 // O CODIGO DEVE MUDAR AQUI
    //                 window.console.warn("Identifier has not been defined!");
    //                 // newObject[instance.toString()] = instance;
    //                 newObject[instance] = instance;
    //             }
    //             this.instances.push(newObject);
    //         } else {
    //             if (key) {
    //                 if (!keyExists()) {
    //                     newObject.key = key;
    //                     newObject.object = instance;
    //                     this.instances = this.instances.without(instance);
    //                     this.instances.push(newObject);
    //                 } else {
    //                     window.console.warning("Identifier already exists!");
    //                     return false;
    //                 }
    //             }
    //         }

    //         return self;
    //     },


    // });

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
        //                 obj = i.object;
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
