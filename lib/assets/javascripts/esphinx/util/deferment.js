var
    esPhinx,
    Promise;


(function($) {
    "use strict";

    $.extend({
        Deferment: {}
    });

    $.Extender.extend($.Deferment, true, {
        new: function(options, callbackUntil) {
            var
                _accomplishResponse,
                whenReject,
                status,
                promise,
                ConstructorReference = $.Deferment.new,

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
                    if (typeof options.time != "number") {
                        options.time = 0;
                    }

                    var
                        loop = function(_accomplish, _reject, callbackUntil,
                                        options) {
                            if (status != "rejected") {
                                window.setTimeout(function() {
                                    if (typeof callbackUntil != "function" ||
                                        options.time) {
                                        _accomplish();
                                    } else {
                                        options.time = 0;
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
                                }, options.time);
                            } else {
                                _reject();
                            }
                        };

                    promise = new Promise(function(_accomplish, _reject) {
                        loop(_accomplish, _reject, callbackUntil, options);
                    });

                    promise.then(
                        // response comes from original Deferment object
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

            this.reject = function(run) {
                if (typeof run != "function") {
                    run = function(){};
                }

                whenReject = run;

                reject();
            };

            this.catch = function(run) {
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
