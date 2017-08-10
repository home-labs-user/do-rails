//= require ../search

var
    Search;

// concrete strategy
(function($module) {
    "use strict";

    try {
        // Breadth-First Search
        Object.defineProperties($module, {
            BFS: {
                value: {}
            }
        });
    } catch(e) {}

})(Search.Graphs);
