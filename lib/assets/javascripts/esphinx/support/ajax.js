"use strict";

var Ajax;
Ajax = (function () {

    return function () {

        var
            self = this,
            args = arguments[0],
            xhr = new XMLHttpRequest(),
            type = args.type || null,
            url = args.url || null,
            async = args.async || false,
            user = args.user || null,
            password = args.password || null,
            answer,

            init = function () {

                var
                    // cria o objeto
                    meta = document.querySelector("meta[name=csrf-token]"),
                    token;

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

                // resolve url params
                if (args.urlParams) {
                    args.url += "?";

                    args.urlParams.eachNodes(function (v, i) {
                        args.url += i + "=" + v + "&";
                    });
                    args.url = args.url.slice(0, args.url.length - 1);
                }

                init();
                // request
                xhr.send(null);
            },

            processAsync = function (callback) {
                var
                    progress = args.progress || null,
                    processing = args.processing || callback || null;

                if (progress) {
                    xhr.addEventListener("progress", function (e) {
                        progress(e);
                    }, false);
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState > 1 && xhr.readyState < 4) {
                        if (processing) {
                            processing(xhr);
                        }
                    } else {
                        if (xhr.status === 200) {
                            if (xhr.getResponseHeader("Content-Type")
                                    .search("text/javascript") !== -1) {
                                eval.call(window, xhr.response);
                            }

                            if (callback) {
                                callback(xhr.response);
                            }

                        }
                    }
                }
                // answer = "bla";
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

        if (!(this instanceof Ajax)) {
            return new Ajax(args);
        }

        this.processing = function (callback) {
            async = true;
            initByType();

            processAsync(callback);
            // answer = xhr.response;
            return self;
        }

        this.done = function (callback) {
            if (!async) {
                processSync();
            }

            callback(answer);
        }

        return self;

    }

})();
