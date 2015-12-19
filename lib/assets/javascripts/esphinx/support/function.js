//= require ./object

(function ($) {
    "use strict";

    var
        instances = [];

    //
    Object.defineProperties($.prototype, {
        singleton: {
            // Um ou dois parâmetros podem ser passados para Function.singleton()
            value: function singleton () {
                var
                    self = this,
                    Constructor = self,
                    i,
                    newInstance;

                for (i in instances) {
                    if (instances.hasOwnProperty(i)) {
                        if (self.prototype ===
                            Object.getPrototypeOf(instances[i])
                        ) {
                            debugger
                            return instances[i];
                        }
                    }
                }
                // apply pega o array (object) passado e o converte para uma
                // lista de argumentos (flatten), evitando, assim, que o
                // objeto arguments encapsule outro objeto arguments
                Constructor.apply(this, arguments.flatten());
                newInstance = new Constructor();
                instances.push(newInstance);
                return newInstance;
            }
        }
    });

})(Function);
