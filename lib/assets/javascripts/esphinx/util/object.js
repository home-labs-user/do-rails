var
    esPhinx;


(function($) {
    "use strict";

    $.extend({
        Object: {}
    });

    Extensor.new($.Object, true, {

        constructorIs: function(constructor) {
            if (typeof constructor == "string") {
                constructor = window[constructor];
            }

            return this.classConstructor() == constructor;
        }

    });

}(esPhinx));
