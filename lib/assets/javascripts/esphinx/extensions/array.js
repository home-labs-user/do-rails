// require ./esphinx/object


var
    Extensor,
    esPhinx;

(function ($) {
    "use strict";

    Extensor.new($, {

        // the order in statement matters
        flatten: function (linkedList) {
            var
                flattened = [],
                allowedPattern = /^(Array|Arguments)$/,
                type = esPhinx.Object.type(linkedList),
                i;

            if (type == "Arguments") {
                linkedList = $.from(linkedList);
            } else if (!allowedPattern.test(type)) {
                return linkedList;
            }

            for (i of linkedList) {
                type = esPhinx.Object.type(i);
                flattened = flattened
                    .concat(allowedPattern.test(type) ? $.flatten(i) : i);
            }

            return flattened;
        },

        prototype: {

            indexPerEquivalence: function (comparator) {
                var
                    index = 0,
                    i,
                    found;

                if (!this.length || !comparator) {
                    return false;
                }

                for (i of this) {
                    if (typeof i == "function") {
                        if (i == comparator) {
                            found = true;
                            break;
                        }
                    } else {
                        if (esPhinx.Object.areEquivalents(i, comparator)) {
                            found = true;
                            break;
                        }
                    }

                    index += 1;
                }

                if (found) {
                    return index.toString();
                }

                return false;
            },

            countItem: function (compare) {
                var
                    arr = this.asc(),
                    count = 0,
                    i = arr.indexOf(compare);

                if (i !== -1) {
                    while (i < this.length) {
                        if (arr[i].trim() == compare.trim()) {
                            count += 1;
                            i += 1;
                        } else {
                            break;
                        }
                    }
                }

                return count;
            },

            countItemSlice: function (slice) {
                var
                    arr = this.asc(),
                    count = 0,
                    i = parseInt(arr.firstOfSlice(slice));

                if (i !== -1) {
                    while (i < this.length) {
                        if (arr[i].trim().search(slice.trim()) !== -1) {
                            count += 1;
                            i += 1;
                        } else {
                            break;
                        }
                    }
                }

                return count;
            },

            // iterator: function * () {
            //     var
            //         i = 0,
            //         // iterator = this[Symbol.iterator](),
            //         value;

            //     // works
            //     while (i < this.length) {
            //         yield this[i];
            //         i++;
            //     }
            // },

            piecesIndex: function (slice) {
                var
                    indexes = [];

                this.forEach(function (v, i) {
                    if (v.search(slice) !== -1) {
                        indexes.push(parseInt(i));
                    }
                });

                return indexes;
            },

            firstOfSlice: function (slice) {
                var
                    index = 0;

                for (let value of this) {
                    if (value.search(slice) !== -1) {
                        return index.toString();
                    }
                    index += 1;
                }

                return undefined;
            },

            lastOfSlice: function (slice) {
                for (let key of Object.keys(this).desc()) {
                    if (this[key].search(slice) !== -1) {
                        return key;
                    }
                }

                return undefined;
            },

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

                    if (i == 1) {
                        differences = prev.filter(function (v) {
                            return curr.indexOf(v) == -1;
                        });
                    } else {
                        differences = differences.filter(function (v) {
                            return curr.indexOf(v) == -1;
                        });
                    }

                    return differences;
                });

                return differences;
            },

            flatten: function () {
                return $.flatten(this);
            },

            deleteValue: function () {
                var
                    deleted = [],
                    parts = $.flatten(arguments),
                    index,
                    i;

                for (i of parts) {
                    index = this.indexPerEquivalence(i);
                    if (!Number.isNaN(index)) {
                        deleted.push(this.splice(index, 1)[0]);
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

            spaceOut: function () {
                var
                    i = 0,
                    clone = this.clone();

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
                    clone = [];

                this.forEach(function (value) {
                    if (typeof value == "string") {
                        clone.push(value.capitalize());
                    }
                });

                return clone;
            },

            compact: function () {
                var
                    newArr = [];

                this.forEach(function (v) {
                    if (typeof v == "string") {
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
                    clone = [];

                Object.assign(clone, this);

                return clone;
            },

            asc: function () {
                // ordena através do método "insertion sort", de forma
                // decrescente. Ordenara-lo-á ao final da fila da esquerda
                //para a direita, como num baralho de cartas dependendo se o
                // valor de b-a for > < ou = 0
                var
                    clone = this.clone();

                clone.sort(function (a, b) {
                    return a > b;
                });

                return clone;
            },

            desc: function () {
                var
                    clone = this.clone();

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

            delete: function (index) {
                return this.splice(index, 1);
            },

            without: function () {
                var
                    parts = $.flatten(arguments),
                    clone = [],
                    i;

                clone = this.clone();

                for (i of parts) {
                    clone.deleteValue(i);
                }

                return clone;
            }

        }

    });

})(Array);
