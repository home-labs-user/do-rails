var
    Iterable;


(function ($module) {
    "use strict";

    var
        Iterator_ = function(collection) {
            var
                // getOwnPropertyNames returns non-iterable items
                keys = Object.keys(collection),
                count = keys.length;

            this.index = -1;

            // iteration protocols
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
            this.next = function() {
                // sum before to use
                return collection[keys[++this.index]];
            };

            this.hasNext = function() {
                return this.index < count -1;
            };
            ////////////

            this.prev = function() {
                return collection[keys[--this.index]];
            };

            this.nextIndex = function(index) {
                this.index = index - 1;
            };

            this.prevIndex = function(index) {
                this.index = index + 1;
            };

            this.reset = function() {
                this.index = -1;
            };

            this.finalize = function() {
                this.index = count;
            };

            this.hasPrev = function() {
                return this.index > 0;
            };

        },

        symbolExists = function() {
            return window.hasOwnProperty("Symbol") &&
                window.Symbol.hasOwnProperty("iterator");
        },

        setAccessors = function(object) {
            var
                length = Object.keys(object).length,

                accessors = function (length) {
                    return {
                        get: function () {
                            return length;
                        },
                        set: function () {
                            length = Object.keys(object).length;
                        }
                    };
                };

            Object.defineProperties(object, {
                length: accessors(length)
            });

            // if (symbolExists()) {
            //     Object.defineProperties(object, {
            //         // js iterator protocol
            //         [window.Symbol.iterator]: {
            //             value: function () {
            //                 var
            //                     _iterator = Iterable.Proxy.new(object);

            //                 return {
            //                     next: function () {
            //                         return {
            //                             value: _iterator.next(),
            //                             done: !_iterator.hasNext()
            //                         };
            //                     }
            //                 };
            //             }
            //         }
            //     });
            // }
        };

    Object.defineProperties($module, {
        Iterable: {
            value: {}
        }
    });

    Object.defineProperties(Iterable, {
        Proxy: {
            value: {}
        }
    });

    Object.defineProperties(Iterable, {
        symbolExists: {
            value: function () {
                return symbolExists();
            }
        },

        isIterable: {
            value: function (object) {
                if (object) {
                    if (Iterable.symbolExists() &&
                        object[window.Symbol.iterator] ==
                        Array.prototype[window.Symbol.iterator]) {
                        return true;
                    } else {
                        if ((typeof object == "object" ||
                             typeof object == "string") &&
                            object.hasOwnProperty("length")) {
                            return true;
                        }
                    }
                }

                return false;
            }
        },

        parse: {
            value: function(collection) {
                var
                    newObject = {};

                Object.assign(newObject, collection);
                setAccessors(newObject);

                return newObject;
            }
        },

        toIterable: {
            value: function(collection) {
                setAccessors(collection);
            }
        },
    });

    Object.defineProperties(Iterable.Proxy, {

        new: {
            value: function(collection) {
                var
                    self = Iterable.Proxy,
                    _iterator;

                if (!(this instanceof self.new)) {
                    return new self.new(collection);
                }

                _iterator = new Iterator_(collection);

                // instance methods
                this.index = function () {
                    return _iterator.index;
                };

                this.next = function () {
                    return _iterator.next();
                };

                this.prev = function () {
                    return _iterator.prev();
                };

                this.reset = function () {
                    _iterator.reset();
                };

                this.finalize = function () {
                    _iterator.finalize();
                };

                this.hasPrev = function () {
                    return _iterator.hasPrev();
                };

                this.hasNext = function () {
                    return _iterator.hasNext();
                };

                this.each = function(startIndex, callback) {
                    if (typeof startIndex == "function") {
                        callback = startIndex;
                    } else {
                        // anything use Math.trunc
                        _iterator.nextIndex(startIndex);
                    }

                    if (Iterable.parse(collection).length) {
                        do {
                            // debugger
                            callback.call(collection, this.next());
                        } while (this.hasNext());
                    }
                };

                this.reverseEach = function(startIndex, callback) {
                    if (typeof startIndex == "function") {
                        callback = startIndex;
                    }

                    if (Iterable.parse(collection).length) {
                        this.finalize();

                        if (typeof startIndex != "function") {
                            _iterator.prevIndex(startIndex);
                        }

                        while (this.hasPrev()) {
                            callback.call(collection, this.prev());
                        }
                    }
                };

                this.select = function(callback) {
                    var
                        selected = [];

                    this.each(function(item) {
                        if (callback.call(collection, item)) {
                            selected.push(item);
                        }
                    })

                    if (selected.length) {
                        return selected;
                    }

                };

                return this;

            }
        }

    });

})(window);
