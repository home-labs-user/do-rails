var
    Constructor;

(function ($) {
    "use strict";

    Object.defineProperties($module, {
        Constructor: {
            value: {}
        }
    });

    Object.defineProperties(window.Constructor, {

        new: {
            // value: function (constructor, ...args) {
            value: function (constructor, args) {
                var
                    self = Constructor,
                    Class = self.new;

                if (!(this instanceof Class)) {
                    return new Class(constructor, args);
                }

                // isso não será mais necessário com o ecma script 6
                if (!(args instanceof Array)) {
                    args = Array.from(args);
                }

                // "bind" creates a new function for be called after
                // calling (apply) bind method with params "args" by constructor
                // "constructorFunction"
                return Function.prototype.bind
                    .apply(constructor, [null].concat(args).flatten());
            }
        }

    });

})(window);
