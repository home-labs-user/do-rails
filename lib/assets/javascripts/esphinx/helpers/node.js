var
    esPhinx;

(function ($) {
    "use strict";

    $.extend({

        prototype: {

            is: function (comparedNode) {
                var
                    mainReference = this,
                    asIterable,
                    comparedAsIterable,
                    i, ii,
                    node, compared;

                if (Object.getPrototypeOf(comparedNode) ==
                    Object.getPrototypeOf(mainReference) ||
                    typeof comparedNode == "string" ||
                    comparedNode instanceof Node ||
                    comparedNode instanceof Array) {
                    comparedNode = $(comparedNode);
                }

                if (mainReference.some()) {
                    asIterable = mainReference.asArray();
                    for (i in asIterable) {
                        if (asIterable.hasOwnProperty(i)) {
                            node = asIterable[i];
                            if (comparedNode.some()) {
                                comparedAsIterable = Array.from(comparedNode);
                                for (ii in comparedAsIterable) {
                                    if (comparedAsIterable.hasOwnProperty(ii)) {
                                        compared = comparedAsIterable[ii];
                                        // change to isSameNode (readed in FF 48)
                                        if (node.isEqualNode(compared)) {
                                            return true;
                                        }
                                    }
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
                    asIterable,
                    i,
                    node;

                if (mainReference.some()) {
                    asIterable = mainReference.asArray();
                    for (i in asIterable) {
                        if (asIterable.hasOwnProperty(i)) {
                            node = asIterable[i];
                            node = $(node);
                            if (node.css("display") === "none" ||
                                node.css("visibility") === "hidden" ||
                                node.css("opacity") === 0) {
                                visible = false;
                            } else {
                                return true;
                            }
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
                        .join("(?=(\\b| ))))(?=.*(\\b") +
                                         "(?=(\\b| )))).*", "g");
                } else {
                    pattern = new RegExp("(?=.*(\\b" + classList.split(" ")
                        .join("(?=(\\b| ))))(?=.*(\\b") +
                                         "(?=(\\b| )))).*", "g");
                }

                if (pattern.test(node.attribute("class"))) {
                    return true;
                }

                return false;
            }

        }

    });

}(esPhinx));
