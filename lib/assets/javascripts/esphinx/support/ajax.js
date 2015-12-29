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
            user = args.user || null,
            password = args.password || null,

            init = function () {

                var
                    meta = document.querySelector("meta[name=csrf-token]"),
                    token;

                // abre a conexão
                // async false dá warning de deprecated
                xhr.open(type, url, true, user, password);

                if (meta) {
                    token = meta.getAttribute("content");
                }

                if (token) {
                    xhr.setRequestHeader("X-CSRF-Token", token);
                }

                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            },

            get = function () {

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
            };

        switch (type) {
            default:
                get();
        }

        if (!(this instanceof Ajax)) {
            return new Ajax(args);
        }

        this.processing = function (callback) {

            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState > 1 && xhr.readyState < 4) {
                    if (!/^text/.test(xhr.getResponseHeader("Content-Type"))) {
                        xhr.addEventListener("progress", function (e) {
                            callback(e);
                        }, false);
                    } else {
                        callback(xhr);
                    }
                }
            });

            return self;
        };

        this.done = function (callback) {
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if (xhr.getResponseHeader("Content-Type")
                                .search("text/javascript") !== -1) {
                            eval.call(window, xhr.response);
                        }

                        callback(xhr.response, xhr);
                    }
                }
            });

        };

        return self;

    };

})();
