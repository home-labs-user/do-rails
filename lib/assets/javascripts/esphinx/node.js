"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            // <br>|<br\/>
            // text: function () {
            // },

            tagName: function () {
                var
                    self = this;

                if (self.count()) {
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

            remove: function (node) {
                var
                    self = this;

                if (node) {
                    $(node).remove();
                } else {
                    self.each(function (node) {
                        // self.parent().first().removeChild(node);
                        self.parent().removeChild(node);
                    });
                }

                return self;
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
                    currentClassList = $(node).attr("class");
                    removed = currentClassList.replace(pattern, "");
                    $(node).attr("class", removed.replace(/(  )+/g, " ").trim());
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
                    currentClassList = $(node).attr("class") || "";
                    $(node).attr("class", (currentClassList + " " + asString)
                        .trim());
                });

                return self;
            },

            check: function () {
                var
                    self = this;

                if (!self.checked()) {
                    self.property("checked", true);
                }

                return self;
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
            },

            text: function (text) {
                var
                    self = this,
                    selectorsPattern = /(^[*.#])|(\[.+\])|(:.+)|(.+[+,~>].+)/g,
                    first;

                if (text) {
                    self.each(function (node) {
                        first = esPhinx(node).childNodes().first()
                        if (first instanceof Text) {
                            first.textContent = text;
                        } else {
                            $(node).prepend(text);
                        }
                    });
                } else {
                    if (self.childNodes().count()) {
                        return self.childNodes().first().textContent.trim();
                    } else {
                        return "";
                    }
                }

                return self;
            },

            deflate: function () {
                var
                    self = this;

                self.each(function (node) {
                    node.innerHTML = null;
                });

                return self;
            },

            insertAfter: function(element) {
                var
                    self = this,
                    collection = $(element);

                self.each(function (node) {
                    collection.each(function (element) {
                        element.parentNode.insertBefore(node, element.nextSibling);
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

            prepend: function(node) {
                var
                    self = this,
                    firstNode;

                self.each(function (element) {
                    firstNode = $(element).firstNode();
                    if (firstNode.count()) {
                        if (typeof node === "string") {
                            $(document.createTextNode(node))
                                .insertBefore(firstNode);
                        } else {
                            $(node).insertBefore(firstNode);
                        }
                    } else {
                        if (typeof node === "string") {
                            $(element).append(document.createTextNode(node));
                        } else {
                            $(element).append(node);
                        }
                    }
                });

                return self;
            },

            append: function(node) {
                var
                    self = this,
                    collection = $(node);

                self.each(function (element) {
                    collection.each(function (node) {
                        element.appendChild(node);
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

/*$.prototype.ancestors = function (nodeName) {
    var _parents = []
        ,parent = null
    ;
    collection.forEach(function (e) {
        parent = e.parentNode;
        if (nodeName) {
            if (parent.nodeName.toLowerCase() === nodeName) {
                _parents.push(parent);
            } else {
                while(true) {
                    parent = parent.parentNode;
                    if(parent){
                        if(parent.nodeName.toLowerCase() === nodeName) {
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
