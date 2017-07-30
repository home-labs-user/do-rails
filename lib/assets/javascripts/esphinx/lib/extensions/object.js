//= require ./array

var
    Iterable;


(function($) {
    "use strict";

    try {
        $.defineProperties($, {

            clone: {
                value: function(object, includeNonEnumerable) {
                    if (typeof includeNonEnumerable != "boolean") {
                        includeNonEnumerable = true;
                    }

                    var
                        clone = {},
                        properties = $.getOwnPropertyNames(object);

                    if (!includeNonEnumerable) {
                        return Object.assign(clone, object);
                    }

                    try{
                        properties.forEach(function(p) {
                            clone[p] = object[p];
                        });
                    } catch(e) {}

                    return clone;
                }
            },

            classForName: {
                value: function(name) {
                    return window[name];
                }
            },

            hasSameClass: {
                value: function(objects) {
                    var
                        argumentsAsArray = Array.from(arguments),
                        compared = objects,
                        count = 0;

                    argumentsAsArray = argumentsAsArray.slice(1,
                        argumentsAsArray.length);
                    argumentsAsArray.forEach(function(object) {
                        if ($.getPrototypeOf(compared) ==
                            $.getPrototypeOf(object)) {
                            count++;
                        }
                    });

                    return count == argumentsAsArray.length;
                }
            },

            isFromClass: {
                value: function(object, classFunction) {
                    return $.classForName($.className(object)) == classFunction;
                }
            },

            firstKey: {
                value: function(object) {
                    var
                        // Object: javascript literal object
                        keys = Object.keys(object);


                    return keys[0];
                }
            },

            lastKey: {
                value: function(object) {
                    var
                        keys = Object.keys(object);


                    return keys[keys.length - 1];
                }
            },

            normalizedAsLowerCase: {
                value: function(object) {
                    var
                        iterator,
                        attributes = Object.attributes(object),
                        clone = {};

                    Object.assign(clone, object);
                    object.length = attributes.length;
                    iterator = Iterable.Proxy.new(clone);

                    iterator.each(function(v, k) {
                        if (typeof v == "string") {
                            clone[k] = v.toLowerCase();
                        }
                    });

                    return clone;
                }
            },

            firstFromASlice: {
                value: function(object, slice, startingIndex, caseSensitive) {
                    var
                        iterator,
                        key,
                        regexp,
                        attributes = Object.attributes(object);

                    if (!startingIndex || typeof startingIndex != "number") {
                        if (typeof startingIndex == "boolean") {
                            caseSensitive = startingIndex;
                        } else if (!caseSensitive || typeof caseSensitive !=
                                   "boolean") {
                            caseSensitive = false;
                        }

                        startingIndex = 0;
                    }

                    slice = slice.trim();

                    if (!caseSensitive) {
                        regexp = new RegExp(slice, "i");
                    } else {
                        regexp = new RegExp(slice);
                    }

                    iterator = Iterable.Proxy.new(attributes);
                    iterator.each(function(k, i) {
                        if (!isNaN(i)) {
                            if (typeof object[k] == "string" && i
                                >= startingIndex) {
                                if (object[k].search(regexp) != -1) {
                                    key = k;
                                    this.finalize();
                                }
                            }
                        } else if (typeof object[k] == "string") {
                            if (object[k].search(regexp) != -1) {
                                key = k;
                                this.finalize();
                            }
                        }
                    });

                    if (key) {
                        return key;
                    }

                    return undefined;
                }
            },

            // The keys of associative arrays in JS only can be of integer or string kind. The associations that keys are of Integer kind, the items is sorted according the keys (works as HashSet of the Java); the associations that keys are String kind, works as LinkedHashMap, it’s implements a associative array and maintains the order of entrance on iterate.
            // TreeMap implements a structure based red-black tree (binary search).
            asCountableLiteralObject: {
                value: function(collection) {
                    return Iterable.parse(collection);
                }
            },

            indexOf: {
                value: function(object, value) {
                    var
                        key,
                        iterator,
                        properties = $.keys(object);

                    iterator = Iterable.Proxy.new(properties);
                    iterator.each(function(p) {
                        if ($.areEquivalents(object[p], value)) {
                            key = p;
                            this.finalize();
                        }
                    });

                    if (key) {
                        return key;
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

            isEmpty: {
                value: function(object) {
                    return !$.some(object);
                }
            },

            delete: {
                value: function(index, object) {
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
                value: function(object, includeNonEnumerable) {
                    if (typeof includeNonEnumerable != "boolean") {
                        includeNonEnumerable = false;
                    }

                    var
                        properties,
                        attributes = [],
                        clone = Object.clone(object, includeNonEnumerable);

                    if (typeof object != "object" &&
                        typeof object != "function" &&
                        Object.getPrototypeOf(object)) {
                        clone = Object.getPrototypeOf(object);
                    }

                    properties = $.keys(clone);

                    if (includeNonEnumerable) {
                        properties = $.getOwnPropertyNames(clone);
                    }

                    try {
                        properties.forEach(function(p) {
                                if (typeof object[p] != "function") {
                                    attributes.push(p);
                                }
                        });
                    } catch(e) {}

                    return attributes;
                }
            },

            methods: {
                value: function(object, includeNonEnumerable) {
                    if (typeof includeNonEnumerable != "boolean") {
                        includeNonEnumerable = true;
                    }

                    var
                        properties,
                        clone = Object.clone(object, includeNonEnumerable);

                    if (typeof object != "object" &&
                        typeof object != "function" &&
                        Object.getPrototypeOf(object)) {
                        clone = Object.getPrototypeOf(object);
                    }

                    properties = $.getOwnPropertyNames(clone);

                    if (!includeNonEnumerable) {
                        properties = $.keys(clone);
                    }

                    return properties.difference($.attributes(object, true));
                }
            },

            hasAttributes: {
                value: function(object, propertyNames) {
                    var
                        argumentsAsArray = Array.from(arguments);

                    propertyNames = argumentsAsArray.slice(1, argumentsAsArray
                                                           .length);

                    return $.attributes(object, true).includes(propertyNames);
                }
            },

            implementsMethods: {
                value: function(object, propertyNames) {
                    var
                        argumentsAsArray = Array.from(arguments);

                    propertyNames = argumentsAsArray.slice(1, argumentsAsArray
                                                           .length);
                    return $.methods(object, true).includes(propertyNames);
                }
            },

            className: {
                value: function(object) {
                    // /[^ ]+(?=\])/g

                    if (typeof object == "object" &&
                        $.implementsMethods(object, "toString")) {
                        // if implements, then calls it
                        return /[a-zA-Z_]+[^\]]+/g.exec(object.toString())[0]
                        .split(" ")[1];
                    }

                    return /[A-Z_]+[^\]]+/g.exec($.prototype.toString
                                                 .call(object))[0]
                                                 .replace(/ /g, "");
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
                        iterator,
                        count = 0,
                        primitiveTypes =
                            /(number|string|boolean|null|undefined|symbol)/;

                    if (object == comparator) {
                        return true;
                    } else if ($.hasSameClass(object, comparator)) {
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
                                            if ($.hasSameClass(
                                                objectAttributeValue,
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
