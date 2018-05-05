var
    esPhinx;


(function ($) {
    "use strict";

    $.prototype.extend({

        asArray: function () {
            return Array.from(this);
        },

        asNode: function () {
            if (this.some()) {
                return this.first()[0];
            }
            return null;
        },

        textContentsAsArray: function () {
            var
                array = [],

                callback = function (node) {
                    array.push($(node).text().trim());
                };

            this.each(callback);

            return array;
        },

        asString: function () {
            var
                string = "",

                callback = function (node) {
                    if (node instanceof window.Element) {
                        string += node.outerHTML + "\n";
                    } else if (node instanceof window.Text) {
                        string += node.wholeText + "\n";
                    }
                };

            this.each(callback);

            return string;
        },

        empty: function () {
            return this.length === 0;
        },

        some: function () {
            return !this.empty();
        },

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

        filter: function (callback) {
            var
                self = this,
                filtered = $(),

                iteratorBlock = function (node, i) {
                    // if (callback.call($(node), node, i, this)) {
                    if (callback.call(self, node, i)) {
                        filtered.push(node);
                    }
                };

            this.each(iteratorBlock);

            return filtered;
        },

        filterInBreadth: function (callback) {
            var
                filtered = $(),

                iteratorBlock = function (node, i) {
                    if (callback.call($(node), node, i, this)) {
                        filtered.push(node);
                    }
                };

            this.selectInBreadth(iteratorBlock);

            return filtered;
        },

        filterText: function (text) {
            var
                callback = function (node) {
                    return $(node).text().trim() == text.trim();
                };

            return this.selectInBreadth(callback);
        },

        sort: function (compareFunction) {
            return $($.Collection.new(this).sort(compareFunction));
        },

        orderTextNodeByAsc: function () {
            var
                callback = function (node1, node2) {
                    return $(node1).text() > $(node2).text();
                };

            return this.sort(callback);
        },

        orderTextNodeByDesc: function () {
            var
                callback = function (node1, node2) {
                    return $(node1).text() < $(node2).text();
                };

            return this.sort(callback);
        },

        push: function () {
            var
                index,
                mainReference = this,

                callback = function (node) {
                    index = mainReference.lastIndex() + 1;
                    mainReference[index] = node;
                };

            Array.from(arguments).forEach(callback);

            this.length = Object.amount(this);

            return this;
        },

        concat: function (replace) {
            var
                concatened,
                args = Array.from(arguments),

                callback = function (collection) {
                    var
                        iteratorBlock = function (node) {
                            concatened.push(node);
                        };

                    collection = Array.from(collection);
                    collection.forEach(iteratorBlock);
                };

            if (typeof replace == "boolean" && replace) {
                concatened = this;
                args = args.slice(1, args.length);
            } else {
                concatened = this.copy();
            }

            args.forEach(callback);

            return concatened;
        },

        elements: function () {
            var
                elements = $(),

                callback = function (node) {
                    if ($(node).isA(window.Element)) {
                        elements.push(node);
                    }
                };

            this.each(callback);

            return elements;
        },

        firstNode: function () {
            var
                childNodes,
                firstNodes = $(),

                callback = function (node) {
                    childNodes = $(node).childNodes();
                    if (childNodes.some()) {
                        firstNodes.push(childNodes.asNode());
                    }
                };

            this.each(callback);

            return firstNodes;
        },

        firstElement: function () {
            var
                childElements,
                firstElements = $(),

                callback = function (node) {
                    childElements = $(node).childElements();
                    if (childElements.some()) {
                        firstElements.push(childElements.asNode());
                    }
                };

            this.each(callback);

            return firstElements;
        },

        previous: function (filter) {
            var
                query,
                sibling,
                siblings = $(),

                iteratorBlock = function (node) {
                    return $(node).is(query);
                },

                callback = function (node) {
                    sibling = node.previousElementSibling;
                    if (sibling && sibling instanceof window.Node) {
                        siblings.push(sibling);
                    }
                };

            if (filter) {
                query = this.parent().find(filter);

                if (query.some()) {
                    siblings = this.previousSiblings()
                        .filter(iteratorBlock);
                }
            } else {
                this.each(callback);
            }

            return siblings;
        },

        next: function (filter) {
            var
                query,
                sibling,
                siblings = $(),

                iteratorBlock = function (node) {
                    return $(node).is(query);
                },

                callback = function (node) {
                    sibling = node.nextSibling;
                    if (sibling && sibling instanceof window.Node) {
                        siblings.push(sibling);
                    }
                };

            if (filter) {
                query = this.parent().find(filter);

                if (query.some()) {
                    siblings = this.nextSiblings()
                        .filter(iteratorBlock);
                }
            } else {
                this.each(callback);
            }

            return siblings;
        },

        amount: function () {
            return this.length;
        },

        find: function (query) {
            return $(query, this);
        },

        clone: function (copyChildren) {
            if (typeof copyChildren != "boolean")  { copyChildren = true; }

            var
                cloned = $(),

                callback = function (node) {
                    cloned.push(node.cloneNode(copyChildren));
                };

            this.each(callback);

            return cloned;
        },

        copy: function () {
            var
                copy = $();

            Object.assign(copy, this);
            copy.length = Object.amount(copy);

            return copy;
        },

        first: function () {
            return $(this[0]);
        },

        last: function () {
            return $(this[this.lastIndex()]);
        },

        findHasNotAttr: function (query, attr) {
            return this.find(query + ":not([" + attr + "])");
        },

        findByAttr: function (query, attr, value) {
            return this.find(query + "[" + attr + "=\"" + value + "\"]");
        },

        item: function (index) {
            return $(this[index]);
        }

    });

}(esPhinx));
