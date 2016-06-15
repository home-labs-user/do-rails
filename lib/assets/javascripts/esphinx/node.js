"use strict";

var
    esPhinx;

(function ($) {

    $.extend({
        prototype: {

            firstNode: function () {
                var
                    self = this,
                    nodes = self.first().childNodes;

                return $(nodes[0]);
            },

            firstElement: function () {
                var
                    self = this,
                    elements = self.first().children;

                return $(elements[0]);
            },

            rootText: function () {
                var
                    self = this,
                    text = "";

                Enumerator.each(self.first().childNodes, function (v) {
                    if (v.nodeType === Node.TEXT_NODE) {
                        text += v.textContent.trim();
                    }
                });

                return text;
            },

            // text
            // <br>|<br\/>

            append: function(node) {
                var
                    self = this;
            },

            prepend: function(node) {
                var
                    self = this,
                    parent,
                    firstNode;

                if (typeof node === "string") {
                    node = $(node).first();
                } else if (node instanceof $) {
                    node = node.first();
                } else if (!node instanceof Node) {
                    throw new Error("An invalid or illegal node was specified.");
                }

                self.each(function (element) {
                    firstNode = self.firstNode();
                    $(node).insertBefore(firstNode);
                });

                return self;
            },

            insertBefore: function(node) {
                var
                    self = this;

                if (typeof node === "string") {
                    node = $(node).first();
                } else if (node instanceof $) {
                    node = node.first();
                } else if (!node instanceof Node) {
                    throw new Error("An invalid or illegal node was specified.");
                }

                node.parentNode.insertBefore(self.first(), node);

                return self;
            },

            insertAfter: function(node) {
                var
                    self = this;

                if (typeof node === "string") {
                    node = $(node).first();
                } else if (node instanceof $) {
                    node = node.first();
                } else if (!node instanceof Node) {
                    throw new Error("An invalid or illegal node was specified.");
                }

                node.parentNode.insertBefore(self.first(), node.nextSibling);

                return self;
            },

            parent: function (query) {
                var
                    self = this;

                if (query) {
                    return $(self.first().closest(query));
                } else {
                    return $(self.first().parentNode);
                }

                return $();
            },

            html: function (content) {
                var
                    self = this;

                if (typeof content === "string") {
                    self.each(function (node) {
                        node.innerHTML = content;
                    });
                } else if (content instanceof Node) {
                    self.each(function (node) {
                        node.innerHTML = null;
                        node.appendChild(content);
                    });
                }

                return self;
            },

            first: function () {
                return this[0];
            },

            count: function () {
                return Object.keys(this).length;
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