//= require ./flyweight

var
    Flyweight,
    Iterable;


(function ($module) {
    "use strict";


    var
        flyweights = [];

    try {
        Object.defineProperties($module, {
            Factory: {
                value: {}
            }
        });


        Object.defineProperties($module.Factory, {
            singletons: {
                get: function () {
                    // inspect (read-only)
                    return flyweights.clone();
                }
            },

            exists: {
                value: function (constructor, args) {
                    var
                        singleton,
                        iterator,

                        callback = function (map) {
                            if (map.singleton instanceof constructor) {
                                if (Object.areEquivalents(args, map.args)) {
                                    singleton = map.singleton;
                                    this.finalize();
                                }
                            }
                        };

                    if (typeof constructor == "function") {
                        iterator = Iterable.Proxy.new(flyweights);
                        iterator.each(callback);

                        return singleton;
                    }

                    return false;
                }
            },

            new: {
                value: function (constructor, args) {
                    var
                        BuiltConstructor,
                        singleton,
                        self = $module.Factory,
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
                        singleton = $module.Factory.exists(constructor, args);

                        if (singleton) {
                            return singleton;
                        }

                        BuiltConstructor = constructor.buildConstructor(args);
                        flyweights.push(this);
                    }

                    this.singleton = new BuiltConstructor();
                    this.args = args;

                    this.singleton.deleteSingleton = function () {
                        var
                            index,
                            newInstances = [],

                            callback = function (object) {
                                newInstances.push(object.singleton);
                            };

                        flyweights.forEach(callback);

                        index = newInstances.indexOfEquivalence(this);
                        if (index > -1) {
                            flyweights.deleteAt(index);
                            return flyweights;
                        } else {
                            this.constructor.singleton = undefined;
                        }

                    };

                    return this.singleton;
                }
            }
        });
    } catch(e) {}

})(Flyweight);
