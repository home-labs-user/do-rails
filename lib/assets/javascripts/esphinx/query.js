var
    esPhinx,
    window;

(function ($) {
    "use strict";

    $.extend({

        prototype: {

            select: function (callback) {
                // delegate
                return $($.select(this, callback));
            },

            selectInBreadth: function (callback) {
                return $($.selectInBreadth(this, callback));
            },

            count: function () {
                return this.length;
            },

            lastIndex: function () {
                return this.count() - 1;
            },

            push: function () {
                var
                    mainReference = this,
                    index;

                Array.from(arguments).forEach(function (node) {
                    index = mainReference.lastIndex() + 1;
                    mainReference[index] = node;
                });

                this.length = $.Object.count(this);

                return this;
            },

            concat: function (replace) {
                var
                    args = Array.from(arguments),
                    concatened;

                if (typeof replace == "boolean" && replace) {
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

                this.select(function (node) {
                    if ($(node).instanceOf(window.Element)) {
                        elements.push(node);
                    }
                });

                return elements;
            },

            some: function () {
                if (this.count()) {
                    return true;
                }

                return false;
            },

            firstNode: function () {
                var
                    firstNodes = $(),
                    childNodes;

                this.select(function (node) {
                    childNodes = $(node).childNodes();
                    if (childNodes.some()) {
                        firstNodes.push(childNodes.asNode());
                    }
                });

                return firstNodes;
            },

            childElements: function (comparator) {
                var
                    children = $(),
                    node,
                    comparators;

                if (this.some()) {
                    node = this.asNode();

                    if (comparator) {
                        comparators = $(comparator);

                        $(node.children).select(function (element) {
                            element = $(element);
                            comparators.select(function (comparator) {
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

            firstElement: function () {
                var
                    firstElements = $(),
                    childElements;

                this.select(function (node) {
                    childElements = $(node).childElements();
                    if (childElements.some()) {
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

            nextSiblings: function () {
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

            previous: function (filter) {
                var
                    query,
                    sibling,
                    siblings = $();

                if (filter) {
                    query = this.parent().find(filter);

                    if (query.some()) {
                        siblings = this.previousSiblings().filter(function () {
                            return this.is(query);
                        });
                    }
                } else {
                    this.select(function (node) {
                        sibling = node.previousElementSibling;
                        if (sibling && sibling instanceof window.Node) {
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

                    if (query.some()) {
                        siblings = this.nextSiblings().filter(function () {
                            return this.is(query);
                        });
                    }
                } else {
                    this.select(function (node) {
                        sibling = node.nextSibling;
                        if (sibling && sibling instanceof window.Node) {
                            siblings.push(sibling);
                        }
                    });
                }

                return siblings;
            },

            asNode: function () {
                if (this.some()) {
                    return this.first()[0];
                }
                return null;
            },

            childNodes: function () {
                var
                    childNodes = $();

                this.select(function (node) {
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

                this.select(function (node, i) {
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

                this.select(function (node) {
                    if (node instanceof window.Element) {
                        cloned.push(node.cloneNode(copyChildren));
                    }
                });

                return cloned;
            },

            copy: function () {
                var
                    copy = $();

                Object.assign(copy, this);
                copy.length = $.Object.count(copy);

                return copy;
            },

            first: function () {
                return $(this[0]);
            },

            asArray: function () {
                return Array.from(this);
            },

            parent: function (query) {
                var
                    elements = $(),
                    parent;

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
                    this.select(function (element) {
                        parent = element.closest(query);
                        if ($(parent).some()) {
                            elements.push(parent);
                        }
                    });
                } else {
                    this.select(function (element) {
                        elements.push(element.parentNode);
                    });
                }

                return elements;
            },

            sort: function (order) {
                if (order !== "desc") {order = "asc";}
            // sort: function (order = "asc") {
                var
                    concatened = $(),
                    asArray = [],
                    mainReference = this;

                order = order.toLowerCase();
                asArray = mainReference.textContentsAsArray();

                if (order == "desc") {
                    asArray = asArray.desc();
                } else {
                    asArray = asArray.asc();
                }

                asArray.forEach(function (text) {
                    concatened.concat(true, mainReference
                        .filterText(text));
                });

                return concatened;
            },

            asString: function () {
                var
                    string = "";

                this.select(function (node) {
                    if (node instanceof window.Element) {
                        string += node.outerHTML + "\n";
                    } else if (node instanceof window.Text) {
                        string += node.wholeText + "\n";
                    }
                });

                return string;
            },

            filterText: function (text) {
                return this.selectInBreadth(function (node) {
                    return $(node).text().trim() == text.trim();
                });
            },

            findHasNotAttr: function (query, attr) {
                return this.find(query + ":not([" + attr + "])");
            },

            findByAttr: function (query, attr, value) {
                return this.find(query + "[" + attr + "=\"" + value + "\"]");
            },

            textContentsAsArray: function () {
                var
                    array = [];

                this.select(function (node) {
                    array.push($(node).text().trim());
                });

                return array;
            }

        }

    });

}(esPhinx));
