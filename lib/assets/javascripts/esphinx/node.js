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
                    self = this,
                    selectorsPattern = /(^[*.#])|(\[.+\])|(:.+)|(.+[+,~>].+)/g,
                    first;

                if (typeof text === "string") {
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

            deflate: function () {
                var
                    self = this;

                self.each(function (node) {
                    node.innerHTML = null;
                });

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
