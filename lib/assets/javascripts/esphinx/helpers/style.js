"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            horizontalToggle: function () {
                var
                    self = this;

                self.each(function (node) {
                    node = $(node);
                    // ver se fica melhor fazer com margin-left ou right,
                    // mas para isso é necessário saber o width e o margin-left
                    // ou right
                    node.css("min-width", 0);
                    if (node.width()) {
                        node.width(0);
                    } else {
                        node.width("initial");
                    }
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
                displayValue = displayValue || "initial";

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

            width: function (value) {
                var
                    self = this,
                    width = self.css("width"),
                    padding = self.css("padding-left")
                    + self.css("padding-right"),
                    border = self.css("border-left-width")
                    + self.css("border-right-width"),
                    difference;

                if (value || value === 0) {
                    self.each(function (node) {
                        node = $(node);
                        if (Number.isNaN(parseFloat(value))) {
                            node.css("width", value);
                        } else {
                            padding = self.css("padding-left")
                            + self.css("padding-right"),
                            border = node.css("border-left-width")
                            + node.css("border-right-width");
                            difference = parseFloat(value)
                            - (padding + border);
                            value  = node.width() + difference;
                            if (value < 0) {
                                value = 0;
                            }
                            $(node).css("width", value + "px");
                        }
                    });
                } else {
                    if (Number.isNaN(parseFloat(width))) {
                        return self.first().offsetWidth;
                    }
                    return width + padding + border;
                }
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

            height: function (value) {
                var
                    self = this,
                    height = self.css("height"),
                    padding = self.css("padding-top")
                    + self.css("padding-bottom"),
                    border = self.css("border-top-width")
                    + self.css("border-bottom-width"),
                    difference;

                if (value || value === 0) {
                    self.each(function (node) {
                        node = $(node);
                        if (Number.isNaN(parseFloat(value))) {
                            node.css("height", value);
                        } else {
                            padding = self.css("padding-top")
                            + self.css("padding-bottom");
                            border = node.css("border-top-width")
                            + node.css("border-bottom-width");
                            difference = parseFloat(value)
                            - (padding + border);
                            value  = node.height() + difference;
                            if (value < 0) {
                                value = 0;
                            }
                            $(node).css("height", value + "px");
                        }
                    });
                } else {
                    if (Number.isNaN(parseFloat(height))) {
                        return self.first().offsetHeight;
                    }
                    return self.innerHeight() + border;
                }

                return self;
            }

        }

    });

}(esPhinx));
