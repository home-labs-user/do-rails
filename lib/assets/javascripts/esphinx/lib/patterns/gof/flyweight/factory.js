//= require ./interface

var
    Constructor,
    Flyweight;


(function ($module) {
    "use strict";

    // closure (private static attribute)
    var
        flyweights = [];

    Object.defineProperties(window.Flyweight, {
        Factory: {
            value: {}
        }
    });

    Object.defineProperties(Flyweight.Factory, {
        instances: {
            get: function () {
                return flyweights;
            }
        },

        exists: {
            value: function (constructor, args) {
                var
                    i,
                    map;

                if (constructor instanceof Function) {
                    for (i in flyweights) {
                        if (flyweights.hasOwnProperty(i)) {
                            map = flyweights[i];
                            if (map.instance instanceof constructor) {
                                if (Object.areEquivalents(Array.flatten(args),
                                                          map.args)) {
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
                    flyweights.push(this);
                }

                this.instance = new ConstructorReference();
                this.args = args;

                this.instance.deleteSingleton = function () {
                    var
                        self = this.constructor,
                        newInstances = [],
                        index;

                    flyweights.forEach(function (object) {
                        newInstances.push(object.instance);
                    });

                    index = newInstances.indexPerEquivalence(this);
                    if (index > -1) {
                        flyweights.delete(index);
                        return flyweights;
                    } else {
                        self.instance = undefined;
                    }

                };

                return this.instance;
            }
        }
    });

})(window);
