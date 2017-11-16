(function($) {
    "use strict";

    try {
        Object.defineProperties($, {
            constructorForName: {
                value: function(name, context) {
                    context = context || window;
                    return context[name];
                }
            },
        });
    } catch(e) {}

})(Reflect);
