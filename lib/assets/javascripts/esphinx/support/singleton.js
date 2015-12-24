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

            // pode ser usado um if aqui, assim como foi criado em Object
            instances.forEach(function (v) {
                newInstances.push(v.object);
            });

            index = parseInt(newInstances
                .indexOfEquivalent(self), 10);
            instances.destroy(instances[index]);

            return Singleton.instances();
        }

    };

})();
