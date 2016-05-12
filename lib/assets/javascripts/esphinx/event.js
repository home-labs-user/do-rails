//= require ./main

"use strict";

var
    esPhinx;

(function ($module) {

    var
        nodes = [],
        mappedListeners = {},

        mapped = function (node) {
            var
                index = nodes.indexPerEquivalence(node);

            if (index) {
                return true;
            }

            return false;
        },

        mapEventListener = function (node, eventName, listener) {
            var
                map = {},
                index;

            map[eventName] = new Array(listener);
            if (listener) {
                if (typeof (index = nodes
                    .indexPerEquivalence(node)) === "number") {
                    if (mappedListeners[index][eventName]) {
                        mappedListeners[index][eventName].push(listener);
                    } else {
                        mappedListeners[index][eventName] = map[eventName];
                    }
                } else {
                    nodes.push(node);
                    index = nodes.length - 1;
                    mappedListeners[index] = map;
                }
            } else {
                if (!mapped(node)) {
                    return false;
                }
                index = nodes.indexPerEquivalence(node);
            }

            return mappedListeners[index][eventName];
        },

        removeListener = function (node, eventName, listener) {
            var
                indexObject = nodes.indexPerEquivalence(node),
                listeners = mappedListeners[indexObject][eventName];

            listeners.delete(listener);

            if (!mappedListeners[indexObject][eventName].length) {
                delete mappedListeners[indexObject][eventName];
            }

            return mappedListeners[indexObject];
        },

        // removeLastListener = function (node, eventName, listener) {
        //     var
        //         indexObject = nodes.indexPerEquivalence(node),
        //         listeners = mappedListeners[indexObject][eventName];

        //     listeners.delete(listeners.last());

        //     if (!mappedListeners[indexObject][eventName].length) {
        //         delete mappedListeners[indexObject][eventName];
        //     }

        //     return mappedListeners[indexObject];
        // },

        removeListeners = function (node, eventName) {
            var
                indexObject = nodes.indexPerEquivalence(node);

            delete mappedListeners[indexObject][eventName];

            return mappedListeners[indexObject];
        };


    $module.extend({
        prototype: {
            on: function (eventName, options, listener) {
                var
                    self = this;

                if (typeof options === "function") {
                    listener = options;
                    options = {};
                }

                self.each(function (node) {
                    mapEventListener(node, eventName, listener);

                    node.addEventListener(eventName, listener, (options.capture || false), false);
                });

                return self;
            },

            off: function (eventName, options, listener) {
                options = options || {};

                var
                    self = this;

                if (options && !listener) {
                    if (typeof options === "function") {
                        listener = options;
                        options = {};
                    }
                }

                if (listener) {
                    self.each(function (node) {
                        node.removeEventListener(eventName, listener,
                            (options.capture || false));

                        removeListener(node, eventName, listener);
                    });
                } else {
                    self.each(function (node) {
                        if (mapped(node)) {
                            mapEventListener(node, eventName)
                                .forEach(function (listener) {
                                node.removeEventListener(eventName,
                                    listener, (options.capture || false));
                                // removeLastListener(node, eventName);
                                removeListeners(node, eventName);
                            });
                        }
                    });
                }

                return self;
            }

        }

    });

})(esPhinx);
