//= require ./support/object


"use strict";


var
    Waiter;

Waiter = (function () {

    return {

        new: function (callback) {
            var
                selfConstructor = Constructor.get(Waiter.new, arguments),
                self = this;

            this.ready = function (ready) {
                if (ready) {
                    ready();
                }
            }

            if (!(this instanceof selfConstructor)) {
                return new selfConstructor;
            }

            (function wait () {
                setTimeout(function () {
                    callback(function (readyCondition) {
                        if (!readyCondition) {
                            wait();
                        }
                    });
                }, 0);
            })();

            return self;
        }
    };

})();
