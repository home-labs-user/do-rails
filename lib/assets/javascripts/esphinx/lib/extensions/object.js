//= require ./array

var
    Iterable;


(function($) {
    "use strict";

    try {
        $.defineProperties($, {

            implementsMethod: {
                value: function(object, propertyName) {
                    if (object) {
                        return $.getOwnPropertyNames(object)
                        .includes(propertyName) &&
                        typeof object[propertyName] == "function";
                    }

                    return false;
                }
            },

            // o método kindOf talvez não valha a pena ser implementado, visto que o instanceof trabalha de forma parecida para saber se um objeto (instância) é um tipo de uma dada classe ou de sua superclasse.
            // para implementar o extends? basta verificar se o constructor é igual a classe passada com o parâmetro, caso não, testar recursivamente com as superclasses. Mas como saber quem é a superclasse e as subclasses?
            className: {
                value: function(object) {
                    // /[^ ]+(?=\])/g

                    if (typeof object == "object" &&
                        $.implementsMethod(object, "toString")) {
                        return /[a-zA-Z_]+[^\]]+/g.exec(object.toString())[0]
                        .split(" ")[1];
                    }

                    return /[A-Z_]+[^\]]+/g.exec($.prototype.toString
                                                 .call(object))[0]
                                                 .replace(/ /g, "");
                }
            },

            // The keys of associative arrays in JS only can be of integer or string kind. The associations that keys are of Integer kind, the items is sorted according the keys (works as HashSet of the Java); the associations that keys are String kind, works as LinkedHashMap, it’s implements a associative array and maintains the order of entrance on iterate.
            // TreeMap implements a structure based red-black tree (binary search).
            asCountableLiteralObject: {
                value: function(collection) {
                    return Iterable.parse(collection);
                }
            },

            includeKeys: {
                value: function(object, keysToFind) {
                    var
                        keys = $.keys(object),
                        argsAsArray = Array.from(arguments),
                        keysToFind = argsAsArray.slice(1, argsAsArray.length)
                            .uniq(),
                        count = 0;

                    keysToFind.forEach(function(argKey) {
                        if (keys.includes(argKey)) {
                            count += 1;
                        }
                    });

                    return count == keysToFind.length;
                }
            },

            indexOf: {
                value: function(object, value) {
                    var
                        i,
                        key,
                        properties = $.getOwnPropertyNames(object);

                    for (i in properties) {
                        if (properties.hasOwnProperty(i)) {
                            key = properties[i];
                            if ($.areEquivalents(object[key], value)) {
                                return key;
                            }
                        }
                    }

                    return undefined;
                }
            },

            count: {
                value: function(object, item) {
                    var
                        count;

                    if (item) {
                        count = $.values(object).count(item);
                    } else {
                        count = $.keys(object).length;
                    }

                    return count;
                }
            },

            some: {
                value: function(object) {
                    return $.count(object) > 0;
                }
            },

            delete: {
                value: function(object, index) {
                    if (delete object[index]) {
                        if (object.hasOwnProperty("length")) {
                            object.length -= 1;
                        }

                        return true;
                    }

                    return false;
                }
            },

            reverse: {
                value: function(object) {
                    var
                        newObject = {};

                    $.keys(object).reverse().forEach(function(k) {
                        newObject[k] = object[k];
                    });

                    return newObject;
                }
            },

            attributes: {
                value: function(getNotEnumerable, object) {
                    if (getNotEnumerable instanceof $) {
                        object = getNotEnumerable;
                        getNotEnumerable = false;
                    } else if (typeof getNotEnumerable != "boolean") {
                        getNotEnumerable = false;
                    }

                    var
                        attributes = [],
                        properties = $.keys(object);

                    if (getNotEnumerable) {
                        properties = $.getOwnPropertyNames(object);
                    }

                    properties.forEach(function(property) {
                        if (typeof object[property] != "function") {
                            attributes.push(property);
                        }
                    });

                    return attributes;
                }
            },

            methods: {
                value: function(object) {
                    var
                        properties = $.getOwnPropertyNames(object);

                    return properties.differences(this.attributes(true,
                                                                  object));
                }
            },

            areEquivalents: {
                value: function(object, comparator) {
                    var
                        attributesCount,
                        objectAttributes,
                        comparatorAttributes,
                        objectMethods,
                        comparatorMethods,
                        objectAttributeValue,
                        comparatorAttributeValue,
                        i,
                        attribute,
                        iterator,
                        count = 0,
                        primitiveTypes =
                            /(number|string|boolean|null|undefined|symbol)/;

                    if (object == comparator) {
                        return true;
                    } else if ($.getPrototypeOf(object) ==
                               $.getPrototypeOf(comparator)) {
                        if (object instanceof $ &&
                            !(object instanceof Function)) {
                            if (object instanceof window.Node) {
                                if (object.isEqualNode(comparator)) {
                                    return true;
                                }
                            } else {
                                objectAttributes = this.attributes(object);
                                comparatorAttributes = this
                                    .attributes(comparator);
                                objectMethods = this.methods(object);
                                comparatorMethods = this.methods(comparator);

                                // if doesn't have attributes
                                if (!objectAttributes.length) {
                                    if (objectMethods.length) {
                                        if (objectMethods.length ==
                                            comparatorMethods.length &&
                                            this.areEquivalents(objectMethods,
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

                                    iterator = Iterable.Proxy
                                        .new(objectAttributes);

                                    iterator.each(function(attribute) {
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
                                            if ($.getPrototypeOf(
                                                objectAttributeValue) ==
                                                $.getPrototypeOf(
                                                    comparatorAttributeValue)) {
                                                if (objectAttributeValue instanceof
                                                    $) {

                                                    // recursivity
                                                    if ($.areEquivalents(
                                                        objectAttributeValue,
                                                        comparatorAttributeValue)) {
                                                        count += 1;
                                                    }
                                                } else
                                                    if (objectAttributeValue ==
                                                    comparatorAttributeValue) {
                                                    count += 1;
                                                }
                                            }

                                        } else if (objectAttributeValue ==
                                                   comparatorAttributeValue) {
                                            return true;
                                        }
                                    });

                                    attributesCount = objectAttributes.length;

                                    return count && count == attributesCount;
                                }
                            }

                        } else {
                            if (primitiveTypes.test(typeof object)) {
                                return object == comparator;
                            }
                        }
                    }

                    return false;
                }
            }

        });
    } catch(e) {}

})(Object);
