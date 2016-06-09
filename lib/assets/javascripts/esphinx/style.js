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
                    i;

                if (!value && prop.constructor !== Object) {
                    return parseFloat(getComputedStyle(first)
                        .getPropertyValue(prop));
                }

                if (prop.constructor === Object) {
                    properties = prop;
                    self.each(function (node) {
                        for (i in properties) {
                            if (properties.hasOwnProperty(i)) {
                                i = i.camelize();
                                node.style[i] = prop[i];
                            }
                        }
                    });
                } else {
                    self.each(function (node) {
                        prop = prop.camelize();
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
