var
    Constructor;

(function ($module) {
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
                    ConstructorClass = self.new;

                if (!(this instanceof ConstructorClass)) {
                    return new ConstructorClass(constructor, args);
                }

                // isso não será mais necessário com o ecma script 6
                if (!(args instanceof Array)) {
                    args = Array.from(args);
                }

                // "bind" is a instance method of Function. It creates a new
                // function for be called after.
                // Apply calls the bind method
                return Function.prototype.bind
                    .apply(constructor, [null].concat(args).flatten());
            }
        }

    });

})(window);
