var
    esPhinx;

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

        mapEventListener = function(node, eventName, runOnListener) {
            var
                index,
                map = {};

            map[eventName] = new Array(runOnListener);
            if (runOnListener) {
                index = nodes.indexOfEquivalence(node);
                if (index > -1) {
                    if (mappedListeners[index][eventName]) {
                        mappedListeners[index][eventName].push(runOnListener);
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
            runOnListener = mappedListeners[index][eventName];
            if (runOnListener) {
                return runOnListener;
            }

            return [];
        },

        removeListener = function(node, eventName, runOnListener) {
            var
                index = nodes.indexOfEquivalence(node),
                callbacks = mappedListeners[index][eventName];

            callbacks.deleteValue(callbacks.count(runOnListener),
                                  runOnListener);

            if (!mappedListeners[index][eventName].length) {
                delete mappedListeners[index][eventName];
            }

            return mappedListeners[index];
        },

        removeListeners = function(node, eventName) {
            var
                index = nodes.indexOfEquivalence(node);

            delete mappedListeners[index][eventName];

            return mappedListeners[index];
        },

        mapEach = function(eventName, runOnListener, callback) {
            var
                iteratorBlock = function(node) {
                    if (node instanceof window.Node || node == window) {
                        mapEventListener(node, eventName, runOnListener);
                        callback.call(node);
                    }
                };

            this.each(iteratorBlock);
        },

        onChangeNode = function(runOnListener) {
            var
                added,
                mainReference = this,

                iteratorBlock = function(mutation) {
                    added = $(mutation.addedNodes).elements();
                    if (added.some()) {
                        runOnListener.call(mainReference, added.asArray());
                    }
                };


            mapEach.call(mainReference, "changeNode", runOnListener,
                         function() {
                            $(this).observe(function(mutations) {
                                mutations.forEach(iteratorBlock);

                            });
                        }
            );

        },

        // will see how to unbind the node event
        // offChangeNode = function(runOnListener) {
        //     // disconnect
        // },

        on = function(eventName, capture, runOnListener) {
            var
                cloned,
                runOnLoad,
                imgs,
                mainReference = this,
                html = $("html"),
                nodesClone = mainReference.clone(true),

                iteratorBlock = function(node) {
                    cloned = $(node);
                    cloned.hide();
                    html.prepend(node);

                    node.addEventListener(eventName, runOnLoad, capture);
                },

                removeListeningIteratorBlock = function(node) {
                    node.removeEventListener(eventName, runOnLoad, capture);
                };

            if (typeof capture == "function") {
                runOnListener = capture;
                capture = false;
            } else if (typeof capture != "boolean") {
                capture = false;
            }

            switch (eventName) {
                case "changeNode":
                    return onChangeNode.call(mainReference, runOnListener);
                case "load":
                    imgs = nodesClone.find("img");
                    if (imgs.some()) {
                        nodesClone = imgs;
                    }

                    runOnLoad = function(e) {
                        runOnListener.call(this, e);
                        html.remove(nodesClone);

                        nodesClone.each(removeListeningIteratorBlock);
                    };

                    nodesClone.each(iteratorBlock);
                break;

                default:
                    mapEach.call(mainReference, eventName, runOnListener,
                                 function() {
                        this.addEventListener(eventName, runOnListener,
                                              capture);
                    });
            }
        };


    $.prototype.extend(true, {

        on: function(eventName, capture, runOnListener) {
            on.call(this, eventName, capture, runOnListener);

            return this;
        },

        off: function(eventName, capture, runOnListener) {
            var
                iteratorBlock,
                node,
                currentMethod2Run,

                booleanIteratorBlock = function(capture) {
                    node.removeEventListener(eventName,
                        currentMethod2Run, capture);
                },

                mapIteratorBlock = function(runOnListener) {
                    currentMethod2Run = runOnListener;
                    [true, false].forEach(booleanIteratorBlock);
                    removeListeners(node, eventName);
                };

            if (typeof capture == "function") {
                runOnListener = capture;
                capture = false;
            } else if (typeof capture != "boolean") {
                capture = false;
            }

            if (runOnListener) {
                iteratorBlock = function(n) {
                    node = n;
                    node.removeEventListener(eventName, runOnListener, capture);
                    removeListener(node, eventName, runOnListener);
                };
            } else {
                iteratorBlock = function(n) {
                    node = n;
                    if (mapped(node)) {
                        mapEventListener(node, eventName)
                            .forEach(mapIteratorBlock);
                    }
                };
            }

            this.each(iteratorBlock);

            return this;
        }

    });

})(esPhinx);
