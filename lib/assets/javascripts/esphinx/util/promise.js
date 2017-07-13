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
                whenReject,
                status,
                promise,
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
                    status = "fulfilled";
                    _accomplishResponse = response;
                },

                reject = function() {
                    status = "rejected";
                },

                start = function(callbackUntil, options) {
                    if (typeof options.defer != "number") {
                        options.defer = 0;
                    }

                    var
                        loop = function(_accomplish, _reject, callbackUntil,
                                        options) {
                            if (status != "rejected") {
                                window.setTimeout(function() {
                                    if (typeof callbackUntil != "function" ||
                                        options.defer) {
                                        _accomplish();
                                    } else {
                                        options.defer = 0;
                                        callbackUntil(accomplish);
                                        // returns the control for the user
                                        switch (status) {
                                            case "fulfilled": {
                                                _accomplish(_accomplishResponse);
                                            }
                                            break;
                                            case "rejected": {
                                                _reject();
                                            }
                                            break;
                                            default: {
                                                loop(_accomplish, _reject,
                                                     callbackUntil, options);}
                                        }
                                    }
                                }, options.defer);
                            } else {
                                _reject();
                            }
                        };

                    promise = new Promise(function(_accomplish, _reject) {
                        loop(_accomplish, _reject, callbackUntil, options);
                    });

                    promise.then(
                        // response comes from original Promise object
                        function(r) {
                            options.onAccomplish(r);
                        },

                        function(r) {
                            whenReject(r);
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

                reject();
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
