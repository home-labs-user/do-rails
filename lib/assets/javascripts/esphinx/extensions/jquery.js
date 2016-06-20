// require jquery/min/2.2.0
// require ./array

"use strict";

var
    jQuery;

(function ($) {

	$.fn.extend({

        centralizeAt: function (obj) {
            var
                self = $(this);

            self.css("position", "absolute");

            self.css({
                top: ($(obj).outerHeight() / 2) - (self.outerHeight() / 2) + "px",
                left: ($(obj).outerWidth() / 2) - (self.outerWidth() / 2) + "px"
            });

            return self;
        },

        findHasNotAttr: function (query, attr) {
            var
                self = $(this);

            return self.find(query + ":not([" + attr + "])");
        },

        findByAttr: function (query, attr, value) {
            return $(this).find(query + "[" + attr + "=\"" + value + "\"]");
        },

        textsAsArray: function () {
            var
                arr = [];

            $(this).each(function (i, obj) {
                arr.push(obj.textContent.trim());
            });

            return arr;
        },

        findByContentText: function (text) {
            return $(this).contents().filter(function () {
                return $(this).text().trim() === text.trim();
            });
        },

        sortByTextContent: function (order) {
            var
                self = $(this),
                arr = [],
                asArr = [];

            order = order.toLocaleLowerCase();
            asArr = $(this).textsAsArray();

            if (order === "asc") {
                asArr = asArr.asc();
            } else if (order === "desc") {
                asArr = asArr.desc();
            }

            asArr.map(function (text) {
                arr.push(self.parent().findByContentText(text).get(0));
            });

            return $(arr);
        }

    });

}(jQuery));
