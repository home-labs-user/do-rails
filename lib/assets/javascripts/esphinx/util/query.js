var
    esPhinx;

(function ($) {
    "use strict";

    $.extend({

        prototype: {

            filterText: function (text) {
                return this.select(true, function (node) {
                    return $(node).text().trim() == text.trim();
                });
            },

            findHasNotAttr: function (query, attr) {
                return this.find(query + ":not([" + attr + "])");
            },

            findByAttr: function (query, attr, value) {
                return this.find(query + "[" + attr + "=\"" + value + "\"]");
            },

            textContentsAsArray: function () {
                var
                    array = [];

                this.select(function (node) {
                    array.push($(node).text().trim());
                });

                return array;
            }

        }

    });

}(esPhinx));
