"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            attribute: function (attrName, value) {
                var
                    node = this.asNode(),
                    attr;


                if (this.length === 0) {
                    return this;
                }

                if (typeof value === "boolean" || value || value === "") {
                    this.each(function (node) {
                        node.setAttribute(attrName, value);
                    });

                    return this;
                } else {
                    if (attr = node.getAttribute(attrName)) {
                        return attr;
                    }
                }

                return undefined;
            },

            property: function (propertyName, value) {
                var
                    node = this.asNode();

                if (this.length === 0) {
                    return this;
                }

                if (typeof value === "boolean" || value || value === "") {
                    this.each(function (node) {
                        node[propertyName] = value;
                    });

                    return this;
                } else {
                    if (node[propertyName] ||
                        typeof node[propertyName] === "boolean") {
                        return node[propertyName];
                    }
                }

                return undefined;
            },

            tagName: function () {
                if (this.any() && this.asNode() instanceof Element) {
                    return this.property("tagName").toLowerCase();
                }

                return "";
            },

            instanceOf: function (constructor) {
                if (this.asNode() instanceof constructor) {
                    return true;
                }

                return false;
            },

            append: function(node) {
                var
                    collection;

                if (typeof node === "string") {
                    if (!/^(?:<)(.+)/.test(node)) {
                        node = $().text(node);
                    }
                }

                collection = $(node);

                this.each(function (element) {
                    collection.each(function (node) {
                        element.appendChild(node);
                    });
                });

                return this;
            },

            prepend: function(node) {
                var
                    firstNode;

                this.each(function (element) {
                    firstNode = $(element).firstNode();
                    if (firstNode.any()) {
                        if (typeof node === "string") {
                            $(document.createTextNode(node))
                                .insertBefore(firstNode);
                        } else {
                            $(node).insertBefore(firstNode);
                        }
                    } else {
                        $(element).append(node);
                    }
                });

                return this;
            },

            select: function () {
                return this.property("selected", true);
            },

            unselect: function () {
                return this.property("selected", false);
            },

            removeClass: function (classList) {
                var
                    currentClassList,
                    pattern,
                    removed;

                if (arguments.length > 1) {
                    classList = Array.from(arguments);
                    pattern = new RegExp("\\b((" + classList
                        .join(")|(")  + "))(?=(\\b| ))", "g");
                } else {
                    pattern = new RegExp("\\b((" + classList.split(" ")
                        .join(")|(") + "))(?=(\\b| ))", "g");
                }

                this.each(function (node) {
                    currentClassList = $(node).attribute("class");
                    removed = currentClassList.replace(pattern, "");
                    $(node).attribute("class", removed.replace(/(  )+/g, " ")
                        .trim());
                });

                return this;
            },

            addClass: function (classList) {
                var
                    currentClassList,
                    asString;

                if (arguments.length > 1) {
                    classList = Array.from(arguments);
                    asString = classList.join(" ");
                } else if (typeof classList === "string") {
                    asString = classList;
                }

                this.each(function (node) {
                    currentClassList = $(node).attribute("class") || "";
                    $(node).attribute("class", (currentClassList + " "
                        + asString).trim());
                });

                return this;
            },

            check: function () {
                return this.property("checked", true);
            },

            uncheck: function () {
                return this.property("checked", false);
            },

            removeAttr: function (attrName) {
                this.each(function (node) {
                    node.removeAttribute(attrName);
                });

                return this;
            },

            insertAfter: function(element) {
                var
                    collection = $(element),
                    sibling;

                this.each(function (node) {
                    collection.each(function (element) {

                        // element = $(element);
                        // sibling = element.next();
                        // debugger
                        // if (sibling.any()) {
                        //     $(node).insertBefore(sibling);
                        // } else {
                        //     element.parent().append(node);
                        // }

                        element.parentNode
                            .insertBefore(node, element.nextSibling);
                    });
                });

                return this;
            },

            insertBefore: function(node) {
                var
                    collection = $(node);

                this.each(function (element) {
                    collection.each(function (node) {
                        node.parentNode.insertBefore(element, node);
                    });
                });

                return this;
            },

            html: function (content) {
                var
                    collection;

                this.deflate();
                this.append(content);

                return this;
            }

        }

    });

}(esPhinx));
