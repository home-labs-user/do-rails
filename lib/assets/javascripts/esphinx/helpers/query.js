"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            textContentsAsArray: function () {
                var
                    self = this,
                    array = [];

                self.each(function (node) {
                    array.push($(node).rootText().trim());
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
                        return this.rootText().trim() === text.trim();
                    });
                    current.count() ? found.concat(true, current) : void 0;
                });

                return found;
            }

        }

    });

}(esPhinx));
