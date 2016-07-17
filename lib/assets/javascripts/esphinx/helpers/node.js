"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            text: function (text) {
                var
                    self = this,
                    selectorsPattern = /(^[*.#])|(\[.+\])|(:.+)|(.+[+,~>].+)/g,
                    first;

                if (text) {
                    if (self.any()) {
                        self.each(function (node) {
                            first = esPhinx(node).childNodes().first()
                            if (first instanceof Text) {
                                first.textContent = text;
                            } else {
                                $(node).prepend(text);
                            }
                        });
                    } else {
                        self.push(document.createTextNode(text));
                    }
                } else {
                    if (self.childNodes().any()) {
                        first = self.childNodes().first();
                        if (first.constructor === Text) {
                            return first.textContent.trim();
                        }
                    } else {
                        return "";
                    }
                }

                return self;
            },

            is: function (comparedNode) {
                var
                    self = this;

                if (comparedNode.constructor === $
                    || comparedNode.constructor === Array
                    || comparedNode instanceof Node
                    || comparedNode.constructor === String) {
                    comparedNode = $(comparedNode);
                }

                if (self.any()) {
                    for (let node of self) {
                        if (comparedNode.any()) {
                            for (let compared of comparedNode) {
                                // debugger
                                // change to isSameNode (readed in FF 48)
                                if (node.isEqualNode(compared)) {
                                    return true;
                                }
                            }
                        }
                    }
                }

                return false;
            },

            visible: function () {
                var
                    self = this,
                    visible = true;

                if (self.any()) {
                    for (let node of self) {
                        node = $(node);
                        if (node.css("display") === "none"
                            || node.css("visibility") === "hidden"
                            || node.css("opacity") === 0) {
                            visible = false;
                        } else {
                            return true;
                        }
                    }
                }

                return visible;
            },

            tagName: function () {
                var
                    self = this;

                if (self.any()) {
                    return self.property("tagName");
                }

                return "";
            },

            hasClass: function (classList) {
                var
                    self = this,
                    node = $(self.asNode()),
                    pattern;

                if (arguments.length > 1) {
                    classList = Array.from(arguments);
                    pattern = new RegExp("(?=.*(\\b" + classList
                        .join("(?=(\\b| ))))(?=.*(\\b")
                        + "(?=(\\b| )))).*", "g");
                } else {
                    pattern = new RegExp("(?=.*(\\b" + classList.split(" ")
                        .join("(?=(\\b| ))))(?=.*(\\b")
                        + "(?=(\\b| )))).*", "g");
                }

                if (pattern.test(node.attr("class"))) {
                    return true;
                }

                return false;
            },

            attr: function (attrName, value) {
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
            }

        }

    });

}(esPhinx));