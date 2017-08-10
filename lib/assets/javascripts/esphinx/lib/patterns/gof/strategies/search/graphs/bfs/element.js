//= require ../bfs

var
    Search,
    Iterable;

// concrete strategy
(function($module) {
    "use strict";

    Object.defineProperties($module, {
        Element: {
            value: {}
        }
    });

    Object.defineProperties($module.Element, {
        new: {
            value: function(collection) {

                var
                    ConstructorReference = $module.Element.new;

                if (!(this instanceof ConstructorReference)) {
                    return new ConstructorReference(collection);
                }

                this.research = function(callback) {
                    var
                        queueIterator,
                        iterator,
                        queue = [{trace: [], collection: collection}],
                        self = this,

                        cleanQueue = function() {
                            queue = [];
                        },

                        iteratorBlock = function(node) {
                            callback.call(self, node);

                            if (node.childElementCount) {
                                queue.push({
                                    collection: node.children
                                });
                            }
                        },

                        queueBlock = function(map) {
                            cleanQueue();

                            iterator = Iterable.Proxy.new(map.collection);

                            iterator.each(iteratorBlock);
                        };


                    if (collection instanceof window.Node) {
                        queue = [{trace: [], collection: collection.children}];
                    }

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
