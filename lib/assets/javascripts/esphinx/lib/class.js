//= require ./extensor


var
    Extensor,
    Class;


(function ($module) {
    "use strict";

    Extensor.new($module, {
        Class: {
            forName: function(name) {
                return window[name];
            }
        }
    });

})(window);
