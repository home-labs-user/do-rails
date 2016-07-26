// require ./object
// require ./array
// require ./singleton

"use strict";

var
    Singleton,
    Extensor,
    Constructor;

(function ($) {

    Extensor.new($, {

        prototype: {

            singleton: function () {
                // Delegator.new(Singleton.new, this);
                return Singleton.new.apply(this, Array.from(arguments));
            }

        }

    });

})(Function);
