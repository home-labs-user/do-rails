// require ./array

"use strict";

var
    Singleton;

Singleton = (function () {

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

        // call with apply(constructor, arguments.flatten())
        instanceExists: function () {
            var
                self = this,
                i;

            if (self instanceof Function) {
                for (i in instances) {
                    if (instances.hasOwnProperty(i)) {
                        if ((instances[i]).object instanceof
                            self) {
                            if (arguments.flatten()
                                .isEquivalent((instances[i]).args)) {
                                return instances[i].object;
                            }
                        }

                    }
                }
            }

            return false;
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

            instances.delete(instances[index]);

            return Singleton.instances();
        }

    };

})();
