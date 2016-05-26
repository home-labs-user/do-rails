// require ./object

"use strict";

var
    Extensor;

(function ($) {

    Extensor.new($, {

        prototype: {

            lastIndex: function () {
                return this.length - 1;
            },

            delete: function () {
                var
                    self = this,
                    deleted = [],
                    parts = arguments.flatten(),
                    index,
                    i;

                for (i in parts) {
                    if (parts.hasOwnProperty(i)) {
                        index = self.indexPerEquivalence(parts[i]);
                        if (typeof index === "number") {
                            deleted.push(self.splice(index, 1)[0]);
                        }
                    }
                }

                return deleted;
            },

            indexPerEquivalence: function (comparator) {
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

            intersection: function () {
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

            uniq: function () {
                return this.reduce(function (init, v) {
                    if (!init.indexPerEquivalence(v)) {
                        init.push(v);
                    }
                    return init;
                }, []);
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
                    parts = arguments.flatten(),
                    copy = [],
                    i;

                copy = self.copy();

                for (i in parts) {
                    copy.delete(parts[i]);
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
