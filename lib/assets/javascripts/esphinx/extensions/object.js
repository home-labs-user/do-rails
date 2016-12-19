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

    $.defineProperties($, {
        parentKeys: {
            value: function (object) {
                var
                    traces = [],
                    queue = [{trace: [], node: object}],

                    block = function () {
                        var
                            node,
                            nodeKeys,
                            trace;

                        // clean the queue
                        queue = [];
                        return function (map) {
                            node = map.node;
                            nodeKeys = Object.keys(node);

                            nodeKeys.forEach(function (nodeKey) {
                                if (typeof node[nodeKey] == "object") {
                                    trace = map.trace.concat(nodeKey);
                                    // put on queue
                                    queue.push({trace: trace, node: node[nodeKey]});

                                    // traces.unshift(trace);
                                    traces.push(trace);
                                }
                            });
                        };
                    };

                while(true) {
                    if (queue.length) {
                        queue.forEach(block());
                    } else {
                        break;
                    }
                }

                return traces;
            },

            writable: true
        }

    });

})(Object);
