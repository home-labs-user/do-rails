//= require ./support/object

"use strict";
var esPhinx;
// IIFE
esPhinx = (function () {

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
                collection = Array.prototype.slice
                    .call([selector]);
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

// plugin para extender de forma não enumerável
(function ($) {

    $.extend = function () {
        var
            self = esPhinx,
            args = arguments[0],
            context,

            resolveModule = function () {
                var
                    context = self,
                    arg = arguments[0];

                arg.forEach(function (v) {
                    if (!context[v]) {
                        context[v] = {};
                    }
                    context = context[v];
                });

                return context;
            };

        if (this instanceof self.extend) {
            throw new Error("Illegal constructor");
        }

        if (Object.getPrototypeOf(args) === Array.prototype) {
            context = args[0].module;
            args = args[0].args;
        }

        args.eachNodes(function (answer) {
            if (answer.trail.length) {
                context = resolveModule(answer.trail);
            } else if (!context) {
                context = self;
            }

            Object.defineProperty(context, answer.name, {
                value: answer.value
            });
        });

    };
})(esPhinx);
