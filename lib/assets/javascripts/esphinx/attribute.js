var
    esPhinx;


(function ($) {
    "use strict";

    // $.prototype.extend(false, {
    $.prototype.extend({

        value: function (value) {
            if (value || value === "") {
                this.property("value", value);
                return this;
            } else {
                value = this.property("value");
                if (value) {
                    return value;
                }
            }

            return "";
        },

        data: function (attrName, value) {
            return this.attribute("data-" + attrName, value);
        },

        // params: function () {
        //     var
        //         resolvedParams = {},
        //         // numbersOnlyPattern = /^[0-9]+(?!.)/,
        //         trailPattern = /^[^[]+|[^[]+(?=\])/g,
        //         // trailWithoutIndexPattern = /^[^[]+|(?![0-9])[^[]+(?=\])/g,
        //         count,
        //         trail,
        //         trailWithoutIndex,
        //         //objectName,
        //         //nestedObjectName,
        //         index,
        //         name,
        //         param,
        //         key,
        //         //merged,
        //         attr,
        //         nested_attr,
        //         attributeName,

        //         resolveParam = function (name, value) {
        //             value = value || "";

        //             var
        //                 structure = name,
        //                 parsed;

        //             index = structure.split(/\[([0-9]+)/)[1];

        //             structure = "{\"" + structure;
        //             // object[nested_object][0-9+][indexed_attr_collection_type][]
        //             if (/.+\[.+\]\[[0-9]+\]\[.+\]\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/(\]\[(?=.)(?!\]))|(\[(?!\]))/g,
        //                     "\":{\"").replace(/(\]\[\])$/, "\":[\"" + value +
        //                                       "\"]}}}}");
        //             // obj[nested_object][][attr_collection_type][]
        //             } else if (/.+\[.+\]\[\]\[.+\]\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\]\[\]\[/, "\":[{\"")
        //                     .replace(/\[(?![\{\]])/, "\":{\"")
        //                     .replace(/\]\[\]/, "\":[\"" + value +
        //                              "\"]}]}}");
        //             // below the two more used
        //             // obj[nested_object][0-9+][indexed_attr]
        //             } else if (/.+\[.+\]\[[0-9]+\]\[.+\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\]\[(?=.)(?!\])|\[(?!\])/g, "\":{\"")
        //                     .replace(/\]$/, "\":\"" + value + "\"}}}}");
        //             // obj[nested_object][][attr]
        //             } else if (/.+\[.+\]\[\]\[.+\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\]\[\]\[/, "\":[{\"")
        //                     .replace(/\[(?![\{])/g, "\":{\"")
        //                     .replace(/\]$/g, "\":\"" + value + "\"}]}}");
        //             // indexed_attr_collection_type[0-9+][]
        //             } else if (/.+\[[0-9]+\]\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/(\]\[(?=.)(?!\]))|(\[(?!\]))/g,
        //                     "\":{\"").replace(/\]\[\]/, "\":[\"" + value +
        //                                       "\"]}}");
        //             // obj[attr_collection_type][]
        //             } else if (/.+\[.+\]\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\]\[/, "\":[\"")
        //                     .replace(/\[(?!\")/g, "\":{\"")
        //                     .replace(/\]$/g, value + "\"]}}");
        //             // obj[attr]
        //             } else if (/.+\[.+\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\[/, "\":{\"")
        //                     .replace(/\]$/, "\":\"" + value + "\"}}");
        //             // attr_collection_type[]
        //             } else if (/.+\[\](?!.)/.test(name)) {
        //                 structure = structure
        //                     .replace(/\[\]/, "\":[\"" + value + "\"]}");
        //             // attr
        //             } else {
        //                 structure += "\":\"" + value + "\"}";
        //             }

        //             parsed = JSON.parse(structure);
        //             if (parsed) {
        //                 return parsed;
        //             }
        //             return false;
        //         };

        //     // debugger

        //     // to adapt to:
        //     // obj[nested_attr][0-9+][indexed_attr_collection_type][]
        //     // obj[nested_attr][][attr_collection_type][]
        //     // obj[attr_collection_type][]
        //     // attr_collection_type[]
        //     this.each(function (form) {
        //         if (form instanceof HTMLFormElement) {
        //             $.each(form.elements, function (e, i) {
        //                 name = e.name;
        //                 if (name) {

        //                     count = name.match(trailPattern).length;

        //                     if (trailWithoutIndex.length === 1) {
        //                         attributeName = trail.first();
        //                     }

        //                     param = resolveParam(e.name, e.value);
        //                     if (param) {
        //                         key = Object.keys(param)[0];
        //                         if (resolvedParams[key]) {
        //                             // talvez seja interessante iterar usando Iterator.each e ir verificando o tipo de objeto que está sendo retornado pelo iterador
        //                             attr = Object.keys(param[key])[0];
        //                             if (resolvedParams[key][attr] instanceof
        //                                 Array) {

        //                                 index = Object
        //                                     .keys(resolvedParams[key][attr])
        //                                         .last();

        //                                 nested_attr = Object
        //                                     .keys(param[key][attr][0])[0];

        //                                 if (resolvedParams[key][attr][index][nested_attr]) {
        //                                     param[key][attr] = resolvedParams[key][attr]
        //                                         .concat(param[key][attr]);
        //                                 } else {
        //                                     resolvedParams[key][attr][index] = Object.merge(resolvedParams[key][attr][index], param[key][attr][0]);
        //                                     param[key][attr] = resolvedParams[key][attr];
        //                                 }
        //                             } else if (resolvedParams[key]
        //                                        [attr] instanceof Object) {
        //                                 param[key][attr][index] = $.Object.merge(resolvedParams[key][attr][index], param[key][attr][index]);
        //                                 param[key][attr] = $.Object.merge(resolvedParams[key][attr], param[key][attr]);
        //                             }
        //                             param[key] = Object
        //                                 .merge(resolvedParams[key], param[key]);
        //                         }
        //                         resolvedParams = $.Object.merge(resolvedParams, param);
        //                     }
        //                 }
        //             });
        //         }
        //     });

        //     return resolvedParams;
        // }

    });

}(esPhinx));
