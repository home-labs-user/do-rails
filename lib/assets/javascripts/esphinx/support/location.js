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
                    // (?=...) select all before ...
                    // [^...] select all except ...
                    regexp = new RegExp("("+ param + "(?=[&#]))|(" + param + "\=[^&])", "ig"),
                    results = regexp.exec(uri),
                    match = uri.match(regexp),

                    set = function (param, value) {
                        value = encodeURIComponent(value.toString().trim());
                        var
                            separator;

                        if (match) {
                            // $n(1..9) is a placeholder flag to method "replace", it indicates which matching groups should be selected to replace
                            uri = uri.replace(regexp, param + "=" + value);
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
