//= require ./array

var Singleton;
Singleton = (function () {
    "use strict";

    // closure (private static attribute)
    var
        instances = [];

    return {
        create: function () {
            instances.push(arguments[0]);
        },

        instances: function () {
            return instances;
        },

        destroy: function () {
            var
                self = this,
                newInstances = [],
                index;

            instances.forEach(function (v) {
                newInstances.push(v.object);
            });

            if (arguments.length) {
                index = parseInt(newInstances
                    .indexOfEquivalent(arguments[0]), 10);
            } else {
                index = parseInt(newInstances.indexOfEquivalent(self), 10);
            }

            instances.destroy(instances[index]);

            return Singleton.instances();
        },

        // call with apply(constructor, arguments.flatten())
        indexOfInstance: function () {
            var
                self = this,
                i;

            for (i in instances) {
                if (instances.hasOwnProperty(i)) {
                    if ((instances[i]).object instanceof
                        self) {
                        if (arguments.flatten()
                            .isEquivalent((instances[i]).args)) {
                            return i;
                        }
                    }

                }
            }

            return false;
        }

    };

})();
