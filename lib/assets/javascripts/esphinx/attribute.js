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
                    resolvedParams = {},
                    index,
                    name,
                    param,
                    key,
                    merged,
                    attr,
                    i,
                    nested_attr,

                    resolveParam = function (name, value) {
                        value = value || "";

                        var
                            structure = name,
                            parsed;

                        // improves
                        if (/.+\[.+\]\[\]\[.+\]/.test(name)) {
                            structure = "{\"" + structure
                                .replace(/\]\[\]\[/, "\":[{\"")
                                .replace(/\[(?![\{])/g, "\":{\"")
                                .replace(/\]$/g, "\":\"" + value + "\"}]}}");
                        } else if (/.+\[.+\]\[[0-9]+\]\[.+\]/.test(name)) {
                            index = name.split("][")[1];

                            structure = "{\"" + structure
                                .replace(/\[(?![0-9]+])/g, "\":{\"")
                                .replace(/\]\[[0-9]+\]/g, "\":{\"" + index)
                                .replace(/\]$/g, "\":\"" + value + "\"}}}}");
                        } else if (/.+\[.+\]/.test(name)) {
                            structure = "{\"" + structure
                                .replace(/\[/g, "\":{\"")
                                .replace(/\]$/g, "\":\"" + value + "\"}}");
                        } else {
                            structure = "{\"" + name + "\":\"" + value + "\"}";
                        }

                        if (parsed = JSON.parse(structure)) {
                            return parsed;
                        }
                        return false;
                    };

                self.each(function (form) {
                    if (form instanceof HTMLFormElement) {
                        $.each(form.elements, function (e, i) {
                            if (name = e.name) {
                                if (param = resolveParam(e.name, e.value)) {
                                    key = Object.keys(param)[0];
                                    if (resolvedParams[key]) {
                                        attr = Object.keys(param[key])[0];
                                        if (resolvedParams[key][attr]
                                            instanceof Array) {

                                            i = Object
                                                .keys(resolvedParams[key][attr])
                                                    .last();

                                            nested_attr = Object
                                                .keys(param[key][attr][0])[0];

                                            if (resolvedParams[key][attr][i][nested_attr]) {
                                                param[key][attr] = resolvedParams[key][attr]
                                                    .concat(param[key][attr]);
                                            } else {
                                                param[key][attr][i] = $.merge(resolvedParams[key][attr][i], param[key][attr][0]);
                                            }
                                            // debugger
                                        } else if (resolvedParams[key][attr]
                                            instanceof Object) {
                                            i = Object
                                                .keys(resolvedParams[key][attr])
                                                    .last();
                                            param[key][attr][i] = $.merge(resolvedParams[key][attr][i], param[key][attr][i]);
                                            param[key][attr] = $.merge(resolvedParams[key][attr], param[key][attr]);
                                        }
                                        // debugger
                                        param[key] = $.merge(resolvedParams[key], param[key]);
                                    }
                                    resolvedParams = $.merge(resolvedParams, param);
                                }
                            }
                        });
                    }
                });

                debugger
                return resolvedParams;
            },

        }

    });

}(esPhinx));
