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
                if ((index = domElements.indexPerEquivalence(domElement))) {
                    if (mappedListeners[index][eventName]) {
                        mappedListeners[index][eventName].push(listener);
                    } else {
                        mappedListeners[index][eventName] = new
                            Array(listener);
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

        removeListeners = function (domElement, eventName) {

        },

        removeListener = function (domElement, eventName, listener) {

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
                        // chamar método que remove um listener específico
                    });
                } else {
                    self.eachAttrs(function (domElement) {
                        mapEventListener(domElement, eventName)
                            .forEach(function (listener) {
                            domElement.removeEventListener(eventName,
                                listener, (options.capture || false));
                            // chamar método que remove todos os listeners de um evento de um objeto
                        });
                    });
                }

                return self;
            }

        }

    });

})(esPhinx);
