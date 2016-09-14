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
                index,
                listener;

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

            if (listener = mappedListeners[index][eventName]) {
                return listener;
            }

            return [];
        },

        removeListener = function (node, eventName, listener) {
            var
                indexObject = nodes.indexPerEquivalence(node),
                listeners = mappedListeners[indexObject][eventName];

            // debugger
            listeners.deleteValue(listener);

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
                if (typeof capture === "function") {
                    listener = capture;
                } else if (typeof capture !== "boolean") {
                    capture = false;
                }

                this.each(function (node) {
                    if (node instanceof Node || node == window) {
                        mapEventListener(node, eventName, listener);
                        node.addEventListener(eventName, listener, capture, false);
                    }
                });

                return this;
            },

            off: function (eventName, capture, listener) {
                if (typeof capture === "function") {
                    listener = capture;
                } else if (typeof capture !== "boolean") {
                    capture = false;
                }

                if (listener) {
                    this.each(function (node) {
                        node.removeEventListener(eventName, listener, capture);
                        removeListener(node, eventName, listener);
                    });
                } else {
                    this.each(function (node) {
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

                return this;
            },

            onAddNode: function (callback) {
                var
                    mainReference = this,
                    added;

                this.observe(function (mutations) {
                    mutations.forEach(function (mutation) {
                        added = $(mutation.addedNodes).elements();
                        if (added.some()) {
                            callback.call(mainReference, added.asArray());
                        }
                    });

                });
            }

        }

    });

})(esPhinx);
