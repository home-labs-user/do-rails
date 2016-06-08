"use strict";

var
    esPhinx;

(function ($) {

    $.extend({
        prototype: {
            centralizeAt: function (nodeQuery) {
                var
                    self = this;

                self.css({
                    top: ($(nodeQuery).height() / 2) - (self.height() / 2) + "px",
                    left: ($(nodeQuery).width() / 2) - (self.width() / 2) + "px"
                });

                return self;
            }
        }
    });

}(esPhinx));
