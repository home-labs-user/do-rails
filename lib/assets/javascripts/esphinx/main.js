//= require ./extensor

"use strict";

var
    esPhinx,
    Extensor,
    Enumerator;

// IIFE
esPhinx = (function () {

    return function esPhinx (selector) {

        var
            Constructor = esPhinx,
            self = this,
            collection;

        if (!(this instanceof Constructor)) {
            return new Constructor(selector);
        }

        if (selector) {
            // recognize tagName
            // ([^<][^ >]+)
            // when positive cases:
            // document.createElement(matched)
            // attributes = selector.match(/[^< ]+[\=]+[^ >]+)|([^< ]+[^ >]/g)
            // attributes.forEach, split("=") and setAttribute

            // see how to recognize children
            if (typeof selector === "string") {
                collection = Array.prototype.slice
                    .call(document.querySelectorAll(selector));
            } else if (typeof selector === "function") {
                return esPhinx(document).on("DOMContentLoaded", selector);
            } else if (selector instanceof Node) {
                collection = Array.prototype.slice.call([selector]);
            } else if (selector instanceof esPhinx) {
                return selector;
            } else if (selector instanceof Object) {
                Enumerator.each(selector, function (v, i) {
                    self[i] = v;
                });
                return self;
            }

            collection.forEach(function (v, i) {
                self[i] = v;
            });
        }

        return self;
    };
}());

(function ($module) {

    Extensor.new($module, {
        extend: function () {
            Extensor.new(this, arguments[0]);
        }
    });

})(esPhinx);

(function ($) {
    $.extend({
        merge: function () {
            var
                self = arguments[0],
                merged = {},
                key,
                arg,
                i;

            for (key in self) {
                if (self.hasOwnProperty(key)) {
                    merged[key] = self[key];
                }
            }

            for(i = 1; i < arguments.length; i++) {
                if (arguments[i] instanceof Object) {
                    for (key in arguments[i]) {
                        if (arguments[i].hasOwnProperty(key)) {
                            merged[key] = arguments[i][key];
                        }
                    }
                }
            }

            return merged;
        }
    });

}(esPhinx));
