//= require ./object
//= require ./array
//= require ./singleton

(function ($) {
    "use strict";

    var
        instanceExists = function () {
            var
                self = this,
                instances = Singleton.instances(),
                i;

            for (i in instances) {
                if (instances.hasOwnProperty(i)) {
                    if ((instances[i]).object instanceof
                        self) {
                        if (arguments.flatten()
                            .isEquivalent(instances[i].args)) {
                            return i;
                        }
                    }

                }
            }

            return false;
        };

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

                if (index = instanceExists.apply(constructor, args)) {
                    return Singleton.instances()[index].object;
                }

                Singleton.create({
                    object: new constructor(),
                    args: arguments.flatten()
                });

                return Singleton.instances().last().object;
            }
        }
    });

})(Function);
