var
    Iterator,
    window;

(function ($module) {
    "use strict";

    Object.defineProperties($module, {
        Iterator: {
            value: {}
        }
    });

    Object.defineProperties(Iterator, {

        new: {
            value: function (enumerable) {
                var
                    self = Iterator,
                    i = 0,
                    keys = Object.keys(enumerable),
                    count = keys.length;

                if (!(this instanceof self.new)) {
                    return new self.new(enumerable);
                }

                // instance methods
                this.first = function () {
                    return enumerable[keys[0]];
                };

                this.current = function () {
                    return enumerable[keys[i]];
                };

                this.next = function () {
                    if (i < count) {
                        i += 1;
                        return enumerable[keys[i]];
                    }
                };

                this.done = function () {
                    if (i == count - 1) {
                        return true;
                    }

                    return false;
                };

                this.select = function (callback) {
                    var
                        selected = [],
                        returned,
                        current;

                    if (count) {
                        do {
                            current = this.current();

                            returned = callback.call(enumerable, current,
                                                     keys[i]);
                            if (returned) {
                                selected.push(current);
                            }
                        } while (this.next());
                    }

                    return selected;

                };

                this.selectInBreadth = function (callback) {
                    var
                        // As novas versões do JS trouxe a classe Map, a qual permitirá associar objetos, isto é, um objeto poderá ser a chave de outro, visto que num objeto literal, as chaves são to tipo string ou numéricas
                        queue = [{trace: [], enumerable: enumerable}],
                        selected = [],

                        block = function () {
                            var
                                mappedEnumerable,
                                returned;

                            // clean the queue
                            queue = [];

                            return function (map) {

                                mappedEnumerable = map.enumerable;

                                if (mappedEnumerable instanceof window.Node &&
                                    enumerableMapepd.childElementCount) {
                                    queue.push({
                                        enumerable: mappedEnumerable.children
                                    });
                                } else {
                                    Object.keys(mappedEnumerable)
                                    .forEach(function (key) {
                                        if (mappedEnumerable[key] instanceof
                                            window.Node) {
                                            returned = callback
                                                .call(mappedEnumerable,
                                                      mappedEnumerable[key],
                                                      key);
                                            if (mappedEnumerable[key]
                                                .childElementCount) {
                                                queue.push({
                                                    enumerable: mappedEnumerable[key]
                                                        .children
                                                });
                                            }
                                        } else {
                                            // if (Object.getPrototypeOf(enumerable[key]) ==
                                            // Object.getPrototypeOf({})) {}
                                            returned = callback
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

                                        if (returned) {
                                            selected.push(mappedEnumerable[key]);
                                        }
                                    });
                                }
                            };
                        };

                    while(true) {
                        if (queue.length) {
                            queue.forEach(block());
                        } else {
                            break;
                        }
                    }

                    return selected;

                };

                return this;

            }
        }

    });

})(window);
