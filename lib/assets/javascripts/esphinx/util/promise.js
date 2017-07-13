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
                _rejectResponse,
                whenAccomplish,
                whenReject,
                ifRaiseException,
                status,
                promise,
                ConstructorReference = $.Promise.new,

                accomplish = function(response) {
                    status = "fulfilled";
                    _accomplishResponse = response;
                },

                reject = function(response) {
                    status = "rejected";
                    _rejectResponse = response;
                },

                start = function(callbackUntil, options) {
                    if (typeof options.defer != "number") {
                        options.defer = 0;
                    }

                    var
                        loop = function(_accomplish, _reject, callbackUntil,
                                        options) {
                            window.setTimeout(function() {
                                options.defer = 0;

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
                            }, options.defer);
                        };

                    promise = new Promise(function(_accomplish, _reject) {
                        loop(_accomplish, _reject, callbackUntil, options);
                    });

                    promise.then(
                        // response comes from original Promise object
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
                whenAccomplish = run;
            };

            this.reject = function(run) {
                whenReject = run;
            };

            this.catch = function(run) {
                promise.catch(run);
            };

            return this;
        }
    });

})(esPhinx);
