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
            value: function (iterable) {

                var
                    self = BFS;

                if (!(this instanceof self.new)) {
                    return new self.new(iterable);
                }

                this.each = function (callback) {
                    var
                        keys,
                        key,
                        map,
                        mappedIterable,
                        escape,
                        // As novas versões do JS trouxe a classe Map, a qual permitirá associar objetos, isto é, um objeto poderá ser a chave de outro, visto que num objeto literal, as chaves são to tipo string ou numéricas
                        queue = [{trace: [], iterable: iterable}],

                        cleanQueue = function () {
                            queue = [];
                        };

                    while(true) {
                        if (queue.length) {
                            for (var i in queue) {
                                if (queue.hasOwnProperty(i)) {
                                    map = queue[i];
                                    mappedIterable = map.iterable;
                                    cleanQueue();
                                    if (mappedIterable instanceof
                                        window.Node && mappedIterable
                                        .childElementCount) {
                                        queue.push({
                                            iterable: mappedIterable
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
                                                            iterable: mappedIterable[key]
                                                                .children
                                                        });
                                                    }
                                                } else {
                                                    // if (Object.getPrototypeOf(iterable[key]) ==
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
                                                            iterable: mappedIterable[key]
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
