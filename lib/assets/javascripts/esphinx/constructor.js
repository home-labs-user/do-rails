// require ./support/object

"use strict";

var
    Constructor;

Constructor = (function () {

    return {

        get: function (constructorFunction, args) {
            return Function.prototype.bind
                .apply(constructorFunction, [null].concat(args).flatten());
        }
    };

})();

// works partially, but don't in all navigators and doesn't abstract it all

// class Constructor {
//     constructor() {

//     }

//     static get (constructorFunction, args) {
//         return Function.prototype.bind
//              .apply(arguments[0], [null].concat(args[1]).flatten());
//     }
// }
