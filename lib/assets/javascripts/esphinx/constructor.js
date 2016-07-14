"use strict";

var
    Constructor;

Constructor = (function () {

    return {

        new: function (constructorFunction, args) {
            var
                Class = Constructor.new;

            if (!(this instanceof Class)) {
                return new Class(constructorFunction, args);
            }

            // "bind" creates a new function for be called after
            // calling (apply) bind method with params "args" by constructor
            // "constructorFunction"
            return Function.prototype.bind
                .apply(constructorFunction, [null].concat(args).flatten());
        }

    };

})();

// works partially, but don't in all navigators and doesn't abstracts everything

// class Constructor {
//     constructor() {

//     }

//     static build (constructorFunction, args) {
//         return Function.prototype.bind
//              .apply(arguments[0], [null].concat(args[1]).flatten());
//     }
// }
