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
                // this.index++;
                // return collection[keys[this.index]];
                return collection[keys[this.index++]];
            };

            this.reset = function () {
                this.index = 0;
            };

            this.first = function () {
                this.reset();
                return this.next();
            };

            this.current = function () {
                return collection[keys[this.index]];
            };

            this.hasNext = function () {
                return this.index <= count;
            };

            this.finalize = function () {
                this.index = count;
            };

        },

        setAccessors = function(object) {
            var
                _iterator,
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

            // if (iteratorSymbolExists()) {
            //     Object.defineProperties(newObject, {
            //         // js iterator protocol
            //         [window.Symbol.iterator]: {
            //             value: function () {
            //                 var
            //                     iterator = Iterable.new(newObject);

            //                 return {
            //                     next: function () {
            //                         return {
            //                             value: _iterator.next(),
            //                             done: _iterator.hasNext()
            //                         };
            //                     }
            //                 };
            //             }
            //         }
            //     });
            // }

            _iterator = new Iterator_(object);
            Object.defineProperties(object, {
                next: {
                    value: function () {
                        return {
                            value: _iterator.next(),
                            done: _iterator.hasNext()
                        };
                    }
                }
            });
        };

    Object.defineProperties($module, {
        Iterable: {
            value: {}
        }
    });

    Object.defineProperties(Iterable, {

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

                this.current = function () {
                    return _iterator.current();
                };

                this.hasNext = function () {
                    return _iterator.hasNext();
                };

                this.finalize = function () {
                    _iterator.finalize();
                };

                this.each = function(callback) {
                    for (var item = this.first();
                         this.hasNext();
                         item = this.next()) {
                        callback.call(collection, item);
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
