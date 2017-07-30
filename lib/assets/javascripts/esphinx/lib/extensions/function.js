var
    Flyweight;


(function($) {
    "use strict";


    try {

        Object.defineProperties($.prototype, {

            functionalSingleton: {
                value: function() {
                    // delegator = Delegator.apply(this);
                    // delegator.object(Singleton.new);
                    return Flyweight.Factory.new.apply(this, Array
                                                       .from(arguments));
                }
            },

            implementsMethods: {
                value: function(name) {
                    return Object.implementsMethods(this, name);
                }
            }

        });

    } catch(e) {}

})(Function);
