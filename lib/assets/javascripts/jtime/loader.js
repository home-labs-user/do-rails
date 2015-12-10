//= require ./main

// fazer método reload

(function ($) {
    "use strict";


    var
        loadPath = "",
        defaultPath = "/",

        resolvePath = function (path) {
            // : (não captura grupo)
            return path
                .replace(/^\/*/, "/")
                    .replace(/\/+$/, "");
        },

        joinPaths = function () {
            var
                path = "",
                args = Array.prototype.slice.call(arguments);

            args.forEach(function (v) {
                path += resolvePath(v);
            });

            return path;
        };

    $.extend({
        loader: {

            resolvePath: function (path) {
                return resolvePath(path);
            },

            config: {
                defaultPath: function (path) {
                    defaultPath = resolvePath(path);
                }
            },

            loadPath: function () {
                if (arguments.length) {
                    loadPath = arguments[0];
                }

                return joinPaths(defaultPath, loadPath);
            }

        }
    });
})(jTime);

var require;
require = (function ($) {

    var
        promises = [],

        resolveSrc = function (src) {
            src = src.toLowerCase();
            if (src.match(/(.js)$/g)) {
                return src;
            }

            return src.replace() + ".js";
        },

        resetLoadPath = function () {
            $.loadPath("");
        },

        loaded = false,
        proccess = false;

    return function require (src, callback) {
        var
            script,
            promise,
            firstScript;

        // testar se tem algum sendo processado, devendo guardar numa variável, em caso positivo, o eventListener deve ser removido dele para um novo ser adicionado
        src = resolveSrc($.loadPath() + $.resolvePath(src));

        if (!document
                .querySelector("head script[src^=\"" + src + "\"]")
            ) {

            script = document.createElement("script");
            script.src = src;
            // script.async = true;
            // script.defer = true;
            // document.head.appendChild(script);

            script.addEventListener("load", function () {
                loaded = true;
            });

            // agora precisamos definir a prioridade, pois o último chamado deve ser carregado primeiro para liberar o settimeout
            // (function loading () {
            //     debugger
            //     setTimeout(function () {
            //         if (!loaded){
            //             debugger
            //             loading();
            //         } else {
            //             debugger
            //             loaded = false;
            //         }
            //     }, 0);
            // })();

            firstScript = document.querySelectorAll("head script").item(0);
            document.head.insertBefore(script, firstScript);
            // proccess = true;
            resetLoadPath();

        }
    };

})(jTime.loader);
