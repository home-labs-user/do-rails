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
            if (this.isA(window.HTMLInputElement)) {
                return this.asNode().selectionEnd;
            }
        },

        selectionDirection: function() {
            if (this.isA(window.HTMLInputElement)) {
                return this.asNode().selectionDirection;
            }
        },

        cursorPosition: function() {
            return this.selectionStart();
        }

    });

}(esPhinx));
