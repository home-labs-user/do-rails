"use strict";

var
    esPhinx;

(function ($) {

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
                    self = this,
                    array = [];

                self.each(function (node) {
                    array.push($(node).text().trim());
                });

                return array;
            },

            filterByTextContent: function (text) {
                var
                    self = this,
                    found = $(),
                    current;


                self.recursiveEach(function (node) {
                    current = $(node).filter(function () {
                        return this.text().trim() === text.trim();
                    });
                    current.count() ? found.concat(true, current) : void 0;
                });

                return found;
            }

        }

    });

}(esPhinx));
