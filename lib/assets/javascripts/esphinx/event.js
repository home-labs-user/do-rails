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

            return mappedListeners[index];
        },

        mapEventListener = function(node, eventName, runOnListener) {
            var
                index,
                mappedNode = mapped(node),
                map = {};

            if (runOnListener) {
                map[eventName] = [runOnListener];
                if (mappedNode) {
                    if (mappedNode[eventName]) {
                        mappedNode[eventName].push(runOnListener);
                    } else {
                        mappedNode[eventName] = map[eventName];
                    }
                    return mappedNode[eventName];
                } else {
                    nodes.push(node);
                    index = nodes.length - 1;
                    mappedListeners[index] = map;
                    return mappedListeners[index][eventName];
                }
            } else {
                if (mappedNode) {
                    return mappedNode[eventName];
                } else {
                    return [];
                }
            }
        },

        removeListener = function(node, eventName, runOnListener) {
            var
                mappedNode = mapped(node),
                callbacks = mappedNode[eventName];

            callbacks.delete(runOnListener);
        },

        removeListeners = function(node, eventName) {
            var
                mappedNode = mapped(node);

            delete mappedNode[eventName];
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

        // qual seria o evento neste caso, para, por exemplo, usar o stopPropagation?
        onChangeNode = function(runOnListener) {
            var
                added,
                self = this,

                callback = function(mutation) {
                    added = $(mutation.addedNodes).elements();
                    if (added.some()) {
                        runOnListener.call(self, added.asArray());
                    }
                },

                observeCallback = function(mutations) {
                    mutations.forEach(callback);

                };


            mapEach.call(self, "changeNode", runOnListener,
                         function() {
                            $(this).observe(observeCallback);
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
                self = this,
                html = $("html"),
                clone = self.clone(true),

                callback = function(node) {
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
                    return onChangeNode.call(self, runOnListener);
                case "load":
                    imgs = clone.find("img");
                    if (imgs.some()) {
                        clone = imgs;
                    }

                    runOnLoad = function(e) {
                        runOnListener.call(this, e);
                        html.remove(clone);

                        clone.each(removeListeningIteratorBlock);
                    };

                    clone.each(callback);
                break;

                default:
                    mapEach.call(self, eventName, runOnListener,
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
                callback,
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
                callback = function(n) {
                    node = n;
                    node.removeEventListener(eventName, runOnListener, capture);
                    removeListener(node, eventName, runOnListener);
                };
            } else {
                callback = function(n) {
                    node = n;
                    if (mapped(node)) {
                        mapEventListener(node, eventName)
                            .forEach(mapIteratorBlock);
                    }
                };
            }

            this.each(callback);

            return this;
        },

        attachedEvent: function(eventName) {
            if (mapped(this.asNode())[eventName]) {
                return true;
            }

            return false;
        }

    });

})(esPhinx);
