// require ./singleton

var
    esPhinx;

(function ($) {
    "use strict";

    esPhinx.Extensor.new($, {

        prototype: {

            functionalSingleton: function () {
                // delegator = Delegator.apply(this);
                // delegator.object(Singleton.new);
                return Flyweight.new.apply(this, Array.from(arguments));
            }

        }

    });

})(Function);
