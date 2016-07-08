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
                type = esPhinx.type(linkedList).toLowerCase(),
                i;

            if (type === "arguments") {
                linkedList = $.from(linkedList);
            } else if (!allowedPattern.test(type)) {
                return linkedList;
            }

            for (i of linkedList) {
                type = esPhinx.type(i).toLowerCase();
                flattened = flattened
                    .concat(allowedPattern.test(type) ? $.flatten(i) : i);
            }

            return flattened;
        },

        prototype: {

            difference: function () {
                var
                    args = [],
                    differences = [],
                    i;

                if (arguments.length > 0) {
                    for (i in arguments) {
                        if (arguments.hasOwnProperty(i)) {
                            args.push((arguments[i]).uniq());
                        }
                    }
                } else {
                    return this;
                }

                args.unshift(this);
                differences = args.reduce(function (prev, curr, i) {

                    if (i === 1) {
                        differences = prev.filter(function (v) {
                            return curr.indexOf(v) === -1;
                        });
                    } else {
                        differences = differences.filter(function (v) {
                            return curr.indexOf(v) === -1;
                        });
                    }

                    return differences;
                });

                return differences;
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
                    return self.indexOf(i).toString();
                }

                return false;
            },

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
                    if (!Number.isNaN(index)) {
                        deleted.push(self.splice(index, 1)[0]);
                    }
                }

                return deleted;
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

            pieceIndex: function (slice) {
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
                    clone = self.clone();

                while (true) {
                    if (i < clone.length -1) {
                        clone[i] = clone[i] + " ";
                        i += 1;
                    } else {
                        break;
                    }
                }

                return clone;
            },

            capitalize: function () {
                var
                    self = this,
                    clone = [];

                self.forEach(function (value) {
                    if (typeof value === "string") {
                        clone.push(value.capitalize());
                    }
                });

                return clone;
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

            clone: function () {
                var
                    self = this,
                    clone = [];

                self.forEach(function (v) {
                    clone.push(v);
                });
                return clone;
            },

            asc: function () {
                // ordena através do método "insertion sort", de forma
                // decrescente. Ordenara-lo-á ao final da fila da esquerda
                //para a direita, como num baralho de cartas dependendo se o
                // valor de b-a for > < ou = 0
                var
                    clone = this.copyWithin();

                clone.sort(function (a, b) {
                    return a > b;
                });
                return clone;
            },

            desc: function () {
                var
                    clone = this.copyWithin();

                clone.sort(function (a, b) {
                    return a < b;
                });
                return clone;
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
                    clone = [],
                    i;

                clone = self.clone();

                for (i of parts) {
                    clone.delete(i);
                }

                return clone;
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
