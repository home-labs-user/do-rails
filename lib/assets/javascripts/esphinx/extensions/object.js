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

    // Object.compareEquivalence();
    Extensor.new($.prototype, {
        itsEquivalentTo: function (comparator) {
            var
                object = this,
                primitiveTypes =
                    /(number|string|boolean|null|undefined|symbol)/,
                count = 0,
                attributes,
                attributesCount;

            if (object === comparator) {
                return true;
            } else if (object.constructor === comparator.constructor) {
                if (object instanceof Object
                    && !(object instanceof Function)) {
                    if (object instanceof Node) {
                        if (object.isEqualNode(comparator)) {
                            return true;
                        }
                    } else {
                        attributes = Object.attributes(object);
                        // debugger
                        if (!attributes.length) {
                            if (Object.keys(object)
                                .itsEquivalentTo(Object.keys(comparator))) {
                                return true;
                            }
                        }

                        if (attributes.length
                            === Object.attributes(comparator).length) {
                            attributesCount = attributes.length;
                            for (let i of attributes) {
                                if (object[i] && comparator[i]) {
                                    if ((object[i]).constructor
                                        === (comparator[i]).constructor) {
                                        if (object[i] instanceof Object) {
                                            if (object[i].itsEquivalentTo(
                                                comparator[i])) {
                                                count += 1;
                                            }
                                        } else if (object[i]
                                            === comparator[i]) {
                                            count += 1;
                                        }
                                    }
                                }
                            }

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
