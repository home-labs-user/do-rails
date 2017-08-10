(function($) {
    "use strict";


    try {

        Object.defineProperties($.prototype, {
            reverse: {
                value: function() {
                    var
                        reversed = "",
                        chars = this.split(""),

                        iteratorBlock = function(c) {
                            reversed += c;
                        };

                    chars.reverse().forEach(iteratorBlock);

                    return reversed;
                }
            },

            span: {
                value: function() {
                    return "<span>" + this + "</span>";
                }
            },

            resolveDoubleQuotationMark: {
                value: function() {
                    return this.replace(/"/g, function(captured, i, string) {
                        if (string[i - 1] != "\\" ) {
                            return "\\\"";
                        } else {
                            return "\"";
                        }
                    });
                }
            },

            camelCase: {
                value: function() {
                    var
                        pattern = /[_,\-][\S]/g,
                        string;

                    string = this.replace(pattern, function(capturedGroup) {
                        return capturedGroup[1].toUpperCase();
                    });

                    return string;
                }
            },

            strikeCase: {
                value: function() {
                    var
                        string = this.camelCase(),
                        pattern = /[A-Z_]/g;

                    string = string.replace(pattern, function(capturedGroup) {
                        return "-" + capturedGroup.toLowerCase();
                    });

                    return string;
                }
            },

            capitalize: {
                value: function() {
                    var
                        strArr = this.split(" "),
                        str = "",

                        iteratorBlock = function(s, i) {
                            if (s.length > 3) {
                                str += s.charAt(0).toUpperCase() +
                                  s.slice(1, s.length).toLowerCase();
                            } else {
                                str += s.toLowerCase();
                            }

                            if (i < strArr.length - 1) {
                                str += " ";
                            }
                        };

                    if (strArr.length == 1) {
                        return this.charAt(0).toUpperCase() +
                          this.slice(1, this.length).toLowerCase();
                    } else {
                        strArr.forEach(iteratorBlock);
                        return str;
                    }
                }
            },

            copyUntil: {
                value: function(word, start) {
                    start = start || 0;

                    var
                        substr = this,
                        index;

                    index = substr.indexOf(word, start);
                    if (index > -1) {
                        return this.slice(start, index);
                    }
                    return this.slice(start, this.length);
                }
            },

            isEmpty: {
                value: function() {
                    return this.length === 0;
                }
            }
        });

    } catch(e) {}

})(String);
