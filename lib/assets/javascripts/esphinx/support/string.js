(function ($) {
    "use strict";

    $.prototype
        .leftCopyUntil = function (untilWord, start) {
        var
            self = this,
            searchIndex,
            substr,
            right,
            full;

        substr = self.substr(start, self.length);
        searchIndex = substr.search(untilWord);
        if (searchIndex !== -1) {
            right = substr.substr(0, searchIndex);
            full = self.copyUntil(untilWord, start, true);
            return full.substr(0, full.length - right.length);
        } else {
            return self.substr(0, start);
        }
    };

    $.prototype.copyUntil = function (untilWord, start, includeRemainingLeft) {
        var
            self = this,
            searchIndex,
            substr;

        if (includeRemainingLeft) {
            if (typeof includeRemainingLeft === "boolean") {
                start = self.lastIndexOf(untilWord,
                    Math.abs(start)) + untilWord.length;
            }
        }

        substr = self.substr(start, self.length);
        searchIndex = substr.search(untilWord);
        if (searchIndex !== -1 && start) {
            return substr.substr(0, searchIndex);
        } else {
            if (start) {
                return substr;
            }
            return self.substr(0, searchIndex);
        }
    };

    // procura, na string, por palavras (separadas por espaço)
    // $ procura da direita para a esquerda
    $.prototype.allReplaced = function (find, change) {
        // /g -> modifier. Identifica em qualquer parte do contexto
        var pattern = eval.call(null, "/" + find + "/g");
        return this.replace(pattern, change);
    };

    $.prototype.allReplacedChar = function (find, change) {
        // procura qualquer caracter entre os colchetes
        var pattern = eval.call(null, "/[" + find + "]/g");
        return this.replace(pattern, change);
    };


    $.prototype.without = function (chars) {
        return this.allReplacedChar(chars, "");
    };


    $.prototype.empty = function () {
        if (this.length === 0) {
            return true;
        }
        return false;
    };


    $.prototype.capitalized = function () {
        var
            s = this.split(" "),
            str = "";

        s.map(function (s, i) {
            str += s.charAt(0).toUpperCase() + s.slice(1, s.length);
            if (i < s.length - 1) {
                str += " ";
            }
        });
        return str;
    };

})(String);
