// require ./main
// require ./support/object


"use strict";

var
    esPhinx;

(function ($module) {

    // enviando o objeto DOM para o método, há a oportunidade de guardá-lo ao array, e, de acordo com sua chave, que é única, no array, a mesma poderá ser usada para mapear todos os métodos de um determinado evendo deste objeto, podendo, posteriormente, serem iterados. Isso será a solução para a remoção de todos os métodos (listeners) definidos para um evento de um objeto DOM,e, por enquanto, será apenas um método privado que usará uma variável privada e e estática para uso nos métodos on e off.

    // var
    //     events_map = {},

    //     mapEventListener = function (obj, eventName, listener) {
    //         var
    //             map = {};

    //         map[eventName] = listener;

    //         if (listener) {
    //             if (events_map[obj]) {
    //                 if (events_map[obj][eventName]) {
    //                     events_map[obj][eventName].push(listener);
    //                 } else {
    //                     events_map[obj][eventName] = new Array(listener);
    //                 }
    //             } else {
    //                 events_map[obj] = map;
    //             }
    //         }

    //         return events_map[obj][eventName];
    //     };

    $module.extend({
        prototype: {
            on: function (eventName, options, listener) {
                var
                    self = this;

                if (typeof options === "function") {
                    listener = options;
                    options = {};
                }

                self.eachAttrs(function (domEl) {
                    // mapEventListener(domEl, eventName, listener);

                    domEl.addEventListener(eventName, listener, (options.capture || false), false);
                });

                return self;
            },

            off: function (eventName, options, listener) {
                var
                    self = this;

                if (typeof options === "function") {
                    listener = options;
                    options = {};
                }

                self.eachAttrs(function (domEl) {
                    domEl.removeEventListener(eventName, listener, (options.capture || false));
                });

                return self;
            }

        }

    });

}(esPhinx));
