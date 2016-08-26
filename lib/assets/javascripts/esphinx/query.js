"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            count: function () {
                return Object.keys(this).length;
            },

            lastIndex: function () {
                return this.count() - 1;
            },

            push: function () {
                var
                    mainReference = this,
                    index;

                Array.from(arguments).forEach(function (object) {
                    index = mainReference.lastIndex() + 1;
                    mainReference[index] = object;
                });

                this.length = this.count();

                return this;
            },

            concat: function (replace) {
                var
                    args = Array.from(arguments),
                    concatened;

                if (typeof replace === "boolean" && replace) {
                    concatened = this;
                    args = args.slice(1, args.length);
                } else {
                    concatened = this.copy();
                }

                args.forEach(function (object) {
                    object = Array.from(object);
                    object.forEach(function (node) {
                        concatened.push(node);
                    });
                });

                return concatened;
            },

            elements: function () {
                var
                    elements = $();

                this.each(function (node) {
                    if ($(node).instanceOf(Element)) {
                        elements.push(node);
                    }
                });

                return elements;
            },

            any: function () {
                if (this.count()) {
                    return true;
                }

                return false;
            },

            firstNode: function () {
                var
                    firstNodes = $(),
                    childNodes;

                this.each(function (node) {
                    childNodes = $(node).childNodes();
                    if (childNodes.any()) {
                        firstNodes.push(childNodes.asNode());
                    }
                });

                return firstNodes;
            },

            firstElement: function () {
                var
                    firstElements = $(),
                    childElements;

                this.each(function (node) {
                    childElements = $(node).childElements();
                    if (childElements.any()) {
                        firstElements.push(childElements.asNode());
                    }
                });

                return firstElements;
            },

            previousSiblings: function () {
                var
                    node = this.asNode(),
                    sibling = node,
                    siblings = $();

                while (sibling = sibling.previousElementSibling) {
                    siblings.push(sibling);
                }

                if (siblings.any()) {
                    return siblings;
                }

                return false;
            },

            nextSiblings: function () {
                var
                    node = this.asNode(),
                    sibling = node,
                    siblings = $();

                while (sibling = sibling.nextElementSibling) {
                    siblings.push(sibling);
                }

                if (siblings.any()) {
                    return siblings;
                }

                return false;
            },

            previous: function (filter) {
                var
                    query,
                    sibling,
                    siblings = $();

                if (filter) {
                    query = this.parent().find(filter);

                    if (query.any()) {
                        siblings = this.previousSiblings().filter(function () {
                            return this.is(query);
                        });
                    }
                } else {
                    this.each(function (node) {
                        sibling = node.previousElementSibling;
                        if (sibling && sibling instanceof Node) {
                            siblings.push(sibling);
                        }
                    });
                }

                return siblings;
            },

            next: function (filter) {
                var
                    query,
                    sibling,
                    siblings = $();

                if (filter) {
                    query = this.parent().find(filter);

                    if (query.any()) {
                        siblings = this.nextSiblings().filter(function () {
                            return this.is(query);
                        });
                    }
                } else {
                    this.each(function (node) {
                        sibling = node.nextSibling;
                        if (sibling && sibling instanceof Node) {
                            siblings.push(sibling);
                        }
                    });
                }

                return siblings;
            },

            asNode: function () {
                if (this.any()) {
                    return this.first()[0];
                }
                return null;
            },

            childElements: function (comparator) {
                var
                    children = $(),
                    node,
                    comparators;

                if (this.any()) {
                    node = this.asNode();

                    if (comparator) {
                        comparators = $(comparator);

                        $(node.children).each(function (element) {
                            element = $(element);
                            comparators.each(function (comparator) {
                                if (element.is(comparator)) {
                                    children.push(comparator);
                                }
                            });
                        });

                        return children;
                    }

                    return children.concat(this.asNode().children);
                }

                return $();
            },

            childNodes: function () {
                var
                    childNodes = $();

                this.each(function (node) {
                    childNodes.concat(true, node.childNodes);
                });

                return childNodes;
            },


            find: function (query) {
                return $(query, this);
            },

            filter: function (callback) {
                var
                    filtered = $();

                this.each(function (node, i) {
                    if (callback.call($(node), node, i, this)) {
                        filtered.push(node);
                    }
                });

                return filtered;
            },

            clone: function (copyChildren) {
                if (typeof copyChildren !== "boolean")  { copyChildren = false; }
                var
                    cloned = $();

                this.each(function (node) {
                    cloned.push(node.cloneNode(copyChildren));
                });

                return cloned;
            },

            copy: function () {
                var
                    clone = $();

                this.each(function (node) {
                    clone.push(node);
                });

                return clone;
            },

            first: function () {
                return $(this[0]);
            },

            asArray: function () {
                return Array.from(this);
            },

            parent: function (query) {
                var
                    elements = $();

                if (query) {
                    // comparator = $(query).asNode();
                    // while (true) {
                    //     if (parent.itsEquivalentTo(comparator)) {
                    //         return $(parent);
                    //     } else if (!parent) {
                    //         break;
                    //     }
                    //     parent = parent.parentNode;
                    // }
                    this.each(function (element) {
                        parent = element.closest(query);
                        if ($(parent).any()) {
                            elements.push(parent);
                        }
                    });
                } else {
                    this.each(function (element) {
                        elements.push(element.parentNode);
                    });
                }

                return elements;
            },

            // sort: function (order) {
            //     if (order !== "desc") {order = "asc";}
            sort: function (order = "asc") {
                var
                    concatened = $(),
                    asArray = [],
                    mainReference = this;

                order = order.toLowerCase();
                asArray = mainReference.textContentsAsArray();

                if (order === "desc") {
                    asArray = asArray.desc();
                } else {
                    asArray = asArray.asc();
                }

                asArray.forEach(function (text) {
                    concatened.concat(true, mainReference
                        .filterByTextContent(text));
                });

                return concatened;
            }

        }

    });

}(esPhinx));
