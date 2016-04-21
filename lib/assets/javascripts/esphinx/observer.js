//= require ./main


"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {
            observe: function (options, callback) {
                var
                    self = this;

                if (!callback && typeof options === "function") {
                    callback = options;
                }

                if (options) {
                    if (!options.childList ||
                        typeof options.childList === "boolean") {
                        options.childList = true;
                    }
                }

                self.eachAttrs(function (domElement) {
                    new MutationObserver(function (mutations) {
                        callback(mutations);
                    }).observe(domElement, options)
                });

                return self;
            }
        }

    });

}(esPhinx));
