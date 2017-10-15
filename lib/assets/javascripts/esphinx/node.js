var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    $.extend({
        text: function(text) {
            return $(window.document.createTextNode(text));
        }
    });

    $.prototype.extend({

        // <br>|<br\/>
        // text: function() {
        // },

        insertAfter: function(element) {
            var
                elements = $(element),

                callback = function(element2Insert) {
                    var
                        iteratorBlock = function(element) {
                            // element = $(element);
                            // sibling = element.next();
                            // debugger
                            // if (sibling.some()) {
                            //     $(element).insertBefore(sibling);
                            // } else {
                            //     element.parent().append(element);
                            // }
                            element.parentNode.insertBefore(element2Insert,
                                                            element.nextSibling);
                        };

                    elements.each(iteratorBlock);
                };

            this.each(callback);

            return this;
        },

        insertBefore: function(element) {
            var
                elements = $(element),

                callback = function(element2Insert) {
                    var
                        iteratorBlock = function(element) {
                            element.parentNode.insertBefore(element2Insert, element);
                        };

                    elements.each(iteratorBlock);
                };

            this.each(callback);

            return this;
        },

        append: function(node) {
            var
                nodes,

                callback = function(element) {
                    var
                        iteratorBlock = function(node) {
                            element.appendChild(node);
                        };

                    nodes.each(iteratorBlock);
                };

            nodes = $(node);
            if (nodes.empty()) {
                nodes = $(window.document.createTextNode(node));
            }

            this.each(callback);

            return this;
        },

        prepend: function(node) {
            var
                firstNode,

                callback = function(element) {
                    firstNode = $(element).firstNode();
                    if (firstNode.some()) {
                        node.insertBefore(firstNode);
                    } else {
                        $(element).append(node);
                    }
                };

            node = $(node);
            if (node.empty()) {
                node = $(window.document.createTextNode(node));
            }

            this.each(callback);

            return this;
        },

        textContent: function() {
            var
                tagName = this.tagName(),
                node = this.asNode();

            if (tagName != "pre") {
                return node.textContent.replace(/\n[ \t]*/g, "")
                    .replace(/(\n){2,}/g, "");
            }

            return node.textContent;
        },

        // "extends?" would make more sense in the relationship between classes
        isA: function(constructor) {
            return this.asNode() instanceof constructor;
        },

        // remove: function(object, delay = 0) {
        remove: function(object, delay) {
            if (typeof delay != "number") {delay = 0;}

            var
                self = this,

                remove = function(element) {
                    element.remove();
                },

                resolveArguments = function() {
                    if (typeof object == "number") {
                        delay = object;
                        object = undefined;
                    } else if (typeof delay != "number") {
                        delay = 0;
                    }
                };

            resolveArguments();

            if (object) {
                // recursivity
                $(object).remove(delay);
            } else {
                if (delay) {
                    window.setTimeout(function() {
                        self.each(remove);
                    }, delay);
                } else {
                    self.each(remove);
                }
            }


            return self;
        },

        clean: function() {
            var
                callback = function(element) {
                    element.innerHTML = null;
                };

            this.each(callback);

            return this;
        },

        hasClass: function(classList) {
            var
                element = $(this.asNode()),
                pattern;

            if (arguments.length > 1) {
                classList = Array.from(arguments);
                pattern = new RegExp("(?=.*(\\b" + classList
                    .join("(?=(\\b| ))))(?=.*(\\b") +
                                     "(?=(\\b| )))).*", "g");
            } else {
                pattern = new RegExp("(?=.*(\\b" + classList.split(" ")
                    .join("(?=(\\b| ))))(?=.*(\\b") +
                                     "(?=(\\b| )))).*", "g");
            }

            return pattern.test(element.attribute("class"));
        },

        is: function(comparedNode) {
            var
                asIterable,
                comparedAsIterable,
                asIterableIterator,
                comparedAsIterableIterator,
                response = false,

                callback = function(node) {
                    var
                        iteratorBlock = function(compared) {
                            if (node.isEqualNode(compared)) {
                                response = true;
                                this.finalize();
                                asIterableIterator.finalize();
                            }
                        };

                    if (comparedNode.some()) {
                        comparedAsIterable = Array.from(comparedNode);
                        comparedAsIterableIterator = Iterable.Proxy
                            .new(comparedAsIterable);
                        comparedAsIterableIterator
                            .each(iteratorBlock);
                    }
                };

            if (Object.hasSameClass(comparedNode, this) ||
                typeof comparedNode == "string" ||
                comparedNode instanceof window.Node ||
                comparedNode instanceof Array) {
                comparedNode = $(comparedNode);
            }

            if (this.some()) {
                asIterable = this.asArray();

                asIterableIterator = Iterable.Proxy.new(asIterable);
                asIterableIterator.each(callback);
            }

            return response;
        }

    });

}(esPhinx));

/*$.prototype.ancestors = function(nodeName) {
    var _parents = []
        ,parent = null
    ;
    collection.forEach(function(e) {
        parent = e.parentNode;
        if (nodeName) {
            if (parent.nodeName.toLowerCase() == nodeName) {
                _parents.push(parent);
            } else {
                while (true) {
                    parent = parent.parentNode;
                    if(parent){
                        if(parent.nodeName.toLowerCase() == nodeName) {
                            _parents.push(parent);
                            break;
                        }
                    } else {
                        break;
                    }
                }
            }
        } else {
            if(parent){
                _parents.push(parent);
            }
        }
    });
    return _parents;
}*/
