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

        cursorStart: function() {
            var
                node = this.asNode();

            if (node instanceof window.HTMLInputElement) {
                return node.selectionStart;
            }
        },

        cursorEnd: function() {
            var
                node = this.asNode();

            if (node instanceof window.HTMLInputElement) {
                return node.selectionEnd;
            }
        },

        // <br>|<br\/>
        // text: function() {
        // },

        append: function(node) {
            var
                nodes;

            nodes = $(node);

            if (!nodes.some()) {
                nodes = esPhinx(window.document.createTextNode(node));
            }

            this.each(function(element) {
                nodes.each(function(node) {
                    element.appendChild(node);
                });
            });

            return this;
        },

        prepend: function(node) {
            var
                firstNode;

            node = $(node);
            if (!node.some()) {
                node = $(window.document.createTextNode(node));
            }

            this.each(function(element) {
                firstNode = $(element).firstNode();
                if (firstNode.some()) {
                    node.insertBefore(firstNode);
                } else {
                    $(element).append(node);
                }
            });

            return this;
        },

        text: function(text) {
            var
                first,
                childNodes;

            if (typeof text == "string") {
                if (this.some()) {
                    this.each(function(node) {
                        first = $(node).childNodes().asNode();
                        if (first instanceof window.Text) {
                            first.textContent = text;
                        } else {
                            $(node).prepend(window.document
                                            .createTextNode(text));
                        }
                    });
                }
                return this;
            } else {
                text = "";
                childNodes = this.childNodes();
                if (childNodes.some()) {
                    childNodes.each(function(node) {
                        if (node instanceof window.Text) {
                            text += $(node).textContent();
                        }
                    });

                    return text.trim();
                } else {
                    return "";
                }
            }
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

        insertAfter: function(node) {
            var
                nodes = $(node);

            this.each(function(nodeToInsert) {
                nodes.each(function(node) {
                    // element = $(element);
                    // sibling = element.next();
                    // debugger
                    // if (sibling.some()) {
                    //     $(node).insertBefore(sibling);
                    // } else {
                    //     element.parent().append(node);
                    // }
                    node.parentNode
                        .insertBefore(nodeToInsert, node.nextSibling);
                });
            });

            return this;
        },

        insertBefore: function(node) {
            var
                nodes = $(node);

            this.each(function(nodeToInsert) {
                nodes.each(function(node) {
                    node.parentNode.insertBefore(nodeToInsert, node);
                });
            });

            return this;
        },

        checked: function() {
            return this.property("checked");
        },

        selected: function() {
            return this.property("selected");
        },

        instanceOf: function(constructor) {
            return this.asNode() instanceof constructor;
        },

        // remove: function(object, delay = 0) {
        remove: function(object, delay) {
            if (typeof delay != "number") {delay = 0;}

            var
                self = this;

            if (typeof object == "number") {
                delay = object;
                object = undefined;
            }

            if (object) {
                $(object).remove(delay);
            } else {
                if (delay) {
                    window.setTimeout(function() {
                        self.each(function(node) {
                            node.parentElement.removeChild(node);
                        });
                    }, delay);
                } else {
                    self.each(function(node) {
                        node.parentElement.removeChild(node);
                    });
                }
            }

            return this;
        },

        clean: function() {
            this.each(function(node) {
                node.innerHTML = null;
            });

            return this;
        },

        hasClass: function(classList) {
            var
                node = $(this.asNode()),
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

            return pattern.test(node.attribute("class"));
        },

        visible: function() {
            var
                visible = true,
                asIterable,
                i,
                node,
                iterator,
                self = this;

            if (self.some()) {
                asIterable = self.asArray();
                iterator = Iterable.Proxy.new(asIterable);
                iterator.each(function(node) {
                    node = $(node);
                    if (node.css("display") == "none" ||
                        node.css("visibility") == "hidden" ||
                        node.css("opacity") === 0) {
                        visible = false;
                    } else {
                        visible = true;
                        iterator.finalize();
                    }
                });
            }

            return visible;
        },

        is: function(comparedNode) {
            var
                asIterable, comparedAsIterable, i, ii, node, compared,
                asIterableIterator, comparedAsIterableIterator,
                response = false,
                self = this;

            if (Object.getPrototypeOf(comparedNode) ==
                Object.getPrototypeOf(self) ||
                typeof comparedNode == "string" ||
                comparedNode instanceof window.Node ||
                comparedNode instanceof Array) {
                comparedNode = $(comparedNode);
            }

            if (self.some()) {
                asIterable = self.asArray();

                asIterableIterator = Iterable.Proxy.new(asIterable);
                asIterableIterator.each(function(node) {
                    if (comparedNode.some()) {
                        comparedAsIterable = Array.from(comparedNode);
                        comparedAsIterableIterator = Iterable.Proxy
                            .new(comparedAsIterable);
                        comparedAsIterableIterator.each(function(compared) {
                            if (node.isEqualNode(compared)) {
                                response = true;
                                this.finalize();
                                asIterableIterator.finalize();
                            }
                        });
                    }
                });
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
                while(true) {
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
