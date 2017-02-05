var
    esPhinx;


(function ($) {
    "use strict";

    $.extend(true, {

        Object: {

            // The keys of associative arrays in JS only can be of integer or string kind. The associations that keys are of Integer kind, the items is sorted according the keys (works as HashSet of the Java); the associations that keys are String kind, works as LinkedHashMap, it’s implements a associative array and maintains the order of entrance on iterate.
            // TreeMap implements a structure based red-black tree (binary search).
            asCountableLiteralObject: function (collection) {
                return Iterable.parse(collection);
            },

            count: function (object, item) {
                var
                    count;

                if (item) {
                    count = Object.values(object).countItem(item);
                } else {
                    count = Object.keys(object).length;
                }

                return count;
            },

            parentKeys: function (object) {
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

            // o método kindOf talvez não valha a pena ser implementado, visto que o instanceof trabalha de forma parecida para saber se um objeto (instância) é um tipo de uma dada classe ou de sua superclasse.
            // para implementar o extends? basta verificar se o constructor é igual a classe passada com o parâmetro, caso não, testar sucessivamente com o constructor do constructor. No entanto, talvez este atributo seja insuficiente para mostrar todos os ancestors da classe a qual se deseja determinar
            className: function (object) {
                // /[^ ]+(?=\])/g
                return /[A-Z_]+[^\]]+/g.exec(Object.prototype.toString
                    .call(object))[0].replace(/ /g, "");
            },

            delete: function (object, index) {
                if (delete object[index]) {
                    if (object.hasOwnProperty("length")) {
                        object.length -= 1;
                    }

                    return true;
                }

                return false;
            },

            firstFromASlice: function (object, slice, startingIndex) {
                startingIndex = startingIndex || 0;

                var
                    attributes = Object.attributes(object),
                    i,
                    key;

                // only attributes can have string value
                for (i in attributes) {
                    if (attributes.hasOwnProperty(i)) {
                        key = attributes[i];
                        if (key >= startingIndex) {
                            if (object[key].search(slice) !== -1) {
                                return key;
                            }
                        }
                    }
                }

                return undefined;
            },

            indexOf: function (object, value) {
                var
                    properties = Object.getOwnPropertyNames(object),
                    i,
                    key;

                for (i in properties) {
                    if (properties.hasOwnProperty(i)) {
                        key = properties[i];
                        if (Object.areEquivalents(object[key], value)) {
                            return key;
                        }
                    }
                }

                return undefined;
            },

        }

    });

}(esPhinx));
