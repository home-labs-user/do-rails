var
    Constructor,
    esPhinx;


(function($module, $) {
    "use strict";


    // $.extend({
    //     Constructor: {}
    // });

    // $.Extender.extend($.Constructor, true, {
    //     // new: function(constructor, ...args) {
    //     new: function(constructor, args) {
    //         var
    //             self = Constructor,
    //             ConstructorReference = self.new;

    //         if (!(this instanceof ConstructorReference)) {
    //             return new ConstructorReference(constructor, args);
    //         }

    //         // isso não será mais necessário com o ecma script 6
    //         if (!(args instanceof Array)) {
    //             args = Array.from(args);
    //         }

    //         // "bind" is a instance method of Function. It creates a new
    //         // function for be called after.
    //         // Apply calls the bind method
    //         return Function.prototype.bind.apply(constructor,
    //                                              [null].concat(args)
    //                                              .flatten());
    //     }

    // });


    Object.defineProperties($module, {
        Constructor: {
            value: {}
        }
    });

    Object.defineProperties($module.Constructor, {

        new: {
            value: function(constructor, args) {
                var
                    self = Constructor,
                    ConstructorReference = self.new;

                if (!(this instanceof ConstructorReference)) {
                    return new ConstructorReference(constructor, args);
                }

                // isso não será mais necessário com o ecma script 6
                if (!(args instanceof Array)) {
                    args = Array.from(args);
                }

                // "bind" is a instance method of Function. It creates a new
                // function for be called after.
                // Apply calls the bind method
                return Function.prototype.bind.apply(constructor,
                                                     [null].concat(args)
                                                     .flatten());
            }
        }

    });

})(window, esPhinx);
