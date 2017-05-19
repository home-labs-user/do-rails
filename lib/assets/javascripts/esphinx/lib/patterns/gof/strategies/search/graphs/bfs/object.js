//= require ../bfs

var
    Search;

// concrete strategy
(function ($module) {
    "use strict";

    Object.defineProperties(Search.Graphs.BFS, {
        Object: {
            value: {}
        }
    });

    Object.defineProperties(Search.Graphs.BFS.Object, {
        new: {
            value: function (collection) {

                var
                    self = Search.Graphs.BFS.Object;

                if (!(this instanceof self.new)) {
                    return new self.new(collection);
                }

                this.research = function (callback) {
                    var
                        keys,
                        key,
                        map,
                        mappedIterable,
                        escape,
                        queue = [{trace: [], collection: collection}],

                        cleanQueue = function () {
                            queue = [];
                        };

                    while(true) {
                        if (queue.length) {
                            for (var i in queue) {
                                if (queue.hasOwnProperty(i)) {
                                    map = queue[i];
                                    mappedIterable = map.collection;
                                    cleanQueue();
                                    keys = Object.keys(mappedIterable);
                                    for (var keyI in keys) {
                                        if (keys.hasOwnProperty(keyI)) {
                                            key = keys[keyI];

                                            // if (Object.getPrototypeOf(collection[key]) ==
                                            // Object.prototype) {}
                                            escape = callback
                                                .call(mappedIterable,
                                                      mappedIterable[key],
                                                      key,
                                                      map.trace);

                                            if (typeof mappedIterable[key] ==
                                                "object") {
                                                // put on queue
                                                queue.push({
                                                    trace: map.trace
                                                    .concat(key),
                                                    collection: mappedIterable[key]
                                                });
                                            }

                                            if (escape) {
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            break;
                        }
                    }

                };

            }
        }

    });

})(window);
