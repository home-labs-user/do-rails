// require ./extensor

var
    esPhinx,
    Extensor,
    Iterator;

// IIFE
esPhinx = (function () {
    "use strict";

    return function esPhinx (selector, context) {

        var
            $ = esPhinx,
            mainReference = this,
            collection = [],
            element_pattern,
            selector_pattern,

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

        if (!context || context.constructor === Text) {
            context = document;
        } else {
            if (typeof context === "string") {
                context = esPhinx(context);
            } else if (!(context instanceof $)) {
                if (!(context instanceof Node)) {
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
            } else if (typeof selector === "function") {
                return document
                    .addEventListener("DOMContentLoaded", function (e) {
                    selector.call($, e);
                });
            } else if (typeof selector === "string") {

                // element_pattern = /([\n ]*<(([a-zA-Z]+( +(\w+-*)* *(= *((" *((\w+-*)|(((\w+-*)+ *: *((\w+-*)+|((\/?(\w+-*))*(\w+-*)+\.\w+))) *;? *)|((\/?(\w+-*))*(\w+-*)+\.\w+))+ *")|(' *((\w+-*)|((\w+-*)+ *: *((\w+-*)+|((\/?(\w+-*))*(\w+-*)+\.\w+)))|((\/?(\w+-*))*(\w+-*)+\.\w+))+ *')|(\\" *((\w+-*)|((\w+-*)+ *: *((\w+-*)+|((\/?(\w+-*))*(\w+-*)+\.\w+)))|((\/?(\w+-*))*(\w+-*)+\.\w+))+ *\\")|(\\' *((\w+-*)|((\w+-*)+ *: *((\w+-*)+|((\/?(\w+-*))*(\w+-*)+\.\w+)))|((\/?(\w+-*))*(\w+-*)+\.\w+))+ *\\')))?)* *(\/|(>(\n|.)*<\/[a-zA-Z]+)))|(!--(\n|.)*--))>[\n ]*)+$/g;
                // recognize a Element

                // selector_pattern = /( *(([a-zA-Z]+)|([.#](\w+-*)+)|(:(\w+-*)+(\([a-zA-Z0-9]+\))?)|(:{2}(\w+-*)+)|(\*)|(\w*\[ *(\w+-*)+ *([\^$|~*]?= *(((\\?["'])?((\w+-*)+:((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))(;(\w+-*)+:((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))*;?(\\?["'])?)|((\\?["']) *((\w+-*)+ *: *((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))( *; *(\w+-*)+ *: *((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))* *;? *(\\?["'])))) *\]))(( *([,~>+] *)?(([.#](\w+-*)+)|(:(\w+-*)+(\([a-zA-Z0-9]+\))?)|(:{2}(\w+-*)+)|(\w*\[ *(\w+-*)+ *([\^$|~*]?= *(((\\?["'])?((\w+-*)+:((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))(;(\w+-*)+:((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))*;?(\\?["'])?)|((\\?["']) *((\w+-*)+ *: *((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))( *; *(\w+-*)+ *: *((\w+-*)+|((\\?["'])?(\/?(\w+-*))*(\w+-*)+\.\w+)))* *;? *(\\?["']))))? *(\\?["'])? *\])))|((( *[,~>+] *)| +)(([a-zA-Z]+)|\*)))* *(?!.))/;

                element_pattern = /<(([a-zA-Z]+.*\/?)|(!--(\n|.)*--))>/g;

                if (RegExp.prototype.hasOwnProperty("sticky")) {
                    selector_pattern = new RegExp(selector_pattern, "gy");
                } else {
                    selector_pattern = new RegExp(selector_pattern, "g");
                }

                if (element_pattern.test(selector)) {
                    collection = Array.from((new DOMParser())
                        .parseFromString(selector, "text/html").body
                        .childNodes);
                    if (!has_element(collection)) {
                        collection = [];
                    }
                } else {
                    if (Iterator.isIterable(context)) {
                        Array.from(context).forEach(function (node) {
                            collection = collection.concat(Array
                                .from(node.querySelectorAll(selector)))
                                .flatten();
                        });
                    } else {
                        try {
                            collection = Array
                                .from(context.querySelectorAll(selector));
                        } catch (e) {
                        }
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

        // each: function (enumerable, callback, recursive = false) {
        each: function (enumerable, callback, recursive) {
            if (typeof recursive !== "boolean") { recursive = false; }

            Iterator.each(enumerable, recursive, function (v, i) {
                callback.call(enumerable, v, i);
            });

            return this;
        }

    });

}(esPhinx));
