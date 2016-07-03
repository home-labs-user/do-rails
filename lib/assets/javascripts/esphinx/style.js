"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            css: function (prop, value) {
                var
                    self = this,
                    first = self.first(),
                    properties,
                    number,
                    computedStyleValue;

                if (value === 0) value = value.toString();

                if (!value && prop.constructor !== Object) {
                    prop = prop.strikeCase();
                    computedStyleValue = window.getComputedStyle(first)
                        .getPropertyValue(prop);
                    number = parseFloat(computedStyleValue);

                    if (Number.isNaN(number)) {
                        return computedStyleValue;
                    } else {
                        return number;
                    }
                }

                if (prop.constructor === Object) {
                    properties = prop;
                    self.each(function (node) {
                        Iterator.each(properties, function (value, prop) {
                            node.style[prop.camelCase()] = value;
                        });
                    });
                } else {
                    self.each(function (node) {
                        prop = prop.camelCase();
                        node.style[prop] = value;
                    });
                }
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
