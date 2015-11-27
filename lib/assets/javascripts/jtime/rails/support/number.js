(function ($) {
    "use strict";

    $.prototype.isANumber = function () {
        var self = this;

        if (self.toString() !== "NaN") {
            return true;
        }
        return false;
    }

})(Number);
