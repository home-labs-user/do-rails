"use strict";

var
    Singleton;

Singleton = (function () {

    // closure (private static attribute)
    var
        instances = [];

    return {
        new: function () {
            // should it push here?
            instances.push(arguments[0]);
            return instances.last();
        },

        instances: function () {
            return instances;
        },

        exists: function (constructor, args) {
            var
                args = Array.flatten(args),
                value;

            if (constructor instanceof Function) {
                for (value of instances) {
                    if (value.object instanceof constructor) {
                        if (args.isEqualTo(value.args)) {
                            // forEach doesn't break after return statement
                            return value.object;
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
                // index = parseInt(newInstances
                //     .indexPerEquivalence(arguments[0]), 10);
                index = newInstances.indexPerEquivalence(arguments[0]);
            } else {
                // index = parseInt(newInstances.indexPerEquivalence(self), 10);
                index = newInstances.indexPerEquivalence(self);
            }


            instances.deleteByIndex(instances[index]);

            return Singleton.instances();
        }

    };

})();
