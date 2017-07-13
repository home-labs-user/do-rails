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
                _accomplishResponse,
                _reject,
                whenReject,
                status,
                promise,
                currentTimeout,
                self = this,
                ConstructorReference = $.Promise.new,

                resolveArguments = function() {
                    if (typeof options == "function") {
                        callbackUntil = options;
                        options = {};
                    }

                    if (typeof options.onAccomplish != "function") {
                        options.onAccomplish = function() {};
                    }
                },

                accomplish = function(response) {
                    // "fulfilled"
                    status = "resolved";
                    _accomplishResponse = response;
                },

                start = function(callbackUntil, options) {
                    if (typeof options.defer != "number") {
                        options.defer = 0;
                    }

                    var
                        loop = function(_accomplish, _reject, callbackUntil,
                                        options) {

                            currentTimeout = window.setTimeout(function() {
                                if (typeof callbackUntil != "function" ||
                                    (options.defer &&
                                     typeof callbackUntil != "function")) {
                                    _accomplish();
                                } else {
                                    options.defer = 0;
                                    callbackUntil.call(self, accomplish);
                                    // returns the control for the user
                                    switch (status) {
                                        case "resolved": {
                                            _accomplish(_accomplishResponse);
                                        }
                                        break;
                                        default: {
                                            loop(_accomplish, _reject,
                                                 callbackUntil, options);}
                                    }
                                }
                            }, options.defer);
                        };

                    promise = new Promise(function(_accomplish, reject) {
                        _reject = reject;
                        loop(_accomplish, reject, callbackUntil, options);
                    });

                    promise.then(
                        // response comes from original Promise object
                        function(r) {
                            options.onAccomplish(r);
                        },

                        function() {
                            whenReject();
                        }
                    );
                };

            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(options, callbackUntil);
            }

            resolveArguments(callbackUntil, options);

            start(callbackUntil, options);

            this.origin = function() {
                // to work with async functions
                return promise;
            };

            this.break = function(run) {
                if (typeof run != "function") {
                    run = function(){};
                }

                whenReject = run;

                clearTimeout(currentTimeout);
                _reject();
            };

            this.catchException = function(run) {
                if (typeof run != "function") {
                    run = function(){};
                }

                promise.catch(run);

                return this;
            };

            return this;
        }
    });

})(esPhinx);
