var
    esPhinx;


(function($) {
    "use strict";


    $.extend({
        Class: {}
    });

    $.Extender.extend($.Class, true, {
        forName: function(name) {
            return window[name];
        }
    });

}(esPhinx));
