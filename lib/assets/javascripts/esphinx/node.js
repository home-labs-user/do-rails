//= require ./main

"use strict";

var
    esPhinx;

(function ($module) {

    $module.extend({
        prototype: {
            first: function () {
                return this[0];
            }
        }
    });

}(esPhinx));
