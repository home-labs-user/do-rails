//= require ./support/object

"use strict";

var
    Extender;

Extender = (function () {

    return {
        // plugin for extend but doesn't enumerable
        extendWith: function () {
            var
                obj = arguments[0],
                structure = arguments[1],
                context,

                resolveModule = function () {
                    var
                        context = obj,
                        arg = arguments[0];

                    arg.forEach(function (v) {
                        if (!context[v]) {
                            context[v] = {};
                        }
                        context = context[v];
                    });

                    return context;
                };

            if (this instanceof Extender.extendWith) {
                throw new Error("Illegal constructor");
            }

            structure.eachNodes(function (answer) {
                if (answer.trail.length) {
                    context = resolveModule(answer.trail);
                } else if (!context) {
                    context = obj;
                }

                // futuramente, talvez seja viável refatorar a forma de se extender o objeto sem que o usuário faça caca
                if (!context[answer.name]) {
                    Object.defineProperty(context, answer.name, {
                        value: answer.value
                    });
                }
            });
        }
    };

})();
