//= require ./object
//= require ./array

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

                for (i in instances) {
                    if (instances.hasOwnProperty(i)) {
                        if (instances[i].object instanceof constructor) {
                            if (arguments.flatten()
                                .isEquivalent(instances[i].args)) {
                                (function () {
                                    return (instances[i]).object;
                                })();
                                // talvez isso funcione
                                // return (instances[i]).object;
                            }
                        }

                    }
                }

                instances.push({
                    object: new constructor(),
                    args: arguments.flatten()
                });
                return instances.last().object;
            }
        }
    });

})(Function);
