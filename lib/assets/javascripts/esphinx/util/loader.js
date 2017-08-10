// talvez o problema possa ser resolvido com funções assíncronas. Da atual forma não funciona porque linha por linha do arquivo é carregada sem que o outro arquivo chamado por getScript esteja carregado.

var
    esPhinx;


(function($) {
    "use strict";

    // var
    //     // aparentemente não será necessário
    //     promises = [],

    //     promise = function(src) {
    //         if (promises.indexOf(src) < 0) {
    //             promises.unshift(src);
    //         }
    //     };


    $.extend({

        config: {
            rootPath: "/",
            loadPath: []
        },

        getScript: function(src) {
            var
                // script,
                first = $("script").first(),

                // resetLoadPath = function() {
                //     $.config.loadPath = [];
                // },

                resolvePath = function(path) {
                    return path.replace(/^\/*/, "/").replace(/\/+$/, "");
                },

                joinPaths = function(names) {
                    var
                        path = "",
                        args = Array.from(arguments),

                        iteratorBlock = function(v) {
                            path += resolvePath(v);
                        };

                    args.forEach(iteratorBlock);

                    return path;
                },

                withoutExtension = function(src) {
                    return src.replace(/(\..*)/, "");
                },

                resolveSrc = function(src) {
                    if (src.match(/(\.js)$/i)) {
                        return src;
                    }

                    return src + ".js";
                };

            // o loadPath pode ser iterado para fazer a verificação
            src = joinPaths($.config.rootPath, withoutExtension(src));

            // debugger
            if (!$("script[src^=\"" + src + "\"]").some()) {
                // debugger
                $("<script></script>")
                // resolver com options
                    // .attribute("defer", "defer")
                    .attribute("async", "async")
                    .attribute("src", resolveSrc(src))
                    .insertBefore(first);
            }
        }

    });

}(esPhinx));
