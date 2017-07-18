var
    Iterable;


(function($module) {
    "use strict";

    var
        symbolExists = function() {
            return window.hasOwnProperty("Symbol") &&
                window.Symbol.hasOwnProperty("iterator");
        },

        isIterable = function(object) {
            if (object) {
                if (symbolExists() && object[window.Symbol.iterator] ==
                    Array.prototype[window.Symbol.iterator]) {
                    return true;
                } else {
                    if (typeof object == "string" ||
                        typeof object == "object" &&
                        object.hasOwnProperty("length")) {
                        return true;
                    }
                }
            }

            return false;
        },

        setAccessors = function(object) {
            var
                length = Object.keys(object).length,

                accessors = function(length) {
                    return {
                        get: function() {
                            return length;
                        },
                        set: function() {
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
            //             value: function() {
            //                 var
            //                     _iterator = _Iterable.Proxy.new(object);

            //                 return {
            //                     next: function() {
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
        },

        parse = function(collection) {
            var
                newObject = {};

            Object.assign(newObject, collection);
            setAccessors(newObject);

            return newObject;
        },

        toIterable = function(collection) {
            if (!isIterable(collection)) {
                setAccessors(collection);
            }
        },

        asIterable = function(collection) {
            var
                clone = {};

            Object.assign(clone, collection);
            toIterable(clone);

            return clone;
        },

        Iterator_ = {
            new: function(collection) {
                var
                    keys,
                    count,
                    index,
                    ConstructorReference = Iterator_.new;

                if (!(this instanceof ConstructorReference)) {
                    return new ConstructorReference(collection);
                }

                index = -1;
                collection = asIterable(collection);
                keys = Object.keys(collection);
                count = keys.length;

                this.index = function() {
                    return index;
                };

                // iteration protocols
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
                this.next = function() {
                    // sum before to use
                    return collection[keys[++index]];
                };

                this.hasNext = function() {
                    return index < count -1;
                };
                ////////////

                this.key = function() {
                    return keys[index];
                };

                this.prev = function() {
                    return collection[keys[--index]];
                };

                this.nextIndex = function(index) {
                    index = index - 1;
                };

                this.prevIndex = function(index) {
                    index = index + 1;
                };

                this.reset = function() {
                    index = -1;
                };

                this.finalize = function() {
                    index = count;
                };

                this.finalizeOnReverse = function() {
                    this.reset();
                };

                this.hasPrev = function() {
                    return index > 0;
                };

                this.each = function(startingIndex, callback) {
                    if (typeof callback != "function" &&
                        typeof startingIndex == "function") {
                        callback = startingIndex;
                    } else if (typeof startingIndex != "function") {
                        // anything use Math.trunc
                        this.nextIndex(startingIndex);
                    }

                    while (this.hasNext()) {
                        callback.call(this, this.next(), this.key());
                    }
                };

                this.reverseEach = function(startingIndex, callback) {
                    if (typeof callback != "function" &&
                        typeof startingIndex == "function") {
                        callback = startingIndex;
                    } else if (typeof startingIndex != "function") {
                        this.prevIndex(startingIndex);
                    }

                    this.finalize();

                    while (this.hasPrev()) {
                        callback.call(this, this.prev(), this.key());
                    }
                };

                this.select = function(callback) {
                    var
                        selected = [];

                    this.each(function(item) {
                        if (callback.call(this, item, this.key())) {
                            selected.push(item);
                        }
                    });

                    if (selected.length) {
                        return selected;
                    }

                };
            }
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
            value: function() {
                return symbolExists();
            }
        },

        isIterable: {
            value: function(object) {
                return isIterable(object);
            }
        },

        parse: {
            value: function(collection) {
                return parse(collection);
            }
        },

        toIterable: {
            value: function(collection) {
                toIterable(collection);
            }
        }
    });

    Object.defineProperties(Iterable.Proxy, {

        new: {
            value: function(collection) {
                var
                    _iterator,
                    ConstructorReference = Iterable.Proxy.new;

                if (!(this instanceof ConstructorReference)) {
                    return new ConstructorReference(collection);
                }

                _iterator = Iterator_.new(collection);

                // instance methods
                this.index = function() {
                    return _iterator.index;
                };

                this.key = function() {
                    return _iterator.key();
                };

                this.next = function() {
                    return _iterator.next();
                };

                this.prev = function() {
                    return _iterator.prev();
                };

                this.reset = function() {
                    _iterator.reset();
                };

                this.finalize = function() {
                    _iterator.finalize();
                };

                this.finalizeOnReverse = function(argument) {
                    _iterator.finalizeOnReverse();
                };

                this.hasPrev = function() {
                    return _iterator.hasPrev();
                };

                this.hasNext = function() {
                    return _iterator.hasNext();
                };

                this.each = function(startingIndex, callback) {
                    return _iterator.each(startingIndex, callback);
                };

                this.reverseEach = function(startingIndex, callback) {
                    return _iterator.reverseEach(startingIndex, callback);
                };

                this.select = function(callback) {
                    return _iterator.select(callback);
                };

                return this;

            }
        }

    });

})(window);
