//= require ./support/extender

// IIFE
var
    esPhinx,
    Extender;

esPhinx = (function () {
    "use strict";

    return function (selector) {

        if (!(this instanceof esPhinx)) {
            return new esPhinx(selector);
        }

        var
            self = this,
            collection;

        if (selector) {
            if (typeof selector === "string") {
                collection = Array.prototype.slice
                    .call(document.querySelectorAll(selector));
            } else if (selector instanceof HTMLElement) {
                collection = Array.prototype.slice.call([selector]);
            } else if (selector instanceof Array) {
                collection = selector;
            } else if (selector instanceof esPhinx) {
                return selector;
            }

            // attrs
            collection.forEach(function (v, i) {
                self[i] = v;
            });

            Object.defineProperties(self, {
                splice: {
                    value: Function
                },
                length: {
                    value: collection.length
                }
            });
        }

        return self;
    };
}());

(function ($) {

    Extender.extendWith($, {
        extend: function () {
            Extender.extendWith(this, arguments[0]);
        }
    });

}(esPhinx));
