//= require ./object
//= require ./array
//= require ./singleton

(function ($) {
    "use strict";

    Object.defineProperties($.prototype, {
        singleton: {
            value: function singleton () {
                var
                    self = this,
                    // apply pega o array (object) passado e o converte para uma
                    // lista de argumentos (flatten), evitando, assim, que o
                    // objeto arguments encapsule outro objeto arguments
                    constructor = Function.prototype.bind
                        .apply(self, [null].concat(arguments).flatten()),
                    i,
                    args = arguments.flatten(),
                    index;

                if (index = Singleton.indexOfInstance
                    .apply(constructor, args)) {
                    return Singleton.instances()[index].object;
                }

                Singleton.create({
                    object: new constructor(),
                    args: args()
                });

                return Singleton.instances().last().object;
            }
        }
    });

})(Function);
