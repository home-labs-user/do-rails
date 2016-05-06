//= require ./constructor

"use strict";

var
    ExecutionFlow;

ExecutionFlow = (function () {

    return {

        new: function (options) {
            var
                selfConstructor = Constructor.get(ExecutionFlow.new, arguments),
                self = this;

            if (!(this instanceof selfConstructor)) {
                return new selfConstructor;
            }

            (function wait () {
                setTimeout(function () {
                    options.condition(function (readyCondition) {
                        if (readyCondition) {
                            options.ready();
                        } else {
                            wait();
                        }
                    });
                }, 0);
            })();

            return self;
        },

        // doesn't delay loop run, that is why should expected to run a callback
        delay: {
            new: function (ms, getReadyCondition) {
                var
                    selfConstructor = Constructor.get(ExecutionFlow.delay.new, arguments),
                    self = this,
                    date,
                    currDate;

                if (!(this instanceof selfConstructor)) {
                    return new selfConstructor;
                }

                (function wait () {
                    setTimeout(function () {
                        getReadyCondition(function (readyCondition) {
                            if (!readyCondition) {
                                wait();
                            }
                        });
                    }, ms);
                })();
            }
        }
    };

})();
