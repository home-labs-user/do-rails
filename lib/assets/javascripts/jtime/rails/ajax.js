(function ($) {
    "use strict";

    var
        init = function (args) {

            var
                // cria o objeto
                xhr = new XMLHttpRequest(),
                url = args.url || null,
                user = args.user || null,
                password = args.password || null,
                token,
                meta;

            // abre a conexão
            // async não informado dá warning de deprecated
            xhr.open(args.type, url, args.async, user, password);

            meta = document.querySelector("meta[name=csrf-token]");
            if (meta) {
                token = meta.getAttribute("content");
            }
            if (token) {
                xhr.setRequestHeader("X-CSRF-Token", token);
            }
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

            args.xhr = xhr;

            return args;
        },

        readyStateChange = function (args, callback) {
            var
                xhr = args.xhr;

            if (args.progressMedia) {
                xhr.addEventListener("progress",
                    function (e) {
                        args.progressMedia(e);
                    }, false);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState > 1 && xhr.readyState < 4) {
                    if (args.readyStateChange) {
                        args.readyStateChange(xhr);
                    }
                } else {
                    if (xhr.status === 404) {
                        throw new Error("404 (Not Found)");
                    } else {
                        if (
                            xhr.getResponseHeader("Content-Type")
                                .search("text/javascript") > -1
                        ) {
                            eval(xhr.response);
                        }

                        if (callback) {
                            callback(xhr.response);
                        }
                    }
                }
            };
        };

    // ajax module
    $.ajax = {

        get: function (args) {
            var
                xhr = args.xhr,
                i;

            args.type = "GET";

            if (!args.async) {
                this.async = true;
            } else {
                this.async = args.async;
            }

            if (args.sendData) {
                args.url += "?";
                if (args.sendData instanceof Object) {
                    args.sendData.each(function (v, i) {
                        args.url += i + "=" + v + "&";
                    });
                }
                args.url = args.url.slice(0, args.url.length - 1);
            }

            args.async = this.async;
            args = init(args);
            xhr = args.xhr;

            args.xhr.send(null);

            if (args.async) {
                readyStateChange(args);
            }

            this.respondAsync = function (callback) {
                readyStateChange(args, callback);
            };

            this.respondSync = function (callback) {
                if (xhr.getResponseHeader("Content-Type")
                        .search("text/javascript") > -1) {
                    try {
                        eval(xhr.response);
                    } catch (e) {
                        window.console.error(e);
                    }
                }
                if (callback) {
                    callback(xhr.response);
                }
            };

            return this;
        },

        // deixar somente para os casos de envio
        // xhr.send( dataSend || null );

        done: function (callback) {
            if (this.async) {
                this.respondAsync(callback);
            } else {
                this.respondSync(callback);
            }
        }

    };
})(requireJS);
