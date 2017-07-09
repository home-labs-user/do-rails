var
    Extender;


(function($) {
    "use strict";

    Extender.new($.prototype, {

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

            } while (next)

            return collection;
        }

    });

})(XPathResult);
