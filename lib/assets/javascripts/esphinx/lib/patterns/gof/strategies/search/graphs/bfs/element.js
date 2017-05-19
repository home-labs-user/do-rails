//= require ../bfs

var
    Search,
    Iterable;

// concrete strategy
(function ($module) {
    "use strict";

    Object.defineProperties(Search.Graphs.BFS, {
        Element: {
            value: {}
        }
    });

    Object.defineProperties(Search.Graphs.BFS.Element, {
        new: {
            value: function (collection) {

                var
                    self = Search.Graphs.BFS.Element;

                if (!(this instanceof self.new)) {
                    return new self.new(collection);
                }

                this.research = function (callback) {
                    var
                        mappedIterable,
                        queueIterator,
                        nodeIterator,
                        escape,

                        // map,
                        // qI,
                        // nI,
                        // node,

                        // As novas versões do JS trouxeram a classe Map, a qual permitirá associar objetos como chave, isto é, um objeto poderá ser a chave de outro. Em um objeto literal as chaves são apenas do tipo string ou numéricas
                        queue = [{trace: [], collection: collection}],
                        cleanQueue = function () {
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
                                nodeIterator = Iterable.Proxy
                                    .new(mappedIterable);

                                nodeIterator.each(function(node) {
                                    escape = callback.call(mappedIterable, node);
                                    if (node.childElementCount) {
                                        // put on queue
                                        queue.push({
                                            collection: node.children
                                        });
                                    }

                                    if (escape) {
                                        nodeIterator.finalize();
                                        queueIterator.finalize();
                                    }
                                });
                            });


                            // queue:
                            // for (qI in queue) {
                            //     if (queue.hasOwnProperty(qI)) {
                            //         map = queue[qI];
                            //         mappedIterable = map.collection;
                            //         cleanQueue();

                            //         debugger
                            //         for(nI in mappedIterable) {
                            //             if(mappedIterable.hasOwnProperty(nI)) {
                            //                 node = mappedIterable[nI];
                            //                 escape = callback.call(mappedIterable, node);
                            //                 if (node.childElementCount) {
                            //                     // put on queue
                            //                     queue.push({
                            //                         collection: node.children
                            //                     });
                            //                 }

                            //                 if (escape) {
                            //                     break queue;
                            //                     break;
                            //                 }
                            //             }
                            //         }
                            //     }
                            // }
                        } else {
                            break;
                        }
                    }

                };

            }
        }

    });

})(window);
