var
    Class;


(function ($module) {
    "use strict";

    try {
        Object.defineProperties($module, {
            Class: {
                value: {}
            }
        });

        Object.defineProperties(Class, {
            forName: {
                value: function(name) {
                    return window[name];
                }
            }
        });
    } catch(e) {}

})(window);
