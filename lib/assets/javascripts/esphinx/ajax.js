"use strict";

var
    Ajax,
    Iterator;

Ajax = (function () {

    return {

        new: function (url, options) {
            var
                ConstructorReference = Ajax.new,

                callback = function () {},

                xhr = new XMLHttpRequest(),
                type = options.type || "GET",
                // rever nome de variável, se ela ou a function deve ter _
                params = options.param || options.params || null,

                // events abstracts
                _error = options.error || callback,
                _abort = options.abort || callback,

                // loadstart
                _start = options.start || callback,

                // progress
                _progress = options.progress || callback,

                // loadend
                _complete = options.complete || callback,

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
                };

            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(url, options);
            }

            xhr.addEventListener("abort", function () {
                _abort();
            });

            // readyState === 1 or xhr.OPENED
            xhr.addEventListener("loadstart", function () {
                _start(xhr);
            });

            // readyState === 3 or xhr.LOADING
            xhr.addEventListener("progress", function (e) {
                FlowControl.new({
                    condition: function () {
                        // Math.round((e.loaded/e.total)*100) can be used to calculate file size progress
                        _progress(e);

                        if (!e.lengthComputable || e.loaded === e.total) {
                            return true;
                        }


                        return false;
                    },
                    ready: function () {
                        // binary or text file, different of executable script
                        if (/^application/.test(xhr
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
                            // url to video, audio or picture
                            } else {
                                _success(url);
                            }
                        }
                    }
                });
            });

            // readyState === 4 or xhr.DONE
            xhr.addEventListener("loadend", function () {
                _complete(xhr);
            });

            switch (type) {
                default:
                    get(xhr, url, params);
            }

            this.abort = function () {
                xhr.abort();
            }

            return this;
        }

    };

})();
