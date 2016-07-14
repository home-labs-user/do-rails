// require ./object
// require ./array
// require ./singleton

"use strict";

var
    Singleton,
    Extensor,
    Constructor;

(function ($) {

    Extensor.new($, {

        prototype: {

            singleton: function singleton () {
                var
                    self = this,
                    // apply get the arguments object, flatten it, preventing that
                    // arguments object encapsulate a another arguments object
                    args = Array.flatten(arguments),
                    ConstructorVar = Constructor.new(self, args),
                    instance;

                instance = Singleton.exists(self, args);
                if (instance) {
                    return instance;
                }

                instance = Singleton.new({
                    object: new ConstructorVar(),
                    args: args
                });

                return instance.object;
            }

        }

    });

})(Function);
