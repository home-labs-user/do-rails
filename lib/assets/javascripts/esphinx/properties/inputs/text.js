var
    esPhinx;


(function($) {
    "use strict";


    $.prototype.extend({

        selectionStart: function() {
            if (this.isA(window.HTMLInputElement)) {
                return this.asNode().selectionStart;
            }
        },

        selectionEnd: function() {
            if (this instanceof window.HTMLInputElement) {
                return this.asNode().selectionEnd;
            }
        },

        cursorPosition: function() {
            return this.selectionStart();
        }

    });

}(esPhinx));
