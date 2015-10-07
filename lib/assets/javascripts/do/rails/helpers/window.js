(function ($) {
    $.isString = function (obj) {
        if (this.constructor == String) {
            return true;
        }
        return false;
    }

    $.isArray = function (obj) {
        if (obj.constructor == $) {
            return true;
        }
        return false;
    }

}(window));