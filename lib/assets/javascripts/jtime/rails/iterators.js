(function ($) {
    "use strict";

    $.prototype.forEach = function (callback) {
        var
            self = this,
            i;

        for (i in self) {
            if (self.hasOwnProperty(i) && parseInt(i, 10).isANumber()) {
                callback(self[i], i);
            } else {
                break;
            }
        }
    }
})(jTime);
