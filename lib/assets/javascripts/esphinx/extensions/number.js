var
    esPhinx;

(function ($) {
    "use strict";

    esPhinx.Extensor.new($, {

        unit: function (number) {
            var
                pattern = /[^0-9.]+/;

            return number.match(pattern).first();
        }

    });

})(Number);
