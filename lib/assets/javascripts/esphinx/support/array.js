// require ./object

(function ($) {
    "use strict";

    Object.defineProperties($.prototype, {

        delete: {
            value: function (values) {
                var
                    self = this,
                    deleted = [],
                    args = arguments.flatten(),
                    index,
                    i;

                for (i in args) {
                    if (args.hasOwnProperty(i)) {
                        index = self.indexPerEquivalence(args[i]);
                        if (typeof index === "number") {
                            deleted.push(self.splice(index, 1)[0]);
                        }
                    }
                }

                return deleted;
            }
        },

        indexPerEquivalence: {
            value: function (comparator) {
                var
                    self = this,
                    i,
                    found;

                for (i in self) {
                    if (self.hasOwnProperty(i)) {
                        if (typeof self[i] === "function") {
                            if (self[i] === comparator) {
                                found = true;
                                break;
                            }
                        } else {
                            if ((self[i]).isEqualTo(comparator)) {
                                found = true;
                                break;
                            }
                        }
                    }
                }

                if (found) {
                    return parseInt(i, 10);
                }

                return false;
            }
        },

        indexesOfSlice: {
            value: function (slice) {
                var
                    self = this,
                    indexes = [];

                self.forEach(function (v, i) {
                    if (v.search(slice) !== -1) {
                        indexes.push(parseInt(i));
                    }
                });

                return indexes;
            }
        },

        spaceOut: {
            value:  function () {
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
            }
        },

        capitalize: {
            value:  function () {
                var
                    self = this,
                    copy = [];

                self.forEach(function (value) {
                    if (typeof value === "string") {
                        copy.push(value.capitalize());
                    }
                });

                return copy;
            }
        },

        compact: {
            value: function () {
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
            }
        },

        copy: {
            value: function () {
                var
                    self = this,
                    copy = [];

                self.forEach(function (v) {
                    copy.push(v);
                });
                return copy;
            }
        },

        difference: {
            value: function () {
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
            }
        },

        intersection: {
            value: function () {
                var
                    args = [],
                    intersects = [],
                    self,
                    i;

                self = this;
                if (arguments.length > 0) {
                    for (i in arguments) {
                        if (arguments.hasOwnProperty(i)) {
                            args.push((arguments[i]).uniq());
                        }
                    }
                } else if (self.length > 0) {
                    self.forEach(function (v) {
                        args.push(v.uniq());
                    });
                } else {
                    return [];
                }

                intersects = args.asc().reduce(function (prev, curr, i) {
                    if (i === 1) {
                        intersects = prev.filter(function (v) {
                            // returns to filter method
                            return curr.indexOf(v) > -1;
                        });
                    } else {
                        intersects = intersects.filter(function (v) {
                            return curr.indexOf(v) > -1;
                        });
                    }
                    //console.log(i);
                    //console.log(_intersects);
                    // returns to reduce
                    return intersects;
                });

                return intersects;
            }
        },

        asc: {
            // ordena através do método "insertion sort", de forma
            // decrescente. Ordenara-lo-á ao final da fila da esquerda
            //para a direita, como num baralho de cartas dependendo se o
            // valor de b-a for > < ou = 0
            value: function () {
                var
                    copy = this.copyWithin();

                copy.sort(function (a, b) {
                    return a > b;
                });
                return copy;
            }
        },

        desc: {
            value: function () {
                var
                    copy = this.copyWithin();

                copy.sort(function (a, b) {
                    return a < b;
                });
                return copy;
            }
        },

        min: {
            value: function () {
                return Math.min.apply(null, this);
            }
        },

        max: {
            value: function () {
                return Math.max.apply(null, this);
            }
        },

        last: {
            value: function () {
                return this[this.length -1];
            }
        },

        uniq: {
            value: function () {
                return this.reduce(function (init, v) {
                    if (!init.indexPerEquivalence(v)) {
                        init.push(v);
                    }
                    return init;
                }, []);
            }
        },

        countItem: {
            value: function (compare) {
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
            }
        },

        deleteByIndex: {
            value: function (index) {
                return this.splice(index, 1);
            }
        },

        without: {
            value: function (values) {
                var
                    self = this,
                    args = arguments.flatten(),
                    copy = [],
                    index,
                    i;

                copy = self.copy();

                for (i in args) {
                    copy.delete(args[i]);
                }

                return copy;
            }
        },

        prev: {
            value: function () {
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
