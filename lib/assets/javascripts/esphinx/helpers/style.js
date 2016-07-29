"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            centralizeAt: function (nodeQuery) {
                var
                    self = this;

                self.css("position", "absolute");

                self.css({
                    top: ($(nodeQuery).height() / 2) - (self.height() / 2)
                        + "px",
                    left: ($(nodeQuery).width() / 2) - (self.width() / 2)
                        + "px"
                });

                return self;
            },

            minWidth: function () {
                var
                    self = this,
                    padding = self.css("padding-left")
                    + self.css("padding-right");

                return self.innerWidth() - padding;
            },

            innerWidth: function () {
                var
                    self = this,
                    border = self.css("border-left-width")
                    + self.css("border-right-width");

                return self.width() - border;
            },

            minHeight: function () {
                var
                    self = this,
                    padding = self.css("padding-top")
                    + self.css("padding-bottom");

                return self.innerHeight() - padding;
            },

            innerHeight: function () {
                var
                    self = this,
                    border = self.css("border-top-width")
                    + self.css("border-bottom-width");

                return self.height() - border;
            },

            transitionDuration: function () {
                var
                    self = this;

                return self.css("transition-duration") * 1000;
            },

            horizontalToggle: function (initialMargin = 0,
                callback = function(){}) {

                if (typeof initialMargin === "function") {
                    callback = initialMargin;
                    initialMargin = 0;
                }

                var
                    self = this,
                    width,
                    margin,
                    marginRight,
                    marginLeft,
                    duration;

                self.each(function (node) {
                    node = $(node);

                    width = Math.round(node.width());
                    marginLeft = Math.abs(node.css("margin-left"));
                    marginRight = Math.abs(node.css("margin-right"));
                    duration = node.transitionDuration();

                    // discovering more criteria to know if align on right (||)
                    if (node.css("float") === "right") {
                        margin = Math.abs(Math.round(node.css("margin-right")));
                        if (margin !== (width + marginLeft)) {
                            node.css("margin-right", - (width + marginLeft)
                                + "px");
                        } else {
                            node.css("margin-right", initialMargin + "px");
                        }
                    } else {
                        margin = Math.abs(Math.round(node.css("margin-left")));
                        if (margin !== (width + marginRight)) {
                            node.css("margin-left", - (width + marginRight)
                                + "px");
                        } else {
                            node.css("margin-left", initialMargin + "px");
                        }
                    }

                    setTimeout(function () {
                        callback(node);
                    }, duration);

                });

                return self;
            },

            toggleClass: function (classList, changeTo) {
                var
                    self = this,
                    pattern;

                self.each(function (node) {
                    if ($(node).hasClass(classList)) {
                        $(node).removeClass(classList);
                        if (changeTo) {
                            $(node).addClass(changeTo);
                        }
                    } else if (changeTo) {
                        if ($(node).hasClass(changeTo)) {
                            $(node).removeClass(changeTo);
                            $(node).addClass(classList);
                        } else {
                            $(node).addClass(classList);
                        }
                    } else {
                        $(node).addClass(classList);
                    }
                });

                return self;
            },

            hide: function () {
                var
                    self = this;

                self.css("display", "none", true);

                return self;
            },

            show: function (displayValue) {
                displayValue = displayValue || "block";

                var
                    self = this;

                // ver como voltar ao valor anterior
                self.css("display", displayValue);

                return self;
            },

            toggle: function () {
                var
                    self = this;

                if (self.css("display") === "none") {
                    self.show();
                } else {
                    self.hide();
                }
            }

        }

    });

}(esPhinx));
