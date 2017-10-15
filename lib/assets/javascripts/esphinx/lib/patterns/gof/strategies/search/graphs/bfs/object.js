//= require ../bfs

var
    Search,
    Iterable;

// concrete strategy
(function($module) {
    "use strict";

    Object.defineProperties($module, {
        Object: {
            value: {}
        }
    });

    Object.defineProperties($module.Object, {
        new: {
            value: function(collection) {

                var
                    ConstructorReference = $module.Object.new;

                if (!(this instanceof ConstructorReference)) {
                    return new ConstructorReference(collection);
                }

                this.research = function(callback) {
                    var
                        queueIterator,
                        iterator,
                        key,
                        map,
                        // As novas versões do JS trazem a classe Map, a qual permite associar objetos como chave, isto é, um objeto poderá ser a chave de outro. Em um objeto literal as chaves podem ser apenas do tipo string ou number
                        queue = [{trace: [], collection: collection}],
                        self = this,

                        cleanQueue = function() {
                            queue = [];
                        },

                        queueBlock = function(map) {
                            var
                                iteratorBlock = function(object) {
                                    key = iterator.key();

                                    // to break use "return ...;"
                                    callback.call(self, object, key, map.trace);

                                    if (typeof object == "object" &&
                                        (Iterable.isIterable(object) ||
                                         (Object.belongToClass(object,
                                                              Object)))) {
                                        // put on queue
                                        queue.push({
                                            trace: map.trace.concat(key),
                                            collection: object
                                        });
                                    }
                                };

                            cleanQueue();
                            iterator = Iterable.Proxy.new(map.collection);
                            iterator.each(iteratorBlock);
                        };

                    while (true) {
                        if (queue.length) {
                            queueIterator = Iterable.Proxy.new(queue);
                            queueIterator.each(queueBlock);
                        } else {
                            break;
                        }
                    }

                };

            }
        }

    });

})(Search.Graphs.BFS);
