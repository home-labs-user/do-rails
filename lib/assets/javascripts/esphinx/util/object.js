var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    $.extend({
        Object: {}
    });

    Extensor.new($.Object, true, {

        constructorIs: function(constructor) {
            if (typeof constructor == "string") {
                constructor = window[constructor];
            }

            return this.classConstructor() == constructor;
        },

        normalizedAsLowerCase: function (object) {
            var
                iterator,
                attributes = Object.attributes(object),
                clone = {};

            Object.assign(clone, object);
            object.length = attributes.length;
            iterator = Iterable.Proxy.new(clone);

            iterator.each(function(v, k) {
                if (typeof v == "string") {
                    clone[k] = v.toLowerCase();
                }
            });

            return clone;
        },

        firstFromASlice: function(object, slice, startingIndex, caseSensitive) {
            var
                iterator,
                key,
                clone = {},
                attributes = Object.attributes(object);

            if (!startingIndex || typeof startingIndex != "number") {
                if (typeof startingIndex == "boolean") {
                    caseSensitive = startingIndex;
                } else if (!caseSensitive || typeof caseSensitive !=
                           "boolean") {
                    caseSensitive = false;
                }

                startingIndex = 0;
            }

            if (!caseSensitive) {
                slice = slice.toLowerCase();
                clone = $.Object.normalizedAsLowerCase(object);
            } else {
                Object.assign(clone, object);
            }

            iterator = Iterable.Proxy.new(attributes);
            iterator.each(function(k, i) {
                if (typeof clone[k] == "string" && i >= startingIndex) {
                    if (clone[k].search(slice) != -1) {
                        key = k;
                        iterator.finalize();
                    }
                }
            });

            if (key) {
                return key;
            }

            return undefined;
        }

    });

}(esPhinx));
