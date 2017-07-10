(function($) {
    "use strict";


    try {

        Object.defineProperties($, {
            unit: {
                value: function(number) {
                    var
                        pattern = /[^0-9\.]+/;

                    return number.match(pattern).first();
                }
            }
        });

    } catch(e) {}

})(Number);
