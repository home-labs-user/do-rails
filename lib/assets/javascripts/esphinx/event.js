// require ./main
// require ./support/object


"use strict";

var
    esPhinx;

(function ($module) {

    var
        domElements = [],
        mappedListeners = {},

        mapEventListener = function (domElement, eventName, listener) {
            var
                map = {},
                index;

            map[eventName] = new Array(listener);
            if (listener) {
                if (typeof (index = domElements.indexPerEquivalence(domElement)
                    ) === 'number') {
                    if (mappedListeners[index][eventName]) {
                        mappedListeners[index][eventName].push(listener);
                    } else {
                        mappedListeners[index][eventName] = map[eventName];
                    }
                } else {
                    domElements.push(domElement);
                    index = domElements.length - 1;
                    mappedListeners[index] = map;
                }
            } else {
                index = domElements.indexPerEquivalence(domElement);
            }

            return mappedListeners[index][eventName];
        },

        removeListener = function (domElement, eventName, listener) {
            var
                indexObject = domElements.indexPerEquivalence(domElement),
                listeners = mappedListeners[indexObject][eventName];

            listeners.delete(listener);

            if (!mappedListeners[indexObject][eventName].length) {
                delete mappedListeners[indexObject][eventName];
            }

            return mappedListeners[indexObject];
        },

        removeLastListener = function (domElement, eventName, listener) {
            var
                indexObject = domElements.indexPerEquivalence(domElement),
                listeners = mappedListeners[indexObject][eventName];

            listeners.delete(listeners.last());

            if (!mappedListeners[indexObject][eventName].length) {
                delete mappedListeners[indexObject][eventName];
            }

            return mappedListeners[indexObject];
        },

        removeListeners = function (domElement, eventName) {
            var
                indexObject = domElements.indexPerEquivalence(domElement);

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

                self.eachAttrs(function (domElement) {
                    mapEventListener(domElement, eventName, listener);

                    domElement.addEventListener(eventName, listener, (options.capture || false), false);
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
                    self.eachAttrs(function (domElement) {
                        domElement.removeEventListener(eventName, listener,
                            (options.capture || false));
                        removeListener(domElement, eventName, listener);
                    });
                } else {
                    self.eachAttrs(function (domElement) {
                        mapEventListener(domElement, eventName)
                            .forEach(function (listener) {
                            domElement.removeEventListener(eventName,
                                listener, (options.capture || false));
                            // removeLastListener(domElement, eventName);
                            removeListeners(domElement, eventName);
                        });
                    });
                }

                return self;
            }

        }

    });

})(esPhinx);
