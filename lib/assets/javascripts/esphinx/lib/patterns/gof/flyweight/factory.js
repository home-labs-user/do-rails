//= require ./flyweight

var
    Flyweight,
    Iterable;


(function($module) {
    "use strict";


    var
        flyweights = [];

    Object.defineProperties(window.Flyweight, {
        Factory: {
            value: {}
        }
    });

    Object.defineProperties(Flyweight.Factory, {
        singletons: {
            get: function() {
                return flyweights;
            }
        },

        exists: {
            value: function(constructor, args) {
                var
                    singleton,
                    iterator;

                if (typeof constructor == "function") {
                    iterator = Iterable.Proxy.new(flyweights);
                    iterator.each(function(map) {
                        if (map.singleton instanceof constructor) {
                            if (Object.areEquivalents(args, map.args)) {
                                singleton = map.singleton;
                                this.finalize();
                            }
                        }
                    });

                    return singleton;
                }

                return false;
            }
        },

        new: {
            value: function(constructor, args) {
                var
                    BuiltConstructor,
                    singleton,
                    self = Flyweight.Factory,
                    ConstructorReference = self.new;

                if (!(this instanceof ConstructorReference)) {
                    if (this == self) {
                        return new ConstructorReference(constructor, args);
                    } else {
                        if (this.singleton) {
                            return this.singleton;
                        }

                        BuiltConstructor = this.buildConstructor(arguments);
                    }
                } else {
                    singleton = Flyweight.Factory.exists(constructor, args);

                    if (singleton) {
                        return singleton;
                    }

                    BuiltConstructor = constructor.buildConstructor(args);
                    flyweights.push(this);
                }

                this.singleton = new BuiltConstructor();
                this.args = args;

                this.singleton.deleteSingleton = function() {
                    var
                        self = this.constructor,
                        newInstances = [],
                        index;

                    flyweights.forEach(function(object) {
                        newInstances.push(object.singleton);
                    });

                    index = newInstances.indexOfEquivalence(this);
                    if (index > -1) {
                        flyweights.delete(index);
                        return flyweights;
                    } else {
                        self.singleton = undefined;
                    }

                };

                return this.singleton;
            }
        }
    });

})(window);
