//= require ./extensor

"use strict";

var
    esPhinx,
    Extensor,
    Iterator;

// IIFE
esPhinx = (function () {

    return function esPhinx (selector, context) {

        var
            esPhinxConstructor = esPhinx,
            self = this,
            length = 0,
            iterable,
            collection,

            removeBreakLine = function (text) {
                return text.replace(/(?!>)\n+/g, "");
            };

        if (!(this instanceof esPhinxConstructor)) {
            return new esPhinxConstructor(selector, context);
        }

        if (context) {
            if (typeof context === "string") {
                // recursivity
                context = esPhinx(context)[0];
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
            if (selector instanceof esPhinx) {
                return selector;
            } else if (typeof selector === "function") {
                return document.addEventListener("DOMContentLoaded", function (e) {
                    selector.call(esPhinxConstructor, e);
                });
            } else if (typeof selector === "string") {
                if (/^(?:<)(.+)/.test(selector)) {
                    collection = Array.from((new DOMParser())
                        .parseFromString(removeBreakLine(selector), "text/html")
                        .body.childNodes);
                } else {
                    collection = Array.from(context.querySelectorAll(selector));
                }
                if (!collection.length) {
                    collection.push(document.createTextNode(selector));
                }
            } else if (selector instanceof Node) {
                collection = [selector];
            } else if (selector instanceof Object) {
                if (Iterator.isIterable(selector)) {
                    Iterator.each(selector, function (v, i) {
                        self[i] = v;
                        length += 1;
                    });
                } else {
                    self.push(selector);
                    length = self.length;
                }
            }

            if (collection) {
                collection.forEach(function (value, attr) {
                    self[attr] = value;
                });
                length = collection.length;
            }
        }

        Object.defineProperties(self, {
            length: {
                value: length,
                writable: true,
                configurable: true
            },
            splice: {
                value: Array.prototype.splice
            },
            [Symbol.iterator]: {
                value: Array.prototype[Symbol.iterator]
            }
        });

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
                args = Array.from(arguments),
                merged = {},
                i;

            Iterator.each(self, function (v, i) {
                merged[i] = v;
            });

            for(i = 1; i < args.length; i++) {
                if (args[i] instanceof Object) {
                    Iterator.each(args[i], function (v, i) {
                        merged[i] = v;
                    });
                }
            }

            return merged;
        },

        type: function (object) {
            // /[^ ]+(?=\])/g
            return /[A-Z_]+[^\]]+/g.exec(Object.prototype.toString
                .call(object))[0].replace(/ /g, "");
        },

        // each: function (enumerable, callback, recursive = false) {
        each: function (enumerable, callback, recursive) {
            if (typeof recursive !== "boolean") { recursive = false; }

            Iterator.each(enumerable, recursive, function (v, i) {
                callback(v, parseInt(i));
            });

            return enumerable;
        },

        prototype: {

            each: function (callback) {
                var
                    self = this;

                $.each(self, callback);

                return self;
            },

            recursiveEach: function (callback) {
                var
                    self = this;

                $.each(self, callback, true);

                return self;
            }
        }

    });

}(esPhinx));
