//= require ../bfs

var
    Search,
    Iterable;

// concrete strategy
(function($module) {
    "use strict";

    Object.defineProperties(Search.Graphs.BFS, {
        Object: {
            value: {}
        }
    });

    Object.defineProperties(Search.Graphs.BFS.Object, {
        new: {
            value: function(collection) {

                var
                    self = Search.Graphs.BFS.Object;

                if (!(this instanceof self.new)) {
                    return new self.new(collection);
                }

                this.research = function(callback) {
                    var
                        queueIterator,
                        iterator,
                        key,
                        mappedIterable,
                        // As novas versões do JS trouxeram a classe Map, a qual permitirá associar objetos como chave, isto é, um objeto poderá ser a chave de outro. Em um objeto literal as chaves são apenas do tipo string ou numéricas
                        queue = [{trace: [], collection: collection}],
                        self = this,

                        cleanQueue = function() {
                            queue = [];
                        };

                    while(true) {
                        if (queue.length) {
                            queueIterator = Iterable.Proxy.new(queue);
                            queueIterator.each(function(map) {
                                mappedIterable = map.collection;
                                cleanQueue();

                                iterator = Iterable.Proxy.new(mappedIterable);

                                iterator.each(function(object) {
                                    key = iterator.key();

                                    // to break use "return ...;"
                                    callback.call(self, object, key,
                                                  map.trace);

                                    if (typeof object == "object") {
                                        // put on queue
                                        queue.push({
                                            trace: map.trace.concat(key),
                                            collection: object
                                        });
                                    }

                                });
                            });
                        } else {
                            break;
                        }
                    }

                };

            }
        }

    });

})(window);
