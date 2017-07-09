var
    Extender;

(function($) {
    "use strict";

    Extender.new($, {

        unit: function(number) {
            var
                pattern = /[^0-9.]+/;

            return number.match(pattern).first();
        }

    });

})(Number);
