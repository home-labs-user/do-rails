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
                // ConstructorVar = Constructor.new(Ajax.new, arguments),
                ConstructorVar = Ajax.new,
                self = this,

                callback = function () {},

                xhr = new XMLHttpRequest(),
                type = options.type || "GET",
                // rever nome de variável, se ela ou a function deve ter _
                params = options.param || options.params || null,

                // events abstracts
                // loadstart
                _start = options.start || callback,

                // progress
                _progress = options.progress || callback,

                // loadend
                _done = options.done || callback,

                // load
                _complete = options.complete || callback,
                _error = options.error || callback,
                _abort = options.abort || callback,
                _success = options.success || callback,

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
                    var
                        stringParams = "";

                    if (params) {

                        Iterator.each(params, function (value, param) {
                            if (value instanceof Object) {
                                value = JSON.stringify(value);
                            }
                            // debugger
                            stringParams += param + "=" + value + "&";
                        });

                        stringParams = stringParams
                            .slice(0, stringParams.length - 1);
                        url += "?" + encodeURI(stringParams);
                    }

                    init(xhr, url, options.headers);

                    // request
                    // ver o formato de envio que o Rails faz para postar dados com remote true
                    xhr.send(null);
                },

                // acredito que não mais será necessário essa punhetação
                // até porque os novos events estão melhores abstraídos
                // progress
                progress = function (xhr, callback) {
                    xhr.addEventListener("readystatechange", function () {
                        if (xhr.readyState !== xhr.DONE) {
                            if (xhr.getResponseHeader("Content-Type")) {
                                if (/^text/.test(xhr
                                    .getResponseHeader("Content-Type"))) {
                                    callback(xhr);
                                } else {
                                    xhr.addEventListener("progress",
                                    function (e) {
                                        callback(e);
                                    });
                                }
                            }
                        }
                    });
                };

            if (_progress) {
                progress(xhr, _progress);
            }

            xhr.addEventListener("readystatechange", function () {

                if (xhr.readyState === xhr.DONE) {
                    if (_success) {
                        // debugger
                        if (xhr.status === 200) {
                            // binary or text, but different of executable script
                            if(/^application/.test(xhr
                                .getResponseHeader("Content-Type")) ||
                                (/^text/.test(xhr
                                .getResponseHeader("Content-Type")) &&
                                !/\/(javascript|ecmascript)/.test(xhr
                                    .getResponseHeader("Content-Type")))) {
                                _success(xhr.response);
                            } else {
                                // script
                                if (/\/(javascript|ecmascript)/.test(xhr
                                    .getResponseHeader("Content-Type"))) {
                                    eval.call(window, xhr.response);
                                // binary as video, audio or picture
                                } else {
                                    _success(url);
                                }
                            }
                        }
                    }
                }
            });

            if (!(this instanceof ConstructorVar)) {
                return new ConstructorVar(url, options);
            }

            xhr.addEventListener("abort", function () {
                _abort();
            });

            // readyState === 1 or xhr.OPENED
            xhr.addEventListener("loadstart", function (e) {
                _start(xhr, e);
            });

            // readyState === 3 or xhr.LOADING
            xhr.addEventListener("progress", function () {
                // debugger
                _progress(xhr);
            });


            // readyState === 4 or xhr.DONE
            xhr.addEventListener("loadend", function () {
                _done(xhr);
            });

            xhr.addEventListener("load", function () {
                _complete(xhr);
            });

            switch (type) {
                default:
                    get(xhr, url, params);
            }

            this.abort = function () {
                xhr.abort();
            }

            return self;
        }

    };

})();
