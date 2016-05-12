//= require ./main

"use strict";

var
    esPhinx;

(function ($) {

    $.extend({
        prototype: {
            each: function (callback) {
                var
                    self = this,
                    i;

                for (i in self) {
                    if (self.hasOwnProperty(i)) {
                        if (typeof self[i] !== "function" && !isNaN(i)) {
                            callback(self[i], parseInt(i));
                        } else {
                            break;
                        }
                    }
                }
            }
        }
    });

}(esPhinx));
