// require ./singleton

var
    esPhinx,
    Singleton;

(function ($) {
    "use strict";

    esPhinx.Extensor.new($, {

        prototype: {

            singleton: function () {
                // delegator = Delegator.apply(this);
                // delegator.object(Singleton.new);
                return Singleton.new.apply(this, Array.from(arguments));
            }

        }

    });

})(Function);
