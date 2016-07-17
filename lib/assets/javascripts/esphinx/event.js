//= require ./main

"use strict";

var
    esPhinx;

(function ($) {

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
                if (index = nodes.indexPerEquivalence(node)) {
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

            // debugger
            listeners.delete(listener);

            if (!mappedListeners[indexObject][eventName].length) {
                delete mappedListeners[indexObject][eventName];
            }

            return mappedListeners[indexObject];
        },

        removeListeners = function (node, eventName) {
            var
                indexObject = nodes.indexPerEquivalence(node);

            delete mappedListeners[indexObject][eventName];

            return mappedListeners[indexObject];
        };


    $.extend({

        prototype: {

            on: function (eventName, capture, listener) {
                var
                    self = this;

                if (typeof capture === "function") {
                    listener = capture;
                } else if (typeof capture !== "boolean") {
                    capture = false;
                }

                self.each(function (node) {
                    mapEventListener(node, eventName, listener);
                    node.addEventListener(eventName, listener, capture, false);
                });
                return self;
            },

            off: function (eventName, capture, listener) {
                var
                    self = this;

                if (typeof capture === "function") {
                    listener = capture;
                } else if (typeof capture !== "boolean") {
                    capture = false;
                }

                if (listener) {
                    self.each(function (node) {
                        node.removeEventListener(eventName, listener, capture);
                        removeListener(node, eventName, listener);
                    });
                } else {
                    self.each(function (node) {
                        if (mapped(node)) {
                            mapEventListener(node, eventName)
                            .forEach(function (listener) {
                                [true, false].forEach(function (capture) {
                                    node.removeEventListener(eventName,
                                        listener, capture);
                                });
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
