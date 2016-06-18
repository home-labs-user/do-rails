"use strict";

var
    Extensor,
    Location;

(function ($) {

    var
        self = window.location,
        uri = self.href,
        search = self.search,

        escapeEspecialCharacter = function (param) {
            return param.replace(/\$/, "\\$")
            .replace(/\?/, "\\?")
            .replace(/\!/, "\\!");
        },

        RE = {
            params: function (param) {
                param = escapeEspecialCharacter(param);
                return "(" + param + "\\=[^&#]+)";
            }
        },

        regexp,
        separator;

    Extensor.new($, {

        prototype: {

            unsetParam: function (param) {
                if (param) param = param.trim();

                regexp = new RegExp("[?&]" + RE.params(param), "g");

                if (regexp.test(search)) {
                    search = search.replace(regexp, function (matched) {
                        separator = matched[0];
                        if (matched[0] === "?") {
                            return "?";
                        } else {
                            return "";
                        }
                    });

                    // format
                    search = search.replace(/^[(?&)]{2,}/, "?")
                        .replace(/^[(??)]{2,}/, "?");

                    uri = self.origin + self
                        .pathname + search + self.hash;
                }

                window.history.pushState("", "", uri);

                return self;
            },

            queryParam: function (param, value) {
                if (param) param = param.trim();

                var
                    results,
                    regexSearch,

                    set = function (param, value) {
                        value = encodeURIComponent(value.toString().trim());

                        debugger
                        regexp = new RegExp("\\b" + RE.params(param), "g");

                        var
                            separator;

                        if (regexp.test(search)) {
                            if (value) {
                                search = search
                                    .replace(regexp, param + "=" + value);
                            } else {
                                search = search
                                    .replace(regexp, param);
                            }
                            uri = self.origin + self
                                .pathname + search + self.hash;
                        } else {
                            separator = /^\?/.test(search) ? "&" : "?";
                            uri = location.origin + location.pathname
                                + location.search + separator + param + "="
                                + value + location.hash;
                        }

                        window.history.pushState("", "", uri);
                    };

                if (value || typeof value === "string") {
                    set(param, value);
                    return self;
                }

                regexSearch = new RegExp("\\b" + param
                + "(=([^&#?]*)|\\b(?=[&#]+)|(?!.))", "g");
                results = regexSearch.exec(search);
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

// \b(foo\?=[^&#]*)
// [?&](foo(?:=[^&#]+)?)\b
