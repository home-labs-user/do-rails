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
                    amount,
                    i,
                    lastIndex,
                    ConstructorReference = Iterator_.new;

                if (!(this instanceof ConstructorReference)) {
                    return new ConstructorReference(collection);
                }

                collection = asIterable(collection);
                keys = Object.keys(collection);
                amount = keys.length;
                i = -1;
                lastIndex = amount - 1;

                this.index = function() {
                    return i;
                };

                // iteration protocols
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
                this.next = function() {
                    // sum before to use
                    return collection[keys[++i]];
                };

                this.hasNext = function() {
                    return i < lastIndex;
                };
                ////////////

                this.key = function() {
                    return keys[i];
                };

                this.previous = function() {
                    return collection[keys[--i]];
                };

                this.nextIndex = function(index) {
                    i = index - 1;
                };

                this.previousIndex = function(index) {
                    i = index + 1;
                };

                this.reset = function() {
                    i = -1;
                };

                this.finalize = function() {
                    i = amount;
                };

                this.finalizeOnReverse = function() {
                    this.reset();
                };

                this.hasPrev = function() {
                    return i > 0;
                };

                this.each = function(startingIndex, finalIndex, callback) {
                    if (typeof startingIndex == "function" ^
                        typeof finalIndex == "function") {
                        if (typeof finalIndex == "function") {
                            callback = finalIndex;
                            this.nextIndex(startingIndex);
                        } else {
                            callback = startingIndex;
                        }
                    } else {
                        if (typeof startingIndex == "number") {
                            this.nextIndex(startingIndex);
                        }

                        if (typeof finalIndex == "number") {
                            lastIndex = finalIndex;
                        }
                    }

                    while (this.hasNext()) {
                        callback.call(this, this.next(), this.key());
                    }
                };

                this.reverseEach = function(startingIndex, callback) {
                    this.finalize();

                    if (typeof callback != "function" &&
                        typeof startingIndex == "function") {
                        callback = startingIndex;
                    } else if (typeof startingIndex != "function") {
                        this.previousIndex(startingIndex);
                    }

                    while (this.hasPrev()) {
                        callback.call(this, this.previous(), this.key());
                    }
                };

                this.select = function(callback) {
                    var
                        selected = [],

                        iteratorBlock = function(item) {
                            if (callback.call(this, item, this.key())) {
                                selected.push(item);
                            }
                        };

                    this.each(iteratorBlock);

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

                this.previous = function() {
                    return _iterator.previous();
                };

                this.reset = function() {
                    _iterator.reset();
                };

                this.finalize = function() {
                    _iterator.finalize();
                };

                this.finalizeOnReverse = function() {
                    _iterator.finalizeOnReverse();
                };

                this.hasPrev = function() {
                    return _iterator.hasPrev();
                };

                this.hasNext = function() {
                    return _iterator.hasNext();
                };

                this.each = function(startingIndex, finalIndex, callback) {
                    return _iterator.each(startingIndex, finalIndex, callback);
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
