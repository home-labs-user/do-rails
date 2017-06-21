var
    esPhinx,
    window;

(function($) {
    "use strict";

    var
        nodes = [],
        mappedListeners = {},

        mapped = function(node) {
            var
                index = nodes.indexOfEquivalence(node);

            return index > -1;
        },

        mapEventListener = function(node, eventName, callback) {
            var
                map = {},
                index;

            map[eventName] = new Array(callback);
            if (callback) {
                index = nodes.indexOfEquivalence(node);
                if (index > -1) {
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
                index = nodes.indexOfEquivalence(node);
            }
            callback = mappedListeners[index][eventName];
            if (callback) {
                return callback;
            }

            return [];
        },

        removeListener = function(node, eventName, callback) {
            var
                indexObject = nodes.indexOfEquivalence(node),
                callbacks = mappedListeners[indexObject][eventName];

            callbacks.deleteValue(callbacks.count(callback), callback);

            if (!mappedListeners[indexObject][eventName].length) {
                delete mappedListeners[indexObject][eventName];
            }

            return mappedListeners[indexObject];
        },

        removeListeners = function(node, eventName) {
            var
                indexObject = nodes.indexOfEquivalence(node);

            delete mappedListeners[indexObject][eventName];

            return mappedListeners[indexObject];
        },

        mapEach = function(eventName, functionWhenListener, callback) {
            var
                mainReference = this;

            mainReference.each(function(node) {
                if (node instanceof window.Node || node == window) {
                    mapEventListener(node, eventName, functionWhenListener);
                    callback.call(node);
                }
            });


        },

        onChangeNode = function(callback) {
            var
                mainReference = this,
                added;

            mapEach.call(mainReference, "changeNode", callback, function() {
                $(this).observe(function(mutations) {
                    mutations.forEach(function(mutation) {
                        added = $(mutation.addedNodes).elements();
                        if (added.some()) {
                            callback.call(mainReference, added.asArray());
                        }
                    });

                });
            });

        },

        // will see how to unbind the node event
        // offChangeNode = function(callback) {
        //     // disconnect
        // },

        on = function(eventName, capture, callback) {
            var
                mainReference = this,
                html = $("html"),
                nodesClone = mainReference.clone(true),
                cloned,
                listeningToLoad,
                imgs;

            if (typeof capture == "function") {
                callback = capture;
                capture = false;
            } else if (typeof capture != "boolean") {
                capture = false;
            }

            switch (eventName) {
                case "changeNode":
                    return onChangeNode.call(mainReference, callback);
                case "load":
                    imgs = nodesClone.find("img");
                    if (imgs.some()) {
                        nodesClone = imgs;
                    }

                    listeningToLoad = function(e) {
                        callback.call(this, e);
                        html.remove(nodesClone);

                        nodesClone.each(function(node) {
                            node.removeEventListener(eventName, listeningToLoad,
                                                     capture);
                        });
                    };

                    nodesClone.each(function(node) {
                        cloned = $(node);
                        cloned.hide();
                        html.prepend(node);

                        node.addEventListener(eventName, listeningToLoad,
                                              capture);
                    });
                break;

                default:
                    mapEach.call(mainReference, eventName, callback, function() {
                        this.addEventListener(eventName, callback, capture);
                    });
            }
        };


    $.prototype.extend(true, {

        on: function(eventName, capture, callback) {
            on.call(this, eventName, capture, callback);

            return this;
        },

        off: function(eventName, capture, callback) {
            if (typeof capture == "function") {
                callback = capture;
                capture = false;
            } else if (typeof capture != "boolean") {
                capture = false;
            }

            if (callback) {
                this.each(function(node) {
                    node.removeEventListener(eventName, callback, capture);
                    removeListener(node, eventName, callback);
                });
            } else {
                this.each(function(node) {
                    if (mapped(node)) {
                        mapEventListener(node, eventName)
                        .forEach(function(callback) {
                            [true, false].forEach(function(capture) {
                                node.removeEventListener(eventName,
                                    callback, capture);
                            });
                            removeListeners(node, eventName);
                        });
                    }
                });
            }

            return this;
        }

    });

})(esPhinx);
