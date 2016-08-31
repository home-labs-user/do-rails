// require ./singleton
// require ./array

"use strict";

var
    Singleton,
    Extensor;

// Object: javascript literal object
(function ($) {

    Extensor.new($, {

        attributes: function (object) {
            var
                attributes = [];

            $.keys(object).forEach(function (property) {
                if (typeof object[property] !== "function") {
                    attributes.push(property);
                }
            });

            return attributes;
        },

        methods: function (object) {
            var
                methods = [];

            $.keys(object).forEach(function (property) {
                if (typeof object[property] === "function") {
                    methods.push(property);
                }
            });

            return methods;
        },

        count: function (object, value) {
            var
                length = $.keys(object).length;

            if (value) {
                $.defineProperties(object, {
                    length: {
                        get: function () {
                            return length;
                        },
                        set: function (value) {
                            if (value === length) {
                                length = value;
                            }
                        }
                    }
                });
            }

            return length;
        },

        asIterable: function (object) {
            var
                length = $.count(object),
                newObject = {};

            $.assign(newObject, object);

            $.defineProperties(newObject, {
                length: {
                    get: function () {
                        return length;
                    },
                    set: function (value) {
                        length = $.count(object);
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

        toIterable: function (object) {
            var
                length = $.count(object);

            $.defineProperties(object, {
                length: {
                    get: function () {
                        return length;
                    },
                    set: function (value) {
                        length = $.count(object);
                        if (value === length) {
                            length = value;
                        }
                    }
                },
                [Symbol.iterator]: {
                    value: Array.prototype[Symbol.iterator]
                }
            });

            return object;
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

        indexOf: function (object, value) {
            for (let key of $.getOwnPropertyNames(object)) {
                if (object[key] === value) {
                    return key;
                }
            }

            return undefined;
        },

        // firstOfSlice: function (object, slice, startingIndex = 0) {
        firstOfSlice: function (object, slice, startingIndex) {
            startingIndex = startingIndex || 0;

            for (let key of $.attributes(object)) {
                if (key >= startingIndex) {
                    if (object[key].search(slice) !== -1) {
                        return key;
                    }
                }
            }

            return undefined;
        },

        areEquivalents: function (object, comparator) {
            var
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
            if (object === comparator) {
                return true;
            } else if (object.constructor === comparator.constructor) {
                if (object instanceof $
                    && !(object instanceof Function)) {
                    if (object instanceof Node) {
                        if (object.isEqualNode(comparator)) {
                            return true;
                        }
                    } else {
                        mainReferenceAttrs = $.attributes(object);
                        mainReferenceMethods = $.methods(object);
                        comparatorAttrs = $.attributes(comparator);
                        comparatorMethods = $.methods(comparator);

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
                                mainReferenceAttr = object[i];
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
                    if (primitiveTypes.test(typeof object)) {
                        if (object === comparator) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }

    });

}(Object));
