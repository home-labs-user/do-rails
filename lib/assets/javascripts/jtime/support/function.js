(function ($) {
    "use strict";

    var
        instances = [];

    Object.defineProperties($.prototype, {
        singleton: {
            // testar se foi chamado num objeto instanciado, então verificar seus prototypes, e, se for o caso, guardar e retornar, jQuery("body") === jQuery("body")
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
                            return instances[i];
                        }
                    }
                }

                newInstance = new Constructor();
                instances.push(newInstance);
                return newInstance;
            }
        }
    });

})(Function);
