"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            next: function (){
                var
                    self = this,
                    // query,
                    // prev,
                    sibling,
                    siblings = $();

                self.each(function (node) {
                    sibling = node.nextSibling;
                    if (sibling && sibling instanceof Node) {
                        siblings.push(sibling);
                    }
                });

                return siblings;
            },

            prev: function (node) {
                var
                    self = this,
                    query,
                    prev,
                    siblings,

                    previous = function (node, comparator) {
                        var
                            prev = node.previousSibling;

                        do  {
                            if (prev.isEqualNode(comparator)) {
                                return prev;
                            }
                        } while (prev = prev.previousSibling);

                        return false;
                    };

                if (node) {
                    query = $(node);
                    node = query.first();

                    if (query.any()) {
                        if (prev = previous(self.first(), node)) {
                            return $(prev);
                        }
                    }
                }

                return $(self.first().previousElementSibling);
            },

            asNode: function () {
                if (this.any()) {
                    return this.first();
                }
                return this;
            },

            childElements: function (comparator) {
                var
                    self = this,
                    children = $(),
                    first,
                    comparators;

                if (self.any()) {
                    first = self.first();

                    if (comparator) {
                        comparators = $(comparator);

                        $(first.children).each(function (element) {
                            element = $(element);
                            comparators.each(function (comparator) {
                                if (element.is(comparator)) {
                                    children.push(comparator);
                                }
                            });
                        });

                        return children;
                    }

                    return children.concat(this.first().children);
                }

                return $();
            },

            childNodes: function () {
                var
                    self = this,
                    childNodes = $();

                self.each(function (node) {
                    childNodes.concat(true, node.childNodes);
                });

                return childNodes;
            },


            find: function (query) {
                var
                    self = this;

                return $(query, self);
            },

            filter: function (callback) {
                var
                    self = this,
                    filtered = $();

                self.each(function (node, i) {
                    if (callback.call($(node), node, i, self)) {
                        filtered.push(node);
                    }
                });

                return filtered;
            },

            clone: function (copyChildren = false) {
                var
                    self = this,
                    cloned = $();

                self.each(function (node) {
                    cloned.push(node.cloneNode(copyChildren));
                });

                return cloned;
            },

            copy: function () {
                var
                    self = this,
                    clone = $();

                self.each(function (node) {
                    clone.push(node);
                });

                return clone;
            },

            first: function () {
                return this[0];
            },

            lastIndex: function () {
                return this.count() - 1;
            },

            asArray: function () {
                return Array.from(this);
            },

            push: function (value) {
                var
                    self = this,
                    index = self.lastIndex() + 1;

                self[index] = value;
                self.length = self.count();

                return self;
            },

            firstNode: function () {
                var
                    self = this,
                    firstNodes = $(),
                    childNodes;

                self.each(function (node) {
                    childNodes = $(node).childNodes()
                    if (childNodes.any()) {
                        firstNodes.push(childNodes.first());
                    }
                });

                return firstNodes;
            },

            firstElement: function () {
                var
                    self = this,
                    firstElements = $(),
                    childElements;

                self.each(function (node) {
                    childElements = $(node).childElements()
                    if (childElements.any()) {
                        firstElements.push(childElements.first());
                    }
                });

                return firstElements;
            },

            count: function () {
                return Object.keys(this).length;
            },

            any: function () {
                if (this.count()) {
                    return true;
                }

                return false;
            },

            parent: function (query) {
                var
                    self = this,
                    elements = $();

                if (query) {
                    // comparator = $(query).first();
                    // while (true) {
                    //     if (parent.isEqualTo(comparator)) {
                    //         return $(parent);
                    //     } else if (!parent) {
                    //         break;
                    //     }
                    //     parent = parent.parentNode;
                    // }
                    self.each(function (element) {
                        parent = element.closest(query);
                        if ($(parent).any()) {
                            elements.push(parent);
                        }
                    });
                } else {
                    self.each(function (element) {
                        elements.push(element.parentNode);
                    });
                }

                return elements;
            },

            // sort: function (order) {
            //     if (order !== "desc") {order = "asc";}
            sort: function (order = "asc") {

                var
                    self = this,
                    concatened = $(),
                    asArray = [];

                order = order.toLowerCase();
                asArray = self.textContentsAsArray();

                if (order === "desc") {
                    asArray = asArray.desc();
                } else {
                    asArray = asArray.asc();
                }

                asArray.forEach(function (text) {
                    concatened.concat(true, self.filterByTextContent(text));
                });

                return concatened;
            },

            concat: function (replace) {
                var
                    self = this,
                    args = Array.from(arguments),
                    concatened;

                if (typeof replace === "boolean" && replace) {
                    concatened = self;
                    args = args.slice(1, args.length);
                } else {
                    concatened = self.copy();
                }

                args.forEach(function (eObject) {
                    if (eObject) {
                        eObject = Array.from(eObject);
                        eObject.forEach(function (node) {
                            if (node instanceof Node) {
                                concatened.push(node);
                            }
                        });
                    }
                });

                return concatened;
            }

        }

    });

}(esPhinx));
