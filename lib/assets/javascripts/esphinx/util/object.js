var
    esPhinx;


(function ($) {
    "use strict";

    $.extend(true, {

        Object: {

            constructorIs: function (constructor) {
                if (typeof constructor == "string") {
                    constructor = window[constructor];
                }

                if (this.classConstructor() == constructor) {
                    return true;
                }

                return false;
            },

            firstFromASlice: function (object, slice, startingIndex) {
                startingIndex = startingIndex || 0;

                var
                    attributes = Object.attributes(object),
                    i,
                    key;

                // only attributes can have string value
                for (i in attributes) {
                    if (attributes.hasOwnProperty(i)) {
                        key = attributes[i];
                        if (key >= startingIndex) {
                            if (object[key].search(slice) !== -1) {
                                return key;
                            }
                        }
                    }
                }

                return undefined;
            }

        }

    });

}(esPhinx));
