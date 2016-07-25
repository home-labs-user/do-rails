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

            instance: function () {
                return Singleton.new(this, arguments);
            }

        }

    });

})(Function);
