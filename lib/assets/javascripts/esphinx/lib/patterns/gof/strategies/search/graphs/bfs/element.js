//= require ../bfs

var
    Search;

// concrete strategy
(function ($module) {
    "use strict";

    Object.defineProperties(Search.Graphs.BFS, {
        Element: {
            value: {}
        }
    });

    Object.defineProperties(Search.Graphs.BFS.Element, {
        new: {
            value: function (collection) {

                var
                    self = Search.Graphs.BFS.Element;

                if (!(this instanceof self.new)) {
                    return new self.new(collection);
                }

                this.research = function (callback) {
                    var
                        map,
                        mappedIterable,
                        // As novas versões do JS trouxeram a classe Map, a qual permitirá associar objetos como chave, isto é, um objeto poderá ser a chave de outro. Em um objeto literal as chaves são apenas do tipo string ou numéricas
                        queue = [{trace: [], collection: collection}],

                        cleanQueue = function () {
                            queue = [];
                        };

                    while(true) {
                        if (queue.length) {
                            // try for use iterator queue here
                            for (var i in queue) {
                                if (queue.hasOwnProperty(i)) {
                                    map = queue[i];
                                    mappedIterable = map.collection;
                                    cleanQueue();
                                    queue.push({
                                        collection: mappedIterable.children
                                    });
                                }
                            }
                        } else {
                            break;
                        }
                    }

                };

            }
        }

    });

})(window);
