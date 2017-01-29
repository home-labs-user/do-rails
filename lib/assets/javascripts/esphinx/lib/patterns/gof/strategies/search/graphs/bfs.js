var
    BFS;

// concrete strategy
(function ($module) {
    "use strict";

    Object.defineProperties($module, {
        BFS: {
            value: {}
        }
    });

    Object.defineProperties(BFS, {
        new: {
            value: function (collection) {

                var
                    self = BFS;

                if (!(this instanceof self.new)) {
                    return new self.new(collection);
                }

                this.each = function (callback) {
                    var
                        keys,
                        key,
                        map,
                        mappedIterable,
                        escape,
                        // As novas versões do JS trouxeram a classe Map, a qual permitirá associar objetos como chave, isto é, um objeto poderá ser a chave de outro. Em um objeto literal as chaves são apenas do tipo string ou numéricas
                        queue = [{trace: [], collection: collection}],

                        cleanQueue = function () {
                            queue = [];
                        };

                    // try for use iterator here
                    while(true) {
                        if (queue.length) {
                            for (var i in queue) {
                                if (queue.hasOwnProperty(i)) {
                                    map = queue[i];
                                    mappedIterable = map.collection;
                                    cleanQueue();
                                    if (mappedIterable instanceof
                                        window.Node && mappedIterable
                                        .childElementCount) {
                                        queue.push({
                                            collection: mappedIterable
                                                .children
                                        });
                                    } else {
                                        keys = Object.keys(mappedIterable);
                                        for (var keyI in keys) {
                                            if (keys.hasOwnProperty(keyI)) {
                                                key = keys[keyI];
                                                if (mappedIterable[key] instanceof
                                                    window.Node) {
                                                    escape = callback
                                                        .call(mappedIterable,
                                                              mappedIterable[key],
                                                              key);

                                                    if (mappedIterable[key]
                                                        .childElementCount) {
                                                        // put on queue
                                                        queue.push({
                                                            collection: mappedIterable[key]
                                                                .children
                                                        });
                                                    }
                                                } else {
                                                    // if (Object.getPrototypeOf(collection[key]) ==
                                                    // Object.getPrototypeOf({})) {}
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
                                                }

                                                if (escape) {
                                                    cleanQueue();
                                                    break;
                                                }
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
