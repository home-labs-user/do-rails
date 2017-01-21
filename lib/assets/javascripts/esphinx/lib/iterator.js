//= require ./iterable/context

var
    Iterator;

(function ($module) {
    "use strict";

    Object.defineProperties($module, {
        Iterator: {
            value: {}
        }
    });

    Object.defineProperties(Iterator, {

        new: {
            value: function (iterable) {
                var
                    self = Iterator,
                    i = 0,
                    // getOwnPropertyNames returns non-iterable items
                    keys = Object.keys(iterable),
                    count = keys.length;

                if (!(this instanceof self.new)) {
                    return new self.new(iterable);
                }

                // iteration protocols
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

                // instance methods
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

                this.done = function () {
                    if (i >= count - 1) {
                        return true;
                    }

                    return false;
                };

                return this;

            }
        }

    });

})(window);
