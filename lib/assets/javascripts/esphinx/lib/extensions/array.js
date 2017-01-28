var
    Extensor;

(function ($) {
    "use strict";

    Extensor.new($, {

        // the order in statement matters
        flatten: function (linkedList) {
            var
                flattened = [],
                allowedPattern = /^(Array|Arguments)$/,
                className = esPhinx.Object.className(linkedList);

            if (className == "Arguments") {
                linkedList = $.from(linkedList);
            } else if (!allowedPattern.test(className)) {
                return linkedList;
            }

            linkedList.forEach(function (i) {
                className = esPhinx.Object.className(i);
                flattened = flattened
                    .concat(allowedPattern.test(className) ? $.flatten(i) : i);
            });

            return flattened;
        }
    });

    Extensor.new($.prototype, {

        indexPerEquivalence: function (comparator) {
            var
                index = 0,
                found,
                i,
                item;

            if (! comparator) {
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
                            throw new Error("Item for compare is " +
                                            "undefined!");
                        }

                        // change to overridable equals method. Maybe using valueOf
                        if (Object.areEquivalents(item, comparator)) {
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

        uniq: function () {
            return this.reduce(function (init, v) {
                if (init.indexPerEquivalence(v) == -1) {
                    init.push(v);
                }
                return init;
            }, []);
        },

        includes: function () {
            var
                args = Array.from(arguments).uniq(),
                count = 0,
                mainReference = this;

            args.forEach(function (arg) {
                if (mainReference.indexPerEquivalence(arg) > -1) {
                    count += 1;
                }
            });

            if (count == args.length) {
                return true;
            }

            return false;
        },

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

        countItem: function (item) {
            var
                arr = this.asc(),
                count = 0,
                i = arr.indexOf(item),
                comparator;

            if (i > -1) {
                while (i < this.length) {
                    comparator = arr[i];

                    if (typeof arr[i] == typeof item) {
                        if (typeof item == "string") {
                            comparator = comparator.trim();
                            item = item.trim();
                        }

                        if (comparator == item) {
                            count += 1;
                            i += 1;
                        } else {
                            break;
                        }
                    }

                }
            }

            return count;
        },

        countItemSlice: function (slice) {
            var
                arr = this.asc(),
                count = 0,
                i = parseInt(arr.firstFromASlice(slice));

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

        firstFromASlice: function (slice) {
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

        lastIndex: function () {
            return this.length - 1;
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
        }

    });

})(Array);
