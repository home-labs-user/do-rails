var
    esPhinx,
    Promise;


(function($) {
    "use strict";

    $.extend({
        Promise: {}
    });

    $.Extender.extend($.Promise, true, {
        new: function(options, callbackUntil) {
            var
                _response,
                fulfilled = false,

                ConstructorReference = $.Promise.new,

                accomplish = function(response) {
                    fulfilled = true;
                    _response = response;
                },

                start = function(run, callbackUntil, options) {
                    if (typeof options.defer != "number") {
                        options.defer = 0;
                    }

                    var
                        promise,

                        loop = function(_accomplish, callbackUntil, options) {
                            window.setTimeout(function() {
                                options.defer = 0;

                                callbackUntil(accomplish);
                                if (fulfilled) {
                                    _accomplish(_response);
                                } else {
                                    loop(_accomplish, callbackUntil, options);
                                }
                            }, options.defer);
                        };

                    promise = new Promise(function(accomplish) {
                        loop(accomplish, callbackUntil, options);
                    });

                    // response comes from accomplish
                    promise.then(function(response) {
                        run(response);
                    });
                };

            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(options,
                                                callbackUntil);
            }

            if (typeof options == "function") {
                callbackUntil = options;
                options = {};
            }

            this.accomplish = function(run) {
                start(run, callbackUntil, options);
            };

            return this;
        }
    });

})(esPhinx);
