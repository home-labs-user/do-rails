(function ($) {
    "use strict";


    try {

        Object.defineProperties($, {
            unit: {
                value: function (number) {
                    var
                        pattern = /[^0-9\.]+/;

                    return number.match(pattern)[0];
                }
            }
        });

        Object.defineProperties($.prototype, {
            // usage: (m)[".."](n)
            '..': {
                value: function (until, step) {
                    if (typeof step != "number") {step = 1;}

                    var
                        range = [],
                        self = this;

                    while (self <= until) {
                        range.push(self);
                        self += step;
                    }

                    return range;
                }
            }
        });

    } catch(e) {}

})(Number);

// console.log((0)[".."](5, 0.5))
