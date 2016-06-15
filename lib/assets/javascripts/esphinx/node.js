"use strict";

var
    esPhinx;

(function ($) {

    $.extend({
        prototype: {

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

            insertAfter: function(node) {
                var
                    self = this;

                if (node instanceof String) {
                    node = $(node).first();
                }

                if (!node instanceof HTMLElement) {
                    throw new Error("An invalid or illegal node was specified.");
                }

                node.parentNode.insertBefore(self.first(), node.nextSibling);

                return self;
            },

            first: function () {
                return this[0];
            },

            parent: function (query) {
                var
                    self = $(this),
                    parent = self.first().parentNode,
                    comparator;

                if (query) {
                    comparator = $(query).first();
                    while (true) {
                        if (parent.isEqualTo(comparator)) {
                            return $(parent);
                        } else if (!parent) {
                            break;
                        }
                        parent = parent.parentNode;
                    }
                } else {
                    return $(self.first().parentNode);
                }

                return $();
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