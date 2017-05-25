//= require ../search

var
    Search;

// concrete strategy
(function($module) {
    "use strict";

    try {
        // Breadth-First Search
        Object.defineProperties(Search.Graphs, {
            BFS: {
                value: {}
            }
        });
    } catch(e) {}

})(window);
