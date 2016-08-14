"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            observe: function (options, callback) {
                var
                    observer;

                if (!callback && typeof options === "function") {
                    callback = options;
                }

                if (options) {
                    if (!options.childList ||
                        typeof options.childList !== "boolean") {
                        options.childList = true;
                    }

                    if (!options.subtree ||
                        typeof options.subtree !== "boolean") {
                        options.subtree = true;
                    }

                    if (!options.attributes ||
                        typeof options.attributes !== "boolean") {
                        options.attributes = true;
                    }

                    if (!options.characterData ||
                        typeof options.characterData !== "boolean") {
                        options.characterData = true;
                    }

                }

                this.each(function (node) {
                    observer = new MutationObserver(function (mutations) {
                        callback.call(observer, mutations);
                    });

                    observer.observe(node, options);
                });

                return this;
            }
        }

    });

}(esPhinx));
