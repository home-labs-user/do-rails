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
                    });

                    return self;
                } else {
                    if (first.attributes[attrName]) {
                        return first.attributes[attrName].value;
                    }
                }

                return undefined;
            },

            property: function (propertyName, value) {
                var
                    self = this,
                    first = self.first();

                if (typeof value === "boolean" || value || value === "") {
                    self.eachAttrs(function (domElement) {
                        domElement[propertyName] = value;
                    });

                    return self;
                } else {
                    if (first[propertyName] ||
                        typeof first[propertyName] === "boolean") {
                        return first[propertyName];
                    }
                }

                return undefined;
            },

            value: function (value) {
                var
                    self = this;

                if (value || value === "") {
                    self.property("value", value);
                    return self;
                }

                return self.property("value");
            },

            checked: function () {
                return this.property("checked");
            },

            check: function () {
                var
                    self = this;

                if (!self.checked()) {
                    self.property("checked", true);
                }

                return self;
            },

            uncheck: function () {
                var
                    self = this;

                return self.property("checked", false);
            },

            data: function (attrName) {
                return this.attr("data-" + attrName);
            }
        }

    });

}(esPhinx));
