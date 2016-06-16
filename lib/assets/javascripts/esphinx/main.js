//= require ./extensor

"use strict";

var
    esPhinx,
    Extensor,
    Enumerator;

// IIFE
esPhinx = (function () {

    // return function esPhinx (selector) {
    return function esPhinx (selector, context) {

        var
            Constructor = esPhinx,
            self = this,
            collection;

        if (!(this instanceof Constructor)) {
            return new Constructor(selector, context);
        }

        if (context) {
            if (typeof context === "string") {
                // recursivity
                context = esPhinx(context).first();
            } else if (context instanceof $) {
                context = context.first();
            } else if (!context instanceof Node) {
                throw new Error("An invalid or illegal context was specified.");
            }
        } else {
            context = document;
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
                    .call(context.querySelectorAll(selector));
            } else if (typeof selector === "function") {
                return esPhinx(context).on("DOMContentLoaded", selector);
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
