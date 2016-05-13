// require ./object
// require ./array
// require ./singleton

"use strict";

var
    Singleton,
    Extensor;

(function ($) {

    Extensor.new($, {

        prototype: {

            singleton: function singleton () {
                var
                    self = this,
                    // apply get the arguments object, flatten it, preventing that
                    // arguments object encapsulate a another arguments object
                    Constructor = Function.prototype.bind
                        .apply(self, [null].concat(arguments).flatten()),
                    args = arguments.flatten(),
                    instance;

                instance = Singleton.instanceExists.apply(Constructor, args);
                if (instance) {
                    return instance;
                }

                Singleton.new({
                    object: new Constructor(),
                    args: args
                });

                return Singleton.instances().last().object;
            }

        }

    });

})(Function);
