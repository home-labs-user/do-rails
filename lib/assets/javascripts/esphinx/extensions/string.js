"use strict";

var
    Extensor;

(function ($) {

    Extensor.new($, {

        prototype: {

            camelize: function () {
                var
                    self = this,
                    pattern = /[_,\-][\S]/g,
                    string;

                string = self.replace(pattern, function (captured_group) {
                    return captured_group[1].toUpperCase();
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

            // copyUntil: function (untilWord, start, includeRemainingLeft) {
            //     includeRemainingLeft = includeRemainingLeft || true;

            //     var
            //         self = this,
            //         searchIndex,
            //         substr;

            //     start = self.lastIndexOf(untilWord, Math.abs(start))
            //     + untilWord.length;

            //     substr = self.substr(start, self.length);
            //     searchIndex = substr.search(untilWord);
            //     if (searchIndex !== -1 && start) {
            //         return substr.substr(0, searchIndex);
            //     } else {
            //         if (start) {
            //             return substr;
            //         }
            //         return self.substr(0, searchIndex);
            //     }
            // },

            // procura, na string, por palavras (separadas por espaço)
            // $ procura da direita para a esquerda
            allReplaced: function (find, change) {
                // /g -> modifier. Identifica em qualquer parte do contexto
                var pattern = eval.call(null, "/" + find + "/g");
                return this.replace(pattern, change);
            },

            allReplacedChar: function (find, change) {
                // procura qualquer caracter entre os colchetes
                var pattern = eval.call(null, "/[" + find + "]/g");
                return this.replace(pattern, change);
            },

            without: function (chars) {
                return this.allReplacedChar(chars, "");
            },

            present: function () {
                if (this.length !== 0) {
                    return true;
                }
                return false;
            },

            empty: function () {
                if (this.length === 0) {
                    return true;
                }
                return false;
            }

        }

    });

})(String);
