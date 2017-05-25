//= require ../bfs

var
    Search,
    Iterable;

// concrete strategy
(function($module) {
    "use strict";

    Object.defineProperties(Search.Graphs.BFS, {
        Element: {
            value: {}
        }
    });

    Object.defineProperties(Search.Graphs.BFS.Element, {
        new: {
            value: function(collection) {

                var
                    self = Search.Graphs.BFS.Element;

                if (!(this instanceof self.new)) {
                    return new self.new(collection);
                }

                this.research = function(callback) {
                    var
                        mappedIterable,
                        queueIterator,
                        iterator,
                        queue = [{trace: [], collection: collection}],
                        cleanQueue = function() {
                            queue = [];
                        };

                    if (collection instanceof window.Node) {
                        queue = [{trace: [], collection: collection.children}];
                    }

                    while(true) {
                        if (queue.length) {
                            queueIterator = Iterable.Proxy.new(queue);
                            queueIterator.each(function(map) {
                                mappedIterable = map.collection;
                                cleanQueue();

                                iterator = Iterable.Proxy.new(mappedIterable);

                                iterator.each(function(node) {
                                    callback.call(this, node);

                                    if (node.childElementCount) {
                                        queue.push({
                                            collection: node.children
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
