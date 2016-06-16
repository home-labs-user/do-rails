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
                        for (prop in properties) {
                            if (properties.hasOwnProperty(prop)) {
                                node.style[prop.camelCase()] = properties[prop];
                            }
                        }
                    });
                } else {
                    self.each(function (node) {
                        prop = prop.camelCase();
                        node.style[prop] = value;
                    });
                }
                return self;
            },

        }

    });

}(esPhinx));
