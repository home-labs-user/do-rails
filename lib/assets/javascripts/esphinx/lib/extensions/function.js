var
    Extensor,
    Flyweight;

(function ($) {
    "use strict";

    Extensor.new($.prototype, {

        functionalSingleton: function () {
            // delegator = Delegator.apply(this);
            // delegator.object(Singleton.new);
            return Flyweight.Factory.new.apply(this, Array.from(arguments));
        }

    });

})(Function);
