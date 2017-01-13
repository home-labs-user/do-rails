//= require ./iterable/context

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
                        // usar através do context e passar BFS.new(enumerable) como parâmetro
                        bfs = BFS.new(enumerable),
                        selected = [],
                        returned;

                        bfs.travel(function (value, key, trace) {
                            if (value instanceof window.Node) {
                                returned = callback.call(enumerable, value,
                                                         key);
                            } else {
                                returned = callback.call(enumerable, value, key,
                                                         trace);
                            }

                            if (returned) {
                                selected.push(value);
                            }
                        });

                        return selected;
                };

                return this;

            }
        }

    });

})(window);
