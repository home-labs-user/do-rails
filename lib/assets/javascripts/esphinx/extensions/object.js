// require ./singleton
// require ./array

"use strict";

var
    Singleton,
    Extensor;

// Object: javascript literal object
(function ($) {

    Extensor.new($, {

        clone: function (object) {
            var
                newObject = {};

            for (let attribute in object) {
                if (object.hasOwnProperty(attribute)) {
                    newObject[attribute] = object[attribute];
                }
            }

            return newObject;
        },

        count: function (object, value) {
            var
                length = 0;

            for (let attribute in object) {
                if (object.hasOwnProperty(attribute)) {
                    length += 1;
                }
            }

            if (value) {
                Object.defineProperties(object, {
                    length: {
                        get: function () {
                            return length;
                        },
                        set: function (value) {
                            if (value === length) {
                                length = value;
                            }
                        },
                        configurable: true
                    }
                });
            }

            return length;
        },

        asIterable: function (object) {
            var
                newObject = Object.clone(object),
                length = Object.count(newObject);

            Object.defineProperties(newObject, {
                length: {
                    get: function () {
                        return length;
                    },
                    set: function (value) {
                            if (value === length) {
                                length = value;
                            }
                        }
                },
                [Symbol.iterator]: {
                    value: Array.prototype[Symbol.iterator]
                }
            });

            return newObject;
        },

        attributes: function (object) {
            var
                attributes = [];

            for (let attribute of Object.keys(object)) {
                if (typeof object[attribute] !== "function") {
                    attributes.push(attribute);
                }
            }

            return attributes;
        },

        methods: function (object) {
            // the largest must stay first
            return Object.keys(object).difference(Object.attributes(object));
        },

        arrayToObject: function (array) {
            var
                object = {};

            array.forEach(function (v, i) {
                object[i] = v;
            });

            $.defineProperties(object, {
                length: {
                    value: array.length,
                    writable: true,
                    configurable: true
                }
            });

            return object;
        },

        delete: function (object, index) {
            delete object[index];
            if (object.length) {
                object.length -= 1;
            }
            return object;
        },

        indexOf: function (object, value) {
            for (let key of Object.keys(object)) {
                if (object[key] === value) {
                    return key;
                }
            }

            return undefined;
        },

        firstOfSlice: function (object, slice) {
            for (let key of Object.keys(object)) {
                if (object[key].search(slice) !== -1) {
                    return key;
                }
            }

            return undefined;
        },

        lastOfSlice: function (object, slice) {
            for (let key of Object.keys(object).desc()) {
                if (object[key].search(slice) !== -1) {
                    return key;
                }
            }

            return undefined;
        }
    });

    // Object.areEquivalents();
    Extensor.new($.prototype, {
        itsEquivalentTo: function (comparator) {
            var
                mainReference = this,
                primitiveTypes =
                    /(number|string|boolean|null|undefined|symbol)/,
                count = 0,
                attributesCount,

                mainReferenceAttrs,
                comparatorAttrs,
                mainReferenceMethods,
                comparatorMethods,
                mainReferenceAttr,
                comparatorAttr;

            // debugger
            if (mainReference === comparator) {
                return true;
            } else if (mainReference.constructor === comparator.constructor) {
                if (mainReference instanceof Object
                    && !(mainReference instanceof Function)) {
                    if (mainReference instanceof Node) {
                        if (mainReference.isEqualNode(comparator)) {
                            return true;
                        }
                    } else {
                        mainReferenceAttrs = Object.attributes(mainReference);
                        mainReferenceMethods = Object.methods(mainReference);
                        comparatorAttrs = Object.attributes(comparator);
                        comparatorMethods = Object.methods(comparator);

                        // if doesn't have attributes
                        if (!mainReferenceAttrs.length) {
                            if (mainReferenceMethods.length) {
                                if (mainReferenceMethods.length
                                    === comparatorMethods.length
                                    && mainReferenceMethods
                                        .itsEquivalentTo(comparatorMethods)) {
                                    return true;
                                }
                            } else if (mainReferenceMethods.length
                                === comparatorMethods.length) {
                                return true;
                            }
                        }


                        if (mainReferenceAttrs.length
                            === comparatorAttrs.length) {

                            attributesCount = mainReferenceAttrs.length;

                            for (let i of mainReferenceAttrs) {
                                mainReferenceAttr = mainReference[i];
                                comparatorAttr = comparator[i];

                                mainReferenceAttrs = Object
                                    .attributes(mainReferenceAttr);
                                mainReferenceMethods = Object
                                    .methods(mainReferenceAttr);
                                comparatorAttrs = Object
                                    .attributes(comparatorAttr);
                                comparatorMethods = Object
                                    .methods(comparatorAttr);

                                if (typeof mainReferenceAttr === "boolean"
                                    && typeof comparatorAttr === "boolean") {
                                    mainReferenceAttr = mainReferenceAttr
                                        .toString();
                                    comparatorAttr = comparatorAttr
                                        .toString();
                                }

                                if (mainReferenceAttr && comparatorAttr) {
                                    if ((mainReferenceAttr).constructor
                                        === (comparatorAttr).constructor) {
                                        if (mainReferenceAttr
                                            instanceof Object) {
                                            if (mainReferenceAttr
                                            .itsEquivalentTo(comparatorAttr)) {
                                                count += 1;
                                            }
                                        } else if (mainReferenceAttr
                                            === comparatorAttr) {
                                            count += 1;
                                        }
                                    }
                                } else if (mainReferenceAttr
                                    === comparatorAttr) {
                                    return true;
                                }
                            }
                            // debugger
                            if (count && count === attributesCount) {
                                return true;
                            }
                        }
                    }

                } else {
                    if (primitiveTypes.test(typeof mainReference)) {
                        if (mainReference === comparator) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }
    });

}(Object));
