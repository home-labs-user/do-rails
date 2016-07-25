"use strict";

var
    Singleton;

Singleton = (function () {

    // closure (private static attribute)
    var
        instances = [];

    return {

        instances: function () {
            return instances;
        },

        exists: function (constructor, args) {
            var
                args = Array.flatten(args),
                value;

            if (constructor instanceof Function) {
                for (let singleton of instances) {
                    if (singleton.instance instanceof constructor) {
                        if (args.isEqualTo(singleton.args)) {
                            // forEach doesn't break after return statement
                            return singleton.instance;
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
                newInstances.push(v.instance);
            });

            if (arguments.length) {
                index = newInstances.indexPerEquivalence(arguments[0]);
            } else {
                index = newInstances.indexPerEquivalence(self);
            }

            instances.delete(instances[index]);

            return Singleton.instances();
        },

        // com o .call(this, arguments) dá para resolver fazendo "include" e testando se o constructor instanceof Function or Object
        new: function (constructor, args) {
            var
                self = this,
                SelfConstructorReference = Singleton,
                ConstructorReference,
                instance;

            if (!(this instanceof SelfConstructorReference.new)) {
                return new SelfConstructorReference.new(constructor, args);
            }

            if (args.constructor !== Array) {
                args = Array.from(args);
            }

            args = args.flatten();
            instance = Singleton.exists(constructor, args);
            if (instance) {
                return instance;
            }

            ConstructorReference = Constructor.new(constructor, args);

            this.instance = new ConstructorReference();
            this.args = args;

            instances.push(self);

            return self.instance;
        }

    };

})();
