var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    $.prototype.extend({

        // TODO
        // selectText: function(start = 0, end) {
        selectText: function(start, end) {
            if (isNaN(start)) {start = 0;}

            var
                mainReference = this,
                node = mainReference.asNode(),
                aux,
                text;

            // selectionStart and selectionEnd only exists for input elements
            if (node instanceof window.HTMLInputElement) {
                text = $(node).value();

                if (!start || start != "number") {
                    $.reverseEach(text, node.selectionStart,
                                  function(c, i) {
                        // debugger
                        if (c == " ") {
                            start = i;
                            this.finalize();
                        }
                    });
                }

                if (!end || typeof end != "number") {
                    $.reverseEach(text, node.selectionEnd,
                                  function(c, i) {
                        if (c == " ") {
                            end = i;
                            this.finalizeOnReverse();
                        }
                    });
                }

                if (end < start) {
                    aux = start;
                    start = end;
                    end = aux;
                }

                node.setSelectionRange(start, end);
                mainReference.focus();

                return mainReference;
            }

        },

        attribute: function(attrName, value) {
            var
                attr,
                node = this.asNode(),

                iteratorBlock = function(node) {
                    node.setAttribute(attrName, value);
                };

            if (this.length === 0) {
                return this;
            }

            if (typeof value == "boolean" || value || value === "") {
                this.each(iteratorBlock);

                return this;
            } else {
                attr = node.getAttribute(attrName);
                if (attr) {
                    return attr;
                }
            }

            return undefined;
        },

        property: function(propertyName, value) {
            var
                node = this.asNode(),

                iteratorBlock = function(node) {
                    node[propertyName] = value;
                };

            if (this.length === 0) {
                return this;
            }

            if (typeof value == "boolean" || value || value === "") {
                this.each(iteratorBlock);

                return this;
            } else {
                if (node[propertyName] ||
                    typeof node[propertyName] == "boolean") {
                    return node[propertyName];
                }
            }

            return undefined;
        },

        tagName: function() {
            if (this.some() && this.asNode() instanceof window.Element) {
                return this.property("tagName").toLowerCase();
            }

            return "";
        },

        focus: function() {
            this.asNode().focus();
            return this;
        },

        select: function() {
            return this.property("selected", true);
        },

        selected: function() {
            return this.property("selected");
        },

        unselect: function() {
            return this.property("selected", false);
        },

        removeClass: function(classList) {
            var
                currentClassList,
                pattern,
                removed,

                iteratorBlock = function(node) {
                    currentClassList = $(node).attribute("class");
                    removed = currentClassList.replace(pattern, "");
                    $(node).attribute("class", removed.replace(/(  )+/g, " ")
                        .trim());
                };

            if (arguments.length > 1) {
                classList = Array.from(arguments);
                pattern = new RegExp("\\b((" + classList
                    .join(")|(")  + "))(?=(\\b| ))", "g");
            } else {
                pattern = new RegExp("\\b((" + classList.split(" ")
                    .join(")|(") + "))(?=(\\b| ))", "g");
            }

            this.each(iteratorBlock);

            return this;
        },

        addClass: function(classList) {
            var
                currentClassList,
                asString,

                iteratorBlock = function(node) {
                    currentClassList = $(node).attribute("class") || "";
                    $(node).attribute("class", (currentClassList + " " +
                                                asString).trim());
                };

            if (arguments.length > 1) {
                classList = Array.from(arguments);
                asString = classList.join(" ");
            } else if (typeof classList == "string") {
                asString = classList;
            }

            this.each(iteratorBlock);

            return this;
        },

        check: function() {
            return this.property("checked", true);
        },

        checked: function() {
            return this.property("checked");
        },

        uncheck: function() {
            return this.property("checked", false);
        },

        visible: function() {
            var
                asIterable,
                iterator,
                visible = true,

                callback = function(element) {
                    element = $(element);
                    if (element.css("display") == "none" ||
                        element.css("visibility") == "hidden" ||
                        element.css("opacity") === 0) {
                        visible = false;
                    } else {
                        visible = true;
                        iterator.finalize();
                    }
                };

            if (this.some()) {
                asIterable = this.asArray();
                iterator = Iterable.Proxy.new(asIterable);
                iterator.each(callback);
            }

            return visible;
        },

        removeAttr: function(attrName) {
            var
                iteratorBlock = function(node) {
                    node.removeAttribute(attrName);
                };

            this.each(iteratorBlock);

            return this;
        },

        html: function(content) {
            var
                callback = function(element) {
                    element.innerHTML = content;
                };

            if (typeof content == "string") {
                this.elements().selectEach(callback);
            } else {
                this.clean();
                this.append(content);
            }

            return this;
        }

    });

}(esPhinx));
