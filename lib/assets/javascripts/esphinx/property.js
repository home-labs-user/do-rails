var
    esPhinx;


(function($) {
    "use strict";

    // $.prototype.extend(false, {
    $.prototype.extend({

        value: function(value) {
            if (value || value === "") {
                this.property("value", value);
                return this;
            } else {
                value = this.property("value");
                if (value) {
                    return value;
                }
            }

            return "";
        },

        data: function(attrName, value) {
            return this.attribute("data-" + attrName, value);
        },

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

        checked: function() {
            return this.property("checked");
        },

        selected: function() {
            return this.property("selected");
        },

        visible: function() {
            var
                visible = true,
                asIterable,
                i,
                element,
                iterator,
                self = this;

            if (self.some()) {
                asIterable = self.asArray();
                iterator = Iterable.Proxy.new(asIterable);
                iterator.each(function(element) {
                    element = $(element);
                    if (element.css("display") == "none" ||
                        element.css("visibility") == "hidden" ||
                        element.css("opacity") === 0) {
                        visible = false;
                    } else {
                        visible = true;
                        iterator.finalize();
                    }
                });
            }

            return visible;
        },

        parent: function(query) {
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
                this.each(function(element) {
                    parent = element.closest(query);
                    if ($(parent).some()) {
                        elements.push(parent);
                    }
                });
            } else {
                this.each(function(element) {
                    elements.push(element.parentNode);
                });
            }

            return elements;
        },

        lastIndex: function() {
            return this.count() - 1;
        },

        childNodes: function() {
            var
                childNodes = $();

            this.each(function(node) {
                childNodes.concat(true, node.childNodes);
            });

            return childNodes;
        },

        childElements: function(comparator) {
            var
                children = $(),
                node,
                comparators;

            if (this.some()) {
                node = this.asNode();

                if (comparator) {
                    comparators = $(comparator);

                    $(node.children).each(function(element) {
                        element = $(element);
                        comparators.each(function(comparator) {
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

        previousSiblings: function() {
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

        nextSiblings: function() {
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

        width: function(value) {
            if (this.asNode() == window.document) {
                return this.asNode().documentElement.offsetWidth;
            }

            var
                width = this.css("width"),
                padding = this.css("padding-left") +
                this.css("padding-right"),
                border = this.css("border-left-width") +
                this.css("border-right-width");

            if (value || value === 0) {
                this.each(function(node) {
                    node = $(node);
                    if (Number.isNaN(parseFloat(value))) {
                        node.css("width", value);
                    } else {
                        padding = node.css("padding-left") +
                          node.css("padding-right");
                        border = node.css("border-left-width") +
                          node.css("border-right-width");
                        value  = parseFloat(value) - (padding + border);
                        if (value < 0) {
                            value = 0;
                        }
                        node.css("width", value + "px");
                    }
                });
            } else {
                if (Number.isNaN(parseFloat(width))) {
                    return this.asNode().offsetWidth;
                }
                return width + padding + border;
            }
        },

        height: function(value) {
            if (this.asNode() == window.document) {
                return this.asNode().documentElement.offsetHeight;
            }

            var
                height = this.css("height"),
                padding = this.css("padding-top") +
                this.css("padding-bottom"),
                border = this.css("border-top-width") +
                this.css("border-bottom-width");

            if (value || value === 0) {
                this.each(function(node) {
                    node = $(node);
                    if (Number.isNaN(parseFloat(value))) {
                        node.css("height", value);
                    } else {
                        padding = node.css("padding-top") +
                          node.css("padding-bottom");
                        border = node.css("border-top-width") +
                          node.css("border-bottom-width");
                        value  = parseFloat(value) - (padding + border);
                        if (value < 0) {
                            value = 0;
                        }
                        node.css("height", value + "px");
                    }
                });
            } else {
                if (Number.isNaN(parseFloat(height))) {
                    return this.asNode().offsetHeight;
                }
                return height + padding + border;
            }
        },

        minWidth: function() {
            var
                padding = this.css("padding-left") +
                this.css("padding-right");

            return this.innerWidth() - padding;
        },

        innerWidth: function() {
            var
                border = this.css("border-left-width") +
                this.css("border-right-width");

            return this.width() - border;
        },

        minHeight: function() {
            var
                padding = this.css("padding-top") +
                this.css("padding-bottom");

            return this.innerHeight() - padding;
        },

        innerHeight: function() {
            var
                border = this.css("border-top-width") +
                this.css("border-bottom-width");

            return this.height() - border;
        },

        transitionDuration: function() {
            return this.css("transition-duration") * 1000;
        }

        // params: function () {
        //     var
        //         resolvedParams = {},
        //         // numbersOnlyPattern = /^[0-9]+(?!.)/,
        //         trailPattern = /^[^[]+|[^[]+(?=\])/g,
        //         // trailWithoutIndexPattern = /^[^[]+|(?![0-9])[^[]+(?=\])/g,
        //         count,
        //         trail,
        //         trailWithoutIndex,
        //         //objectName,
        //         //nestedObjectName,
        //         index,
        //         name,
        //         param,
        //         key,
        //         //merged,
        //         attr,
        //         nested_attr,
        //         attributeName,

        //         resolveParam = function (name, value) {
        //             value = value || "";

        //             var
        //                 structure = name,
        //                 parsed;

        //             index = structure.split(/\[([0-9]+)/)[1];

        //             structure = "{\"" + structure;
        //             // object[nested_object][0-9+][indexed_attr_collection_type][]
        //             if (/.+\[.+\]\[[0-9]+\]\[.+\]\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/(\]\[(?=.)(?!\]))|(\[(?!\]))/g,
        //                     "\":{\"").replace(/(\]\[\])$/, "\":[\"" + value +
        //                                       "\"]}}}}");
        //             // obj[nested_object][][attr_collection_type][]
        //             } else if (/.+\[.+\]\[\]\[.+\]\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\]\[\]\[/, "\":[{\"")
        //                     .replace(/\[(?![\{\]])/, "\":{\"")
        //                     .replace(/\]\[\]/, "\":[\"" + value +
        //                              "\"]}]}}");
        //             // below the two more used
        //             // obj[nested_object][0-9+][indexed_attr]
        //             } else if (/.+\[.+\]\[[0-9]+\]\[.+\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\]\[(?=.)(?!\])|\[(?!\])/g, "\":{\"")
        //                     .replace(/\]$/, "\":\"" + value + "\"}}}}");
        //             // obj[nested_object][][attr]
        //             } else if (/.+\[.+\]\[\]\[.+\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\]\[\]\[/, "\":[{\"")
        //                     .replace(/\[(?![\{])/g, "\":{\"")
        //                     .replace(/\]$/g, "\":\"" + value + "\"}]}}");
        //             // indexed_attr_collection_type[0-9+][]
        //             } else if (/.+\[[0-9]+\]\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/(\]\[(?=.)(?!\]))|(\[(?!\]))/g,
        //                     "\":{\"").replace(/\]\[\]/, "\":[\"" + value +
        //                                       "\"]}}");
        //             // obj[attr_collection_type][]
        //             } else if (/.+\[.+\]\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\]\[/, "\":[\"")
        //                     .replace(/\[(?!\")/g, "\":{\"")
        //                     .replace(/\]$/g, value + "\"]}}");
        //             // obj[attr]
        //             } else if (/.+\[.+\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\[/, "\":{\"")
        //                     .replace(/\]$/, "\":\"" + value + "\"}}");
        //             // attr_collection_type[]
        //             } else if (/.+\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\[\]/, "\":[\"" + value + "\"]}");
        //             // attr
        //             } else {
        //                 structure += "\":\"" + value + "\"}";
        //             }

        //             parsed = JSON.parse(structure);
        //             if (parsed) {
        //                 return parsed;
        //             }
        //             return false;
        //         };

        //     // debugger

        //     // to adapt to:
        //     // obj[nested_attr][0-9+][indexed_attr_collection_type][]
        //     // obj[nested_attr][][attr_collection_type][]
        //     // obj[attr_collection_type][]
        //     // attr_collection_type[]
        //     this.each(function (form) {
        //         if (form instanceof HTMLFormElement) {
        //             $.each(form.elements, function (e, i) {
        //                 name = e.name;
        //                 if (name) {

        //                     count = name.match(trailPattern).length;

        //                     if (trailWithoutIndex.length === 1) {
        //                         attributeName = trail.first();
        //                     }

        //                     param = resolveParam(e.name, e.value);
        //                     if (param) {
        //                         key = Object.keys(param)[0];
        //                         if (resolvedParams[key]) {
        //                             // talvez seja interessante iterar usando Iterator.each e ir verificando o tipo de objeto que está sendo retornado pelo iterador
        //                             attr = Object.keys(param[key])[0];
        //                             if (resolvedParams[key][attr] instanceof
        //                                 Array) {

        //                                 index = Object
        //                                     .keys(resolvedParams[key][attr])
        //                                         .last();

        //                                 nested_attr = Object
        //                                     .keys(param[key][attr][0])[0];

        //                                 if (resolvedParams[key][attr][index][nested_attr]) {
        //                                     param[key][attr] = resolvedParams[key][attr]
        //                                         .concat(param[key][attr]);
        //                                 } else {
        //                                     resolvedParams[key][attr][index] = Object.merge(resolvedParams[key][attr][index], param[key][attr][0]);
        //                                     param[key][attr] = resolvedParams[key][attr];
        //                                 }
        //                             } else if (resolvedParams[key]
        //                                        [attr] instanceof Object) {
        //                                 param[key][attr][index] = $.Object.merge(resolvedParams[key][attr][index], param[key][attr][index]);
        //                                 param[key][attr] = $.Object.merge(resolvedParams[key][attr], param[key][attr]);
        //                             }
        //                             param[key] = Object
        //                                 .merge(resolvedParams[key], param[key]);
        //                         }
        //                         resolvedParams = $.Object.merge(resolvedParams, param);
        //                     }
        //                 }
        //             });
        //         }
        //     });

        //     return resolvedParams;
        // }

    });

}(esPhinx));
