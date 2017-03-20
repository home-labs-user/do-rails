(function ($) {
    "use strict";

    try {
        Object.defineProperties($, {
            flatten: {
                value: function(linkedList) {
                    var
                        flattened = [],
                        allowedPattern = /^(Array|Arguments)$/,
                        className = Object.className(linkedList);

                    if (className == "Arguments") {
                        linkedList = $.from(linkedList);
                    } else if (!allowedPattern.test(className)) {
                        return linkedList;
                    }

                    linkedList.forEach(function (i) {
                        className = Object.className(i);
                        flattened = flattened.concat(allowedPattern
                                                     .test(className) ?
                                                     $.flatten(i) :
                                                     i);
                    });

                    return flattened;
                }
            }
        });

        Object.defineProperties($.prototype, {

            indexOfEquivalence: {
                value: function(comparator, startWith = 0) {
                    var
                        found,
                        item,
                        i = startWith,
                        index = i;

                    if (!comparator) {
                        return -1;
                    }

                    for(i = startWith; i < this.length; i++) {
                        item = this[i];
                        if (typeof item == "function") {
                            if (item == comparator) {
                                found = true;
                                break;
                            }
                        } else {
                            if (item == undefined) {
                                console.warn("Item for compare is " +
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

                    if (found) {
                        return index;
                    }

                    return -1;
                }
            },

            uniq: {
                value: function() {
                    return this.reduce(function (init, v) {
                        if (init.indexOfEquivalence(v) == -1) {
                            init.push(v);
                        }
                        return init;
                    }, []);
                }
            },

            includes: {
                value: function(items) {
                    var
                        args = Array.from(arguments).uniq(),
                        mainReference = this,
                        count = 0;

                    args.forEach(function (arg) {
                        if (mainReference.indexOfEquivalence(arg) > -1) {
                            count += 1;
                        }
                    });

                    return count == args.length;
                }
            },

            delete: {
                value: function(index) {
                    return this.splice(index, 1);
                }
            },

            deleteValue: {
                value: function(amount) {
                    var
                        counter,
                        index,
                        mainReference = this,
                        deleted = [],
                        partsToDelete = Array.from(arguments);

                    partsToDelete.shift();
                    partsToDelete.forEach(function (i) {
                        counter = amount;
                        while(counter-- > 0 && mainReference.count(i)) {
                            index = mainReference.indexOfEquivalence(i);
                            if (index > -1) {
                                deleted.push(mainReference.splice(index, 1)[0]);
                            }
                        }
                    });

                    return deleted;
                }
            },

            without: {
                value: function () {
                    var
                        parts = $.flatten(arguments),
                        clone = [];

                    clone = this.clone();

                    parts.forEach(function (i) {
                        clone.deleteValue(clone.count(i), i);
                    });

                    return clone;
                }
            },

            count: {
                value: function (item) {
                    var
                        index,
                        clone = this.asc(),
                        count = 0;

                    while(true) {
                        index = clone.indexOfEquivalence(item);
                        if(index > -1) {
                            clone.delete(index);
                            count++;
                        } else {
                            break;
                        }
                    }

                    return count;
                }
            },

            countSlice: {
                value: function (slice) {
                    var
                        arr = this.asc(),
                        count = 0,
                        i = parseInt(arr.firstFromASlice(slice));

                    if (i > -1) {
                        while (i < this.length) {
                            if (arr[i].trim().search(slice.trim()) != -1) {
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

            firstFromASlice: {
                value: function (slice) {
                    var
                        i,
                        value,
                        index = 0;

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
                }
            },

            lastOfSlice: {
                value: function (slice) {
                    var
                        i, key,
                        object = Object.keys(this).desc();

                    for (i in object) {
                        if (object.hasOwnProperty(i)) {
                            key = object[i];
                            if (this[key].search(slice) != -1) {
                                return key;
                            }
                        }
                    }

                    return undefined;
                }
            },

            differences: {
                value: function (sets) {
                    var
                        differences,
                        union;

                    sets = Array.from(arguments);

                    if (sets.length <= 0) {
                        return this;
                    }

                    union = this.concat(sets.flatten());
                    differences = this;


                    // basta, após a união, iterar sobre o conjunto dos conjuntos, contar a quantidade de cada elemento da união em cada conjunto iterado e remover a quantidade



                    // debugger
                    // // differences = sets.filter(function (curr, i) {
                    // differences = union.reduce(function(curr, i) {

                    //     // if (i == 1) {
                    //     //     differences = prev.filter(function (v) {
                    //     //         debugger
                    //     //         return curr.indexOf(v) == -1;
                    //     //     });
                    //     // } else {
                    //     //     differences = differences.filter(function (v) {
                    //     //         return curr.indexOf(v) == -1;
                    //     //     });
                    //     // }

                    //     debugger
                    //     differences = differences.filter(function (v) {
                    //         debugger
                    //         // o problema está aqui. Ele sempre acha um índice porque o elemento não está sendo removido da coleção
                    //         return curr.indexOf(v) == -1;
                    //     });

                    //     return differences;
                    // });

                    return differences;
                }
            },

            flatten: {
                value: function () {
                    return $.flatten(this);
                }
            },

            lastIndex: {
                value: function () {
                    return this.length - 1;
                }
            },

            capitalize: {
                value: function () {
                    var
                        clone = [];

                    this.forEach(function (value) {
                        if (typeof value == "string") {
                            clone.push(value.capitalize());
                        }
                    });

                    return clone;
                }
            },

            compact: {
                value: function () {
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
                }
            },

            clone: {
                value: function () {
                    var
                        clone = [];

                    Object.assign(clone, this);

                    return clone;
                }
            },

            asc: {
                value: function () {
                    var
                        clone = this.clone(),
                        compareFunction = function (a, b) {
                            return a > b;
                        };

                    clone.sort(compareFunction);

                    return clone;
                }
            },

            desc: {
                value: function () {
                    var
                        clone = this.clone(),
                        compareFunction = function (a, b) {
                            return a < b;
                        };

                    clone.sort(compareFunction);

                    return clone;
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

            first: {
                value: function () {
                    return this[0];
                }
            },

            firstIndexOf: {
                value: function(item) {
                    return this.indexOfEquivalence(item);
                }
            },

            lastIndexOf: {
                value: function (item) {
                    return this.length - 1 - this.clone().reverse()
                        .indexOfEquivalence(item);
                }
            },

            last: {
                value: function () {
                    return this[this.length -1];
                }
            },

            spaceOut: {
                value: function () {
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
            }

        });
    } catch(e) {}

})(Array);
