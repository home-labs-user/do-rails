//= require ./constructor

"use strict";

var
    Ajax,
    Constructor,
    Iterator;

Ajax = (function () {

    return {

        new: function (url, options) {
            var
                AjaxConstructor = Constructor.build(Ajax.new, arguments),
                self = this,

                xhr = new XMLHttpRequest(),
                type = options.type || "GET",
                // rever nome de variável, se ela ou a function deve ter _
                _processing = options.processing || null,
                success = options.success || null,
                params = options.param || options.params || null,
                complete = options.complete || options.complete || null,

                setRequestHeaders = function (xhr, headers) {
                    if (headers) {
                        Iterator.each(headers, function (value, header) {
                            if (value) {
                                xhr.setRequestHeader(header, value);
                            }
                        });
                    }
                },

                init = function (xhr, url, headers) {
                    // async false raise warning of deprecated
                    xhr.open(type, url, true, options.user, options.password);

                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                    setRequestHeaders(xhr, headers);
                },

                get = function (xhr, url, params) {
                    if (params) {
                        url += "?";

                        Iterator.each(params, function (value, param) {
                            url += param + "=" + value + "&";
                        });

                        url = url.slice(0, url.length - 1);
                    }

                    init(xhr, url, options.headers);
                    // requests
                    xhr.send(null);
                },

                processing = function (xhr, callback) {
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
                processing(xhr, _processing);
            }

            this.processing = function (callback) {

                processing(xhr, callback);

                return self;
            };

            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState === xhr.DONE) {
                    if (complete) {
                        complete();
                    }
                    if (success) {
                        if (xhr.status === 200) {
                            // binary or text, but different of executable script
                            if(/^application/.test(xhr
                                .getResponseHeader("Content-Type")) ||
                                (/^text/.test(xhr
                                .getResponseHeader("Content-Type")) &&
                                !/\/(javascript|ecmascript)/.test(xhr
                                    .getResponseHeader("Content-Type")))) {
                                success(xhr.response);
                            } else {
                                // script
                                if (/\/(javascript|ecmascript)/.test(xhr
                                    .getResponseHeader("Content-Type"))) {
                                    eval.call(window, xhr.response);
                                // binary as video, audio or picture
                                } else {
                                    success(url);
                                }
                            }
                        }
                    }
                }
            });

            if (!(this instanceof AjaxConstructor)) {
                return new AjaxConstructor();
            }

            switch (type) {
                default:
                    get(xhr, url, params);
            }

            return self;
        }

    };

})();
