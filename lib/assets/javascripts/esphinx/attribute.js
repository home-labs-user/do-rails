//= require ./main

"use strict";

var
    esPhinx;

(function ($) {

    $.extend({
        prototype: {
            removeAttr: function (attrName) {
                var
                    self = this;

                self.each(function (node) {
                    node.removeAttribute(attrName);
                });

                return self;
            },

            attr: function (attrName, value) {
                var
                    self = this,
                    first = self.first();

                if (self.length === 0) {
                    return self;
                }

                if (typeof value === "boolean" || value || value === "") {
                    self.each(function (node) {
                        node.setAttribute(attrName, value);
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

                if (self.length === 0) {
                    return self;
                }

                if (typeof value === "boolean" || value || value === "") {
                    self.each(function (node) {
                        node[propertyName] = value;
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

            data: function (attrName, value) {
                return this.attr("data-" + attrName, value);
            },

            params: function () {
                var
                    self = this,
                    params = {},
                    param = function (name, value) {

                    };

                self.each(function (form) {
                    if (form instanceof HTMLFormElement) {
                        $.each(form.elements, function (e, i) {
                            // o método .item(index) acessa os elementos pelo seu índice na coleção
                            // // params = dom.attrs[name]
                            // val = "value"
                            // params = "juice[name]";

                            // params = "{\"" + params;
                            // params = params.replace(/\[/g, "\":{\"");
                            // params = params.replace(/\]$/g, "\":\"" + val + "\"}}");

                            // params = JSON.parse(params);
                            // console.log(params);

                            // // nested attributes

                            // // edit
                            // params = "juice[juice_ingredients_attributes][11][amount]";

                            // i = params.split("][")[1];
                            // params = "{\"" + params;
                            // params = params.replace(/\[(?![0-9]+])/g, "\":{\"");
                            // params = params.replace(/\]\[[0-9]+\]/g, "\":{\"" + i);
                            // params = params.replace(/\]$/g, "\":\"" + val + "\"}}}}");

                            // params = JSON.parse(params);
                            // console.log(params);

                            // // new
                            // params = "juice[juice_ingredients_attributes][][amount]";

                            // params = "{\"" + params;
                            // params = params.replace(/\]\[\]\[/, "\":[{\"");
                            // params = params.replace(/\[(?![\{])/g, "\":{\"");
                            // params = params.replace(/\]$/g, "\":\"" + val + "\"}]}}");

                            // params = JSON.parse(params);
                            // console.log(params);
                        });
                    }

                });

                return self;
            },

        }

    });

}(esPhinx));
