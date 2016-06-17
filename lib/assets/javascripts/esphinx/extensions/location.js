"use strict";

var
    Extensor,
    Location;

(function ($) {

    Extensor.new($, {

        prototype: {

            unsetParam: function (param) {

            },

            queryParam: function (param, value) {
                if (param) param = param.trim();

                var
                    self = window.location,
                    uri = self.href,
                    search = self.search,
                    query = search.replace(/^\?/, ''),
                    results,
                    searchRE,

                    set = function (param, value) {
                        value = encodeURIComponent(value.toString().trim());

                        var
                            regexp = new RegExp("\\b((" + param + "=[^&#?]*)|("
                                + param + "\\b(?=[&#]*)))", "g"),
                            separator;

                        if (regexp.test(search)) {
                            if (value) {
                                search = search.replace(regexp, param + "=" + value);
                            } else {
                                search = search.replace(regexp, param);
                            }
                            uri = self.origin + self.pathname + search + self.hash;
                        } else {
                            separator = /^\?/.test(search) ? "&" : "?";
                            if (value) {
                                uri = location.origin + location.pathname + location.search + separator + param + "=" + value + location.hash;
                            } else {
                                uri = location.origin + location.pathname + location.search + separator + param + location.hash;
                            }
                        }

                        window.history.pushState("", "", uri);
                    };

                if (value || typeof value === "string") {
                    set(param, value);
                    return self;
                }

                searchRE = new RegExp("\\b" + param + "(=([^&#?]*)|\\b(?=[&#]*))", "g");
                results = searchRE.exec(search);
                if (!results) return null;
                // undefined
                if (!results[2]) return "";
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            }

        }

    });

})(Location);

// the solution with positive lookbehind. Works as in Perl.

// (?<=[?&])((foo\=[^&#]*)|(foo(?=[&#]))|(foo(?!.)))

// the string to test
// ?foo=bar&?foo&foo=foo&foo&nonfoo=bar&nonfoo&foo#foo

// better solution for now in JS, but select the hash of URI

// \b((foo=[^&#?]*)|(foo\b(?=[&#]*)))
