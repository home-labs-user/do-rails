//= require ./object

(function ($) {
    "use strict";

    var
        instances = [];

    Object.defineProperties($.prototype, {
        singleton: {
            // Um ou dois parâmetros podem ser passados para Function.singleton()
            value: function singleton () {
                var
                    self = this,
                    // apply pega o array (object) passado e o converte para uma
                    // lista de argumentos (flatten), evitando, assim, que o
                    // objeto arguments encapsule outro objeto arguments
                    constructor = Function.prototype.bind
                        .apply(self, [null].concat(arguments).flatten()),
                    i;

                for (i in instances) {
                    if (instances.hasOwnProperty(i)) {
                        if (self.prototype ===
                            Object.getPrototypeOf(instances[i])
                        ) {
                            return instances[i];
                        }
                    }
                }

                instances.push(new constructor());
            }
        }
    });

})(Function);
