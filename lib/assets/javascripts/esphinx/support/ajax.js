"use strict";

Ajax = (function () {

    return function () {

        var
            xhr,
            type,
            url,
            async,
            answer,
            args,

            init = function () {

                var
                    // cria o objeto
                    xhr = new XMLHttpRequest(),
                    meta = document.querySelector("meta[name=csrf-token]");
                    user = arguments.user || null,
                    password = arguments.password || null,
                    token;

                url = arguments.url || null;
                async = arguments.async || true;
                // abre a conexão
                // async não informado dá warning de deprecated
                // xhr.open(args.type, url, args.async, user, password);
                xhr.open(type, url, async, user, password);

                if (meta) {
                    token = meta.getAttribute("content");
                }

                if (token) {
                    xhr.setRequestHeader("X-CSRF-Token", token);
                }

                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            },

            get = function (callback) {

                type = "GET";

                args = arguments;

                // resolve url params
                if (args.urlParams) {
                    args.url += "?";

                    args.urlParams.eachNodes(function (v, i) {
                        args.url += i + "=" + v + "&";
                    });
                    args.url = args.url.slice(0, args.url.length - 1);
                }

                // args = init(args);
                // xhr = args.xhr;

                init();
                // request
                xhr.send(null);

                // ??
                // callback(answer);
                // if (args.async) {
                //     // readyStateChange(args);
                //     readyStateChange(args);
                // } else {
                // }
            }

            processAsync = function (callback) {
                var
                    progress = arguments.progress || null,
                    processing = arguments.processing || null;

                if (progress) {
                    xhr.addEventListener("progress",
                        function (e) {
                            progress(e);
                        }, false
                    );
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState > 1 && xhr.readyState < 4) {
                        if (processing) {
                            processing(xhr);
                        }
                    } else {
                        // colocar mais erros
                        if (xhr.status === 404) {
                            throw new Error("404 (Not Found)");
                        } else {
                            if (xhr.getResponseHeader("Content-Type")
                                    .search("text/javascript") !== -1) {
                                eval.call(window, xhr.response);
                            }

                            answer = xhr.response;
                            // if (callback) {
                            //     callback(xhr.response);
                            // }
                            // else {
                            //     answer = xhr.response;
                            // }
                        }
                    }
                }
            },

            processSync = function () {
                if (xhr.getResponseHeader("Content-Type")
                        .search("text/javascript") > -1) {
                    try {
                        eval.call(window, xhr.response);
                    } catch (e) {
                        window.console.error(e);
                    }
                }
                // if (callback) {
                //     callback(xhr.response);
                // }

                answer = xhr.response;
            },

            initByType = function () {
                switch (type) {
                    default:
                        get();
                }
            };

        this.processing = function (callback) {
            initByType();
            processAsync(callback);
        }

        this.done = function (callback) {
            callback(answer);
        }

        if (!(this instanceof Ajax)) {
            return new Ajax(arguments[0]);
        }

    }

})();
