var
    esPhinx;


(function($) {
    "use strict";


    $.extend({
        Collection: {}
    });

    $.Extender.extend($.Collection, true, {
        new: function(collection) {
            var
                asArray,
                self = $.Collection,
                ConstructorReference = self.new;

            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(collection);
            }

            if(!(collection instanceof Array)) {
                asArray = Array.from(Object
                .asCountableLiteralObject(collection));
            } else {
                asArray = collection;
            }

            this.sort = function(compareFunction) {
                if (compareFunction &&
                    typeof compareFunction == "function") {
                    return asArray.sort(compareFunction);
                } else {
                    // callback in node1 and node2, based a some (Strategy), objects to compare and sort.
                    return asArray.sort(function(object1, object2) {
                        if ($.Class.forName(Object.className(object1))
                            .implementsMethod("compareTo")) {
                            return object1.compareTo(object2);
                        }
                    });
                }
            }

        }
    });

}(esPhinx));
