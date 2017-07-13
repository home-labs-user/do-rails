var
    esPhinx;


(function($) {
    "use strict";

    $.extend({
        Ajax: {}
    });

    $.Extender.extend($.Ajax, true, {
        new: function(URL) {
            var
                promise,
                progressEvent,
                ifRaiseException,
                _options = {},
                callback = function() {},
                ConstructorReference = $.Ajax.new,
                xhr = new window.XMLHttpRequest(),

                setRequestHeaders = function(xhr, headers) {
                    if (headers) {
                        $.each(headers, function(value, header) {
                            if (value) {
                                xhr.setRequestHeader(header, value);
                            }
                        });
                    }
                },

                progressCondition = function(accomplish) {
                    if (progressEvent && (!progressEvent.lengthComputable ||
                        progressEvent.loaded == progressEvent.total)) {
                        accomplish(xhr.response);
                    }
                },

                resolveOptions = function(options) {
                    // abstract events
                    // _error = options.error || callback,
                    _options.abort = options.abort || callback;

                    // loadstart
                    _options.start = options.start || callback;

                    // progress
                    _options.progress = options.progress || callback;

                    // loadend
                    _options.complete = options.complete || callback;

                    _options.success = options.success || callback;
                },

                start = function(xhr, type, URL, options) {
                    // async false raise warning of deprecated
                    xhr.open(type, URL, true, options.user, options.password);

                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

                    setRequestHeaders(xhr, options.headers);
                },

                get = function(xhr, URL, options) {
                    var
                        composed = "";

                    if (options.URLParemeters) {
                        $.each(options.URLParemeters, function(value, key) {
                            // Object: javascript literal object
                            if (Object.getPrototypeOf(value) ==
                                Object.prototype) {
                                value = JSON.stringify(value);
                            }

                            composed += key + "=" + value + "&";
                        });

                        composed = composed.slice(0, composed.length - 1);
                        URL += "?" + encodeURI(composed);
                    }

                    start(xhr, "GET", URL, options);

                    // request
                    xhr.send(null);
                };


            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(URL);
            }

            xhr.addEventListener("abort", function() {
                _options.abort();
            });

            // readyState == 1 or xhr.OPENED
            xhr.addEventListener("loadstart", function() {
                _options.start(xhr);
            });

            // readyState == 3 or xhr.LOADING
            xhr.addEventListener("progress", function(e) {
                _options.progress(e);
                progressEvent = e;
            });
            promise = $.Promise.new(progressCondition);
            promise.accomplish(function(response) {
                // binary or text file, different of executable script
                if (/^application/
                    .test(xhr.getResponseHeader("Content-Type")) ||
                    (/^text/.test(xhr.getResponseHeader("Content-Type")) &&
                     !/\/(javascript|ecmascript)/.test(xhr
                        .getResponseHeader("Content-Type")))) {
                    _options.success(response);
                } else {
                    // script
                    if (/\/(javascript|ecmascript)/.test(xhr
                        .getResponseHeader("Content-Type"))) {
                        eval.call(window, response);
                    // URL to video, audio or picture
                    } else {
                        _options.success(URL);
                    }
                }
            });

            // readyState == 4 or xhr.DONE
            xhr.addEventListener("loadend", function() {
                _options.complete(xhr);
            });

            this.abort = function(run) {
                xhr.abort();
                promise.reject(run);
            };

            this.catch = function(run) {
                // ifRaiseException = run;
                promise.catch(run);
            };

            this.get = function(options) {
                resolveOptions(options);
                get(xhr, URL, options);
            };

            return this;
        }
    });

}(esPhinx));
