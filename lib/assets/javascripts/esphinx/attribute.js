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
                    nested_attr,

                    resolveParam = function (name, value) {
                        value = value || "";

                        var
                            structure = name,
                            parsed;

                        // get any keys, maybe to generical with .match()...
                        // /^[^[]+|[^[]+(?=\])/g

                        structure = "{\"" + structure;

                        // obj[nested_attr][0-9+][indexed_attr_collection_type][]
                        if (/.+\[.+\]\[[0-9]+\]\[.+\]\[\](?!.)/.test(name)) {
                            structure = structure
                                .replace(/(\]\[(?=.)(?!\]))|(\[(?!\]))/g, "\":{\"")
                                .replace(/\]\[\]/, "\":[\"" + value + "\"]}}}}");
                        // obj[nested_attr][][attr_collection_type][]
                        } else if (/.+\[.+\]\[\]\[.+\]\[\](?!.)/.test(name)) {
                            debugger
                        // obj[nested_attr][0-9+][attr]
                        } else if (/.+\[.+\]\[[0-9]+\]\[.+\](?!.)/.test(name)) {
                            index = structure.split(/\[([0-9]+)/)[1];
                            structure = structure
                                .replace(/\[(?!([0-9]+|\]))/g, "\":{\"")
                                .replace(/\]\[[0-9]+\]/g, "\":{\"" + index)
                                .replace(/\]$/g, "\":\"" + value + "\"}}}}");
                        // obj[nested_attr][][attr]
                        } else if (/.+\[.+\]\[\]\[.+\](?!.)/.test(name)) {
                            structure = structure
                                .replace(/\]\[\]\[/, "\":[{\"")
                                .replace(/\[(?![\{])/g, "\":{\"")
                                .replace(/\]$/g, "\":\"" + value + "\"}]}}");
                        // indexed_attr_collection_type[0-9+][]
                        } else if (/.+\[[0-9]+\]\[\](?!.)/.test(name)) {
                            index = structure.split(/\[([0-9]+)/)[1];
                            structure = structure
                                .replace(/\[(?=[0-9])/, "\":{\"")
                                .replace(/\]\[\]/, "\":[\"" + value + "\"]}}");
                        // obj[attr_collection_type][]
                        } else if (/.+\[.+\]\[\](?!.)/.test(name)) {
                            structure = structure
                                .replace(/\]\[/, "\":[\"")
                                .replace(/\[(?!\")/g, "\":{\"")
                                .replace(/\]$/g, value + "\"]}}");
                        // obj[attr]
                        } else if (/.+\[.+\](?!.)/.test(name)) {
                            structure = structure
                                .replace(/\[/, "\":{\"")
                                .replace(/\]$/, "\":\"" + value + "\"}}");
                        // attr_collection_type[]
                        } else if (/.+\[\](?!.)/.test(name)) {
                            debugger
                            structure = structure
                                .replace(/\[\]/, "\":[\"" + value + "\"]}");
                        // attr
                        } else {
                            structure += "\":\"" + value + "\"}";
                        }

                        if (parsed = JSON.parse(structure)) {
                            return parsed;
                        }
                        return false;
                    };

                // fix
                self.each(function (form) {
                    if (form instanceof HTMLFormElement) {
                        $.each(form.elements, function (e, i) {
                            if (name = e.name) {
                                if (param = resolveParam(e.name, e.value)) {
                                    key = Object.keys(param)[0];
                                    if (resolvedParams[key]) {
                                        // talvez seja interessante iterar usando Enumerator.each e ir verificando o tipo de objeto que está sendo retornado pelo iterador
                                        attr = Object.keys(param[key])[0];
                                        if (resolvedParams[key][attr]
                                            instanceof Array) {

                                            index = Object
                                                .keys(resolvedParams[key][attr])
                                                    .last();

                                            nested_attr = Object
                                                .keys(param[key][attr][0])[0];

                                            if (resolvedParams[key][attr][index][nested_attr]) {
                                                param[key][attr] = resolvedParams[key][attr]
                                                    .concat(param[key][attr]);
                                            } else {
                                                resolvedParams[key][attr][index] = $.merge(resolvedParams[key][attr][index], param[key][attr][0]);
                                                param[key][attr] = resolvedParams[key][attr];
                                            }
                                        } else if (resolvedParams[key][attr]
                                            instanceof Object) {
                                            param[key][attr][index] = $.merge(resolvedParams[key][attr][index], param[key][attr][index]);
                                            param[key][attr] = $.merge(resolvedParams[key][attr], param[key][attr]);
                                        }
                                        param[key] = $.merge(resolvedParams[key], param[key]);
                                    }
                                    resolvedParams = $.merge(resolvedParams, param);
                                }
                            }
                        });
                    }
                });

                return resolvedParams;
            },

        }

    });

}(esPhinx));
