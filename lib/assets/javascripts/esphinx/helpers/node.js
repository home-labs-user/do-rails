"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            is: function (comparedNode) {
                if (comparedNode.constructor === $
                    || comparedNode.constructor === Array
                    || comparedNode instanceof Node
                    || comparedNode.constructor === String) {
                    comparedNode = $(comparedNode);
                }

                if (this.any()) {
                    for (let node of this) {
                        if (comparedNode.any()) {
                            for (let compared of comparedNode) {
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
                    visible = true;

                if (this.any()) {
                    for (let node of this) {
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
