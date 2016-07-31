"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            attribute: function (attrName, value) {
                var
                    self = this,
                    node = self.asNode(),
                    attr;


                if (self.length === 0) {
                    return self;
                }

                if (typeof value === "boolean" || value || value === "") {
                    self.each(function (node) {
                        node.setAttribute(attrName, value);
                    });

                    return self;
                } else {
                    if (attr = node.getAttribute(attrName)) {
                        return attr;
                    }
                }

                return undefined;
            },

            property: function (propertyName, value) {
                var
                    self = this,
                    node = self.asNode();

                if (self.length === 0) {
                    return self;
                }

                if (typeof value === "boolean" || value || value === "") {
                    self.each(function (node) {
                        node[propertyName] = value;
                    });

                    return self;
                } else {
                    if (node[propertyName] ||
                        typeof node[propertyName] === "boolean") {
                        return node[propertyName];
                    }
                }

                return undefined;
            },

            tagName: function () {
                var
                    self = this;

                if (self.any() && self.asNode() instanceof Element) {
                    return self.property("tagName").toLowerCase();
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
                    self = this,
                    collection;

                if (typeof node === "string") {
                    if (!/^(?:<)(.+)/.test(node)) {
                        node = $().text(node);
                    }
                }

                collection = $(node);

                self.each(function (element) {
                    collection.each(function (node) {
                        element.appendChild(node);
                    });
                });

                return self;
            },

            prepend: function(node) {
                var
                    self = this,
                    firstNode;

                self.each(function (element) {
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

                return self;
            },

            select: function () {
                return this.property("selected", true);
            },

            unselect: function () {
                return this.property("selected", false);
            },

            removeClass: function (classList) {
                var
                    self = this,
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

                self.each(function (node) {
                    currentClassList = $(node).attribute("class");
                    removed = currentClassList.replace(pattern, "");
                    $(node).attribute("class", removed.replace(/(  )+/g, " ")
                        .trim());
                });

                return self;
            },

            addClass: function (classList) {
                var
                    self = this,
                    currentClassList,
                    asString;

                if (arguments.length > 1) {
                    classList = Array.from(arguments);
                    asString = classList.join(" ");
                } else if (typeof classList === "string") {
                    asString = classList;
                }

                self.each(function (node) {
                    currentClassList = $(node).attribute("class") || "";
                    $(node).attribute("class", (currentClassList + " "
                        + asString).trim());
                });

                return self;
            },

            check: function () {
                return self.property("checked", true);
            },

            uncheck: function () {
                var
                    self = this;

                return self.property("checked", false);
            },

            removeAttr: function (attrName) {
                var
                    self = this;

                self.each(function (node) {
                    node.removeAttribute(attrName);
                });

                return self;
            },

            insertAfter: function(element) {
                var
                    self = this,
                    collection = $(element),
                    sibling;

                self.each(function (node) {
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

                return self;
            },

            insertBefore: function(node) {
                var
                    self = this,
                    collection = $(node);

                self.each(function (element) {
                    collection.each(function (node) {
                        node.parentNode.insertBefore(element, node);
                    });
                });

                return self;
            },

            html: function (content) {
                var
                    self = this,
                    collection;

                self.deflate();
                self.append(content);

                return self;
            }

        }

    });

}(esPhinx));
