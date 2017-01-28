var
    Iterable;


(function ($module) {
    "use strict";

    var
        Iterator_ = function(iterable) {
            var
                i = 0,
                // getOwnPropertyNames returns non-iterable items
                keys = Object.keys(iterable),
                count = keys.length;

            // iteration protocols
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
            this.next = function () {
                if (i < count) {
                    i += 1;
                    return iterable[keys[i]];
                }
            };

            this.first = function () {
                return iterable[keys[0]];
            };

            this.current = function () {
                return iterable[keys[i]];
            };

            this.index = function () {
                return i;
            };

            this.hasNext = function () {
                if (i >= count - 1) {
                    return true;
                }

                return false;
            };

            this.reset = function () {
                i = 0;
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
            value: function(iterable) {
                var
                    self = Iterable,
                    _iterator;

                if (!(this instanceof self.new)) {
                    return new self.new(iterable);
                }

                _iterator = new Iterator_(iterable);

                // instance methods
                this.next = function () {
                    return _iterator.next();
                };

                this.first = function () {
                    return _iterator.first();
                };

                this.current = function () {
                    return _iterator.current();
                };

                this.index = function () {
                    return _iterator.index();
                };

                this.hasNext = function () {
                    return _iterator.hasNext();
                };

                this.reset = function () {
                    _iterator.reset();
                };

                return this;

            }
        }

    });

})(window);
