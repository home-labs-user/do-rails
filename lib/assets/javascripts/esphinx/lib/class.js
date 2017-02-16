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
    }

    try {
        Object.defineProperties(Class, {
            forName: {
                value: function(name) {
                    return window[name];
                }
            }
        });
    }

})(window);
