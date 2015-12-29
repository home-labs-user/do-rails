//= require ./object

"use strict";

var Ajax;
Ajax = (function () {

    return function () {

        var
            self = this,
            args = arguments[0],
            xhr = new XMLHttpRequest(),
            type = args.type || "GET",
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

                if (args.urlParams) {
                    url += "?";

                    args.urlParams.eachAttrs(function (v, i) {
                        url += i + "=" + v + "&";
                    });

                    url = url.slice(0, url.length - 1);
                }

                init();
                // request
                xhr.send(null);
            };

        if (!(this instanceof Ajax)) {
            return new Ajax(args);
        } else {
            switch (type) {
                default:
                    get();
            }
        }

        this.processing = function (callback) {

            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState !== xhr.DONE) {
                    if (/^text/.test(xhr.getResponseHeader("Content-Type"))) {
                        callback(xhr);
                    } else {
                        xhr.addEventListener("progress", function (e) {
                            callback(e);
                        });
                    }
                }
            });

            return self;
        };

        this.done = function (callback) {
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState === xhr.DONE) {
                    if (xhr.status === 200) {
                        debugger
                        // binary file returns url
                        if(/^application\/octet\-stream/.test(xhr
                            .getResponseHeader("Content-Type"))) {
                            callback(xhr.response);
                        } else {
                            if (!/^text/.test(xhr
                                .getResponseHeader("Content-Type"))) {
                                callback(args.url);
                            } else if (/\/javascript/.test(xhr
                                .getResponseHeader("Content-Type"))) {
                                eval.call(window, xhr.response);
                            } else {
                                callback(xhr.response);
                            }
                        }
                    }
                }
            });

        };

        return self;

    };

})();
