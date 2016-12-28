// require constructor;

var
    Singleton,
    esPhinx,
    Constructor,
    Iterator;

// Singleton = (function Singleton () {
Singleton = (function () {
    "use strict";

    // closure (private static attribute)
    var
        instances = [];

        // instances = [],
        // self = Singleton;

    return {

        instances: function () {
            return instances;
        },

        exists: function (constructor, args) {
            args = Array.flatten(args);

            var
                i,
                singleton;

            if (constructor instanceof Function) {
                for (i in instances) {
                    if (instances.hasOwnProperty(i)) {
                        singleton = instances[i];
                        if (singleton.instance instanceof constructor) {
                            if (esPhinx.Object
                                .areEquivalents(args, singleton.args)) {
                                // forEach doesn't break after return statement
                                return singleton.instance;
                            }
                        }
                    }
                }
            }

            return false;
        },

        new: function (constructor, args) {
            var
                self = Singleton,
                ConstructorReference,
                instance;

            if (!(this instanceof self.new)) {
                if (this === self) {
                    return new self.new(constructor, args);
                } else {
                    if (this.instance) {
                        return this.instance;
                    }
                    ConstructorReference = Constructor.new(this, arguments);
                }
            } else {
                if (args.constructor !== Array) {
                    args = Array.from(args);
                }

                args = args.flatten();
                instance = Singleton.exists(constructor, args);

                if (instance) {
                    return instance;
                }

                ConstructorReference = Constructor.new(constructor, args);

                instances.push(this);
            }

            this.instance = new ConstructorReference();
            this.args = args;

            this.instance.deleteSingleton = function () {
                var
                    self = this.constructor,
                    newInstances = [],
                    index;
                instances.forEach(function (object) {
                    newInstances.push(object.instance);
                });

                index = newInstances.indexPerEquivalence(this);
                if (index > -1) {
                    instances.delete(index);
                    return instances;
                } else {
                    self.instance = undefined;
                }

            };

            return this.instance;
        }

    };

})();
