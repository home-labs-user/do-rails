//= require ./interface

var
    Strategy,
    Search;

// strategy factory
(function ($module) {
    "use strict";


    Object.defineProperties(Search, {
        Factory: {
            value: {}
        }
    });

    Object.defineProperties(Search.Factory, {

        new: {
            // value: function (strategy, ...args) {
            value: function (strategy) {

                var
                    self = Search.Factory,
                    _strategy;

                if (!(this instanceof self.new)) {
                    return new self.new(strategy);
                }

                _strategy = Strategy.Factory.new(strategy).strategy();

                this.strategy = function(strategy) {
                    return _strategy(strategy);
                };

                // override
                this.each = function (callback) {
                    return _strategy.each(callback);
                };

                return this;
            }
        }

    });

})(window);
