var
    Extensor;

(function ($) {
    "use strict";

    Extensor.new($.prototype, {

        asArray: function () {
            var
                next,
                collection = [];

            do {
                next = clone.iterateNext();
                if (next) {
                    collection.push(next);
                }
            } while(next)

            return collection;
        }

    });

})(XPathResult);
