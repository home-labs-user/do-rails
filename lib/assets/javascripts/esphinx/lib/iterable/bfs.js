var
    BFS,
    window;

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
            value: function (enumerable) {

                var
                    self = BFS;

                if (!(this instanceof self.new)) {
                    return new self.new(enumerable);
                }

                this.travel = function (callback) {
                    var
                        keys,
                        key,
                        map,
                        mappedEnumerable,
                        // As novas versões do JS trouxe a classe Map, a qual permitirá associar objetos, isto é, um objeto poderá ser a chave de outro, visto que num objeto literal, as chaves são to tipo string ou numéricas
                        queue = [{trace: [], enumerable: enumerable}],

                        cleanQueue = function () {
                            queue = [];
                        };

                    while(true) {
                        if (queue.length) {
                            for (var i in queue) {
                                if (queue.hasOwnProperty(i)) {
                                    map = queue[i];
                                    mappedEnumerable = map.enumerable;
                                    cleanQueue();
                                    if (mappedEnumerable instanceof
                                        window.Node && enumerableMapepd
                                        .childElementCount) {
                                        queue.push({
                                            enumerable: mappedEnumerable
                                                .children
                                        });
                                    } else {
                                        keys = Object.keys(mappedEnumerable);
                                        for (var keyI in keys) {
                                            if (keys.hasOwnProperty(keyI)) {
                                                key = keys[keyI];
                                                if (mappedEnumerable[key] instanceof
                                                    window.Node) {
                                                    escape = callback
                                                        .call(mappedEnumerable,
                                                              mappedEnumerable[key],
                                                              key);

                                                    if (mappedEnumerable[key]
                                                        .childElementCount) {
                                                        // put on queue
                                                        queue.push({
                                                            enumerable: mappedEnumerable[key]
                                                                .children
                                                        });
                                                    }
                                                } else {
                                                    // if (Object.getPrototypeOf(enumerable[key]) ==
                                                    // Object.getPrototypeOf({})) {}
                                                    escape = callback
                                                        .call(mappedEnumerable,
                                                              mappedEnumerable[key],
                                                              key,
                                                              map.trace);

                                                    if (typeof mappedEnumerable[key] ==
                                                        "object") {
                                                        // put on queue
                                                        queue.push({
                                                            trace: map.trace
                                                            .concat(key),
                                                            enumerable: mappedEnumerable[key]
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
