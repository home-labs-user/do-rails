var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    // $.prototype.extend(false, {
    $.prototype.extend({

        value: function(value) {
            if (value || value === "") {
                this.property("value", value);
                return this;
            } else {
                value = this.property("value");
                if (value) {
                    return value;
                }
            }

            return "";
        },

        data: function(attrName, value) {
            return this.attribute("data-" + attrName, value);
        },

        text: function(text) {
            var
                first,
                childNodes,

                callback = function(node) {
                    first = $(node).childNodes().asNode();
                    if (first instanceof window.Text) {
                        first.textContent = text;
                    } else {
                        $(node).prepend(window.document
                                        .createTextNode(text));
                    }
                },

                childNodesIteratorBlock = function(node) {
                    if (node instanceof window.Text) {
                        text += $(node).textContent();
                    }
                };

            if (typeof text == "string") {
                if (this.some()) {
                    this.each(callback);
                }
                return this;
            } else {
                text = "";
                childNodes = this.childNodes();
                if (childNodes.some()) {
                    childNodes.each(childNodesIteratorBlock);

                    return text.trim();
                } else {
                    return "";
                }
            }
        },

        checked: function() {
            return this.property("checked");
        },

        selected: function() {
            return this.property("selected");
        },

        visible: function() {
            var
                asIterable,
                iterator,
                visible = true,

                callback = function(element) {
                    element = $(element);
                    if (element.css("display") == "none" ||
                        element.css("visibility") == "hidden" ||
                        element.css("opacity") === 0) {
                        visible = false;
                    } else {
                        visible = true;
                        iterator.finalize();
                    }
                };

            if (this.some()) {
                asIterable = this.asArray();
                iterator = Iterable.Proxy.new(asIterable);
                iterator.each(callback);
            }

            return visible;
        },

        parent: function(query) {
            var
                parent,
                callback,
                elements = $();


            if (query) {
                // comparator = $(query).asNode();
                // while (true) {
                //     if (Object.areEquivalents(parent, comparator)) {
                //         return $(parent);
                //     } else if (!parent) {
                //         break;
                //     }
                //     parent = parent.parentNode;
                // }
                callback = function(element) {
                    parent = element.closest(query);
                    if ($(parent).some()) {
                        elements.push(parent);
                    }
                };
            } else {
                callback = function(element) {
                    elements.push(element.parentNode);
                };
            }

            this.each(callback);

            return elements;
        },

        lastIndex: function() {
            return this.amount() - 1;
        },

        childNodes: function() {
            var
                childNodes = $(),

                callback = function(node) {
                    childNodes.concat(true, node.childNodes);
                };

            this.each(callback);

            return childNodes;
        },

        childElements: function(comparator) {
            var
                node,
                comparators,
                element,
                children = $(),

                comparatorsIteratorBlock = function(comparator) {
                    if (element.is(comparator)) {
                        children.push(comparator);
                    }
                },

                callback = function(el) {
                    element = $(el);
                    comparators.each(comparatorsIteratorBlock);
                };

            if (this.some()) {
                node = this.asNode();

                if (comparator) {
                    comparators = $(comparator);

                    $(node.children).each(callback);

                    return children;
                }

                return children.concat(this.asNode().children);
            }

            return $();
        },

        previousSiblings: function() {
            var
                node = this.asNode(),
                sibling = node,
                siblings = $();

            sibling = sibling.previousElementSibling;
            while (sibling) {
                siblings.push(sibling);
                sibling = sibling.previousElementSibling;
            }

            if (siblings.some()) {
                return siblings;
            }

            return false;
        },

        nextSiblings: function() {
            var
                node = this.asNode(),
                sibling = node,
                siblings = $();

            sibling = sibling.nextElementSibling;
            while (sibling) {
                siblings.push(sibling);
                sibling = sibling.nextElementSibling;
            }

            if (siblings.some()) {
                return siblings;
            }

            return false;
        },

        width: function(value) {
            if (this.asNode() == window.document) {
                return this.asNode().documentElement.offsetWidth;
            }

            var
                width = this.css("width"),
                padding = this.css("padding-left") +
                this.css("padding-right"),
                border = this.css("border-left-width") +
                this.css("border-right-width"),

                callback = function(node) {
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
                };

            if (value || value === 0) {
                this.each(callback);
            } else {
                if (Number.isNaN(parseFloat(width))) {
                    return this.asNode().offsetWidth;
                }
                return width + padding + border;
            }
        },

        height: function(value) {
            if (this.asNode() == window.document) {
                return this.asNode().documentElement.offsetHeight;
            }

            var
                height = this.css("height"),
                padding = this.css("padding-top") +
                this.css("padding-bottom"),
                border = this.css("border-top-width") +
                this.css("border-bottom-width"),

                callback = function(node) {
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
                };

            if (value || value === 0) {
                this.each(callback);
            } else {
                if (Number.isNaN(parseFloat(height))) {
                    return this.asNode().offsetHeight;
                }
                return height + padding + border;
            }
        },

        minWidth: function() {
            var
                padding = this.css("padding-left") +
                this.css("padding-right");

            return this.innerWidth() - padding;
        },

        innerWidth: function() {
            var
                border = this.css("border-left-width") +
                this.css("border-right-width");

            return this.width() - border;
        },

        minHeight: function() {
            var
                padding = this.css("padding-top") +
                this.css("padding-bottom");

            return this.innerHeight() - padding;
        },

        innerHeight: function() {
            var
                border = this.css("border-top-width") +
                this.css("border-bottom-width");

            return this.height() - border;
        },

        transitionDuration: function() {
            return this.css("transition-duration") * 1000;
        }

    });

}(esPhinx));
