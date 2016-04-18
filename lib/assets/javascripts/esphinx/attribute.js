//= require ./main


"use strict";

var
    esPhinx;

(function ($module) {

    $module.extend({
        prototype: {
            attr: function (attrName, value) {
                var
                    self = this,
                    first = self.first();

                if (value) {
                    // iterar e setar o valor
                    first[attrName] = value;
                } else {
                    if (first.attributes[attrName]) {
                        return first.attributes[attrName].value;
                    } else {
                        return first[attrName];
                    }
                }

                return undefined;
            },

            data: function (attrName) {
                var
                    self = this;

                return self.attr("data-" + attrName);
            }
        }

    });

}(esPhinx));
