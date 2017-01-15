var
    Constructor,
    Flyweight,
    esPhinx;


(function ($module) {
    "use strict";

    // closure (private static attribute)
    var
        instances = [];

    Object.defineProperties($module, {
        Flyweight: {
            value: {}
        }
    });

    Object.defineProperties(window.Flyweight, {
        Factory: {
            value: {}
        }
    });

    Object.defineProperties(Flyweight.Factory, {
        instances: {
            get: function () {
                return instances;
            }
        },

        exists: {
            value: function (constructor, args) {
                args = Array.flatten(args);

                var
                    i,
                    map;

                if (constructor instanceof Function) {
                    for (i in instances) {
                        if (instances.hasOwnProperty(i)) {
                            map = instances[i];
                            if (map.instance instanceof constructor) {
                                if (esPhinx.Object
                                    .areEquivalents(args, map.args)) {
                                    // forEach doesn't break after return statement
                                    return map.instance;
                                }
                            }
                        }
                    }
                }

                return false;
            }
        },

        // return {
        new: {
            value: function (constructor, args) {
                var
                    self = Flyweight.Factory,
                    ConstructorReference,
                    instance;

                if (!(this instanceof self.new)) {
                    if (this == self) {
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
                    instance = Flyweight.Factory.exists(constructor, args);

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
        }
    });

})(window);
