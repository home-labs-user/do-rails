var
    esPhinx;


(function($) {
    "use strict";


    $.prototype.extend({

        cursorStart: function() {
            if (this.isA(window.HTMLInputElement)) {
                return this.asNode().selectionStart;
            }
        },

        cursorEnd: function() {
            if (this instanceof window.HTMLInputElement) {
                return this.asNode().selectionEnd;
            }
        }

    });

}(esPhinx));
