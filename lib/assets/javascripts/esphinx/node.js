"use strict";

var
    esPhinx;

(function ($) {

    $.extend({
        prototype: {
            first: function () {
                return this[0];
            },

            parent: function (query) {
                var
                    self = $(this),
                    parent = self.first().parentNode,
                    comparator;

                if (query) {
                    comparator = $(query).first();
                    while (true) {
                        if (parent.isEqualTo(comparator)) {
                            return $(parent);
                        } else if (!parent) {
                            break;
                        }
                        parent = parent.parentNode;
                    }
                } else {
                    return $(self.first().parentNode);
                }

                return $();
            }
        }
    });

}(esPhinx));
