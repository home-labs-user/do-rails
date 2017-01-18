var
    Extensor;

(function ($) {
    "use strict";

    Extensor.new($.prototype, {

        elements: function () {
            var
                next,
                collection = [];

            do {
                next = this.iterateNext();
                if (next) {
                    collection.push(next);
                }
            } while(next)

            return collection;
        }

    });

})(XPathResult);
