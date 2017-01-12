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
            value: function (enumerable, deepSearch, callback) {
                var
                    self = Iterator,
                    i = 0,
                    count = enumerable.length;

                if (!(this instanceof self.new)) {
                    return new self.new(enumerable, deepSearch, callback);
                }

                this.first = function () {
                    return enumerable[0];
                };

                this.current = function () {
                    return enumerable[i];
                };

                this.next = function () {
                    if (i < count) {
                        i += 1;
                        return enumerable[i];
                    }
                };

                this.done = function () {
                    if (i == count - 1) {
                        return true;
                    }

                    return false;
                };

                this.selectEach = function (deepSearch, callback) {
                    var
                        // As novas versões do JS trouxe a classe Map, a qual permitirá associar objetos, isto é, um objeto poderá ser a chave de outro, visto que num objeto literal, as chaves são to tipo string ou numéricas
                        queue = [{trace: [], enumerable: enumerable}],
                        selected = [],

                        block = function () {
                            var
                                enumerable,
                                returned;

                            // clean the queue
                            queue = [];
                            return function (map) {
                                enumerable = map.enumerable;
                                if (enumerable instanceof window.Node &&
                                    deepSearch &&
                                    enumerable.childElementCount) {
                                    queue.push({
                                        enumerable: enumerable.children
                                    });
                                } else {
                                    Object.keys(enumerable)
                                    .forEach(function (key) {
                                        if (enumerable[key] instanceof
                                            window.Node) {
                                            returned = callback
                                                .call(enumerable,
                                                      enumerable[key],
                                                      key);
                                            if (deepSearch && enumerable[key]
                                                .childElementCount) {
                                                queue.push({
                                                    enumerable: enumerable[key]
                                                        .children
                                                });
                                            }
                                        } else {
                                            if (deepSearch) {
        //                                         if (Object.getPrototypeOf(enumerable[key]) ==
        //                                         Object.getPrototypeOf({})) {}
                                                returned = callback
                                                    .call(enumerable,
                                                          enumerable[key],
                                                          key,
                                                          map.trace);

                                                if (typeof enumerable[key] ==
                                                    "object") {
                                                    // put on queue
                                                    queue.push({
                                                        trace: map.trace
                                                        .concat(key),
                                                        enumerable: enumerable[key]
                                                    });
                                                }
                                            } else {
                                                returned = callback
                                                    .call(enumerable,
                                                          enumerable[key],
                                                          key);
                                            }
                                        }

                                        if (returned) {
                                            selected.push(enumerable[key]);
                                        }
                                    });
                                }
                            };
                        };

                    if (typeof deepSearch == "function") {
                        callback = deepSearch;
                    }
                    if (typeof deepSearch != "boolean") { deepSearch = false; }

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
