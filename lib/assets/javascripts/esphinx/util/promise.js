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

                start = function(accomplish, condition, options) {
                    if (typeof options.delay != "number") {
                        options.delay = 0;
                    }

                    var
                        promise,

                        loop = function(resolve, condition, options) {
                            // maybe will must to improve here
                            window.setTimeout(function() {
                                if (condition.call()) {
                                    resolve();
                                } else {
                                    loop(resolve, condition, options);
                                }
                            }, options.delay);
                        };

                    promise = new Promise(function(resolve) {
                        loop(resolve, condition, options);
                    });

                    promise.then(function() {
                        accomplish();
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

            this.then = function(accomplish) {
                start(accomplish, condition, options);
            }

            return this;
        }
    });

})(esPhinx);
