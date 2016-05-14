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
                    regexp = new RegExp("([?&])" + param + "=[^&#]*", "ig"),

                    results = regexp.exec(uri),
                    match = uri.match(regexp),

                    set = function (param, value) {
                        value = encodeURIComponent(value.toString().trim());
                        var
                            separator;

                        // now just remove duplicate vars, but between a set and a not defined, remove the not defined
                        if (match) {
                            // $n(1..9) is a placeholder flag to method "replace", it indicates which matching groups should be selected to replace
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
