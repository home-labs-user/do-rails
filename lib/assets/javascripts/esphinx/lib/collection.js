var
    Collection;


(function ($module) {
    "use strict";


    Object.defineProperties($module, {

        Collection: {
            value: {}
        }

    });

    Object.defineProperties(Collection, {
        new: {
            value: function(collection) {
                var
                    self = Collection,
                    ClassConstructor = self.new,
                    asArray;

                if (!(this instanceof ClassConstructor)) {
                    return new ClassConstructor(collection);
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
                            if (Class.forName(Object.className(object1))
                                .implementMethod("compareTo")) {
                                return object1.compareTo(object2);
                            }
                        });
                    }
                }

            }
        }
    });

}(window));
