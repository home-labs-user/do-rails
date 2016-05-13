"use strict";

var
    Extensor,
    Location;

(function ($) {

    Extensor.new($, {

        prototype: {

            queryParam: function (param, value) {
                if (param) param = param.trim();

                var
                    self = window.location,
                    uri = location.href,
                    regexp = new RegExp("([?&])" + param + "(=([^&#]*)|&)?", "ig"),

                    results = regexp.exec(uri),

                    set = function (param, value) {
                        value = encodeURIComponent(value.toString().trim());
                        var
                            separator;

                        if (regexp.test(uri)) {
                            uri = uri.replace(regexp, "$1" + param + "=" + value);
                        } else {
                            separator = /\?/.test(uri) ? "&" : "?";
                            uri = location.origin + location.pathname + location.search + separator + param + "=" + value + location.hash;
                        }
                        window.history.pushState("", "", uri);
                    };

                if (value) {
                    set(param, value);
                    return self;
                }
                if (!results) return null;
                if (!results[2]) return "";
                return decodeURIComponent(results.last().replace(/\+/g, " "));
            }

        }

    });

})(Location);
