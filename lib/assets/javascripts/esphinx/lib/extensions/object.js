//= require ./array


var
    Iterable;


(function($) {
    "use strict";


    var
        areEquivalents = function(object1, object2) {
            var
                object1Attributes,
                object2Attributes,
                object1Methods,
                object2Methods,
                object1AttributeValue,
                object2AttributeValue,
                iterator,
                count = 0,
                primitiveTypes =
                    /(number|string|boolean|null|undefined|symbol)/;

            if (object1 == object2) {
                return true;
            } else if ($.hasSameClass(object1, object2)) {
                if (typeof object1 == "object") {
                    if (object1 instanceof Node) {
                        if (object1.isEqualNode(object2)) {
                            return true;
                        }
                    } else {
                        object1Attributes = $.attributes(object1);
                        object2Attributes = $.attributes(object2);
                        object1Methods = $.methods(object1);
                        object2Methods = $.methods(object2);

                        // if doesn't have attributes
                        if (!object1Attributes.length) {
                            if (object1Methods.length ==
                                object2Methods.length &&
                                // recursivity
                                $.areEquivalents(object1Methods,
                                                 object2Methods)) {
                                    return true;
                            }
                        } else if (object1Attributes.length ==
                            object2Attributes.length) {

                            iterator = Iterable.Proxy.new(object1Attributes);

                            iterator.each(function(attribute) {
                                object1AttributeValue = object1[attribute];
                                object2AttributeValue = object2[attribute];

                                // treats boolean
                                if (Object.areFromClass(object1AttributeValue,
                                                        object2AttributeValue,
                                                        Boolean)) {
                                    object1AttributeValue =
                                        object1AttributeValue.toString();
                                    object2AttributeValue =
                                        object2AttributeValue.toString();
                                }

                                if ($.hasSameClass(object1AttributeValue,
                                    object2AttributeValue)) {
                                    if (typeof object1AttributeValue ==
                                        "object") {

                                        // recursivity
                                        if ($.areEquivalents(
                                            object1AttributeValue,
                                            object2AttributeValue)) {
                                            count += 1;
                                        }
                                    } else
                                        if (object1AttributeValue ==
                                        object2AttributeValue) {
                                        count += 1;
                                    }
                                }
                            });

                            return count == object1Attributes.length;
                        }
                    }
                } else {
                    if (primitiveTypes.test(typeof object1)) {
                        return object1 == object2;
                    }
                }
            }

            return false;
        };


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

            areFromClass: {
                value: function(objects, classFunction) {
                    var
                        iterator,
                        argumentsAsArray = Array.from(arguments),
                        count = 0;

                    classFunction = argumentsAsArray.last();
                    argumentsAsArray.delete(argumentsAsArray.lastIndex());

                    iterator = Iterable.Proxy.new(argumentsAsArray);
                    iterator.each(function(object) {
                        if ($.classForName($.className(object)) ==
                            classFunction) {
                            count++;
                        }
                    });

                    return count == argumentsAsArray.length;
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
                            if (typeof object[k] == "string" &&
                                i >= startingIndex) {
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

            asCountableLiteral: {
                value: function(collection) {
                    return Iterable.parse(collection);
                }
            },

            // The keys of associative arrays in JS only can be of integer or string kind. The associations that keys are of Integer kind, the items is sorted according the keys (works as HashSet of the Java); the associations that keys are String kind, works as LinkedHashMap, it implements a associative array and maintains the order of entrance on iterate.
            // TreeMap implements a structure based red-black tree (binary search).
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
                        clone,
                        properties,
                        attributes = [];

                    if (!object) {
                        return [];
                    }

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
                        clone,
                        properties;

                    // otherwise it will give a cascade error
                    if (!object) {
                        return [];
                    }

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
                    var
                        pattern = /[a-zA-Z$_][^\]]+/g,
                        string = $.prototype.toString.call(object);

                    if (typeof object == "object" &&
                        $.implementsMethods(object, "toString")) {
                        // if implements, then calls it
                        string = object.toString();
                    }

                    return pattern.exec(string)[0].split(" ")[1];
                }
            },

            areEquivalents: {
                value: areEquivalents
            }

        });
    } catch(e) {}

})(Object);
