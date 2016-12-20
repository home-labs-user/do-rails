var
    esPhinx;

(function ($) {
    "use strict";

    $.extend({

        prototype: {

            filterText: function (text) {
                var
                    filtered = $(),
                    current;

                this.deepEach(function (node) {
                // return this.select(true, function (node) {
                    // return $(node).text().trim() == text.trim();

                    current = $(node).filter(function () {
                        return this.text().trim() === text.trim();
                    });
                    current.some() ? filtered.concat(true, current) : undefined;
                });

                return filtered;
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
