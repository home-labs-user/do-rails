var
    StrategyContext;

// generic strategy factory
(function ($module) {
    "use strict";

    Object.defineProperties($module, {
        StrategyContext: {
            value: {}
        }
    });

    Object.defineProperties(StrategyContext, {

        new: {
            // value: function (strategy, ...args) {
            value: function (strategy) {

                var
                    self = StrategyContext,
                    _strategy = strategy;

                if (!(this instanceof self.new)) {
                    return new self.new(strategy);
                }

                this.strategy = function(strategy) {
                    if (strategy) {
                        _strategy = strategy;
                    }

                    return _strategy;
                };

                return this;
            }
        }

    });

})(window);
