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
            //selectorsPattern = //gy,

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
                // recognize a tag
                if (/ *<{1}[a-zA-Z]+( +(\w+|\w+-\w+)={1} *((\\"\w+( *\w)+ *\\")|(\\'\w+( *\w)+ *\\')|(\w+)))* *((\/){1}|(>{1}.*<{1}\/[a-zA-Z]+){1})(>{1} *$)/gy.test(selector)) {
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
                        // if ((/\W/g.test(selector) && g.test(selector)) ||
                        if ((/\W/g.test(selector)) ||
                            !/\W/g.test(selector)) {
                            collection = Array
                                .from(context.querySelectorAll(selector));
                        } else
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

// se tiver o que não pode (\W) deve ainda ser testato se há as expressões, caso tenha, tratar como expressão regular.

// espaços no início e no final serão sempre aceitáveis
// o que pode ficar sozinho ou com espaços antes e depois para ser reconhecido
// testar no meio é crítico porque isso text t'ext, por exemplo, passaria com uma expressão regular que fosse analisada para um elemento ser filho de outro.
// / *((([.#]{1}|\:{1,2})?\w+)|(\*{1})|(([.#]{1}|\:{1,2})?\w)*\[{1}\w+(([\^$|~*]?={1})?(\w+|((\\'){1}\w+(\\'){1})|((\\"){1}\w+(\\"){1})|('{1}\w+'{1})))?(\]{1})) */gy

// isso pode ter em qualquer parte
// depois desse if deve ter um || para tratar o que pode vir antes ou depois de determinadas strings, e o que deve estar entre certas strings

// (([.#]{1}|\:{1,2})?\w+) //=> text, .text, #text
// (\*{1}) //=> asterísco
// (([.#]{1}|\:{1,2})?\w)*\[{1}\w+(([\^$|~*]?={1})?(\w+|((\\'){1}\w+(\\'){1})|((\\"){1}\w+(\\"){1})|('{1}\w+'{1})))?(\]{1}) //=> text[text], text[text=text], text[text~=text], .text[text],...
// (?!.) //=> não pode haver nada depois

// senão é porque só pode haver os casos abaixo em que há interação entre um elemento e outro. Talvez seja melhor tratar individualmente cada situação acima.

// o que pode haver depois de ...

// text[...].... O que pode vir antes será filtrado por outras situações, não necessitando colocar, sob pena de deixar o código redundante.
// / *(([.#]{1}|\:{1,2})?\w)*\[{1}\w+(([\^$|~*]?={1})?(\w+|((\\'){1}\w+(\\'){1})|((\\"){1}\w+(\\"){1})|('{1}\w+'{1})))?(\]{1}) *[,~>+]? *((([.#]{1}|\:{1,2})?\w+)|(\*{1})|(\[{1}\w+(([\^$|~*]?={1})?(\w+|((\\'){1}\w+(\\'){1})|((\\"){1}\w+(\\"){1})|('{1}\w+'{1})))?(\]{1}))) */g

// text ~ test; text ~ ::test; text ~ [text]
// / *(([.#]{1}|\:{1,2})?\w+) *[,~>+]{1} *((([.#]{1}|\:{1,2})?\w+)|(\*{1})|(\[{1}\w+(([\^$|~*]?={1})?(\w+|((\\'){1}\w+(\\'){1})|((\\"){1}\w+(\\"){1})|('{1}\w+'{1})))?(\]{1}))) */g



// se o início não atender essas condições, não é uma expressão regular. Tratar especialmente também os casos de apenas letras com apenas espaços opcionais no início, no caso o que deve vir depois delas
// (^( *(\*{1})|(([.#]|\:{1,2})\w+)) *(([~,>+]? *([.#]?|\:{0,2})\w+)|([,~>+]{1} *\*{1}) *))

// (( *([.#]{1}|\:{1,2})\w+) *(([~,>+]? *([.#]?|\:{0,2})\w+)|([~,>+]{1} *\*{1}) *)*)

// parece que se usar (?!.) só faz sentido se o ^ não for usado para analizar desde o início

// - obrigado a haver espaço depois
// [] html
// * html

//