"use strict";

var
    Protector;

Protector = (function () {

    return { };

})();

(function ($module) {

    Extender.new($module, {
        input: {
            text: {
                new: function () {
                    var
                        $ = jQuery,
                        Constructor = $module.input.text.new,
                        domEl,
                        options,
                        args,

                        isDeleteKey = function (e) {
                            switch (e.key) {
                                case "Backspace":
                                    return true;
                                break;

                                case "Delete":
                                    return true;
                                break;
                            }
                            return false;
                        },

                        turnOn = function () {
                            domEl.addEventListener('keydown', function (e) {
                                var
                                    i,
                                    arrow,
                                    permited;

                                if (options) {
                                    if (options.acceptDelete === true) {
                                        if (isDeleteKey(e)) {
                                            return false;
                                        }
                                    }

                                    if (options.exceptionsPattern) {
                                        if (isDeleteKey(e)) {
                                            return false;
                                        }

                                        if (options.exceptionsPattern
                                            .test(e.key)) {
                                            return false;
                                        }
                                        if (e.shiftKey) {
                                            return false;
                                        }
                                    } else {
                                        if (e.shiftKey) {
                                            switch (e.key) {
                                                case ("Insert"):
                                                    return false;
                                                break;
                                            }
                                        }
                                    }
                                }

                                for(i = 1; i <= 12; i++) {
                                    if (e.key === ("F" + i)) {
                                        return false;
                                    }
                                }

                                switch (e.key) {
                                    case "ArrowLeft":
                                        return false;
                                    break;

                                    case "ArrowDown":
                                        return false;
                                    break;

                                    case "ArrowRight":
                                        return false;
                                    break;
                                }

                                switch (e.key) {
                                    case "Home":
                                        return false;
                                    break;

                                    case "End":
                                        return false;
                                    break;

                                    case "PageUp":
                                        return false;
                                    break;

                                    case "PageDown":
                                        return false;
                                    break;

                                    case "AltGraph":
                                        return false;
                                    break;

                                    case "Enter":
                                        return false;
                                    break
                                }

                                if (e.ctrlKey) {
                                    switch (e.key) {
                                        case "a":
                                            return false;
                                        break;

                                        case "c":
                                            return false;
                                        break;

                                        case "v":
                                            return false;
                                        break;
                                    }
                                }

                                e.preventDefault();

                            }, false);
                        };

                    this.off = function () {
                        domEl.removeEventListener('keydown');
                    }

                    this.addExcetpion = function (pattern) {
                        // ver se funciona esse tipo de concatenação
                        options.exceptionsPattern = options.exceptionsPattern + pattern;
                    }

                    if (!(this instanceof Constructor)) {
                        return new Constructor(arguments);
                    }

                    args = arguments.flatten();
                    domEl = args[0];
                    options = args[1] || {};

                    turnOn();

                }

            }
        }
    });

})(Protector);
