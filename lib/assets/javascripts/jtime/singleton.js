// testing
// sing = jTime.singleton("body", $("body"))
// sing.get("body")

require("jtime");
require("support/array");

(function ($) {
    "use strict";

    var
        instances = [];

    $.extend({
        singleton: function () {
            var
                self = this,
                newObject = {},
                key,
                instance,
                i,

                keyExists = function () {
                    for (i in instances) {
                        if (instances.hasOwnProperty(i)) {
                            if (instances[i].key === key) {
                                return true;
                            }
                        }
                    }

                    return false;
                },

                instanceExists = function () {
                    for (i in instances) {
                        if (instances.hasOwnProperty(i)) {
                            if (instances[i].instance === instance) {
                                return true;
                            }
                        }
                    }

                    return false;
                },

                resolve = function (args) {
                    if (args.length === 2) {
                        key = args[0];
                        if (args[1]) {
                            instance = args[1];
                        }
                    } else {
                        key = args[0].key;
                        instance = args[0].instance;
                    }
                };

            resolve(arguments);

            // add a new
            if (!instanceExists()) {
                if (!keyExists()) {
                    newObject.key = key;
                    newObject.instance = instance;
                    instances.push(newObject);
                } else {
                    window.console
                        .error("Identifier already exists!");
                    return false;
                }
            // resolve key of object already saved
            } else {
                if (!keyExists()) {
                    for (i in instances) {
                        if (instances.hasOwnProperty(i)) {
                            if (instances[i].instance === instance) {
                                instances[i].key = key;
                            }
                        }
                    }
                } else {
                    window.console
                        .warn("Identifier already exists!");
                    return false;
                }
            }

            return instances.last();
        }
    });

    $.extend({
        singleton: {

            get: function (key) {
                var
                    i,
                    instance;

                for (i in instances) {
                    if (instances.hasOwnProperty(i)) {
                        instance = instances[i];
                        if (instance.key === key) {
                            return instance;
                        }
                    }
                }

                return false;
            }
        }

    });

})(jTime);
