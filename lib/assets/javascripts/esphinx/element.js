var
    esPhinx;


(function ($) {
    "use strict";

    $.extend({
        text: function (text) {
            return $(window.document.createTextNode(text));
        }
    });

    $.prototype.extend({

        // selectText: function (start = 0, end) {
        selectText: function (start, end) {
            if (isNaN(start)) {start = 0;}

            var
                mainReference = this,
                node = mainReference.asNode(),
                aux;

            if (node instanceof window.HTMLInputElement) {

                // o end, na verdade, deve pegar o próximo espaço em branco ou quebra de linha
                // o selectionStart e End só existe para objetos tipo text
                if (!end || typeof end !== "number") {

                    end = parseInt(mainReference.value().length);
                }

                if (end < start) {
                    aux = start;
                    start = end;
                    end = aux;
                }

                node.setSelectionRange(start, end);
                mainReference.focus();

                return mainReference;
            }

            return mainReference.property("selected", true);
        },

        attribute: function (attrName, value) {
            var
                node = this.asNode(),
                attr;


            if (this.length === 0) {
                return this;
            }

            if (typeof value == "boolean" || value || value === "") {
                this.select(function (node) {
                    node.setAttribute(attrName, value);
                });

                return this;
            } else {
                attr = node.getAttribute(attrName);
                if (attr) {
                    return attr;
                }
            }

            return undefined;
        },

        property: function (propertyName, value) {
            var
                node = this.asNode();

            if (this.length === 0) {
                return this;
            }

            if (typeof value == "boolean" || value || value === "") {
                this.select(function (node) {
                    node[propertyName] = value;
                });

                return this;
            } else {
                if (node[propertyName] ||
                    typeof node[propertyName] == "boolean") {
                    return node[propertyName];
                }
            }

            return undefined;
        },

        tagName: function () {
            if (this.some() && this.asNode() instanceof window.Element) {
                return this.property("tagName").toLowerCase();
            }

            return "";
        },

        focus: function () {
            this.asNode().focus();
            return this;
        },

        unselect: function () {
            return this.property("selected", false);
        },

        removeClass: function (classList) {
            var
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

            this.select(function (node) {
                currentClassList = $(node).attribute("class");
                removed = currentClassList.replace(pattern, "");
                $(node).attribute("class", removed.replace(/(  )+/g, " ")
                    .trim());
            });

            return this;
        },

        addClass: function (classList) {
            var
                currentClassList,
                asString;

            if (arguments.length > 1) {
                classList = Array.from(arguments);
                asString = classList.join(" ");
            } else if (typeof classList == "string") {
                asString = classList;
            }

            this.select(function (node) {
                currentClassList = $(node).attribute("class") || "";
                $(node).attribute("class", (currentClassList + " " +
                                            asString).trim());
            });

            return this;
        },

        check: function () {
            return this.property("checked", true);
        },

        uncheck: function () {
            return this.property("checked", false);
        },

        removeAttr: function (attrName) {
            this.select(function (node) {
                node.removeAttribute(attrName);
            });

            return this;
        },

        html: function (content) {
            if (typeof content == "string") {
                this.elements().select(function (element) {
                    element.innerHTML = content;
                });
            } else {
                this.clean();
                this.append(content);
            }

            return this;
        }

    });

}(esPhinx));
