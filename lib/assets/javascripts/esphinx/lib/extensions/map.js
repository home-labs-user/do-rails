(function ($) {
    "use strict";

    try {

        Object.defineProperties($.prototype, {

            hasEquivalence: {
                value: function(key) {
                    var
                        iterator = this.keys(),
                        tuple = iterator.next();


                    while(!tuple.done) {
                        if (Object.areEquivalents(tuple.value, key)) {
                            return true;
                        }

                        tuple = iterator.next();
                    }

                    return false;
                }
            }

        });
    } catch(e) {}

})(Map);
