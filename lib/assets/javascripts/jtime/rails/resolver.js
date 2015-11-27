(function ($) {
    "use strict";

    $.prototype.resolve = function (length) {
        var
            self = this;

        if (length) {
          self.length = length;
        } else {
          self.length = self.length;
        }

        self.splice = function(){};
    }
})(jTime);
