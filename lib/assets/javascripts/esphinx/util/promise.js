var
    esPhinx,
    Promise;


(function($) {
    "use strict";

    $.extend({
        // Deferment: {}
        Promise: {}
    });

    // $.Extender.extend($.Deferment, true, {
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
                    if (typeof options.delay != "number") {
                        options.delay = 0;
                    }

                    var
                        promise,

                        loop = function(_accomplish, callbackUntil, options) {
                            window.setTimeout(function() {
                                options.delay = 0;

                                callbackUntil(accomplish);
                                if (fulfilled) {
                                    _accomplish(_response);
                                } else {
                                    loop(_accomplish, callbackUntil, options);
                                }
                            }, options.delay);
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
