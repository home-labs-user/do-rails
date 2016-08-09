// require jquery/min/2.2.0
// require jquery
// require ./autocomplete

"use strict";

var
    jQuery;

(function ($) {

    $.extend({

        prototype: {
            removerOf: function (node, delay) {

                // talvez o observador possa ficar aqui mesmo
                this.on("click", function () {
                    // debugger
                    $(node).remove(delay);
                });

                return this;

            }

        }

    });

})(esPhinx);
