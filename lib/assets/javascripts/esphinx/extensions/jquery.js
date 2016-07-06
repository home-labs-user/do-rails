// require jquery/min/2.2.0
// require ./array

"use strict";

var
    jQuery;

(function ($) {

	$.fn.extend({

        findHasNotAttr: function (query, attr) {
            return $(this).find(query + ":not([" + attr + "])");
        },

        findByAttr: function (query, attr, value) {
            return $(this).find(query + "[" + attr + "=\"" + value + "\"]");
        }

    });

}(jQuery));
