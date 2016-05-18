"use strict";

var
    FlowControl,
    Constructor;

FlowControl = (function () {

    return {

        new: function (options) {
            var
                FlowControlConstructor = Constructor.build(FlowControl.new, arguments),
                self = this;

            if (!(this instanceof FlowControlConstructor)) {
                return new FlowControlConstructor();
            }

            // two moments necessarily
            if (options) {
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
            }

            // doesn't delay loop run, tha's why should expected to run a callback
            this.delay = function (ms, getReadyCondition) {
                (function wait () {
                    setTimeout(function () {
                        getReadyCondition(function (readyCondition) {
                            if (!readyCondition) {
                                wait();
                            }
                        });
                    }, ms);
                })();
            };

            return self;
        }
    };

})();
