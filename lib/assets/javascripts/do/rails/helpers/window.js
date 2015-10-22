(function ($) {
    "use strict";

    $.isString = function (obj) {
        if (obj.constructor === String) {
            return true;
        }
        return false;
    };

    $.isArray = function (obj) {
        if (obj.constructor === $) {
            return true;
        }
        return false;
    };

}(window));
