//= require ../../main

"use strict";

var
    esPhinx;

(function ($) {

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
                    mainReferenceAttrs,
                    comparatorAttrs,
                    mainReferenceMethods,
                    comparatorMethods,
                    mainReferenceAttr,
                    comparatorAttr;

                // esPhinx("iframe")...
                // try over iframe created by google maps API
                // debugger
                if (object === comparator) {
                    return true;
                // maybe like this doesn't will be raised an error
                // qualquer coisa testar com o $.Object.type(object) === $.Object.type(comparator)
                // qualquer coisa testar se há a propriedade __proto__
                } else if (Object.getPrototypeOf(object)
                    === Object.getPrototypeOf(comparator)) {
                    if (object instanceof Object
                        && !(object instanceof Function)) {
                        if (object instanceof Node) {
                            if (object.isEqualNode(comparator)) {
                                return true;
                            }
                        } else {
                            mainReferenceAttrs = $.Object.attributes(object);
                            mainReferenceMethods = $.Object.methods(object);
                            comparatorAttrs = $.Object.attributes(comparator);
                            comparatorMethods = $.Object.methods(comparator);

                            // if doesn't have attributes
                            if (!mainReferenceAttrs.length) {
                                if (mainReferenceMethods.length) {
                                    if (mainReferenceMethods.length
                                        === comparatorMethods.length
                                        && $.Object.areEquivalents(mainReferenceMethods,
                                            comparatorMethods)) {
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

                                    mainReferenceAttrs = $.Object
                                        .attributes(mainReferenceAttr);
                                    mainReferenceMethods = $.Object
                                        .methods(mainReferenceAttr);
                                    comparatorAttrs = $.Object
                                        .attributes(comparatorAttr);
                                    comparatorMethods = $.Object
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
                                            if (Object
                                                .getPrototypeOf(mainReferenceAttr)
                                                === Object
                                                .getPrototypeOf(Object)) {
                                            // if (mainReferenceAttr
                                            //     instanceof Object) {
                                                if ($.Object.areEquivalents(
                                                    mainReferenceAttr,
                                                    comparatorAttr)) {
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
                                if (value === length) {
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
                    if (Object.getPrototypeOf(args[i])
                        === Object.getPrototypeOf(Object)) {
                        Iterator.each(args[i], function (v, i) {
                            merged[i] = v;
                        });
                    }
                }

                return merged;
            },

            attributes: function (object) {
                var
                    attributes = [];

                Object.keys(object).forEach(function (property) {
                    if (typeof object[property] !== "function") {
                        attributes.push(property);
                    }
                });

                return attributes;
            },

            methods: function (object) {
                var
                    methods = [];

                Object.keys(object).forEach(function (property) {
                    if (typeof object[property] === "function") {
                        methods.push(property);
                    }
                });

                return methods;
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
                    if (object[key] === value) {
                        return key;
                    }
                }

                return undefined;
            },

            // firstOfSlice: function (object, slice, startingIndex = 0) {
            firstOfSlice: function (object, slice, startingIndex) {
                startingIndex = startingIndex || 0;

                for (let key of $.Object.attributes(object)) {
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
