// require ./support/object

"use strict";

var
    Ajax;

Ajax = (function () {

    return {

        new: function () {
            var
                Constructor = Ajax.new,

                self = this,
                args = arguments[0],
                xhr = new XMLHttpRequest(),
                type = args.type || "GET",
                url = args.url || null,
                user = args.user || null,
                password = args.password || null,
                _processing = args.processing || null,

                init = function () {

                    var
                        meta = document.querySelector("meta[name=csrf-token]"),
                        token;

                    // async false raise warning of deprecated
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

                    if (args.params) {
                        url += "?";

                        args.params.eachAttrs(function (v, i) {
                            url += i + "=" + v + "&";
                        });

                        url = url.slice(0, url.length - 1);
                    }

                    init();
                    // requests
                    xhr.send(null);
                },

                processing = function (callback) {
                    xhr.addEventListener("readystatechange", function () {
                        if (xhr.readyState !== xhr.DONE) {
                            if (xhr.getResponseHeader("Content-Type")) {
                                if (/^text/.test(xhr.getResponseHeader("Content-Type"))) {
                                    callback(xhr);
                                } else {
                                    xhr.addEventListener("progress", function (e) {
                                        callback(e);
                                    });
                                }
                            }
                        }
                    });
                };

            if (_processing) {
                processing(_processing);
            }

            this.processing = function (callback) {

                processing(callback);

                return self;
            };

            this.done = function (callback) {
                xhr.addEventListener("readystatechange", function () {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            // binary or text, but different of executable script
                            if(/^application/.test(xhr
                                .getResponseHeader("Content-Type")) ||
                                (/^text/.test(xhr
                                .getResponseHeader("Content-Type")) &&
                                !/\/(javascript|ecmascript)/.test(xhr
                                    .getResponseHeader("Content-Type")))) {
                                callback(xhr.response);
                            } else {
                                // script
                                if (/\/(javascript|ecmascript)/.test(xhr
                                    .getResponseHeader("Content-Type"))) {
                                    eval.call(window, xhr.response);
                                // binary as video, audio or picture
                                } else {
                                    callback(args.url);
                                }
                            }

                        }
                    }
                });

            };

            if (!(this instanceof Constructor)) {
                return new Constructor(args);
            }

            switch (type) {
                default:
                    get();
            }

            return self;
        }

    };

})();
