"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            css: function (prop, value) {
                var
                    self = this,
                    node = self.first(),
                    properties,
                    number,
                    computedStyle,

                    originalProperties = {},

                    needsToCalc = {position: "absolute", visibility: "hidden",
                    display: "block"},

                    needsToCalcArr = ["position", "visibility", "display"];

                if (value === 0) {value = value.toString();}

                // (key, value)
                if (!value && prop.constructor !== Object) {
                    prop = prop.strikeCase();
                    computedStyle = window.getComputedStyle(node);
                    value = computedStyle.getPropertyValue(prop) || 0;

                    if (node.style[prop]) {
                        value = parseFloat(node.style[prop]);
                    } else if (computedStyle.display === "none") {
                        needsToCalcArr.forEach(function (prop) {
                            originalProperties[prop] = computedStyle[prop];
                            node.style[prop] = needsToCalc[prop];
                        });
                        value = computedStyle.getPropertyValue(prop);
                        // maybe needs to remove inline property
                        needsToCalcArr.forEach(function (prop) {
                            node.style[prop] = originalProperties[prop];
                        });
                    }

                    number = parseFloat(value);

                    if (Number.isNaN(number)) {
                        return value;
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

            width: function (value) {
                if (this.first() === document) {
                    return this.first().documentElement.offsetWidth;
                }

                var
                    self = this,
                    width = self.css("width"),
                    padding = self.css("padding-left")
                    + self.css("padding-right"),
                    border = self.css("border-left-width")
                    + self.css("border-right-width");

                if (value || value === 0) {
                    self.each(function (node) {
                        node = $(node);
                        if (Number.isNaN(parseFloat(value))) {
                            node.css("width", value);
                        } else {
                            padding = node.css("padding-left")
                            + node.css("padding-right");
                            border = node.css("border-left-width")
                            + node.css("border-right-width");
                            value  = parseFloat(value) - (padding + border);
                            if (value < 0) {
                                value = 0;
                            }
                            node.css("width", value + "px");
                        }
                    });
                } else {
                    if (Number.isNaN(parseFloat(width))) {
                        return self.first().offsetWidth;
                    }
                    return width + padding + border;
                }
            },

            height: function (value) {
                if (this.first() === document) {
                    return this.first().documentElement.offsetHeight;
                }

                var
                    self = this,
                    height = self.css("height"),
                    padding = self.css("padding-top")
                    + self.css("padding-bottom"),
                    border = self.css("border-top-width")
                    + self.css("border-bottom-width");

                if (value || value === 0) {
                    self.each(function (node) {
                        node = $(node);
                        if (Number.isNaN(parseFloat(value))) {
                            node.css("height", value);
                        } else {
                            padding = node.css("padding-top")
                            + node.css("padding-bottom");
                            border = node.css("border-top-width")
                            + node.css("border-bottom-width");
                            value  = parseFloat(value) - (padding + border);
                            if (value < 0) {
                                value = 0;
                            }
                            node.css("height", value + "px");
                        }
                    });
                } else {
                    if (Number.isNaN(parseFloat(height))) {
                        return self.first().offsetHeight;
                    }
                    return height + padding + border;
                }

                return self;
            }

        }

    });

}(esPhinx));
