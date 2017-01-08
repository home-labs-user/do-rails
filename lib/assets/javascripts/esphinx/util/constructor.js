var
    esPhinx;

(function ($) {
    "use strict";

    $.extend(true, {
        Constructor: {
            new: function (constructor, args) {
                var
                    Class = $.Constructor.new;

                if (!(this instanceof Class)) {
                    return new Class(constructor, args);
                }

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

})(esPhinx);
