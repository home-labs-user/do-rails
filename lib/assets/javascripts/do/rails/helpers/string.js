(function ($) {
    "use strict";

    $.asFloat = function () {
        return parseFloat(this);
    };

    // procura, na string, por palavras (separadas por espaço)
    // $ procura da direita para a esquerda
    $.allReplaced = function (find, change) {
        // /g -> modifier. Identifica em qualquer parte do contexto
        var pattern = eval("/" + find + "/g");
        return this.replace(pattern, change);
    };

    $.allReplacedChar = function (find, change) {
        // procura qualquer caracter entre os colchetes
        var pattern = eval("/[" + find + "]/g");
        return this.replace(pattern, change);
    };


    $.without = function (chars) {
        return this.allReplacedChar(chars, "");
    };


    $.empty = function () {
        if (this.length === 0) {
            return true;
        }
        return false;
    };


    $.capitalized = function () {
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

})(String.prototype);
