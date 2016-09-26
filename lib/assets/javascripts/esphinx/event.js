// require ./main
// require ./extensions/array

var
    esPhinx;

(function ($) {
    "use strict";

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
              index = nodes.indexPerEquivalence(node);
                if (index) {
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
            callback = mappedListeners[index][eventName];
            if (callback) {
                return callback;
            }

            return [];
        },

        removeListener = function (node, eventName, callback) {
            var
                indexObject = nodes.indexPerEquivalence(node),
                callbacks = mappedListeners[indexObject][eventName];

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

        mapEach = function (name, functionWhenListener, callback) {
            var
                mainReference = this;

            mainReference.each(function (node) {
                if (node instanceof Node || node == window) {
                    mapEventListener(node, name, functionWhenListener);
                    callback.call(node);
                }
            });


        },

        onChangeNode = function (callback) {
            var
                mainReference = this,
                added;

            mapEach.call(mainReference, "changeNode", callback, function () {
                $(this).observe(function (mutations) {
                    mutations.forEach(function (mutation) {
                        added = $(mutation.addedNodes).elements();
                        if (added.some()) {
                            callback.call(mainReference, added.asArray());
                        }
                    });

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
                html = $("html"),
                imgs,
                img,
                listeningToLoad;

            if (typeof capture === "function") {
                callback = capture;
                capture = false;
            } else if (typeof capture !== "boolean") {
                capture = false;
            }

            switch (name) {
                case "changeNode":
                    return onChangeNode.call(mainReference, callback);
                case "load":
                    if (mainReference.tagName() == "img") {
                        imgs = mainReference.clone();
                    } else {
                        imgs = mainReference.find("img").clone();
                    }

                    if (imgs.some()) {
                        listeningToLoad = function (e) {
                            callback.call(this, e);
                            html.remove(imgs);
                            imgs.each(function (node) {
                                img = $(node);
                                node.removeEventListener(name, listeningToLoad,
                                                         false);
                            });

                        };

                        imgs.each(function (node) {
                            img = $(node);
                            if (img.visible()) {
                                img.hide();
                            }
                            html.prepend(img);
                            node.addEventListener(name, listeningToLoad, false);
                        });
                    }

                default:
                    mapEach.call(mainReference, name, callback, function () {
                        this.addEventListener(name, callback, capture);
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
                    capture = false;
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
