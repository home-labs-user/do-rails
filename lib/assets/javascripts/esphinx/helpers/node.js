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
                    self = this,
                    first = self.first();

                comparedNode = $(comparedNode).first();

                if (first) {
                    if (first.isEqualNode(comparedNode)) {
                        return true;
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
                    first = $(self.first()),
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

                if (pattern.test(first.attr("class"))) {
                    return true;
                }

                return false;
            },

            attr: function (attrName, value) {
                var
                    self = this,
                    first = self.first(),
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
                    if (attr = first.getAttribute(attrName)) {
                        return attr;
                    }
                }

                return undefined;
            },

            property: function (propertyName, value) {
                var
                    self = this,
                    first = self.first();

                if (self.length === 0) {
                    return self;
                }

                if (typeof value === "boolean" || value || value === "") {
                    self.each(function (node) {
                        node[propertyName] = value;
                    });

                    return self;
                } else {
                    if (first[propertyName] ||
                        typeof first[propertyName] === "boolean") {
                        return first[propertyName];
                    }
                }

                return undefined;
            }

        }

    });

}(esPhinx));