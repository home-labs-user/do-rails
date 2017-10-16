(function($) {
    "use strict";


    try {

        Object.defineProperties($.prototype, {
            elements: {
                value: function() {
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

                    } while (next);

                    return collection;
                }
            }
        });

    } catch(e) {}

})(XPathResult);
