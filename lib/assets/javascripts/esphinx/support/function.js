// require ./object
// require ./array
// require ./singleton

"use strict";

var Singleton;

(function ($) {

    Object.defineProperties($.prototype, {
        singleton: {
            value: function singleton () {
                var
                    self = this,
                    // apply pega o array (object) passado e o converte para uma
                    // lista de argumentos (flatten), evitando, assim, que o
                    // objeto arguments encapsule outro objeto arguments
                    Constructor = Function.prototype.bind
                        .apply(self, [null].concat(arguments).flatten()),
                    args = arguments.flatten(),
                    instance;

                instance = Singleton.instanceExists.apply(Constructor, args);
                if (instance) {
                    return instance;
                }

                Singleton.create({
                    object: new Constructor(),
                    args: args
                });

                return Singleton.instances().last().object;
            }
        }
    });

})(Function);
