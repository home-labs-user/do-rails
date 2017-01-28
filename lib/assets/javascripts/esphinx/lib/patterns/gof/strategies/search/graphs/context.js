//= require ./bfs

var
    Search;

// strategy factory
(function ($module) {
    "use strict";

    // mover para o namespace correto
    Object.defineProperties($module, {
        Search: {
            value: {}
        }
    });

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

                this.each = function (callback) {
                    return _strategy.each(callback);
                };

                return this;
            }
        }

    });

})(window);
