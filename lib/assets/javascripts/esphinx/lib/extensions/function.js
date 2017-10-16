var
    Flyweight;


(function($) {
    "use strict";


    try {

        Object.defineProperties($.prototype, {
            buildConstructor: {
                value: function(args) {
                    // this won't be more necessary with Ecam Script 6
                    if (!(args instanceof Array)) {
                        args = Array.from(args);
                    }

                    // "bind" is a instance method of Function. It creates a new
                    // function for be called after.
                    // Apply calls the bind method
                    return $.prototype.bind.apply(this, [null].concat(args)
                                                  .flatten());
                }
            },

            functionalSingleton: {
                value: function() {
                    // delegator = Delegator.apply(this);
                    // delegator.object(Singleton.new);
                    return Flyweight.Factory.new.apply(this, Array
                                                       .from(arguments));
                }
            },

            implementsMethod: {
                value: function(name) {
                    return Object.implementsMethod(this, name);
                }
            }

        });

    } catch(e) {}

})(Function);
