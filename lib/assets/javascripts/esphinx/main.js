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
            $ = esPhinx,
            self = this,
            length = 0,
            collection = [],
            selectorsPattern = /(^[*.#])|(\[.+\])|(:.+)|(.+[+,~>].+)/g,
            iterable,

            removeBreakLine = function (text) {
                return text.replace(/(?!>)\n+/g, "");
            };

        if (!(this instanceof $)) {
            return new $(selector, context);
        }

        if (!context || context.constructor === Text) {
            context = document;
        } else {
            if (typeof context === "string") {
                context = esPhinx(context);
            } else if (!context instanceof $) {
                if (!context instanceof Node) {
                    throw new Error("An invalid or illegal context was specified.");
                }
            }
        }

        if (selector) {
            // recognize tagName
            // ([^<][^ >]+)
            // attributes = selector.match(/[^< ]+[\=]+[^ >]+)|([^< ]+[^ >]/g)
            // get children "".match(/(?:>)(<.+(?=(<\/)))/)[0]
            if (selector instanceof $) {
                return selector;
            } else if (typeof selector === "function") {
                return document
                    .addEventListener("DOMContentLoaded", function (e) {
                    selector.call($, e);
                });
            } else if (typeof selector === "string") {
                if (/^(?:<)(.+)/.test(selector)) {
                    collection = Array.from((new DOMParser())
                        .parseFromString(removeBreakLine(selector), "text/html")
                        .body.childNodes);
                } else {
                    if (Iterator.isIterable(context)) {
                        Array.from(context).forEach(function (node) {
                            collection = collection.concat(Array
                                .from(node.querySelectorAll(selector)))
                                .flatten();
                        });
                    } else {
                        if (!/^ +$/.test(selector)) {
                            collection = Array
                                .from(context.querySelectorAll(selector));
                        }
                    }
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

            if (collection.length) {
                Object.assign(self, collection);
                length = collection.length;
            }
        }

        Object.defineProperties(self, {
            length: {
                get: function () {
                    return length;
                },
                // changed by assignment operator (=, +=, ...)
                set: function (value) {
                    var
                        count = Object.keys(this).length;

                    if (value === count) {
                        length = value;
                    }
                }
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
