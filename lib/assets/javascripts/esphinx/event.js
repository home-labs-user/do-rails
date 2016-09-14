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

        mapEventListener = function (node, eventName, callback) {
            var
                map = {},
                index;

            map[eventName] = new Array(callback);
            if (callback) {
                if (index = nodes.indexPerEquivalence(node)) {
                    if (mappedListeners[index][eventName]) {
                        mappedListeners[index][eventName].push(callback);
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

            if (callback = mappedListeners[index][eventName]) {
                return callback;
            }

            return [];
        },

        removeListener = function (node, eventName, callback) {
            var
                indexObject = nodes.indexPerEquivalence(node),
                callbacks = mappedListeners[indexObject][eventName];

            // debugger
            callbacks.deleteValue(callback);

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
        },

        mapEach = function (name, callback) {
            var
                mainReference = this;

            mainReference.each(function (node) {
                if (node instanceof Node || node == window) {
                    mapEventListener(node, name, callback);
                    callback.call(node);
                }
            });
        },

        // can be called several times
        onChangeNode = function (callback) {
            var
                mainReference = this,
                added;

            $(this).observe(function (mutations) {
                mutations.forEach(function (mutation) {
                    added = $(mutation.addedNodes).elements();
                    if (added.some()) {
                        callback.call(mainReference, added.asArray());
                    }
                });

            });
        },

        // will see how to unbind the node event
        // offChangeNode = function (callback) {
        //     // disconnect
        // },

        on = function (name, capture, callback) {
            var
                mainReference = this,
                node;

            if (typeof capture === "function") {
                callback = capture;
                capture = false;
            } else if (typeof capture !== "boolean") {
                capture = false;
            }

            switch (name) {
                case "changeNode":
                    return mapEach.call(mainReference, name, onChangeNode);
                break;

                default:
                    mapEach.call(mainReference, name, function () {
                        this.addEventListener(name, callback, capture, false);
                    });
            }
        };


    $.extend({

        prototype: {

            on: function (name, capture, callback) {
                on.call(this, name, capture, callback);

                return this;
            },

            off: function (name, capture, callback) {
                if (typeof capture === "function") {
                    callback = capture;
                } else if (typeof capture !== "boolean") {
                    capture = false;
                }

                if (callback) {
                    this.each(function (node) {
                        node.removeEventListener(name, callback, capture);
                        removeListener(node, name, callback);
                    });
                } else {
                    this.each(function (node) {
                        if (mapped(node)) {
                            mapEventListener(node, name)
                            .forEach(function (callback) {
                                [true, false].forEach(function (capture) {
                                    node.removeEventListener(name,
                                        callback, capture);
                                });
                                removeListeners(node, name);
                            });
                        }
                    });
                }

                return this;
            }

        }

    });

})(esPhinx);
