var
    Extensor;

(function($) {
    "use strict";

    Extensor.new($.prototype, {

        elements: function() {
            var
                next,
                collection = [];

            do {
                try {
                    next = this.iterateNext();
                    if (next) {
                        collection.push(next);
                    }
                } catch (e) {}

            } while(next)

            return collection;
        }

    });

})(XPathResult);
