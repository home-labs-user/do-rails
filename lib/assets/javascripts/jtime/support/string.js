(function ($) {
    "use strict";

    // procura, na string, por palavras (separadas por espaço)
    // $ procura da direita para a esquerda
    $.prototype.allReplaced = function (find, change) {
        // /g -> modifier. Identifica em qualquer parte do contexto
        var pattern = eval("/" + find + "/g");
        return this.replace(pattern, change);
    };

    $.prototype.allReplacedChar = function (find, change) {
        // procura qualquer caracter entre os colchetes
        var pattern = eval("/[" + find + "]/g");
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
