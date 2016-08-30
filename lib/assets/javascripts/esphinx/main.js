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
            mainReference = this,
            collection = [],
            selectorsPattern = /(^[*.#])|(\[.+\])|(:.+)|(.+[+,~>].+)/g,

            removeBreakLine = function (text) {
                return text.replace(/(?!>)\n+/g, "");
            };

        if (!(mainReference instanceof $)) {
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
                collection = Array.from(selector);
            }

            if (collection.length) {
                Object.assign(mainReference, collection);
            }
        }

        Object.defineProperties(mainReference, {
            splice: {
                value: Array.prototype.splice
            }
        });
        Object.toIterable(mainReference);

        return mainReference;
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
                callback.call(enumerable, v, parseInt(i));
            });

            return this;
        },

        prototype: {

            each: function (callback) {
                $.each(this, callback);

                return this;
            },

            recursiveEach: function (callback) {
                $.each(this, callback, true);

                return this;
            }
        }

    });

}(esPhinx));
