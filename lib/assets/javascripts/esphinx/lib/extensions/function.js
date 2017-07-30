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
                value: function(propertyName) {
                    return this.prototype.hasOwnProperty(propertyName) &&
                    typeof this[propertyName] == "function";
                }
            }

        });

    } catch(e) {}

})(Function);
