//= require ./main

"use strict";

var
    esPhinx;

(function ($) {

    // see how to implements a delegate method
    $.extend({

        each: function (enumerable, callback) {
            var
                self = this,
                i;

            Enumerator.each(enumerable, function (v, i) {
                callback(v, parseInt(i));
            });

            return enumerable;
        },

        prototype: {
            each: function (callback) {
                var
                    self = this;

                $.each(self, callback);

                return self;
            }
        }

    });

}(esPhinx));
