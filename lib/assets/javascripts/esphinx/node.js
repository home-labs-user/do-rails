var
    esPhinx;

(function ($) {
    "use strict";

    $.extend({

        text: function (text) {
            return $(document.createTextNode(text));
        },

        prototype: {

            // <br>|<br\/>
            // text: function () {
            // },

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
                    if (firstNode.some()) {
                        if (typeof node === "string") {
                            $.text().insertBefore(firstNode);
                        } else {
                            $(node).insertBefore(firstNode);
                        }
                    } else {
                        $(element).append(node);
                    }
                });

                return this;
            },

            insertAfter: function(element) {
                var
                    collection = $(element);

                this.each(function (node) {
                    collection.each(function (element) {

                        // element = $(element);
                        // sibling = element.next();
                        // debugger
                        // if (sibling.some()) {
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

            cursorStart: function () {
                return this.asNode().selectionStart;
            },

            cursorEnd: function () {
                return this.asNode().selectionEnd;
            },

            checked: function () {
                return this.property("checked");
            },

            selected: function () {
                return this.property("selected");
            },

            text: function (text) {
                var
                    first,
                    childNodes;

                if (typeof text === "string") {
                    if (this.some()) {
                        this.each(function (node) {
                            first = $(node).childNodes().asNode();
                            if (first instanceof Text) {
                                first.textContent = text;
                            } else {
                                $(node).prepend(text);
                            }
                        });
                    }
                    return this;
                } else {
                    text = "";
                    childNodes = this.childNodes();
                    if (childNodes.some()) {
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
                    return node.textContent.replace(/\n[ \t]*/g, "")
                        .replace(/(\n){2,}/g, "");
                }

                return node.textContent;
            },

            constructorClass: function () {
                return window[$.Object.type(this.asNode())];
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

            remove: function (object, delay) {
                if (typeof delay !== "number") {delay = 0;}
            // remove: function (object, delay = 0) {
                var
                    mainReference = this;

                if (typeof object === "number") {
                    delay = object;
                    object = undefined;
                }

                if (object) {
                    $(object).remove(delay);
                } else {
                    if (delay) {
                        setTimeout(function () {
                            mainReference.each(function (node) {
                                node.parentElement.removeChild(node);
                            });
                        }, delay);
                    } else {
                        mainReference.each(function (node) {
                            node.parentElement.removeChild(node);
                        });
                    }
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
