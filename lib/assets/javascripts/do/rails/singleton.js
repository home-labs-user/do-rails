// Futuramente ver se é viável extinguir esse objeto,
// e dar poder a cada objeto de ter seu próprio singleton

// testing
// b = $("body")
// sing = DO.singleton
// sing.saveState(b, "id")
// sing.recover("id")

(function ($) {
    "use strict";

    $.singleton = {

        instances: [],

        recover: function (identifier) {

            var obj = null;

            this.instances.map(function (i) {
                if (typeof identifier === "object") {
                    if (i[identifier] === identifier) {
                        obj = i[identifier];
                    }
                } else {
                    if (i.identifier === identifier) {
                        obj = i.instance;
                    }
                }
            });

            if (obj) {
                return obj;
            }
            window.console.error("Instance not found!");
            return false;
        },

        // instanciar primeiro e guardar depois
        // parâmetros polimórficos. Instance e params poderão ser
        // typeof string ou object
        saveState: function (instance, identifier) {
            var
                identifierExists = function () {
                    var
                        id = null,
                        self = $.singleton;

                    self.instances.map(function (i) {
                        if (i.identifier === identifier) {
                            id = true;
                        }
                    });

                    if (id) {
                        return true;
                    }
                    return false;
                },

                instanceExists = function () {
                    var
                        id = null,
                        self = $.singleton;

                    self.instances.map(function (i) {
                        if (i.instance === instance) {
                            id = true;
                        }
                    });

                    if (id) {
                        return true;
                    }
                    return false;
                },

                newObject = {};

            // adds a new
            if (!instanceExists()) {
                if (identifier) {
                    if (!identifierExists()) {
                        newObject.identifier = identifier;
                        newObject.instance = instance;
                    } else {
                        window.console.error("Identifier already exists!");
                        return false;
                    }
                } else {
                    // O CODIGO DEVE MUDAR AQUI
                    window.console.warn("Identifier has not been defined!");
                    // newObject[instance.toString()] = instance;
                    newObject[instance] = instance;
                }
                this.instances.push(newObject);
            } else {
                if (identifier) {
                    if (!identifierExists()) {
                        newObject.identifier = identifier;
                        newObject.instance = instance;
                        this.instances = this.instances.without(instance);
                        this.instances.push(newObject);
                    } else {
                        window.console.error("Identifier already exists!");
                        return false;
                    }
                }
            }

            return this.instances[this.instances.length - 1];

        }

    };

}(DO));
