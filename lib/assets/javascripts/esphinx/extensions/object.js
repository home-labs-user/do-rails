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
            // debugger
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

    // Object.compareEquivalence();
    Extensor.new($.prototype, {
        itsEquivalentTo: function (comparator) {
            var
                mainReference = this,
                primitiveTypes =
                    /(number|string|boolean|null|undefined|symbol)/,
                count = 0,
                attributesCount,
                attributes,
                methods;

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
                        attributes = Object.attributes(mainReference);
                        methods = Object.methods(mainReference);

                        if (!attributes.length) {
                            if (methods.length) {
                                if (methods.itsEquivalentTo(Object
                                    .methods(comparator))) {
                                    return true;
                                }
                            } else {
                                return true;
                            }
                        }

                        if (attributes.length
                            === Object.attributes(comparator).length) {
                            attributesCount = attributes.length;
                            for (let i of attributes) {
                                if (mainReference[i] && comparator[i]) {
                                    if ((mainReference[i]).constructor
                                        === (comparator[i]).constructor) {
                                        // debugger
                                        if (mainReference[i] instanceof Object) {
                                            // debugger
                                            if (mainReference[i].itsEquivalentTo(
                                                comparator[i])) {
                                                count += 1;
                                            }
                                        } else if (mainReference[i]
                                            === comparator[i]) {
                                            // debugger
                                            count += 1;
                                        }
                                    }
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
