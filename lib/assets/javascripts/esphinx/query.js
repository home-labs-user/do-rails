"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

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

                    if (query.count) {
                        if (prev = previous(self.first(), node)) {
                            return $(prev);
                        }
                    }
                }

                return $(self.first().previousElementSibling);
            },

            childElements: function (comparator) {
                var
                    self = this,
                    children = $(),
                    first,
                    comparators;

                if (self.count()) {
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
                    childNodes.push(node.childNodes);
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
                    // nodes = self.childNodes().first();
                    firstNodes = $();

                self.each(function (node) {
                    firstNodes.push($(node).childNodes().first());
                });

                // return $(nodes[0]);
                return firstNodes;
            },

            firstElement: function () {
                var
                    self = this,
                    // elements = self.first().children;
                    firstElements = $();

                self.each(function (node) {
                    firstElements.push($(node).childElements().first());
                });

                // return $(elements[0]);
                return firstElements;
            },

            count: function () {
                return Object.keys(this).length;
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
                        elements.push(element.closest(query));
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
