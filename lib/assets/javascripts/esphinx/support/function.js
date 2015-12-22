//= require ./object
//= require ./array

(function ($) {
    "use strict";

    // closure (private static attribute)
    var
        instances = [];

    Object.defineProperties($.prototype, {
        singleton: {
            // Um ou dois parâmetros podem ser passados para Function.singleton()
            // os parâmetros poderão ser usados como um identificador (key)
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
                        if ((new constructor()).isEquivalent(instances[i])) {
                            return instances[i];
                        }
                    }
                }

                instances.push(new constructor());
                return instances.last();
            }
        }
    });

})(Function);

// para testar basta iterar sobre as propriedades numéricas de
// Object.getOwnProperties(new constructor()). Mas isso deve ficar em outro
// método
