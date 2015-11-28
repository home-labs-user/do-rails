(function ($) {
    "use strict";

    $.extend({
        observe: function (args) {
            (new MutationObserver(function (mutations) {
                args.done(mutations);
                }).observe(this[0], args.config));
            return this;
        }
    });

})(jTime);
