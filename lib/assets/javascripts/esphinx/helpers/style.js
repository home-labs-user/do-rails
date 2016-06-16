"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            hasClass: function (classList) {
                var
                    self = this,
                    first = $(self.first()),
                    pattern;

                if (arguments.length > 1) {
                    classList = Array.prototype.slice.call(arguments);
                    pattern = new RegExp("((" + classList
                        .join(")|(")  + "))(?=(\\b| ))", "g");
                } else {
                    pattern = new RegExp("((" + classList.split(" ")
                        .join(")|(") + "))(?=(\\b| ))", "g");
                }

                if (pattern.test(first.attr("class"))) {
                    return true;
                }

                return false;
            },

            toggleClass: function (classList, changeTo) {
                var
                    self = this,
                    pattern;

                pattern = new RegExp("(" + classList.split(" ")
                    .join(")|(") + ")", "g");

                self.each(function (node) {
                    if ($(node).hasClass(classList)) {
                        $(node).removeClass(classList);
                    } else {
                        $(node).addClass(classList);
                    }
                });

                return self;
            },

            hide: function () {
                var
                    self = this;

                self.css("display", "none");

                return self;
            },

            show: function (displayValue) {
                displayValue = displayValue || "block";

                var
                    self = this;

                self.css("display", displayValue);

                return self;
            },

            centralizeAt: function (nodeQuery) {
                var
                    self = this;

                self.css({
                    top: ($(nodeQuery).height() / 2) - (self.height() / 2) + "px",
                    left: ($(nodeQuery).width() / 2) - (self.width() / 2) + "px"
                });

                return self;
            },

            minWidth: function(){
                return this.css("width");
            },

            innerWidth: function(){
                var
                    self = this,
                    paddingLeft = self.css("padding-left"),
                    paddingRight = self.css("padding-right");

                return self.minWidth() + paddingLeft + paddingRight;
            },

            width: function(){
                var
                    self = this,
                    borderLeft = self.css("border-left-width"),
                    borderRight = self.css("border-right-width");

                return self.innerWidth() + borderLeft + borderRight;
            },

            minHeight: function () {
                return this.css("height");
            },

            innerHeight: function () {
                var
                    self = this,
                    paddingTop = self.css("padding-top"),
                    paddingBottom = self.css("padding-bottom");

                return self.minHeight() + paddingTop + paddingBottom;
            },

            height: function () {
                var
                    self = this,
                    borderTop = self.css("border-top-width"),
                    borderBottom = self.css("border-bottom-width");

                return self.innerHeight() + borderTop + borderBottom;
            }

        }

    });

}(esPhinx));
