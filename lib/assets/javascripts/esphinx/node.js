"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            // <br>|<br\/>
            // text: function () {
            // },

            constructorClass: function () {
                return window[$.type(this.asNode())];
            },

            constructorIs: function (constructor) {
                if (typeof constructor === "string") {
                    constructor = window[constructor];
                }

                if (this.constructorClass() === constructor) {
                    return true;
                }

                return false;
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
                    collection = $().text(node);
                } else {
                    collection = $(node);
                }

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

            remove: function (node) {
                var
                    self = this;

                if (node) {
                    $(node).remove();
                } else {
                    self.parent().each(function (parent) {
                        self.each(function (node) {
                            parent.removeChild(node);
                        })
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
