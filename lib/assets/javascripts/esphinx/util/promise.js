var
    esPhinx,
    Promise;


(function($) {
    "use strict";

    $.extend({
        Promise: {}
    });

    $.Extender.extend($.Promise, true, {
        new: function(options, condition) {
            var
                self = this,
                ConstructorReference = $.Promise.new,

                start = function(run, condition, options) {
                    if (typeof options.delay != "number") {
                        options.delay = 0;
                    }

                    var
                        promise,

                        loop = function(accomplish, condition, options) {
                            // maybe will must to improve here
                            window.setTimeout(function() {
                                if (condition.call()) {
                                    accomplish();
                                } else {
                                    loop(accomplish, condition, options);
                                }
                            }, options.delay);
                        };

                    promise = new Promise(function(accomplish) {
                        loop(accomplish, condition, options);
                    });

                    promise.then(function() {
                        run();
                    });
                };

            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(options, condition);
            }

            // resolve arguments
            if (typeof options == "function") {
                condition = options;
                options = {};
            }

            this.then = function(run) {
                start(run, condition, options);
            }

            return this;
        }
    });

})(esPhinx);
