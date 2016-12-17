var
    Extensor;


(function ($) {
    "use strict";

    // Extensor.new($, {

    //     // merge: function () {
    //     //     var
    //     //         mainReference = arguments[0],
    //     //         args = Array.from(arguments),
    //     //         merged = {},
    //     //         i;

    //     //     // Iterator.each(mainReference, function (v, i) {
    //     //         // merged[i] = v;
    //     //     // });

    //     //     Object.assign(merged, mainReference);

    //     //     for(i = 1; i < args.length; i++) {
    //     //         if (Object.getPrototypeOf(args[i]) ==
    //     //             Object.getPrototypeOf({})) {
    //     //             Iterator.each(args[i], function (v, i) {
    //     //                 merged[i] = v;
    //     //             });
    //     //         }
    //     //     }

    //     //     return merged;
    //     // },

    // });

    Object.defineProperties($, {

        mapTraces: {
            value: function (object) {
                var
                    rootPaths = Object.keys(object),
                    map = {},
                    queue = {},
                    enumerable,
                    keys,
                    value,
                    parentTrace,

                    block = function(rootKey) {
                        return function (key) {
                            // put on queue
                            value = enumerable[key];
                            if (typeof value == "object") {
                                Object.assign(queue, value);

                                parentTrace = map[key];

                                Object.keys(enumerable[key])
                                .forEach(function (child) {
                                    map[child] = parentTrace.concat(child);
                                });
                            }

                        };
                    };

                rootPaths.forEach(function (rootKey) {

                    enumerable = object[rootKey];
                    // prepare
                    if (typeof enumerable == "object") {
                        Object.keys(enumerable).forEach(function (child) {
                            map[child] = [rootKey, child];
                        });

                        while(true) {
                            keys = Object.keys(enumerable);

                            if (!keys.length) {
                                break;
                            }

                            keys.forEach(block(rootKey));

                            enumerable = queue;
                            queue = {};
                        }

                    }

                });

                return map;
            }
        }

    });

})(Object);
