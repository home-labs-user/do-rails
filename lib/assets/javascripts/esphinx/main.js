// require ./extensor

var
    Extensor,
    Iterator,
    esPhinx;

// IIFE
(function ($) {
    "use strict";

    Object.defineProperties($, {

        esPhinx: {

            // ver por que o nome na função está sendo necessário
            value: function esPhinx(selector, context) {

                var
                    $ = esPhinx,
                    mainReference = this,
                    collection = [],
                    // element_pattern,

                    has_element = function (enumerable) {
                        for (var i in collection) {
                            if (collection.hasOwnProperty(i)) {
                                if (collection[i] instanceof Element) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    };

                if (!(mainReference instanceof $)) {
                    return new $(selector, context);
                }

                if (!context || context.constructor == Text) {
                    context = document;
                } else {
                    if (typeof context == "string") {
                        context = esPhinx(context);
                    } else if (!(context instanceof $)) {
                        if (!(context instanceof Element)) {
                            throw new Error("An invalid or illegal context was specified.");
                        }
                    }
                }

                if (selector) {
                    // recognize a tagName
                    // ([^<][^ >]+)
                    // to get attributes?
                    // selector.match(/[^< ]+[\=]+[^ >]+)|([^< ]+[^ >]/g)
                    // get children "".match(/(>)(<.(?=(<\/)))/)[0]
                    if (selector instanceof $) {
                        return selector;
                    } else if (typeof selector == "function") {
                        return document
                            .addEventListener("DOMContentLoaded", function (e) {
                            selector.call($, e);
                        });
                    } else if (typeof selector == "string") {
                        collection = Array.from((new DOMParser())
                            .parseFromString(selector, "text/html").body.childNodes);

                        if (!has_element(collection)) {
                            collection = [];
                            if (Iterator.isIterable(context)) {
                                Array.from(context).forEach(function (node) {
                                    collection = collection.concat(Array.from(node
                                        .querySelectorAll(selector))).flatten();
                                });
                            } else {
                                try {
                                    collection = Array
                                        .from(context.querySelectorAll(selector));
                                } catch (e) {}
                            }
                        }
                    } else if (selector instanceof Node) {
                        collection = [selector];
                    } else if (selector instanceof Object) {
                        collection = Array.from(selector);

                        if (selector.constructor !== HTMLCollection) {
                            mainReference[0] = selector;

                            if (selector == window) {
                                collection = [];
                            }
                        }
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
                Iterator.toIterable(mainReference);

                return mainReference;
            },

            writable: true

        }

    });

})(window);


(function ($module) {

    Extensor.new($module, false, {
        extend: function () {
            Extensor.new(this, arguments[0], arguments[1]);
            // Extensor.new.apply(null, [this, arguments].flatten());
        }
    });

})(esPhinx);


(function ($) {

    $.extend({

        selectEach: function (enumerable, deepSearch, callback) {
            // delegate
            return Iterator.selectEach(enumerable, deepSearch, callback);
        }

    });

})(esPhinx);
