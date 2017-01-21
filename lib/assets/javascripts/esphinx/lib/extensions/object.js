var
    Extensor;


(function ($) {
    "use strict";

    Extensor.new($, {

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
