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

            this.index = 0;

            // iteration protocols
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
            this.next = function () {
                return collection[keys[this.index++]];
            };

            this.reset = function () {
                this.index = 0;
            };

            this.first = function () {
                this.reset();
                return this.next();
            };

            this.hasNext = function () {
                return this.index < count;
            };

            this.finalize = function () {
                this.index = count;
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
            //                     _iterator = Iterable.new(object);

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

        new: {
            value: function(collection) {
                var
                    self = Iterable,
                    _iterator;

                if (!(this instanceof self.new)) {
                    return new self.new(collection);
                }

                _iterator = new Iterator_(collection);

                // instance methods
                this.index = function () {
                    return _iterator.index - 1;
                };

                this.indexOfCollection = function () {
                    return _iterator.index;
                };

                this.next = function () {
                    return _iterator.next();
                };

                this.reset = function () {
                    _iterator.reset();
                };

                this.first = function () {
                    return _iterator.first();
                };

                this.hasNext = function () {
                    return _iterator.hasNext();
                };

                this.finalize = function () {
                    _iterator.finalize();
                };

                this.each = function(callback) {
                    if (Iterable.parse(collection).length) {
                        do {
                            callback.call(collection, this.next());
                        } while (this.hasNext());
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
