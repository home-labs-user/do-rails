// IIFE
var AsyncPromise = (function () {
    "use strict";

    // private static variables

    Object.defineProperties(window, {
        AsyncPromise: {
            value: {}
        }
    });

    var
        classReference = AsyncPromise;

    Object.defineProperties(classReference, {
        // public static methods and variables
        new: {
            // static constructor
            value: function (options, resolver) {
                // private variables and methods
                var
                    _accomplishResponse,
                    _then,
                    _reject,
                    whenReject,
                    status,
                    promise,
                    currentTimeout,
                    self = this,
                    ConstructorReference = classReference.new,

                    resolveArguments = function () {
                        if (typeof options == "function") {
                            resolver = options;
                            options = {};
                        }
                    },

                    accomplish = function (response) {
                        // "fulfilled"
                        status = "resolved";
                        _accomplishResponse = response;
                    },

                    start = function (resolver, options) {
                        if (typeof options.defer != "number") {
                            options.defer = 0;
                        }

                        var
                            loop = function (_accomplish, _reject, resolver,
                                options) {

                                currentTimeout = window.setTimeout(function () {
                                    if (typeof resolver != "function" ||
                                        (options.defer &&
                                            typeof resolver != "function")) {
                                        _accomplish();
                                    } else {
                                        options.defer = 0;
                                        resolver.call(self, accomplish);
                                        // returns the control for the user
                                        switch (status) {
                                            case "resolved": {
                                                _accomplish(_accomplishResponse);
                                            }
                                                break;
                                            default: {
                                                loop(_accomplish, _reject,
                                                    resolver, options);
                                            }
                                        }
                                    }
                                }, options.defer);
                            };

                        promise = new window.Promise(function (_accomplish, reject) {
                            _reject = reject;
                            loop(_accomplish, reject, resolver, options);
                        });

                        promise.then(
                            // response comes from original Promise object
                            function (r) {
                                _then(r);
                            },

                            function () {
                                whenReject();
                            }
                        );
                    };

                if (!(this instanceof ConstructorReference)) {
                    return new ConstructorReference(options, resolver);
                }

                resolveArguments();

                start(resolver, options);

                // public methods
                this.origin = function () {
                    // to work with async functions
                    return promise;
                };

                this.then = function (callback) {
                    _then = callback;
                };

                this.break = function (run) {
                    if (typeof run != "function") {
                        run = function () { };
                    }

                    whenReject = run;

                    clearTimeout(currentTimeout);
                    _reject();
                };

                this.catchException = function (run) {
                    if (typeof run != "function") {
                        run = function () { };
                    }

                    promise.catch(run);

                    return this;
                };

                return this;
            }
        }
    });

    return classReference;
}());
