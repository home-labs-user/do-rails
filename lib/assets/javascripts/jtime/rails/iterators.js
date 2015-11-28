(function ($) {
    "use strict";

    $.extend({
        each: function (obj, callback) {
            var
                self = this,
                i;

            if (typeof obj === "function") {
                callback = obj;
                for (i in self) {
                    if (self.hasOwnProperty(i) && !isNaN(parseInt(i, 10))) {
                        callback(self[i], i);
                    } else {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && !isNaN(parseInt(i, 10))) {
                        callback(obj[i], i);
                    } else {
                        break;
                    }
                }
            }
        }
    });

})(jTime);
