// require ./object

"use strict";

var
    Extensor;

(function ($) {

    Extensor.new($, {

        flatten: function (linkedList) {
            var
                flattened = [],
                allowedPattern = /^(array|arguments)$/,
                i;

            if (Object.type(linkedList) === "arguments") {
                linkedList = $.from(linkedList);
            } else if (!allowedPattern.test(Object.type(linkedList))) {
                return linkedList;
            }

            for (i of linkedList) {
                flattened = flattened.concat(allowedPattern.test(Object
                    .type(i)) ? $.flatten(i) : i);
            }

            return flattened;
        },

        prototype: {

            flatten: function () {
                var
                    self = this;

                return $.flatten(self);
            },

            delete: function () {
                var
                    self = this,
                    deleted = [],
                    parts = $.flatten(arguments),
                    index,
                    i;

                for (i of parts) {
                    index = self.indexPerEquivalence(i);
                    if (!isNaN(index)) {
                        deleted.push(self.splice(index, 1)[0]);
                    }
                }

                return deleted;
            },

            indexPerEquivalence: function (comparator) {
                var
                    self = this,
                    i,
                    found;

                for (i of self) {
                    if (typeof i === "function") {
                        if (i === comparator) {
                            found = true;
                            break;
                        }
                    } else {
                        if (i.isEqualTo(comparator)) {
                            found = true;
                            break;
                        }
                    }
                }

                if (found) {
                    return self.indexOf(i);
                }

                return false;
            },

            uniq: function () {
                return this.reduce(function (init, v) {
                    if (!init.indexPerEquivalence(v)) {
                        init.push(v);
                    }
                    return init;
                }, []);
            },

            lastIndex: function () {
                return this.length - 1;
            },

            indexesOfSlice: function (slice) {
                var
                    self = this,
                    indexes = [];

                self.forEach(function (v, i) {
                    if (v.search(slice) !== -1) {
                        indexes.push(parseInt(i));
                    }
                });

                return indexes;
            },

            spaceOut: function () {
                var
                    self = this,
                    i = 0,
                    copy = self.copy();

                while (true) {
                    if (i < copy.length -1) {
                        copy[i] = copy[i] + " ";
                        i += 1;
                    } else {
                        break;
                    }
                }

                return copy;
            },

            capitalize: function () {
                var
                    self = this,
                    copy = [];

                self.forEach(function (value) {
                    if (typeof value === "string") {
                        copy.push(value.capitalize());
                    }
                });

                return copy;
            },

            compact: function () {
                var
                    self = this,
                    newArr = [];

                self.forEach(function (v) {
                    if (typeof v === "string") {
                        if (v !== "") {
                            newArr.push(v);
                        }
                    } else {
                        if (v !== undefined && v !== null) {
                            newArr.push(v);
                        }
                    }
                });

                return newArr;
            },

            copy: function () {
                var
                    self = this,
                    copy = [];

                self.forEach(function (v) {
                    copy.push(v);
                });
                return copy;
            },

            asc: function () {
                // ordena através do método "insertion sort", de forma
                // decrescente. Ordenara-lo-á ao final da fila da esquerda
                //para a direita, como num baralho de cartas dependendo se o
                // valor de b-a for > < ou = 0
                var
                    copy = this.copyWithin();

                copy.sort(function (a, b) {
                    return a > b;
                });
                return copy;
            },

            desc: function () {
                var
                    copy = this.copyWithin();

                copy.sort(function (a, b) {
                    return a < b;
                });
                return copy;
            },

            min: function () {
                return Math.min.apply(null, this);
            },

            max: function () {
                return Math.max.apply(null, this);
            },

            first: function () {
                return this[0];
            },

            last: function () {
                return this[this.length -1];
            },

            countItem: function (compare) {
                var
                    self = this,
                    arr = self.asc(),
                    count = 0,
                    i = arr.indexOf(compare);

                if (i !== -1) {
                    while (true) {
                        if (arr[i].trim() === compare.trim()) {
                            count += 1;
                            i += 1;
                        } else {
                            break;
                        }
                    }
                }

                return count;
            },

            deleteByIndex: function (index) {
                return this.splice(index, 1);
            },

            without: function () {
                var
                    self = this,
                    parts = $.flatten(arguments),
                    copy = [],
                    i;

                copy = self.copy();

                for (i of parts) {
                    copy.delete(i);
                }

                return copy;
            },

            prev: function () {
                var collection = [];

                this.forEach(function (e) {
                    if (e.previousElementSibling) {
                        collection.push(e.previousElementSibling);
                    }
                });
                return collection;
            }

        }

    });

})(Array);
