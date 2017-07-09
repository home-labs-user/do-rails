var
    esPhinx,
    Extender;


(function($) {
    "use strict";

    $.extend({
        Object: {}
    });

    Extender.new($.Object, true, {

        constructorIs: function(constructor) {
            if (typeof constructor == "string") {
                constructor = window[constructor];
            }

            return this.classConstructor() == constructor;
        }

    });

}(esPhinx));
