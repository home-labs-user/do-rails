"use strict";

var
    Extensor;

(function ($) {

    Extensor.new($, {

        unit: function (number) {
            var
                pattern = /[^0-9.]+/;

            return number.match(pattern).first();
        }

    });

})(Number);
