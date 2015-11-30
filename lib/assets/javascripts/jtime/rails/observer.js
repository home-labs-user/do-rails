(function ($) {
    "use strict";

    $.extend({

        observe: {
            prototype: function () {
                var
                    self = this,
                    args = arguments[0];

                return (new MutationObserver(function (mutations) {
                    args.done(mutations);
                })).observe(self[0], args.config);
            }
        }

    });

})(jTime);
