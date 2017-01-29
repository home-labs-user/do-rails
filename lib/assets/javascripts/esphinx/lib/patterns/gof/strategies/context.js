var
    Strategy;


// generic strategy factory
(function ($module) {
    "use strict";

    Object.defineProperties($module, {
        Strategy: {
            value: {}
        }
    });

    Object.defineProperties(Strategy, {
        Factory: {
            value: {}
        }
    });

    Object.defineProperties(Strategy.Factory, {

        new: {
            // value: function (strategy, ...args) {
            value: function (strategy) {

                var
                    self = Strategy.Factory,
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
