var
    Location;


(function ($) {
    "use strict";

    var
        self = window.location,

        escape = function (parameter) {
            return parameter.replace(/\$/, "\\$");
        },

        pattern = function (parameter) {
            parameter = escape(parameter);
            // better solution for now in JS, but select the catch (?, &)
            // (?:[?&])foo(?:=([^&#]+))?\b
            return new RegExp("(?:[?&])" + parameter +
                              "(?:=([^&#]+))?\\b", "g");
        },

        separator = function (captured) {
            return captured[0] ? captured[0] : "?";
        },

        clean = function (parameter) {
            return self.search.replace(pattern(parameter), function (captured) {
                return separator(captured) + parameter;
            });
        };


    try {

        Object.defineProperties($.prototype, {
            queryParameter: {
                value: function (parameter, value) {
                    if (parameter) parameter = parameter.trim();

                    var
                        uri = self.href,
                        search = self.search,
                        results,
                        regexp = pattern(parameter),

                        set = function (parameter, value) {
                            value = encodeURIComponent(value.toString().trim());

                            if (regexp.test(search)) {
                                if (value) {
                                    search = search.replace(regexp,
                                    function (captured, i, string) {
                                        return separator(captured) + parameter +
                                        "=" + value;
                                    });
                                } else {
                                    search = clean(parameter);
                                }
                                uri = self.origin + self
                                    .pathname + search + self.hash;
                            } else {
                                uri = window.location.origin + window.location
                                    .pathname + window.location.search +
                                    separator(search) + parameter + "=" +
                                    value + window.location.hash;
                            }

                            window.history.pushState("", "", uri);
                        };

                    if (value || typeof value == "string") {
                        set(parameter, value);
                        return self;
                    }

                    results = regexp.exec(search);
                    if (!results) return null;
                    return decodeURIComponent(results[1].replace(/\+/g, " "));
                }
            },

            unsetParameter: {
                value: function (parameter) {
                    var
                        uri = self.href,
                        search = self.search;

                    if (parameter) parameter = parameter.trim();

                    if (pattern(parameter).test(search)) {
                        search = clean(parameter);
                        uri = self.origin + self
                            .pathname + search + self.hash;
                    }

                    window.history.pushState("", "", uri);

                    return self;
                }
            }
        });

    } catch(e) {}

})(Location);

// the solution with positive lookbehind. Works in Python.
// (?<=(?:[?&]))foo(?:=[^&#]+)?\b
// the string for test
// ?foo=bar&foo=bar&foo&nonfoo=bar&nonfoo&foo#foo=bar
