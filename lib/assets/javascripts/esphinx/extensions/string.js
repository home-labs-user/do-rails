"use strict";

var
    Extensor;

(function ($) {

    Extensor.new($, {

        prototype: {

            camelCase: function () {
                var
                    self = this,
                    pattern = /[_,\-][\S]/g,
                    string;

                string = self.replace(pattern, function (captured_group) {
                    return captured_group[1].toUpperCase();
                });

                return string;
            },

            strikeCase: function () {
                var
                    self = this.camelCase(),
                    pattern = /[A-Z_]/g,
                    string;

                string = self.replace(pattern, function (captured_group) {
                    return "-" + captured_group.toLowerCase();
                });

                return string;
            },

            capitalize: function () {
                var
                    self = this,
                    strArr = self.split(" "),
                    str = "";

                if (strArr.length === 1) {
                    return self.charAt(0).toUpperCase() + self.slice(1, self.length)
                        .toLowerCase();
                } else {
                    strArr.forEach(function (s, i) {
                        if (s.length > 3) {
                            str += s.charAt(0).toUpperCase() + s.slice(1, s.length)
                                .toLowerCase();
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
                    self = this,
                    substr = self,
                    index;

                index = substr.indexOf(word, start);
                if (index !== -1) {
                    return self.slice(start, index);
                }
                return self.slice(start, self.length);
            },

            defined: function () {
                var
                    self = this;

                if (self.length !== 0 || self === "") {
                    return true;
                }
                return false;
            },

            empty: function () {
                var
                    self = this;

                if (self.length === 0) {
                    return true;
                }
                return false;
            }

        }

    });

})(String);
