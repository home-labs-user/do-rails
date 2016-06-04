//= require ./main

"use strict";

var
    esPhinx;

(function ($) {

    // see how to implements a delegate method
    $.extend({
        each: function (enumerable, callback) {
            var
                i;

            for (i in enumerable) {
                if (enumerable.hasOwnProperty(i)) {
                    if (typeof enumerable[i] !== "function" && !isNaN(i)) {
                        callback(enumerable[i], parseInt(i));
                    } else {
                        break;
                    }
                }
            }

            return enumerable;
        },

        prototype: {
            each: function (callback) {
                $.each(this, callback);

                return this;
            }
        }
    });

}(esPhinx));
