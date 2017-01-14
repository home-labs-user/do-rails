//= require ./bfs

var
    Iterable,
    IterableFactory;

// strategy factory
(function ($module) {
    "use strict";

    Object.defineProperties($module, {
        Iterable: {
            value: {}
        }
    });

    Object.defineProperties(Iterable, {
        Factory: {
            value: {}
        }
    });

    Object.defineProperties(Iterable.Factory, {

        new: {
            value: function (strategy) {

                var
                    self = Iterable.Factory,
                    _strategy = strategy;

                if (!(this instanceof self.new)) {
                    return new self.new(strategy);
                }

                this.strategy = function(strategy) {
                    _strategy = strategy;
                }

                this.traversing = function (callback) {
                    return _strategy.traversing(callback);
                }

                return this;
            }
        }

    });

})(window);