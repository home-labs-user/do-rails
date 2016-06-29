//= require ./extensor

"use strict";

var
    esPhinx,
    Extensor,
    Enumerator;

// IIFE
esPhinx = (function () {

    return function esPhinx (selector, context) {

        var
            Constructor = esPhinx,
            self = this,
            length = 0,
            collection,

            removeBreakLine = function (text) {
                return text.replace(/(?!>)\n+/g, "");
            };

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
            // attributes = selector.match(/[^< ]+[\=]+[^ >]+)|([^< ]+[^ >]/g)
            // get children "".match(/(?:>)(<.+(?=(<\/)))/)[0]
            if (typeof selector === "string") {
                if (/^(?:<)(.+)/.test(selector)) {
                    collection = Array.from((new DOMParser())
                        .parseFromString(removeBreakLine(selector), "text/html")
                        .body.childNodes);
                } else {
                    collection = Array.from(context.querySelectorAll(selector));
                }
            } else if (typeof selector === "function") {
                return esPhinx(context).on("DOMContentLoaded", selector);
            } else if (selector instanceof Node) {
                collection = Array.prototype.slice.call([selector]);
            } else if (selector instanceof esPhinx) {
                return selector;
            } else if (selector instanceof Object) {
                Enumerator.each(selector, function (v, i) {
                    self[i] = v;
                    length += 1;
                });
            }

            if (collection) {
                collection.forEach(function (value, attr) {
                    self[attr] = value;
                });
                length = collection.length;
            }

            Object.defineProperties(self, {
                length: {
                    value: length
                },
                splice: {
                    value: Array.prototype.splice
                },
                [Symbol.iterator]: {
                    value: Array.prototype[Symbol.iterator]
                }
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

        type: function (object) {
            return /[^ ]+(?=\])/g.exec($.prototype.toString.call(object))[0];
        },

        merge: function () {
            var
                self = arguments[0],
                args = Array.from(arguments),
                merged = {},
                i;

            Enumerator.each(self, function (v, i) {
                merged[i] = v;
            });

            for(i = 1; i < args.length; i++) {
                if (args[i] instanceof Object) {
                    Enumerator.each(args[i], function (v, i) {
                        merged[i] = v;
                    });
                }
            }

            return merged;
        }

    });

}(esPhinx));
