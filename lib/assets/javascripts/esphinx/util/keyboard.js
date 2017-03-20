var
    esPhinx;

(function ($) {
    "use strict";

    $.extend({

        deleteKeysPattern: function () {
            var
                stringPattern = "";

            ["Backspace", "Delete"].forEach(function (key) {
                stringPattern += key + "|";
            });

            return stringPattern.slice(0, stringPattern.length -1);
        },

        functionKeysPattern: function () {
            var
                stringPattern = "",
                i = 0;

            while (i++ <= 11) {
                if(i < 12) {
                    stringPattern += "F" + i + "|";
                } else {
                    stringPattern += "F" + i;
                }
            }

            return stringPattern.slice(0, stringPattern.length -1);
        },

        editKeysPattern: function () {
            var
                stringPattern = "";

            ["Enter", "Insert"].forEach(function (key) {
                stringPattern += key + "|";
            });

            return stringPattern.slice(0, stringPattern.length -1);
        },

        modifierKeysPattern: function () {
            var
                stringPattern = "";

            ["Shift", "Control", "Alt", "AltGraph"].forEach(function (key) {
                stringPattern += key + "|";
            });

            return stringPattern.slice(0, stringPattern.length -1);
        },

        navigationKeysPattern: function () {
            var
                stringPattern = "";

            ["Left", "Right", "Up", "Down"].forEach(function (key) {
                stringPattern += "Arrow" + key + "|";
            });

            ["Up", "Down"].forEach(function (key) {
                stringPattern += "Page" + key + "|";
            });

            ["Home", "End"].forEach(function (key) {
                stringPattern += key + "|";
            });

            return stringPattern.slice(0, stringPattern.length -1);
        },

        systemKeysPattern: function () {
            var
                stringPattern = "";

            ["Escape", "Pause"].forEach(function (key) {
                stringPattern += key + "|";
            });

            return stringPattern.slice(0, stringPattern.length -1);
        },

        nonCharacterKeysPattern: function () {
            return $.systemKeysPattern() + "|" + $.navigationKeysPattern() +
              "|" + $.modifierKeysPattern() + "|" + $.editKeysPattern() + "|" +
              $.functionKeysPattern();
        }

    });

})(esPhinx);
