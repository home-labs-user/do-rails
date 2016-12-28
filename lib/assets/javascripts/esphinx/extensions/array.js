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
                type = esPhinx.Object.type(linkedList);

            if (type == "Arguments") {
                linkedList = $.from(linkedList);
            } else if (!allowedPattern.test(type)) {
                return linkedList;
            }

            linkedList.forEach(function (i) {
                type = esPhinx.Object.type(i);
                flattened = flattened
                    .concat(allowedPattern.test(type) ? $.flatten(i) : i);
            });

            return flattened;
        },

        prototype: {

            delete: function (index) {
                return this.splice(index, 1);
            },

            deleteValue: function () {
                var
                    mainReference = this,
                    deleted = [],
                    parts = $.flatten(arguments),
                    index;

                parts.forEach(function (i) {
                    index = mainReference.indexPerEquivalence(i);
                    if (index > -1) {
                        deleted.push(mainReference.splice(index, 1)[0]);
                    }
                });

                return deleted;
            },

            without: function () {
                var
                    parts = $.flatten(arguments),
                    clone = [];

                clone = this.clone();

                parts.forEach(function (i) {
                    clone.deleteValue(i);
                });

                return clone;
            },

            indexPerEquivalence: function (comparator) {
                var
                    index = 0,
                    found,
                    i,
                    item;

                if (!comparator) {
                    return -1;
                }

                // for...of and let only works in ES6
                // for (let item of this) {
                for (i in this) {
                    if (this.hasOwnProperty(i)) {
                        item = this[i];
                        if (typeof item == "function") {
                            if (item == comparator) {
                                found = true;
                                break;
                            }
                        } else {
                            if (!item) {
                                throw new Error("Item for compare is undefined!");
                            }

                            if (esPhinx
                                .Object.areEquivalents(item, comparator)) {
                                found = true;
                                break;
                            }
                        }

                        index += 1;
                    }
                }

                if (found) {
                    return index;
                }

                return -1;
            },

            countItem: function (compare) {
                var
                    arr = this.asc(),
                    count = 0,
                    i = arr.indexOf(compare);

                if (i > -1) {
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

                if (i > -1) {
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
                    index = 0,
                    i,
                    value;

                for (i in this) {
                    if (this.hasOwnProperty(i)) {
                        value = this[i];
                        if (value.search(slice) > -1) {
                            return index;
                        }
                        index += 1;
                    }
                }

                return -1;
            },

            lastOfSlice: function (slice) {
                var
                    object = Object.keys(this).desc(),
                    i, key;

                for (i in object) {
                    if (object.hasOwnProperty(i)) {
                        key = object[i];
                        if (this[key].search(slice) !== -1) {
                            return key;
                        }
                    }
                }

                return undefined;
            },

            difference: function () {
                var
                    args = [],
                    differences = [],
                    argsAsArray = Array.from(arguments);

                if (argsAsArray.length > 0) {
                    argsAsArray.forEach(function (item) {
                        args.push(item.uniq());

                    });
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

            uniq: function () {
                return this.reduce(function (init, v) {
                    if (init.indexPerEquivalence(v) == -1) {
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
            }

        }

    });

})(Array);
