var
    esPhinx;

(function ($) {
    "use strict";

    var
        displayObjects = [];

    $.prototype.extend({

        css: function (property, value, delay) {
            if (typeof delay != "number") {delay = 0;}
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
            if (!value && Object.getPrototypeOf(property) !=
                Object.prototype) {
                property = property.strikeCase();
                computedStyle = window.getComputedStyle(node);
                value = computedStyle.getPropertyValue(property);

                if (node.style[property]) {
                    value = node.style[property];
                } else if (computedStyle.display == "none" &&
                           offsetPattern.test(property)) {
                    toBeCalcArr.forEach(function (prop) {
                        if(!node.style[prop]) {
                            doesntExistsPropArr.push(prop);
                        }
                        originalProperties[prop] = node.style[prop] ||
                          computedStyle[prop];
                        node.style.setProperty(prop, mapToBeCalc[prop],
                                               "important");
                    });

                    value = computedStyle.getPropertyValue(property);

                    // remove
                    doesntExistsPropArr.forEach(function (prop) {
                        node.style.removeProperty(prop);
                    });

                    // revert
                    toBeCalcArr.differences(doesntExistsPropArr)
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

            if (Object.getPrototypeOf(property) == Object.prototype) {

                if (typeof value == "number") { delay = value; }

                properties = property;

                if (/^transition/.test(property)) {
                    mainReference.each(function (node) {
                            computedStyle = window.getComputedStyle(node);
                        $.each(properties, function (value, property) {
                            property = property.strikeCase();
                            propertyPriority = computedStyle
                                .getPropertyPriority(property);
                            node.style.setProperty(property, value,
                                propertyPriority);
                        });
                    });
                } else {
                    if (delay) {
                        window.setTimeout(function () {
                            mainReference.each(function (node) {
                                computedStyle = window
                                    .getComputedStyle(node);
                                $.each(properties,
                                         function (value, property) {
                                    property = property.strikeCase();
                                    propertyPriority = computedStyle
                                        .getPropertyPriority(property);
                                    node.style.setProperty(property, value,
                                        propertyPriority);
                                });
                            });
                        }, delay);
                    } else {
                        mainReference.each(function (node) {
                            computedStyle = window.getComputedStyle(node);
                            $.each(properties, function (value, property) {
                                property = property.strikeCase();
                                propertyPriority = computedStyle
                                    .getPropertyPriority(property);
                                node.style.setProperty(property, value,
                                    propertyPriority);
                            });
                        });
                    }
                }
            } else {
                if (/^transition/.test(property)) {
                    mainReference.each(function (node) {
                        computedStyle = window.getComputedStyle(node);
                        property = property.strikeCase();
                        propertyPriority = computedStyle
                            .getPropertyPriority(property);
                        node.style.setProperty(property, value,
                            propertyPriority);
                    });
                } else {
                    if (delay) {
                        window.setTimeout(function () {
                            mainReference.each(function (node) {
                                computedStyle = window
                                    .getComputedStyle(node);
                                property = property.strikeCase();
                                propertyPriority = computedStyle
                                    .getPropertyPriority(property);
                                node.style.setProperty(property, value,
                                    propertyPriority);
                            });
                        }, delay);
                    } else {
                        mainReference.each(function (node) {
                            computedStyle = window.getComputedStyle(node);
                            property = property.strikeCase();
                            propertyPriority = computedStyle
                                .getPropertyPriority(property);
                            node.style.setProperty(property, value,
                                propertyPriority);
                        });
                    }
                }
            }

            return this;
        },

        width: function (value) {
            if (this.asNode() == window.document) {
                return this.asNode().documentElement.offsetWidth;
            }

            var
                width = this.css("width"),
                padding = this.css("padding-left") +
                this.css("padding-right"),
                border = this.css("border-left-width") +
                this.css("border-right-width");

            if (value || value === 0) {
                this.each(function (node) {
                    node = $(node);
                    if (Number.isNaN(parseFloat(value))) {
                        node.css("width", value);
                    } else {
                        padding = node.css("padding-left") +
                          node.css("padding-right");
                        border = node.css("border-left-width") +
                          node.css("border-right-width");
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
            if (this.asNode() == window.document) {
                return this.asNode().documentElement.offsetHeight;
            }

            var
                height = this.css("height"),
                padding = this.css("padding-top") +
                this.css("padding-bottom"),
                border = this.css("border-top-width") +
                this.css("border-bottom-width");

            if (value || value === 0) {
                this.each(function (node) {
                    node = $(node);
                    if (Number.isNaN(parseFloat(value))) {
                        node.css("height", value);
                    } else {
                        padding = node.css("padding-top") +
                          node.css("padding-bottom");
                        border = node.css("border-top-width") +
                          node.css("border-bottom-width");
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
        },

        centralizeAt: function (reference) {
            var
                mainReference = this,
                parent,

                centralize = function (reference) {
                    this.css("position", "absolute");

                    this.css({
                        top: (reference.height() / 2) -
                            (this.height() / 2) + "px",
                        left: (reference.width() / 2) -
                          (this.width() / 2) + "px"
                    });
                };

            if (Object.getPrototypeOf(reference) !=
                Object.getPrototypeOf(this)) {
                reference = $(reference);
            }

            centralize.call(this, reference);

            if (reference.instanceOf(window.Element)) {
                parent = reference;
            } else {
                parent = $().push(window);
            }

            parent.on("resize", function () {
                centralize.call(mainReference, reference);
            });

            return this;
        },

        hide: function (delay) {
            if (typeof delay != "number") {delay = 0;}
        // hide: function (delay = 0) {

            var
                node = this.asNode(),
                exists,
                i,
                hash;

            if (node instanceof window.Element) {
                if ($(node).css("display") != "none") {
                    for (i in displayObjects) {
                        if (displayObjects.hasOwnProperty(i)) {
                            hash = displayObjects[i];
                            if (hash.element == node) {
                                exists = true;
                                break;
                            }
                        }
                    }

                    if (!exists && this.css("display")) {
                        displayObjects.push({
                            element: node,
                            display: this.css("display")
                        });
                    }
                }

            }

            this.css("display", "none", delay);

            return this;
        },

        show: function (displayValue) {
            var
                node = this.asNode(),
                style,
                inlineDisplay,
                display,
                i,
                hash;


            if (node instanceof window.Element) {
                style = node.style;
                inlineDisplay = style.display;
            }

            if (this.css("display") == "none") {
                for (i in displayObjects) {
                    if (displayObjects.hasOwnProperty(i)) {
                        hash = displayObjects[i];
                        if (hash.element == node) {
                            display = hash.display;
                            break;
                        }
                    }
                }

                if (display) {
                    this.css("display", display);
                } else if (inlineDisplay) {
                    style.display = null;
                    if (this.css("display") == "none") {
                        this.css("display", "block");
                    }
                } else {
                    this.css("display", "block");
                }
            }

            // if (display) {
            //     this.css("display", display);
            // } else if (inlineDisplay) {
            //     style.display = null;
            //     if (this.css("display") == "none") {
            //         this.css("display", "block");
            //     }
            // } else {
            //     this.css("display", "block");
            // }

            return this;
        },

        minWidth: function () {
            var
                padding = this.css("padding-left") +
                this.css("padding-right");

            return this.innerWidth() - padding;
        },

        innerWidth: function () {
            var
                border = this.css("border-left-width") +
                this.css("border-right-width");

            return this.width() - border;
        },

        minHeight: function () {
            var
                padding = this.css("padding-top") +
                this.css("padding-bottom");

            return this.innerHeight() - padding;
        },

        innerHeight: function () {
            var
                border = this.css("border-top-width") +
                this.css("border-bottom-width");

            return this.height() - border;
        },

        transitionDuration: function () {
            return this.css("transition-duration") * 1000;
        },

        horizontalToggle: function (initialMargin, callback) {
            initialMargin = initialMargin || 0;
        // horizontalToggle: function (initialMargin = 0) {
            if (typeof initialMargin == "function") {
                callback = initialMargin;
                initialMargin = 0;
            }

            var
                width,
                margin,
                marginRight,
                marginLeft,
                duration;

            this.each(function (node) {
                node = $(node);

                width = Math.round(node.width());
                marginLeft = Math.abs(node.css("margin-left"));
                marginRight = Math.abs(node.css("margin-right"));
                duration = node.transitionDuration();

                // discovering more criteria to know if align on right (||)
                if (node.css("float") == "right") {
                    margin = Math.abs(Math.round(node.css("margin-right")));
                    if (margin != (width + marginLeft)) {
                        node.css("margin-right", - (width + marginLeft) +
                                 "px");
                    } else {
                        node.css("margin-right", initialMargin + "px");
                    }
                } else {
                    margin = Math.abs(Math.round(node.css("margin-left")));
                    if (margin != (width + marginRight)) {
                        node.css("margin-left", - (width + marginRight) +
                                 "px");
                    } else {
                        node.css("margin-left", initialMargin + "px");
                    }
                }

                if (duration) {
                    window.setTimeout(function () {
                        callback.call(node);
                    }, duration);
                } else {
                    callback.call(node);
                }

            });

            return this;
        },

        toggleClass: function (classList, changeTo) {
            this.each(function (node) {
                if ($(node).hasClass(classList)) {
                    $(node).removeClass(classList);
                    if (changeTo) {
                        $(node).addClass(changeTo);
                    }
                } else if (changeTo) {
                    if ($(node).hasClass(changeTo)) {
                        $(node).removeClass(changeTo);
                        $(node).addClass(classList);
                    } else {
                        $(node).addClass(classList);
                    }
                } else {
                    $(node).addClass(classList);
                }
            });

            return this;
        },

        toggle: function () {
            if (this.css("display") == "none") {
                this.show();
            } else {
                this.hide();
            }
        }

    });

}(esPhinx));
