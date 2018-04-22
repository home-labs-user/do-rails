var KeyboardPatten = (function () {
    "use strict";

    Object.defineProperties(window, {
        KeyboardPatten: {
            value: {}
        }
    });

    const
        self = window.KeyboardPatten;

    Object.defineProperties(window.KeyboardPatten, {
        deleteKeys: {
            value: function () {
                var
                    stringPattern = "",

                    callback = function (key) {
                        stringPattern += key + "|";
                    };

                ["Backspace", "Delete"].forEach(callback);

                return stringPattern.slice(0, stringPattern.length - 1);
            }
        },

        functionKeys: {
            value: function () {
                var
                    stringPattern = "",
                    i = 0;

                while (i++ <= 11) {
                    if (i < 12) {
                        stringPattern += "F" + i + "|";
                    } else {
                        stringPattern += "F" + i;
                    }
                }

                return stringPattern.slice(0, stringPattern.length - 1);
            }
        },

        editKeys: {
            value: function () {
                var
                    stringPattern = "",

                    callback = function (key) {
                        stringPattern += key + "|";
                    };

                ["Enter", "Insert"].forEach(callback);

                return stringPattern.slice(0, stringPattern.length - 1);
            }
        },

        modifierKeys: {
            value: function () {
                var
                    stringPattern = "",

                    callback = function (key) {
                        stringPattern += key + "|";
                    };

                ["Shift", "Control", "Alt", "AltGraph"].forEach(callback);

                return stringPattern.slice(0, stringPattern.length - 1);
            }
        },

        navigationKeys: {
            value: function () {
                var
                    stringPattern = "",

                    directionalIteratorBlock = function (key) {
                        stringPattern += "Arrow" + key + "|";
                    },

                    horizontalDirectionalIteratorBlock = function (key) {
                        stringPattern += "Page" + key + "|";
                    },

                    callback = function (key) {
                        stringPattern += key + "|";
                    };

                ["Left", "Right", "Up", "Down"].forEach(directionalIteratorBlock);

                ["Up", "Down"].forEach(horizontalDirectionalIteratorBlock);

                ["Home", "End"].forEach(callback);

                return stringPattern.slice(0, stringPattern.length - 1);
            }
        },

        systemKeys: {
            value: function () {
                var
                    stringPattern = "",

                    callback = function (key) {
                        stringPattern += key + "|";
                    };

                ["Escape", "Pause"].forEach(callback);

                return stringPattern.slice(0, stringPattern.length - 1);
            }
        },

        nonCharactersKeys: {
            value: function () {
                return self.systemKeysPattern() + "|" + self.navigationKeysPattern() +
                    "|" + self.modifierKeysPattern() + "|" + self.editKeysPattern() + "|" +
                    self.functionKeysPattern();
            }
        }
    });

    return self;
}());
