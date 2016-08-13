"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            css: function (property, value, delay) {
                if (typeof delay !== "number") {delay = 0;}
            // css: function (property, value, delay = 0) {
                var
                    mainReference = this,
                    node = this.asNode(),
                    offsetPattern = /\b(width|height|top|left)\b/,
                    originalProperties = {},
                    mapToBeCalc = {position: "absolute", visibility: "hidden",
                    display: "block"},
                    toBeCalcArr = ["position", "visibility", "display"],
                    doesntExistsPropArr = [],
                    properties,
                    number,
                    computedStyle,
                    propertyPriority;

                if (value === 0) {value = value.toString();}

                // (key, value)
                if (!value && property.constructor !== Object) {
                    property = property.strikeCase();
                    computedStyle = window.getComputedStyle(node);
                    value = computedStyle.getPropertyValue(property);


                    if (node.style[property]) {
                        value = node.style[property];
                    } else if (computedStyle.display === "none"
                        && offsetPattern.test(property)) {
                        toBeCalcArr.forEach(function (prop) {
                            if(!node.style[prop]) {
                                doesntExistsPropArr.push(prop);
                            }
                            originalProperties[prop] = node.style[prop]
                            || computedStyle[prop];
                            node.style.setProperty(prop, mapToBeCalc[prop]
                                , "important");
                        });

                        value = computedStyle.getPropertyValue(property);

                        // remove
                        doesntExistsPropArr.forEach(function (prop) {
                            node.style.removeProperty(prop);
                        });

                        // revert
                        toBeCalcArr.difference(doesntExistsPropArr)
                        .forEach(function (prop) {
                            node.style
                                .setProperty(prop, originalProperties[prop],
                                    node.style.getPropertyPriority(prop));
                        });
                    }

                    number = parseFloat(value);

                    if (Number.isNaN(number)) {
                        return value;
                    } else {
                        return number;
                    }
                }

                if (property.constructor === Object) {

                    if (typeof value === "number") { delay = value; }

                    properties = property;

                    if (/^transition/.test(property)) {
                        mainReference.each(function (node) {
                            Iterator.each(properties,
                            function (value, property) {
                                node.style[property.camelCase()] = value;
                            });
                        });
                    } else {
                        if (delay) {
                            setTimeout(function () {
                                mainReference.each(function (node) {
                                    Iterator.each(properties,
                                    function (value, property) {
                                        node.style[property.camelCase()] = value;
                                    });
                                });
                            }, delay);
                        } else {
                            mainReference.each(function (node) {
                                Iterator.each(properties,
                                function (value, property) {
                                    node.style[property.camelCase()] = value;
                                });
                            });
                        }
                    }
                } else {
                    if (/^transition/.test(property)) {
                        mainReference.each(function (node) {
                            property = property.camelCase();
                            node.style[property] = value;
                        });
                    } else {
                        if (delay) {
                            setTimeout(function () {
                                mainReference.each(function (node) {
                                    property = property.camelCase();
                                    node.style[property] = value;
                                });
                            }, delay);
                        } else {
                            mainReference.each(function (node) {
                                property = property.camelCase();
                                node.style[property] = value;
                            });
                        }
                    }
                }

                return this;
            },

            width: function (value) {
                if (this.asNode() === document) {
                    return this.asNode().documentElement.offsetWidth;
                }

                var
                    width = this.css("width"),
                    padding = this.css("padding-left")
                    + this.css("padding-right"),
                    border = this.css("border-left-width")
                    + this.css("border-right-width");

                if (value || value === 0) {
                    this.each(function (node) {
                        node = $(node);
                        if (Number.isNaN(parseFloat(value))) {
                            node.css("width", value);
                        } else {
                            padding = node.css("padding-left")
                            + node.css("padding-right");
                            border = node.css("border-left-width")
                            + node.css("border-right-width");
                            value  = parseFloat(value) - (padding + border);
                            if (value < 0) {
                                value = 0;
                            }
                            node.css("width", value + "px");
                        }
                    });
                } else {
                    if (Number.isNaN(parseFloat(width))) {
                        return this.asNode().offsetWidth;
                    }
                    return width + padding + border;
                }
            },

            height: function (value) {
                if (this.asNode() === document) {
                    return this.asNode().documentElement.offsetHeight;
                }

                var
                    height = this.css("height"),
                    padding = this.css("padding-top")
                    + this.css("padding-bottom"),
                    border = this.css("border-top-width")
                    + this.css("border-bottom-width");

                if (value || value === 0) {
                    this.each(function (node) {
                        node = $(node);
                        if (Number.isNaN(parseFloat(value))) {
                            node.css("height", value);
                        } else {
                            padding = node.css("padding-top")
                            + node.css("padding-bottom");
                            border = node.css("border-top-width")
                            + node.css("border-bottom-width");
                            value  = parseFloat(value) - (padding + border);
                            if (value < 0) {
                                value = 0;
                            }
                            node.css("height", value + "px");
                        }
                    });
                } else {
                    if (Number.isNaN(parseFloat(height))) {
                        return this.asNode().offsetHeight;
                    }
                    return height + padding + border;
                }
            }

        }

    });

}(esPhinx));
