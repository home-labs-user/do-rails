"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            childNodes: function () {
                return $().concat(this.first().childNodes);
            },

            childElements: function () {
                return $().concat(this.first().children);
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

                    if (query.count) {
                        if (prev = previous(self.first(), node)) {
                            return $(prev);
                        }
                    }
                }

                return $(self.first().previousElementSibling);
            },

            find: function (query) {
                var
                    self = this;

                return $(query, self.first());
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

            clone: function () {
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
                    nodes = self.first().childNodes;

                return $(nodes[0]);
            },

            firstElement: function () {
                var
                    self = this,
                    elements = self.first().children;

                return $(elements[0]);
            },

            count: function () {
                return Object.keys(this).length;
            },

            parent: function (query) {
                var
                    self = this;

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
                    return $(self.first().closest(query));
                } else {
                    return $(self.first().parentNode);
                }

                return $();
            },

            // sort: function (order = "asc") {
            sort: function (order) {
                if (order !== "desc") {order = "asc";}

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
                    concatened = self.clone();
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
