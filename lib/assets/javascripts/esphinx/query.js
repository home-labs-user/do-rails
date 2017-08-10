var
    esPhinx,
    Collection;


(function($) {
    "use strict";

    $.prototype.extend({

        each: function(callback) {
            $($.each(this, callback));
        },

        selectEach: function(callback) {
            // delegate
            return $($.select(this, callback));
        },

        selectInBreadth: function(callback) {
            return $($.selectInBreadth(this, callback));
        },

        filterText: function(text) {
            return this.selectInBreadth(function(node) {
                return $(node).text().trim() == text.trim();
            });
        },

        asArray: function() {
            return Array.from(this);
        },

        includes: function(nodes) {
            var
                item,
                self = this,
                items = Array.from(arguments).uniq(),
                count = 0,

                iteratorBlock = function(node) {
                    if (node.isEqualNode(item)) {
                        count++;
                    }
                },

                itemsIteratorBlock = function(i) {
                    item = i;
                    self.each(iteratorBlock);
                };

            items.forEach(itemsIteratorBlock);

            return count >= items.length;
        },

        sort: function(compareFunction) {
            return $($.Collection.new(this).sort(compareFunction));
        },

        orderTextNodeByAsc: function() {
            return this.sort(function(node1, node2) {
                return $(node1).text() > $(node2).text();
            });
        },

        orderTextNodeByDesc: function() {
            return this.sort(function(node1, node2) {
                return $(node1).text() < $(node2).text();
            });
        },

        push: function() {
            var
                index,
                mainReference = this,

                iteratorBlock = function(node) {
                    index = mainReference.lastIndex() + 1;
                    mainReference[index] = node;
                };

            Array.from(arguments).forEach(iteratorBlock);

            this.length = Object.count(this);

            return this;
        },

        concat: function(replace) {
            var
                concatened,
                args = Array.from(arguments),

                collectionIteratorBlock = function(node) {
                    concatened.push(node);
                },

                iteratorBlock = function(collection) {
                    collection = Array.from(collection);
                    collection.forEach(collectionIteratorBlock);
                };

            if (typeof replace == "boolean" && replace) {
                concatened = this;
                args = args.slice(1, args.length);
            } else {
                concatened = this.copy();
            }

            args.forEach(iteratorBlock);

            return concatened;
        },

        elements: function() {
            var
                elements = $(),

                iteratorBlock = function(node) {
                    if ($(node).isA(window.Element)) {
                        elements.push(node);
                    }
                };

            this.each(iteratorBlock);

            return elements;
        },

        some: function() {
            return this.length;
        },

        firstNode: function() {
            var
                childNodes,
                firstNodes = $(),

                iteratorBlock = function(node) {
                    childNodes = $(node).childNodes();
                    if (childNodes.some()) {
                        firstNodes.push(childNodes.asNode());
                    }
                };

            this.each(iteratorBlock);

            return firstNodes;
        },

        firstElement: function() {
            var
                childElements,
                firstElements = $(),

                iteratorBlock = function(node) {
                    childElements = $(node).childElements();
                    if (childElements.some()) {
                        firstElements.push(childElements.asNode());
                    }
                };

            this.each(iteratorBlock);

            return firstElements;
        },

        previous: function(filter) {
            var
                query,
                sibling,
                siblings = $(),

                siblingsIteratorBlock = function() {
                    return this.is(query);
                },

                iteratorBlock = function(node) {
                    sibling = node.previousElementSibling;
                    if (sibling && sibling instanceof window.Node) {
                        siblings.push(sibling);
                    }
                };

            if (filter) {
                query = this.parent().find(filter);

                if (query.some()) {
                    siblings = this.previousSiblings()
                        .filter(siblingsIteratorBlock);
                }
            } else {
                this.each(iteratorBlock);
            }

            return siblings;
        },

        next: function(filter) {
            var
                query,
                sibling,
                siblings = $(),

                iteratorBlock = function() {
                    return this.is(query);
                };

            if (filter) {
                query = this.parent().find(filter);

                if (query.some()) {
                    siblings = this.nextSiblings().filter(iteratorBlock);
                }
            } else {
                this.each(function(node) {
                    sibling = node.nextSibling;
                    if (sibling && sibling instanceof window.Node) {
                        siblings.push(sibling);
                    }
                });
            }

            return siblings;
        },

        asNode: function() {
            if (this.some()) {
                return this.first()[0];
            }
            return null;
        },

        count: function() {
            return this.length;
        },

        find: function(query) {
            return $(query, this);
        },

        filter: function(callback) {
            var
                filtered = $();

            this.each(function(node, i) {
                if (callback.call($(node), node, i, this)) {
                    filtered.push(node);
                }
            });

            return filtered;
        },

        filterInBreadth: function(callback) {
            var
                filtered = $();

            this.selectInBreadth(function(node, i) {
                if (callback.call($(node), node, i, this)) {
                    filtered.push(node);
                }
            });

            return filtered;
        },

        clone: function(copyChildren) {
            if (typeof copyChildren != "boolean")  { copyChildren = false; }
            var
                cloned = $();

            this.each(function(node) {
                if (node instanceof window.Element) {
                    cloned.push(node.cloneNode(copyChildren));
                }
            });

            return cloned;
        },

        copy: function() {
            var
                copy = $();

            Object.assign(copy, this);
            copy.length = Object.count(copy);

            return copy;
        },

        first: function() {
            return $(this[0]);
        },

        last: function() {
            return $(this[this.lastIndex()]);
        },

        asString: function() {
            var
                string = "";

            this.each(function(node) {
                if (node instanceof window.Element) {
                    string += node.outerHTML + "\n";
                } else if (node instanceof window.Text) {
                    string += node.wholeText + "\n";
                }
            });

            return string;
        },

        findHasNotAttr: function(query, attr) {
            return this.find(query + ":not([" + attr + "])");
        },

        findByAttr: function(query, attr, value) {
            return this.find(query + "[" + attr + "=\"" + value + "\"]");
        },

        textContentsAsArray: function() {
            var
                array = [];

            this.each(function(node) {
                array.push($(node).text().trim());
            });

            return array;
        },

        item: function(index) {
            return $(this[index]);
        }

    });

}(esPhinx));
