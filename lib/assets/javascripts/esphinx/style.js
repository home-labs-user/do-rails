var
    esPhinx,
    Iterable;

(function($) {
    "use strict";

    var
        displayObjects = [];

    $.prototype.extend({

        css: function(property, value, delay) {
            if (typeof delay != "number") {delay = 0;}
        // css: function(property, value, delay = 0) {
            var
                properties,
                number,
                computedStyle,
                propertyPriority,
                self = this,
                node = this.asNode(),
                offsetPattern = /\b(width|height|top|left)\b/,
                originalProperties = {},
                map2Calculation = {position: "absolute", visibility: "hidden",
                display: "block"},
                toCalculationCollection = ["position", "visibility", "display"],
                nonexistentProperties = [],

                toCalculationCollectionIteratorBlock = function(p) {
                    if(!node.style[p]) {
                        nonexistentProperties.push(p);
                    }
                    originalProperties[p] = node.style[p] ||
                        computedStyle[p];
                    node.style.setProperty(p, map2Calculation[p], "important");
                },

                toRevertCalculationCollectionIteratorBlock = function(p) {
                    node.style.setProperty(p, originalProperties[p], node.style
                                           .getPropertyPriority(p));
                },

                nonexistentPropertiesIteratorBlock = function(prop) {
                    node.style.removeProperty(prop);
                };

            if (value === 0) {value = value.toString();}

            // (key, value)
            if (!value && !Object.areFromClass(property, Object)) {
                property = property.strikeCase();
                computedStyle = window.getComputedStyle(node);
                value = computedStyle.getPropertyValue(property);

                if (node.style[property]) {
                    value = node.style[property];
                } else if (computedStyle.display == "none" &&
                           offsetPattern.test(property)) {
                    toCalculationCollection
                        .forEach(toCalculationCollectionIteratorBlock);

                    value = computedStyle.getPropertyValue(property);

                    // remove
                    nonexistentProperties
                        .forEach(nonexistentPropertiesIteratorBlock);

                    // revert
                    toCalculationCollection.difference(nonexistentProperties)
                        .forEach(toRevertCalculationCollectionIteratorBlock);
                }

                number = parseFloat(value);

                if (Number.isNaN(number)) {
                    return value;
                } else {
                    return number;
                }
            }

            if (Object.areFromClass(property, Object)) {

                if (typeof value == "number") { delay = value; }

                properties = property;

                if (/^transition/.test(property)) {
                    self.each(function(node) {
                            computedStyle = window.getComputedStyle(node);
                        $.each(properties, function(value, property) {
                            property = property.strikeCase();
                            propertyPriority = computedStyle
                                .getPropertyPriority(property);
                            node.style.setProperty(property, value,
                                propertyPriority);
                        });
                    });
                } else {
                    if (delay) {
                        window.setTimeout(function() {
                            self.each(function(node) {
                                computedStyle = window
                                    .getComputedStyle(node);
                                $.each(properties,
                                         function(value, property) {
                                    property = property.strikeCase();
                                    propertyPriority = computedStyle
                                        .getPropertyPriority(property);
                                    node.style.setProperty(property, value,
                                        propertyPriority);
                                });
                            });
                        }, delay);
                    } else {
                        self.each(function(node) {
                            computedStyle = window.getComputedStyle(node);
                            $.each(properties, function(value, property) {
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
                    self.each(function(node) {
                        computedStyle = window.getComputedStyle(node);
                        property = property.strikeCase();
                        propertyPriority = computedStyle
                            .getPropertyPriority(property);
                        node.style.setProperty(property, value,
                            propertyPriority);
                    });
                } else {
                    if (delay) {
                        window.setTimeout(function() {
                            self.each(function(node) {
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
                        self.each(function(node) {
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

        centralizeAt: function(reference) {
            var
                self = this,
                parent,

                centralize = function(reference) {
                    this.css("position", "absolute");

                    this.css({
                        top: (reference.height() / 2) -
                            (this.height() / 2) + "px",
                        left: (reference.width() / 2) -
                          (this.width() / 2) + "px"
                    });
                };

            if (!Object.hasSameClass(reference, this)) {
                reference = $(reference);
            }

            centralize.call(this, reference);

            if (reference.isA(window.Element)) {
                parent = reference;
            } else {
                parent = $().push(window);
            }

            parent.on("resize", function() {
                centralize.call(self, reference);
            });

            return this;
        },

        // hide: function(delay = 0) {
        hide: function(delay) {
            if (typeof delay != "number") {delay = 0;}

            var
                exists,
                iterator,
                node = this.asNode();

            if (node instanceof window.Element) {
                if ($(node).css("display") != "none") {
                    iterator = Iterable.Proxy.new(displayObjects);
                    iterator.each(function(hash) {
                        if (hash.element == node) {
                            exists = true;
                            this.finalize();
                        }
                    });

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

        show: function(displayValue) {
            var
                style,
                inlineDisplay,
                display,
                iterator,
                node = this.asNode();


            if (node instanceof window.Element) {
                style = node.style;
                inlineDisplay = style.display;
            }

            if (this.css("display") == "none") {
                iterator = Iterable.Proxy.new(displayObjects);
                iterator.each(function(hash) {
                    if (hash.element == node) {
                        display = hash.display;
                        this.finalize();
                    }
                });

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

        horizontalToggle: function(initialMargin, callback) {
            initialMargin = initialMargin || 0;
        // horizontalToggle: function(initialMargin = 0) {
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

            this.each(function(node) {
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
                    window.setTimeout(function() {
                        callback.call(node);
                    }, duration);
                } else {
                    callback.call(node);
                }

            });

            return this;
        },

        toggleClass: function(classList, changeTo) {
            this.each(function(node) {
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

        toggle: function() {
            if (this.css("display") == "none") {
                this.show();
            } else {
                this.hide();
            }
        }

    });

}(esPhinx));
