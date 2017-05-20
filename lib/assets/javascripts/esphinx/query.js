var
    esPhinx,
    Collections;


(function ($) {
    "use strict";

    $.prototype.extend({

        each: function (callback) {
            $($.each(this, callback));
        },

        selectEach: function (callback) {
            // delegate
            return $($.select(this, callback));
        },

        selectInBreadth: function (callback) {
            return $($.selectInBreadth(this, callback));
        },

        filterText: function (text) {
            return this.selectInBreadth(function (node) {
                return $(node).text().trim() == text.trim();
            });
        },

        asArray: function() {
            return Array.from(this);
        },

        includes: function(nodes) {
            var
                items = Array.from(arguments).uniq(),
                mainReference = this,
                count = 0;

            items.forEach(function(item) {
                mainReference.each(function(node) {
                    if (node.isEqualNode(item)) {
                        count++;
                    }
                });
            });

            return count >= items.length;
        },

        sort: function(compareFunction) {
            return $(Collection.new(this).sort(compareFunction));
        },

        ascendingSortTextNode: function () {
            return this.sort(function(node1, node2) {
                return $(node1).text() > $(node2).text();
            });
        },

        descendingSortTextNode: function () {
            return this.sort(function(node1, node2) {
                return $(node1).text() < $(node2).text();
            });
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

            this.length = Object.count(this);

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

            this.each(function (node) {
                if ($(node).instanceOf(window.Element)) {
                    elements.push(node);
                }
            });

            return elements;
        },

        some: function () {
            return this.length;
        },

        firstNode: function () {
            var
                firstNodes = $(),
                childNodes;

            this.each(function (node) {
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

        firstElement: function () {
            var
                firstElements = $(),
                childElements;

            this.each(function (node) {
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
                this.each(function (node) {
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
                this.each(function (node) {
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

        filterInBreadth: function (callback) {
            var
                filtered = $();

            this.selectInBreadth(function (node, i) {
                if (callback.call($(node), node, i, this)) {
                    filtered.push(node);
                }
            });

            return filtered;
        },

        clone: function (copyChildren) {
            if (typeof copyChildren != "boolean")  { copyChildren = false; }
            var
                cloned = $();

            this.each(function (node) {
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
            copy.length = Object.count(copy);

            return copy;
        },

        first: function () {
            return $(this[0]);
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
                this.each(function (element) {
                    parent = element.closest(query);
                    if ($(parent).some()) {
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

        asString: function () {
            var
                string = "";

            this.each(function (node) {
                if (node instanceof window.Element) {
                    string += node.outerHTML + "\n";
                } else if (node instanceof window.Text) {
                    string += node.wholeText + "\n";
                }
            });

            return string;
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

            this.each(function (node) {
                array.push($(node).text().trim());
            });

            return array;
        }

    });

}(esPhinx));
