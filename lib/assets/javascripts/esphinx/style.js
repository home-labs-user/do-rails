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
