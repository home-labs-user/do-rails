var
    esPhinx;

(function ($) {
    "use strict";

    $.extend({

        prototype: {

            findHasNotAttr: function (query, attr) {
                return this.find(query + ":not([" + attr + "])");
            },

            findByAttr: function (query, attr, value) {
                return this.find(query + "[" + attr + "=\"" + value + "\"]");
            },

            textContentsAsArray: function () {
                var
                    array = [];

                this.each(function (node) {
                    array.push($(node).text().trim());
                });

                return array;
            },

            filterByTextContent: function (text) {
                var
                    found = $(),
                    current;

                this.recursiveEach(function (node) {
                    current = $(node).filter(function () {
                        return this.text().trim() === text.trim();
                    });
                    current.some() ? found.concat(true, current) : undefined;
                });

                return found;
            }

        }

    });

}(esPhinx));
