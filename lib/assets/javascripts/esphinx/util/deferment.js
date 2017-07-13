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
                _rejectResponse,
                whenReject,
                status,
                promise,
                whenAccomplish = function(){},
                ConstructorReference = $.Deferment.new,

                accomplish = function(response) {
                    status = "fulfilled";
                    _accomplishResponse = response;
                },

                reject = function(response) {
                    status = "rejected";
                    _rejectResponse = response;
                },

                start = function(callbackUntil, options) {
                    if (typeof options.time != "number") {
                        options.time = 0;
                    }

                    var
                        loop = function(_accomplish, _reject, callbackUntil,
                                        options) {
                            window.setTimeout(function() {
                                options.time = 0;

                                // returns the control for the user
                                callbackUntil(accomplish, reject);
                                switch (status) {
                                    case "fulfilled": {
                                        _accomplish(_accomplishResponse);
                                    }
                                    break;
                                    case "rejected": {
                                        _reject(_rejectResponse);
                                    }
                                    break;
                                    default: {
                                        loop(_accomplish, _reject,
                                             callbackUntil, options);}
                                }
                            }, options.time);
                        };

                    promise = new Promise(function(_accomplish, _reject) {
                        loop(_accomplish, _reject, callbackUntil, options);
                    });

                    promise.then(
                        // response comes from original Deferment object
                        function(r) {
                            whenAccomplish(r);
                        },

                        function(r) {
                            whenReject(r);
                        }
                    );
                };

            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(options, callbackUntil);
            }

            if (typeof options == "function") {
                callbackUntil = options;
                options = {};
            }

            start(callbackUntil, options);

            this.accomplish = function(run) {
                if (typeof run != "function") {
                    run = function(){};
                }

                whenAccomplish = run;

                // to work with async functions
                return promise;
            };

            this.reject = function(run) {
                if (typeof run != "function") {
                    run = function(){};
                }

                whenReject = run;
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
