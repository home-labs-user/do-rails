(function ($) {
    "use strict";

    Object.defineProperties($, {
        isString: {
            value: function isString (obj) {
                if (obj.constructor === String) {
                    return true;
                }
                return false;
            }
    };

})(window);
