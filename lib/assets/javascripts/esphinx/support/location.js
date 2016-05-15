"use strict";

var
    Extensor,
    Location;

(function ($) {

    Extensor.new($, {

        prototype: {

            // queryParam: function (param, value) {
            //     if (param) param = param.trim();

            //     var
            //         self = window.location,
            //         uri = location.href,
            //         // (?=...) capture what has ... before, but don't capture ...
            //         // ?!. non capture nothing unless \n
            //         regexp = new RegExp("(" + param + "foo\=[^\&\#]*)|(" + param + "(?=[\&\#]))|(" + param + "(?!.))", "ig"),
            //         results = regexp.exec(uri),
            //         match = uri.match(regexp),

            //         set = function (param, value) {
            //             value = encodeURIComponent(value.toString().trim());
            //             var
            //                 separator;

            //             if (match) {
            //                 // $n(1..9) is a placeholder flag to method "replace", it indicates which matching groups should be selected to replace
            //                 uri = uri.replace(regexp, param + "=" + value);
            //             } else {
            //                 separator = /\?/.test(uri) ? "&" : "?";
            //                 uri = location.origin + location.pathname + location.search + separator + param + "=" + value + location.hash;
            //             }

            //             window.history.pushState("", "", uri);
            //         };

            //     if (value) {
            //         set(param, value);
            //         return self;
            //     }
            //     if (!results) return null;
            //     if (!results[2]) return "";
            //     return decodeURIComponent(results.last().replace(/\+/g, " "));
            // }

        }

    });

})(Location);

// the solution with positive lookbehind. Works with python, for example, but doesn't with JS.

// ((?<=[\?\&])foo\=[^\&\#]*)|((?<=[\?\&])foo(?=[\&\#]))|((?<=[\?\&])foo(?!.))

// the string to test
// ?foo=bar&?foo&foo=foo&foo&nonfoo=bar&nonfoo&foo#foo

// better solution for now in JS

// ([\?\&]foo\=[^\&\#]*)|([\?\&]foo(?=[\&\#]))|(foo(?!.))

// - [^\&\#] - vai do ponto atual para até qualquer coisa que não seja & ou #, pela direita
// - para conjunto de caracteres use [], e para dois ou mais caracteres que devem respeitar uma sequência use a sintaxe de agrupamento ().

// - não pode selecionar apenas a chave porque podem haver chaves com ou sem valor, nesse caso a substituição (.replace), em casos que se têm chave, ficaria com o formato errado, como "foo=bar=bar";
// - só falta aprender a negar caracteres, como em ruby e python;
