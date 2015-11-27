(function ($) {
    "use strict";
    $.prototype.computedStyle = function(prop){
        var self = this;
        // converter traços para CamelCase (camelize
        return parseFloat(getComputedStyle(self).getPropertyValue(prop));
    }
})(HTMLElement);
