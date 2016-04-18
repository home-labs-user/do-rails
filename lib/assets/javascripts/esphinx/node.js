//= require ./main

"use strict";

var
    esPhinx;

(function ($module) {

    $module.extend({
        prototype: {
            first: function () {
                return this[0];
            },

            value: function (value) {
                if (value) {
                    this.attr('value', value);
                }

                return this.attr('value');
            }

        }
    });

}(esPhinx));
