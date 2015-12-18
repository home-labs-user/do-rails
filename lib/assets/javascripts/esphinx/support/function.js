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
