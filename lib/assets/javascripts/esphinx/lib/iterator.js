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
            value: function (enumerable) {
                var
                    self = Iterator,
                    i = 0,
                    // getOwnPropertyNames returns non-enumerable items
                    keys = Object.keys(enumerable),
                    count = keys.length;

                if (!(this instanceof self.new)) {
                    return new self.new(enumerable);
                }

                // iteration protocols
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

                // instance methods
                this.next = function () {
                    if (i < count) {
                        i += 1;
                        return enumerable[keys[i]];
                    }
                };

                this.first = function () {
                    return enumerable[keys[0]];
                };

                this.current = function () {
                    return enumerable[keys[i]];
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
