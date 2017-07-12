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
        new: function(options, conditionUntilCallback) {
            var
                ConstructorReference = $.Promise.new,

                start = function(run, conditionUntilCallback, options) {
                    if (typeof options.delay != "number") {
                        options.delay = 0;
                    }

                    var
                        promise,

                        loop = function(accomplish, conditionUntilCallback,
                                        options) {
                            window.setTimeout(function() {
                                options.delay = 0;
                                if (conditionUntilCallback.call()) {
                                    accomplish();
                                } else {
                                    loop(accomplish, conditionUntilCallback,
                                         options);
                                }
                            }, options.delay);
                        };

                    promise = new Promise(function(accomplish) {
                        loop(accomplish, conditionUntilCallback, options);
                    });

                    promise.then(function() {
                        run();
                    });
                };

            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(options,
                                                conditionUntilCallback);
            }

            if (typeof options == "function") {
                conditionUntilCallback = options;
                options = {};
            }

            this.then = function(run) {
                start(run, conditionUntilCallback, options);
            };

            return this;
        }
    });

})(esPhinx);
