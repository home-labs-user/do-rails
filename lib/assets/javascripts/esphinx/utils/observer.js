var
    esPhinx;


(function ($) {
    "use strict";

    $.prototype.extend({

        observe: function (options, callback) {
            var
                observer,

                resolveArguments = function () {
                    if (options) {
                        if (!options.childList ||
                            typeof options.childList != "boolean") {
                            options.childList = true;
                        }

                        if (!options.subtree ||
                            typeof options.subtree != "boolean") {
                            options.subtree = true;
                        }

                        if (!options.characterData ||
                            typeof options.characterData != "boolean") {
                            options.characterData = true;
                        }

                        // if (!options.attributes ||
                        //     typeof options.attributes != "boolean") {
                        //     options.attributes = false;
                        // }

                    }
                },

                iteratorBlock = function (node) {
                    var
                        block = function (mutations) {
                            callback.call(observer, mutations);
                        };

                    observer = new window.MutationObserver(block);

                    observer.observe(node, options);
                };

            if (!callback && typeof options == "function") {
                callback = options;
            }

            resolveArguments();

            this.each(iteratorBlock);

            return this;
        }

    });

}(esPhinx));
