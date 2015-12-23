//= require ./object
//= require ./array
//= require ./singleton

(function ($) {
    "use strict";

    // closure (private static attribute)
    var
        instances = [];

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
                    i;

                for (i in Singleton.instances) {
                    if (Singleton.instances.hasOwnProperty(i)) {
                        if ((Singleton.instances[i]).object instanceof
                            constructor) {
                            if (arguments.flatten()
                                .isEquivalent(Singleton.instances[i].args)) {
                                // (function () {
                                //     return (instances[i]);
                                // })();
                                // talvez isso funcione
                                return (Singleton.instances[i]).object;
                            }
                        }

                    }
                }

                Singleton.instances.push({
                    object: new constructor(),
                    args: arguments.flatten()
                });
                return Singleton.instances.last().object;
            }
        }
    });

})(Function);
