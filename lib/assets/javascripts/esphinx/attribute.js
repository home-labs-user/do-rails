//= require ./main


"use strict";

var
    esPhinx;

(function ($module) {

    $module.extend({
        prototype: {
            removeAttr: function (attrName) {
                var
                    self = this;

                self.eachAttrs(function (domElement) {
                    domElement.removeAttribute(attrName);
                });

                return self;
            },

            attr: function (attrName, value) {
                var
                    self = this,
                    first = self.first();

                if (typeof value === "boolean" || value || value === "") {
                    self.eachAttrs(function (domElement) {
                        if (domElement.attributes[attrName]) {
                            domElement.setAttribute(attrName, value);
                        }
                        domElement[attrName] = value;
                    });

                    return self;
                } else {
                    if (first[attrName] || typeof first[attrName] === "boolean") {
                        return first[attrName];
                    } else if (first.attributes[attrName]) {
                        return first.attributes[attrName].value;
                    }
                }

                return undefined;
            },

            value: function (value) {
                var
                    self = this;

                if (value || value === "") {
                    self.attr("value", value);
                    return self;
                }

                return self.attr("value");
            },

            checked: function () {
                return this.attr("checked");
            },

            check: function () {
                var
                    self = this;

                if (!self.checked()) {
                    self.attr("checked", true);
                }

                return self;
            },

            uncheck: function () {
                var
                    self = this;

                return self.attr("checked", false);
            },

            data: function (attrName) {
                return this.attr("data-" + attrName);
            }
        }

    });

}(esPhinx));
