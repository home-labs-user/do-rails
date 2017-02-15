var
    Extensor;


(function ($) {
    "use strict";

    Extensor.new($, {

        // o método kindOf talvez não valha a pena ser implementado, visto que o instanceof trabalha de forma parecida para saber se um objeto (instância) é um tipo de uma dada classe ou de sua superclasse.
        // para implementar o extends? basta verificar se o constructor é igual a classe passada com o parâmetro, caso não, testar sucessivamente com o constructor do constructor. No entanto, talvez este atributo seja insuficiente para mostrar todos os ancestors da classe a qual se deseja determinar
        className: function (object) {
            // /[^ ]+(?=\])/g
            return /[A-Z_]+[^\]]+/g.exec(Object.prototype.toString
                                         .call(object))[0].replace(/ /g, "");
        },

        // The keys of associative arrays in JS only can be of integer or string kind. The associations that keys are of Integer kind, the items is sorted according the keys (works as HashSet of the Java); the associations that keys are String kind, works as LinkedHashMap, it’s implements a associative array and maintains the order of entrance on iterate.
        // TreeMap implements a structure based red-black tree (binary search).
        asCountableLiteralObject: function (collection) {
            return Iterable.parse(collection);
        },

        includeKeys: function (object, keysToFind) {
            var
                keys = Object.keys(object),
                argsAsArray = Array.from(arguments),
                keysToFind = argsAsArray.slice(1, argsAsArray.length).uniq(),
                count = 0;

            keysToFind.forEach(function (argKey) {
                if (keys.includes(argKey)) {
                    count += 1;
                }
            });

            if (count == keysToFind.length) {
                return true;
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
                    if (Object.areEquivalents(object[key], value)) {
                        return key;
                    }
                }
            }

            return undefined;
        },

        count: function (object, item) {
            var
                count;

            if (item) {
                count = Object.values(object).countItem(item);
            } else {
                count = Object.keys(object).length;
            }

            return count;
        },

        delete: function (object, index) {
            if (delete object[index]) {
                if (object.hasOwnProperty("length")) {
                    object.length -= 1;
                }

                return true;
            }

            return false;
        },

        reverse: function (object) {
            var
                newObject = {};

            $.keys(object).reverse().forEach(function (k) {
                newObject[k] = object[k];
            });

            return newObject;
        },

        attributes: function (getNotEnumerable, object) {
            if (getNotEnumerable instanceof Object) {
                object = getNotEnumerable;
                getNotEnumerable = false;
            } else if (typeof getNotEnumerable != "boolean") {
                getNotEnumerable = false;
            }

            var
                attributes = [],
                properties = Object.keys(object);

            if (getNotEnumerable) {
                properties = Object.getOwnPropertyNames(object);
            }

            properties.forEach(function (property) {
                if (typeof object[property] != "function") {
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
                                          comparatorAttributeValue.toString();
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
        }

    });

})(Object);
