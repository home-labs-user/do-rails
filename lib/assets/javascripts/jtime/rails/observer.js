(function ($) {
    "use strict";

    $.extend({

        observe: function () {
            var args = arguments[0];

            (new MutationObserver(function (mutations) {
                args.done(mutations);
            }).observe(this[0], args.config));

            return this;
        }

    });

})(jTime);
