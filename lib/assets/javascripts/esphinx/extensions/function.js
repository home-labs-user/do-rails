// require ./extensor
// require ./singleton

var
    Singleton,
    Extensor;

(function ($) {
    "use strict";

    Extensor.new($, {

        prototype: {

            singleton: function () {
                // delegator = Delegator.apply(this);
                // delegator.object(Singleton.new);
                return Singleton.new.apply(this, Array.from(arguments));
            }

        }

    });

})(Function);
