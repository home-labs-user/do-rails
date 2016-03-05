//= require ./object

(function ($) {
    "use strict";

    Object.defineProperties($.prototype, {

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
                    if (!init.indexOfEquivalent(v)) {
                        init.push(v);
                    }
                    return init;
                }, []);
            }
        },

        // retorna a quantidade de um item
        countItem: {
            value: function (comparison) {
                var
                    arr = this.asc(),
                    count = 0;

                // talvez fosse interessante não usar o forEach para otimizar,
                // testando até determinado item se diferente do próximo
                arr.forEach(function (item) {
                    if (item === comparison) {
                        count += 1;
                    }
                });
                return count;
            }
        },

        indexOfEquivalent: {
            value: function () {
                var
                    self = this,
                    i;

                for (i in self) {
                    if (self.hasOwnProperty(i)) {
                        if ((self[i]).isEquivalent(arguments[0])) {
                            if (i !== "0") {
                                return parseInt(i, 10);
                            } else {
                                return i;
                            }
                        }
                    }
                }

                return false;
            }
        },

        delete: {
            value: function () {
                var
                    self = this,
                    i;

                for (i in arguments) {
                    if (arguments.hasOwnProperty(i)) {
                        // index = self.indexOfEquivalent(arguments[i]);
                        // self.splice(index, 1);
                        self.splice(arguments[i], 1);
                    }
                }
                return self;
            }
        },

        deleteByValue: {
            value: function () {
                var
                    self = this,
                    index,
                    i;

                for (i in arguments) {
                    if (arguments.hasOwnProperty(i)) {
                        index = self.indexOfEquivalent(arguments[i]);
                        if (index) {
                            self.splice(index, 1);
                        }
                    }
                }
                return self;
            }
        },

        without: {
            value: function () {
                var
                    self = this,
                    another = [],
                    index,
                    i;

                another = self.copy();

                for (i in arguments) {
                    index = another.indexOfEquivalent(arguments[i]);
                    if (index) {
                        another.delete(index);
                    }
                }

                return another;
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
