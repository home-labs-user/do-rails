// require ../../main
// require ../array

var
    esPhinx,
    Iterator;

(function ($) {
    "use strict";

    $.extend({

        Object: {

            type: function (object) {
                // /[^ ]+(?=\])/g
                return /[A-Z_]+[^\]]+/g.exec(Object.prototype.toString
                    .call(object))[0].replace(/ /g, "");
            },

            areEquivalents: function (object, comparator) {
                var
                    primitiveTypes =
                        /(number|string|boolean|null|undefined|symbol)/,
                    count = 0,
                    attributesCount,
                    objectAttrs,
                    comparatorAttrs,
                    objectMethods,
                    comparatorMethods,
                    objectAttrValue,
                    comparatorAttrValue;

                if (object == comparator) {
                    return true;
                } else if (Object.getPrototypeOf(object) ===
                           Object.getPrototypeOf(comparator)) {
                    if (object instanceof Object &&
                        !(object instanceof Function)) {
                        if (object instanceof Node) {
                            if (object.isEqualNode(comparator)) {
                                return true;
                            }
                        } else {
                            objectAttrs = this.attributes(object);
                            comparatorAttrs = this.attributes(comparator);
                            objectMethods = this.methods(object);
                            comparatorMethods = this.methods(comparator);

                            // if doesn't have attributes
                            if (!objectAttrs.length) {
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

                            if (objectAttrs.length ==
                                comparatorAttrs.length) {

                                for (let i of objectAttrs) {
                                    objectAttrValue = object[i];
                                    comparatorAttrValue = comparator[i];

                                    if (typeof objectAttrValue == "boolean" &&
                                        typeof comparatorAttrValue ==
                                        "boolean") {
                                        objectAttrValue = objectAttrValue
                                            .toString();
                                        comparatorAttrValue =
                                          comparatorAttrValue.toString();
                                    }

                                    if (objectAttrValue &&
                                        comparatorAttrValue) {
                                        if (Object
                                            .getPrototypeOf(objectAttrValue) ==
                                            Object.getPrototypeOf(
                                                comparatorAttrValue)) {
                                            if (objectAttrValue instanceof
                                                Object) {
                                                if (this.areEquivalents(
                                                    objectAttrValue,
                                                    comparatorAttrValue)) {
                                                    count += 1;
                                                }
                                            } else if (objectAttrValue ==
                                                       comparatorAttrValue) {
                                                count += 1;
                                            }
                                        }

                                    } else if (objectAttrValue ==
                                               comparatorAttrValue) {
                                        return true;
                                    }

                                }

                                attributesCount = objectAttrs.length;

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

            merge: function () {
                var
                    mainReference = arguments[0],
                    args = Array.from(arguments),
                    merged = {},
                    i;

                Iterator.each(mainReference, function (v, i) {
                    merged[i] = v;
                });

                for(i = 1; i < args.length; i++) {
                    if (Object.getPrototypeOf(args[i]) ==
                        Object.getPrototypeOf(Object)) {
                        Iterator.each(args[i], function (v, i) {
                            merged[i] = v;
                        });
                    }
                }

                return merged;
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
                object = Iterator.asIterable(object);

                var newObject = {};

                Array.from(object).forEach(function (v, i) {
                    newObject[i] = v;
                });

                Iterator.toIterable(newObject);

                return newObject;
            },

            delete: function (object, index) {
                delete object[index];
                if (object.length) {
                    object.length -= 1;
                }
                return object;
            },

            indexOf: function (object, value) {
                for (let key of Object.getOwnPropertyNames(object)) {
                    if (object[key] == value) {
                        return key;
                    }
                }

                return undefined;
            },

            // firstOfSlice: function (object, slice, startingIndex = 0) {
            firstOfSlice: function (object, slice, startingIndex) {
                startingIndex = startingIndex || 0;

                // only attributes can have string value
                for (let key of this.attributes(object)) {
                    if (key >= startingIndex) {
                        if (object[key].search(slice) !== -1) {
                            return key;
                        }
                    }
                }

                return undefined;
            }

        }

    });

}(esPhinx));
