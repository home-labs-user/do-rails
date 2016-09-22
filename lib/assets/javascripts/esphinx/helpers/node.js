"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            is: function (comparedNode) {
                var
                    mainReference = this,
                    asIterable,
                    comparedAsIterable;

                if (Object.getPrototypeOf(comparedNode)
                    == Object.getPrototypeOf(mainReference)
                    || typeof comparedNode == "string"
                    || comparedNode instanceof Node
                    || comparedNode instanceof Array) {
                    comparedNode = $(comparedNode);
                }

                if (mainReference.some()) {
                    asIterable = mainReference.asArray();
                    for (let node of asIterable) {
                        if (comparedNode.some()) {
                            comparedAsIterable = Array.from(comparedNode);
                            for (let compared of comparedAsIterable) {
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
                    mainReference = this,
                    visible = true,
                    asIterable;

                if (mainReference.some()) {
                    asIterable = mainReference.asArray();
                    for (let node of asIterable) {
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

            hasClass: function (classList) {
                var
                    node = $(this.asNode()),
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

                if (pattern.test(node.attribute("class"))) {
                    return true;
                }

                return false;
            }

        }

    });

}(esPhinx));
