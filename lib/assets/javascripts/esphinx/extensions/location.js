"use strict";

var
    Extensor,
    Location;

(function ($) {

    var
        self = window.location,

        escapeEspecialCharacter = function (param) {
            return param.replace(/\$/g, "\\$")
            .replace(/\?$/, "\\?")
            .replace(/!$/, "\\!");
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

            queryParam: function (param, value) {
                if (param) param = param.trim();

                var
                    uri = self.href,
                    search = self.search,
                    results,
                    regexSearch,

                    set = function (param, value) {
                        value = encodeURIComponent(value.toString().trim());

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

                regexSearch = new RegExp("\\b" + escapeEspecialCharacter(param)
                + "(\\=([^&#?]+))", "g");

                results = regexSearch.exec(search);
                if (!results) return null;
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            },

            unsetParam: function (param) {
                var
                    uri = self.href,
                    search = self.search;

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

                    // format the beginning
                    search = search.replace(/^[(?&)]{2,}/, "?")
                        .replace(/^[(??)]{2,}/, "?");

                    uri = self.origin + self
                        .pathname + search + self.hash;
                }

                window.history.pushState("", "", uri);

                return self;
            }

        }

    });

})(Location);

// the solution with positive lookbehind. Works as in Perl.

// (?<=[?&])((foo\=[^&#]*)|(foo(?=[&#]))|(foo(?!.)))

// the string to test
// ?foo=bar&?foo&foo=foo&foo&nonfoo=bar&nonfoo&foo#foo

// better solution for now in JS, but select the hash of URI

// \b(foo\b\=[^&#]*)
// [?&](foo(?:=[^&#]+)?)\b
