// require ../../main
// require ../array

var
    esPhinx,
    window;

(function ($) {
    "use strict";

    $.extend(true, {

        Object: {

            areEquivalents: function (object, comparator) {
                var
                    primitiveTypes =
                        /(number|string|boolean|null|undefined|symbol)/,
                    count = 0,
                    attributesCount,
                    objectAttributes,
                    comparatorAttributes,
                    objectMethods,
                    comparatorMethods,
                    objectAttributeValue,
                    comparatorAttributeValue,
                    i,
                    attribute;

                if (object == comparator) {
                    return true;
                } else if (Object.getPrototypeOf(object) ==
                           Object.getPrototypeOf(comparator)) {
                    if (object instanceof Object &&
                        !(object instanceof Function)) {
                        if (object instanceof window.Node) {
                            if (object.isEqualNode(comparator)) {
                                return true;
                            }
                        } else {
                            objectAttributes = this.attributes(object);
                            comparatorAttributes = this.attributes(comparator);
                            objectMethods = this.methods(object);
                            comparatorMethods = this.methods(comparator);

                            // if doesn't have attributes
                            if (!objectAttributes.length) {
                                if (objectMethods.length) {
                                    if (objectMethods.length ==
                                        comparatorMethods.length &&
                                        this
                                            .areEquivalents(objectMethods,
                                            comparatorMethods)) {
                                        return true;
                                    }
                                } else if (objectMethods.length ==
                                           comparatorMethods.length) {
                                    return true;
                                }
                            }

                            if (objectAttributes.length ==
                                comparatorAttributes.length) {

                                for (i in objectAttributes) {
                                    if (objectAttributes.hasOwnProperty(i)) {
                                        attribute = objectAttributes[i];

                                        objectAttributeValue =
                                            object[attribute];
                                        comparatorAttributeValue =
                                            comparator[attribute];

                                        if (typeof objectAttributeValue ==
                                            "boolean" &&
                                            typeof comparatorAttributeValue ==
                                            "boolean") {
                                            objectAttributeValue =
                                                objectAttributeValue.toString();
                                            comparatorAttributeValue =
                                              comparatorAttributeValue
                                                .toString();
                                        }

                                        if (objectAttributeValue &&
                                            comparatorAttributeValue) {
                                            if (Object.getPrototypeOf(
                                                objectAttributeValue) ==
                                                Object.getPrototypeOf(
                                                    comparatorAttributeValue)) {
                                                if (objectAttributeValue instanceof
                                                    Object) {
                                                    if (this.areEquivalents(
                                                        objectAttributeValue,
                                                        comparatorAttributeValue)) {
                                                        count += 1;
                                                    }
                                                } else if (objectAttributeValue ==
                                                    comparatorAttributeValue) {
                                                    count += 1;
                                                }
                                            }

                                        } else if (objectAttributeValue ==
                                                   comparatorAttributeValue) {
                                            return true;
                                        }
                                    }

                                }

                                attributesCount = objectAttributes.length;

                                if (count && count == attributesCount) {
                                    return true;
                                }
                            }
                        }

                    } else {
                        if (primitiveTypes.test(typeof object)) {
                            if (object == comparator) {
                                return true;
                            }
                        }
                    }
                }

                return false;
            },

            indexOf: function (object, value) {
                var
                    properties = Object.getOwnPropertyNames(object),
                    i,
                    key;

                for (i in properties) {
                    if (properties.hasOwnProperty(i)) {
                        key = properties[i];
                        if (object[key] == value) {
                            return key;
                        }
                    }
                }

                return undefined;
            },

            // uses iterator to implement it
            parentKeys: function (object) {
                var
                    traces = [],
                    queue = [{trace: [], node: object}],

                    block = function () {
                        var
                            node,
                            nodeKeys,
                            trace;

                        // clean the queue
                        queue = [];
                        return function (map) {
                            node = map.node;
                            nodeKeys = Object.keys(node);

                            nodeKeys.forEach(function (nodeKey) {
                                if (typeof node[nodeKey] == "object") {
                                    trace = map.trace.concat(nodeKey);
                                    // put on queue
                                    queue.push({trace: trace, node: node[nodeKey]});

                                    // traces.unshift(trace);
                                    traces.push(trace);
                                }
                            });
                        };
                    };

                while(true) {
                    if (queue.length) {
                        queue.forEach(block());
                    } else {
                        break;
                    }
                }

                return traces;
            },

            // o método kindOf talvez não valha a pena ser implementado, visto que o instanceof trabalha de forma parecida para saber se um objeto (instância) é um tipo de uma dada classe ou de sua superclasse.
            // para implementar o extends? basta verificar se o constructor é igual a classe passada com o parâmetro, caso não, testar sucessivamente com o constructor do constructor. No entanto, talvez este atributo seja insuficiente para mostrar todos os ancestors da classe a qual se deseja determinar
            className: function (object) {
                // /[^ ]+(?=\])/g
                return /[A-Z_]+[^\]]+/g.exec(Object.prototype.toString
                    .call(object))[0].replace(/ /g, "");
            },

            count: function (object, value) {
                var
                    length = Object.keys(object).length;

                if (value) {
                    Object.defineProperties(object, {
                        length: {
                            get: function () {
                                return length;
                            },
                            set: function (value) {
                                if (value == length) {
                                    length = value;
                                }
                            }
                        }
                    });
                }

                return length;
            },

            attributes: function (getNotEnumerable, object) {
                if (getNotEnumerable instanceof Object) {
                    object = getNotEnumerable;
                    getNotEnumerable = false;
                } else if (typeof getNotEnumerable !== "boolean") {
                    getNotEnumerable = false;
                }

                var
                    attributes = [],
                    properties = Object.keys(object);

                if (getNotEnumerable) {
                    properties = Object.getOwnPropertyNames(object);
                }

                properties.forEach(function (property) {
                    if (typeof object[property] !== "function") {
                        attributes.push(property);
                    }
                });

                return attributes;
            },

            methods: function (object) {
                var
                    properties = Object.getOwnPropertyNames(object);

                return properties.difference(this.attributes(true, object));
            },

            asObject: function (object) {
                object = $.asIterable(object);

                var newObject = {};

                Array.from(object).forEach(function (v, i) {
                    newObject[i] = v;
                });

                $.toIterable(newObject);

                return newObject;
            },

            delete: function (object, index) {
                delete object[index];
                if (object.length) {
                    object.length -= 1;
                }
                return object;
            },

            // firstOfSlice: function (object, slice, startingIndex = 0) {
            firstOfSlice: function (object, slice, startingIndex) {
                startingIndex = startingIndex || 0;

                var
                    attributes = this.attributes(object),
                    i,
                    key;

                // only attributes can have string value
                for (i in attributes) {
                    if (attributes.hasOwnProperty(i)) {
                        key = attributes[i];
                        if (key >= startingIndex) {
                            if (object[key].search(slice) !== -1) {
                                return key;
                            }
                        }
                    }
                }

                return undefined;
            }

        }

    });

}(esPhinx));
