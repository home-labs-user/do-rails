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
                    return first.style[prop]
                    || parseFloat(getComputedStyle(first).getPropertyValue(prop));
                }

                if (prop.constructor === Object) {
                    properties = prop;
                    self.each(function (node) {
                        for (i in properties) {
                            if (properties.hasOwnProperty(i)) {
                                node.style[i] = prop[i];
                            }
                        }
                    });
                } else {
                    self.each(function (node) {
                        node.style[prop] = value;
                    });
                }
                return self;
            }
        }
    });

}(esPhinx));
