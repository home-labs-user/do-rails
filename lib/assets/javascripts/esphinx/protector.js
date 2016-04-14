// require ./main
// require ./support/object

"use strict";

var
    esPhinx;

(function ($module) {

    $module.extend({
        prototype: {
            preventKeys: function (options) {
                var
                    self = this,

                    isDeleteKey = function (e) {
                        switch (e.key) {
                            case "Backspace":
                                return true;

                            case "Delete":
                                return true;
                        }
                        return false;
                    },

                    turnOn = function () {
                        var
                            i;

                        self.eachAttrs(function (domEl) {
                            domEl.addEventListener("keydown", function (e) {

                                if (options) {
                                    if (options.acceptDelete === true) {
                                        if (isDeleteKey(e)) {
                                            return false;
                                        }
                                    }

                                    if (options.exceptions) {
                                        if (isDeleteKey(e)) {
                                            return false;
                                        }

                                        if (options.exceptions
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

                                    case "ArrowDown":
                                        return false;

                                    case "ArrowRight":
                                        return false;
                                }

                                switch (e.key) {
                                    case "Home":
                                        return false;

                                    case "End":
                                        return false;

                                    case "PageUp":
                                        return false;

                                    case "PageDown":
                                        return false;

                                    case "AltGraph":
                                        return false;

                                    case "Enter":
                                        return false;
                                }

                                if (e.ctrlKey) {
                                    switch (e.key) {
                                        case "a":
                                            return false;

                                        case "c":
                                            return false;

                                        case "v":
                                            return false;
                                    }
                                }

                                e.preventDefault();

                            }, false);

                        });
                    };

                turnOn();

                return self;
            }
        }

    });

}(esPhinx));
