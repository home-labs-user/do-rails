var
    StrategyContext;

// generic strategy factory
(function($module) {
    "use strict";

    Object.defineProperties($module, {
        StrategyContext: {
            value: {}
        }
    });

    Object.defineProperties(StrategyContext, {

        new: {
            // value: function(strategy, ...args) {
            value: function(strategy) {

                var
                    _strategy = strategy,
                    ConstructorReference = StrategyContext;

                if (!(this instanceof ConstructorReference)) {
                    return new ConstructorReference(strategy);
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
