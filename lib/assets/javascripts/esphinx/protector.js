"use strict";

var
    esPhinx;

(function ($module) {

    var
        _options,
        _eventCollector,

        isDeleteKey = function (e) {
            switch (e.key) {
                case "Backspace":
                    return true;

                case "Delete":
                    return true;
            }

            return false;
        },

        listener = function (e) {
            if (typeof _eventCollector === "function") {
                _eventCollector(e);
            }

            var
                i;

            if (_options) {
                if (_options.acceptDelete === true) {
                    if (isDeleteKey(e)) {
                        return false;
                    }
                }

                if (_options.exceptions) {
                    if (isDeleteKey(e)) {
                        return false;
                    }

                    if (_options.exceptions
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

                case "ArrowRight":
                    return false;

                case "ArrowUp":
                    return false;

                case "ArrowDown":
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
        };

    $module.extend({
        prototype: {
            preventKeys: function (options, eventCollector) {
                _options = options || {};
                _eventCollector = eventCollector;

                var
                    self = this;

                self.each(function (node) {
                    node.removeEventListener("keydown", listener,
                        (_options.capture || false)
                    );

                    node.addEventListener("keydown", listener,
                        (_options.capture || false)
                    );

                });

                return self;
            }
        }

    });

}(esPhinx));
