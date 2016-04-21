//= require ./support/object


"use strict";


var
    Waiter;

Waiter = (function () {

    return {

        new: function (options) {
            var
                selfConstructor = Constructor.get(Waiter.new, arguments),
                self = this;

            // this.ready = function (ready) {
            //     if (ready) {
            //         ready();
            //     }
            // }

            if (!(this instanceof selfConstructor)) {
                return new selfConstructor;
            }

            (function wait () {
                setTimeout(function () {
                    options.condition(function (readyCondition) {
                        if (!readyCondition) {
                            wait();
                        } else {
                            options.ready();
                        }
                    });
                }, 0);
            })();

            return self;
        }
    };

})();
