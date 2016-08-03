"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            // <br>|<br\/>
            // text: function () {
            // },

            text: function (text) {
                var
                    first,
                    childNodes;

                if (typeof text === "string") {
                    if (this.any()) {
                        this.each(function (node) {
                            first = esPhinx(node).childNodes().first()
                            if (first instanceof Text) {
                                first.textContent = text;
                            } else {
                                $(node).prepend(text);
                            }
                        });
                    } else {
                        this.push(document.createTextNode(text));
                    }
                    return this;
                } else {
                    text = "";
                    childNodes = this.childNodes();
                    if (childNodes.any()) {
                        childNodes.each(function (node) {
                            if (node instanceof Text) {
                                text += $(node).textContent();
                            }
                        });

                        return text.trim();
                    } else {
                        return "";
                    }
                }
            },

            textContent: function () {
                var
                    tagName = this.tagName(),
                    node = this.asNode();

                if (tagName !== "pre") {
                    return node.textContent.replace(/\n[ \t]*/g, "\n")
                        .replace(/(\n){2,}/g, "\n");
                }

                return node.textContent;
            },

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

            remove: function (node) {
                var
                    instance = this;

                if (node) {
                    $(node).remove();
                } else {
                    this.parent().each(function (parent) {
                        instance.each(function (node) {
                            parent.removeChild(node);
                        })
                    });
                }

                return this;
            },

            deflate: function () {
                this.each(function (node) {
                    node.innerHTML = null;
                });

                return this;
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
