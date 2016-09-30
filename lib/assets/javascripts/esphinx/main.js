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
            } else if (!(context instanceof $)) {
                if (!(context instanceof Node)) {
                    throw new Error("An invalid or illegal context was specified.");
                }
            }
        }

        if (selector) {
            // recognize tagName
            // ([^<][^ >]+)
            // attributes
            // selector.match(/[^< ]+[\=]+[^ >]+)|([^< ]+[^ >]/g)
            // get children "".match(/(?:>)(<.+(?=(<\/)))/)[0]
            if (selector instanceof $) {
                return selector;
            } else if (typeof selector === "function") {
                return document
                    .addEventListener("DOMContentLoaded", function (e) {
                    selector.call($, e);
                });
            } else if (typeof selector === "string") {
                // recognize a tag
                if (/ *<{1}[a-zA-Z]+( +(\w+|\w+-+\w+)+={1} *((\\"{1} *\w+( *\w)+ *\\"{1})|(\\'{1} *\w+( *\w)+ *\\'{1})|(\w+)))* *((\/){1}|(>{1}.*<{1}\/[a-zA-Z]+){1})(>{1} *$)/gy.test(selector)) {
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
                        if ((/\W/g.test(selector) &&
                        / *((([.#]{1}|\:{1,2})\w+)|((([.#]{1}|\:{1,2})?\w+) *[,~>+]{1} *((([.#]{1}|\:{1,2})?\w+)|(\*{1})|(\[{1}\w+(([\^$|~*]?={1})?(\w+|((\\'){1}\w+(\\'){1})|((\\"){1}\w+(\\"){1})|('{1}\w+'{1})))?(\]{1}))))) */gy.test(selector)) ||
                            !/\W/g.test(selector)) {
                            collection = Array
                                .from(context.querySelectorAll(selector));
                        }

                        if (!collection.length) {
                            collection = [document.createTextNode(selector)];
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


// caso necessite usar
// (?![#\^\[\]+ ~>,|*:.\\’()$-])\W

// flags gy

//=> .text, .text.text, text.text, text.text text, #text, :text, ::text
// siblings, childrens and multiple heritage. Falta suporte a attributos
// ( *((([.#]{1}|\:{1,2})?\w+)|\*{1})((([.#]{1}|\:{1,2})\w+)*(( +|( *[,~>+]{1} *))((([.#]{1}|\:{1,2})?\w+)|\*{1}))*)* *(?!.))


// attributes example here
// [text]
// ((([.#]{1}|\:{1,2})?\w+) *[,~>+]{1} *((([.#]{1}|\:{1,2})?\w+)|(\*{1})|(\[{1}\w+(([\^$|~*]?={1})?(\w+|((\\'){1}\w+(\\'){1})|((\\"){1}\w+(\\"){1})|('{1}\w+'{1})))?(\]{1}))))
