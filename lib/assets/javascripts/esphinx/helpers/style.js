"use strict";

var
    esPhinx;

(function ($) {

    var
        displayObjects = [];

    $.extend({

        prototype: {

            hide: function (delay) {
                if (typeof delay !== "number") {delay = 0;}
            // hide: function (delay = 0) {

                var
                    node = this.asNode(),
                    exists;

                if (node instanceof Element) {
                    if ($(node).css("display") !== "none") {
                        for (let hash of displayObjects) {
                            if (hash.element === node) {
                                exists = true;
                                break;
                            }
                        }

                        if (!exists && this.css("display")) {
                            displayObjects.push({
                                element: node,
                                display: this.css("display")
                            });
                        }
                    }

                }

                this.css("display", "none", delay);

                return this;
            },

            show: function (displayValue) {
                var
                    node = this.asNode(),
                    style,
                    inlineDisplay,
                    display;


                if (node instanceof Element) {
                    style = node.style;
                    inlineDisplay = style.display;
                }

                if (this.css("display") === "none") {
                    for (let hash of displayObjects) {
                        if (hash.element === node) {
                            display = hash.display;
                            break;
                        }
                    }

                    if (display) {
                        this.css("display", display);
                    } else if (inlineDisplay) {
                        style.display = null;
                        if (this.css("display") === "none") {
                            this.css("display", "block");
                        }
                    } else {
                        this.css("display", "block");
                    }
                }

                // if (display) {
                //     this.css("display", display);
                // } else if (inlineDisplay) {
                //     style.display = null;
                //     if (this.css("display") === "none") {
                //         this.css("display", "block");
                //     }
                // } else {
                //     this.css("display", "block");
                // }

                return this;
            },

            centralizeAt: function (reference) {
                var
                    mainReference = this,
                    parent,

                    centralize = function (reference) {
                        this.css("position", "absolute");

                        this.css({
                            top: (reference.height() / 2) - (this.height() / 2)
                                + "px",
                            left: (reference.width() / 2) - (this.width() / 2)
                                + "px"
                        });
                    };

                if (reference.constructor !== $) {
                    reference = $(reference);
                } else {
                    reference = reference;
                }

                centralize.call(this, reference);

                if (reference.instanceOf(Element)) {
                    parent = reference;
                } else {
                    parent = $(window);
                }

                parent.on("resize", function () {
                    centralize.call(mainReference, reference);
                });

                return this;
            },

            minWidth: function () {
                var
                    padding = this.css("padding-left")
                    + this.css("padding-right");

                return this.innerWidth() - padding;
            },

            innerWidth: function () {
                var
                    border = this.css("border-left-width")
                    + this.css("border-right-width");

                return this.width() - border;
            },

            minHeight: function () {
                var
                    padding = this.css("padding-top")
                    + this.css("padding-bottom");

                return this.innerHeight() - padding;
            },

            innerHeight: function () {
                var
                    border = this.css("border-top-width")
                    + this.css("border-bottom-width");

                return this.height() - border;
            },

            transitionDuration: function () {
                return this.css("transition-duration") * 1000;
            },

            horizontalToggle: function (initialMargin, callback) {
                initialMargin = initialMargin || 0;
            // horizontalToggle: function (initialMargin = 0) {
                if (typeof initialMargin === "function") {
                    callback = initialMargin;
                    initialMargin = 0;
                }

                var
                    width,
                    margin,
                    marginRight,
                    marginLeft,
                    duration;

                this.each(function (node) {
                    node = $(node);

                    width = Math.round(node.width());
                    marginLeft = Math.abs(node.css("margin-left"));
                    marginRight = Math.abs(node.css("margin-right"));
                    duration = node.transitionDuration();

                    // discovering more criteria to know if align on right (||)
                    if (node.css("float") === "right") {
                        margin = Math.abs(Math.round(node.css("margin-right")));
                        if (margin !== (width + marginLeft)) {
                            node.css("margin-right", - (width + marginLeft)
                                + "px");
                        } else {
                            node.css("margin-right", initialMargin + "px");
                        }
                    } else {
                        margin = Math.abs(Math.round(node.css("margin-left")));
                        if (margin !== (width + marginRight)) {
                            node.css("margin-left", - (width + marginRight)
                                + "px");
                        } else {
                            node.css("margin-left", initialMargin + "px");
                        }
                    }

                    if (duration) {
                        setTimeout(function () {
                            callback(node);
                        }, duration);
                    } else {
                        callback(node);
                    }

                });

                return this;
            },

            toggleClass: function (classList, changeTo) {
                var
                    pattern;

                this.each(function (node) {
                    if ($(node).hasClass(classList)) {
                        $(node).removeClass(classList);
                        if (changeTo) {
                            $(node).addClass(changeTo);
                        }
                    } else if (changeTo) {
                        if ($(node).hasClass(changeTo)) {
                            $(node).removeClass(changeTo);
                            $(node).addClass(classList);
                        } else {
                            $(node).addClass(classList);
                        }
                    } else {
                        $(node).addClass(classList);
                    }
                });

                return this;
            },

            toggle: function () {
                if (this.css("display") === "none") {
                    this.show();
                } else {
                    this.hide();
                }
            }

        }

    });

}(esPhinx));
