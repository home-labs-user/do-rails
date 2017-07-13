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
                _accomplishMessage,
                _rejectMessage,
                whenAccomplish,
                whenReject,
                ifCatch,
                status,

                ConstructorReference = $.Promise.new,

                accomplish = function(response) {
                    status = "fulfilled";
                    _accomplishMessage = response;
                },

                reject = function(response) {
                    status = "rejected";
                    _rejectMessage = response;
                },

                start = function(callbackUntil, options) {
                    if (typeof options.defer != "number") {
                        options.defer = 0;
                    }

                    var
                        promise,

                        loop = function(_accomplish, _reject, callbackUntil,
                                        options) {
                            window.setTimeout(function() {
                                options.defer = 0;

                                // returns the control for the user
                                callbackUntil(accomplish, reject);
                                switch (status) {
                                    case "fulfilled": {
                                        _accomplish(_accomplishMessage);
                                    }
                                    break;
                                    case "rejected": {
                                        _reject(_rejectMessage);
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
                        // response comes from accomplish
                        function(r) {
                            whenAccomplish(r);
                        },

                        // function() {
                        function(r) {
                            whenReject(r);
                        }
                    );

                    promise.catch(function(e) {
                        ifCatch(e);
                    });
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
                ifCatch = run;
            };

            return this;
        }
    });

})(esPhinx);
