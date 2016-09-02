"use strict";

var
    Extensor;

(function ($) {

    Extensor.new($, {

        prototype: {

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
                    pattern = /[A-Z_]/g,
                    string;

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
                    return this.charAt(0).toUpperCase()
                        + this.slice(1, this.length).toLowerCase();
                } else {
                    strArr.forEach(function (s, i) {
                        if (s.length > 3) {
                            str += s.charAt(0).toUpperCase()
                            + s.slice(1, s.length).toLowerCase();
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
                if (index !== -1) {
                    return this.slice(start, index);
                }
                return this.slice(start, this.length);
            },

            defined: function () {
                if (this.length !== 0 || this == "") {
                    return true;
                }
                return false;
            },

            empty: function () {
                if (this.length == 0) {
                    return true;
                }
                return false;
            }

        }

    });

})(String);
