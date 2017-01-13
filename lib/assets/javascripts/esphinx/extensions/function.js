var
    esPhinx;

(function ($) {
    "use strict";

    esPhinx.Extensor.new($, {

        prototype: {

            functionalSingleton: function () {
                // delegator = Delegator.apply(this);
                // delegator.object(Singleton.new);
                return FlyweightFactory.new.apply(this, Array.from(arguments));
            }

        }

    });

})(Function);
