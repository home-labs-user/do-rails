//= require ./main


"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {
            observe: function (options, callback) {
                var
                    self = this,
                    observer;

                if (!callback && typeof options === "function") {
                    callback = options;
                }

                if (options) {
                    if (!options.childList ||
                        typeof options.childList === "boolean") {
                        options.childList = true;
                    }

                    if (!options.subtree ||
                        typeof options.subtree === "boolean") {
                        options.subtree = true;
                    }

                    if (!options.attributes ||
                        typeof options.attributes === "boolean") {
                        options.attributes = true;
                    }

                    if (!options.characterData ||
                        typeof options.characterData === "boolean") {
                        options.characterData = true;
                    }

                }

                self.eachAttrs(function (domElement) {
                    observer = new MutationObserver(function (mutations) {
                        callback(mutations, observer);
                    });

                    observer.observe(domElement, options);
                });

                return self;
            }
        }

    });

}(esPhinx));
