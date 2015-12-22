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
                        // só se eu guardar os argumentos como uma das propriedades, e, sendo arguments[i] instância de constructor, comparar os argumentos seria um sinal de igualdade pois uma instância de uma classe criada com argumentos iguais, certamente retornaria sempre o mesmo resultado. Logo a equivalência dar-se-ia pela comparação dos argumentos
                        // if ((new constructor()).isEquivalent(instances[i])) {
                        // e agora, josé??? apply?
                        // if (constructor.isEquivalent(instances[i])) {
                        debugger
                        if ((self.apply(self, arguments.flatten()))
                            .isEquivalent(instances[i])) {
                            debugger
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
