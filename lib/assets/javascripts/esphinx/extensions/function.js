// require ./object
// require ./array
// require ./singleton

"use strict";

var
    Singleton,
    Extensor;

(function ($) {

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
