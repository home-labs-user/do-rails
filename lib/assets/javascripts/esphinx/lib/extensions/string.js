var
    Extensor;

(function ($) {
    "use strict";

    Extensor.new($.prototype, true, {

        reverse: function() {
            var
                reversed = "",
                chars = this.split("");

            chars.reverse().forEach(function(c) {
                reversed += c;
            });

            return reversed;
        },

        span: function() {
            return "<span>" + this + "</span>";
        },

        resolveDoubleQuotationMark: function () {
            return this.replace(/"/g, function (captured, i, string) {
                if (string[i - 1] != "\\" ) {
                    return "\\\"";
                } else {
                    return "\"";
                }
            });
        },

        camelCase: function () {
            var
                pattern = /[_,\-][\S]/g,
                string;

            string = this.replace(pattern, function (captured_group) {
                return captured_group[1].toUpperCase();
            });

            return string;
        },

        strikeCase: function () {
            var
                string = this.camelCase(),
                pattern = /[A-Z_]/g;

            string = string.replace(pattern, function (captured_group) {
                return "-" + captured_group.toLowerCase();
            });

            return string;
        },

        capitalize: function () {
            var
                strArr = this.split(" "),
                str = "";

            if (strArr.length == 1) {
                return this.charAt(0).toUpperCase() +
                  this.slice(1, this.length).toLowerCase();
            } else {
                strArr.forEach(function (s, i) {
                    if (s.length > 3) {
                        str += s.charAt(0).toUpperCase() +
                          s.slice(1, s.length).toLowerCase();
                    } else {
                        str += s.toLowerCase();
                    }

                    if (i < strArr.length - 1) {
                        str += " ";
                    }
                });
                return str;
            }
        },

        copyUntil: function (word, start) {
            start = start || 0;

            var
                substr = this,
                index;

            index = substr.indexOf(word, start);
            if (index > -1) {
                return this.slice(start, index);
            }
            return this.slice(start, this.length);
        },

        defined: function () {
            return this.length != 0 || this === "";
        },

        empty: function () {
            return this.length === 0;
        }

    });

})(String);
