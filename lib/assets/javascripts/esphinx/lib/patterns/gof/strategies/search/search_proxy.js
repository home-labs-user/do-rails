//= require ./search

var
    StrategyContext,
    SearchContext;

// strategy context proxy
(function ($module) {
    "use strict";

    Object.defineProperties($module, {
        SearchContext: {
            value: {}
        }
    });


    Object.defineProperties(SearchContext, {
        Proxy: {
            value: {}
        }
    });

    Object.defineProperties(SearchContext.Proxy, {

        new: {
            // value: function (strategy, ...args) {
            value: function (strategy) {
                var
                    self = SearchContext.Proxy,
                    _strategy,
                    superContext;

                if (!(this instanceof self.new)) {
                    return new self.new(strategy);
                }

                superContext = StrategyContext.new.call(this);
                _strategy = superContext.strategy(strategy);

                // "override"
                this.research = function (callback) {
                    return _strategy.research(callback);
                };

                return this;
            }
        }

    });

})(window);
