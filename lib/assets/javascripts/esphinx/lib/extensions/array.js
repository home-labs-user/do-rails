var
    SearchContext,
    Search,
    Iterable;

(function($) {
    "use strict";

    try {
        Object.defineProperties($, {
            flatten: {
                value: function(linkedList) {
                    var
                        iterator,
                        flattened = [],
                        allowedPattern = /^(Array|Arguments)$/,
                        className = Object.className(linkedList),

                        callback = function(item) {
                            if (!allowedPattern.test(Object.className(item))) {
                                flattened.push(item);
                            }
                        };

                    if (className == "Arguments") {
                        linkedList = $.from(linkedList);
                    } else if (!allowedPattern.test(className)) {
                        return linkedList;
                    }

                    // this way will treate all as String after run .join
                    // linkedList = linkedList.join().split(",");
                    iterator = SearchContext.Proxy
                        .new(Search.Graphs.BFS.Object.new(linkedList));

                    iterator.research(callback);

                    return flattened;
                }
            },

            compact: {
                value: function(collection) {
                    var

                        callback = function(item) {
                            if (typeof item == "string") {
                                if (item !== "") {
                                    return true;
                                }
                            } else {
                                if (item !== undefined && item !== null) {
                                    return true;
                                }
                            }
                        };

                    return collection.filter(callback);
                }
            }
        });

        Object.defineProperties($.prototype, {

            copy: {
                value: function(startingIndex, finalIndex) {
                    return this.slice(startingIndex, finalIndex + 1);
                }
            },

            clone: {
                value: function() {
                    var
                        clone = [];

                    Object.assign(clone, this);

                    return clone;
                }
            },

            intersection: {
                value: function(set) {
                    var
                        smaller,
                        larger,
                        all = [this, set],

                        classifier = function(first, second) {
                            return first.length > second.length;
                        },

                        callback = function(item) {
                          return larger.includes(item);
                        };

                    smaller = (all = all.sort(classifier)).first();
                    larger = all[1];

                    return smaller.filter(callback).uniq();
                }
            },

            intersections: {
                value: function(sets) {
                    var
                        smaller,
                        self = this,
                        all = Array.from(arguments),

                        classifier = function(first, second) {
                            return first.length > second.length;
                        },

                        callback = function(intersections, set) {
                            return intersections.intersection(set);
                        };

                    all.push(self);
                    all.sort(classifier);
                    smaller = all.deleteAt(0);
                    // reduce works with any value and it cans to reduce the list, filter works with true or false to filter values, and map replace the values.
                    return all.reduce(callback,
                        smaller.intersection(all.first()));
                }
            },

            difference: {
                value: function(sets) {
                    var
                        self = this,
                        differences = self.clone(),

                        iteratorBlock = function(set) {
                            var
                                callback = function(item) {
                                    return !set.includes(item);
                                };

                            differences = differences.filter(callback);
                        };

                    sets = Array.from(arguments);

                    if (sets.length < 1) {
                        return this;
                    }

                    sets.uniq().forEach(iteratorBlock);

                    return differences;
                }
            },

            insertAt: {
                value: function(values, index) {
                    var
                        copy,
                        self = this,
                        argumentsAsArray = Array.from(arguments),

                        callback = function(v) {
                            self.push(v);
                        };

                    index = argumentsAsArray.last();
                    copy = self.copy(index, self.lastIndex());
                    argumentsAsArray.deleteAt(argumentsAsArray.lastIndex());
                    self.deleteAt(index, self.lastIndex());
                    Array.prototype.push.apply(self, argumentsAsArray);

                    copy.forEach(callback);

                    return this;
                }
            },

            indexOfEquivalence: {
                // value: function(comparator, startingIndex = 0) {
                value: function(comparator, startingIndex) {
                    if(typeof startingIndex != "number") {startingIndex = 0;}

                    var
                        item,
                        i = startingIndex;

                    for (i = startingIndex; i < this.length; i++) {
                        item = this[i];
                        if (typeof item == "function") {
                            if (item == comparator) {
                                return i;
                            }
                        } else {
                            if (item === undefined) {
                                console.warn("Item to compare is " +
                                                "undefined!");
                            }

                            if (Object.areEquivalents(item, comparator)) {
                                return i;
                            }
                        }
                    }

                    return -1;
                }
            },

            uniq: {
                value: function() {
                    var
                        callback = function(reduced, value) {
                            if (reduced.indexOfEquivalence(value) == -1) {
                                reduced.push(value);
                            }
                            return reduced;
                        };

                    return this.reduce(callback, []);
                }
            },

            // already proposed in ES7
            // includes: {
            //     value: function(items) {
            //         var
            //             argumentsAsArray = Array.from(arguments).uniq(),
            //             mainReference = this,
            //             count = 0,

            //             callback = function(arg) {
            //                 if (mainReference.indexOfEquivalence(arg) > -1) {
            //                     count += 1;
            //                 }
            //             };

            //         argumentsAsArray.forEach(callback);

            //         return count == argumentsAsArray.length;
            //     }
            // },

            deleteAt: {
                value: function(startingIndex, finalIndex) {
                    var
                        value,
                        count = 1;

                    if (typeof finalIndex == "number") {
                        count = finalIndex + 1 - startingIndex;
                    }

                    value = this[startingIndex];
                    this.splice(startingIndex, count);

                    return value;
                }
            },

            delete: {
                value: function(collection) {
                    var
                        amount,
                        index,
                        deletedValue,
                        self = this,
                        deleted = [],
                        partsToDelete = Array.from(arguments),

                        callback = function(value) {
                            amount = self.amount(value);
                            while (amount-- > 0) {
                                index = self.indexOfEquivalence(value);
                                if (index > -1) {
                                    deletedValue = self[index];
                                    self.splice(index, 1);
                                }
                            }

                            if (index > -1) {
                                deleted.push(deletedValue);
                            }
                        };

                    partsToDelete.forEach(callback);

                    if (deleted.length > 1) {
                        return deleted;
                    }
                    return deleted[0];
                }
            },

            without: {
                value: function(items) {
                    var
                        parts = Array.from(arguments),
                        self = this,

                        callback = function(item) {
                            return !parts.includes(item);
                        };

                    return self.filter(callback);
                }
            },

            amount: {
                value: function(item) {

                    var
                        count = 0,
                        i = 0;

                    while (true) {
                        i = this.indexOfEquivalence(item, i);
                        if (i > -1) {
                            count++;
                            if (++i == this.length) {
                                break;
                            }
                        } else {
                            break;
                        }
                    }

                    return count;
                }
            },

            empty: {
                value: function() {
                    return this.amount() === 0;
                }
            },

            firstFromASlice: {
                value: function(slice, startingIndex, caseSensitive) {
                    var
                        regexp,
                        iterator,
                        clone = this.clone(),
                        index = -1,

                        iteratorBlock = function(v, i) {
                            if (typeof v == "string" && i >= startingIndex) {
                                if (v.search(regexp) != -1) {
                                    index = i;
                                    this.finalize();
                                }
                            }
                        };

                    if (typeof startingIndex != "number") {
                        if (typeof startingIndex == "boolean") {
                            caseSensitive = startingIndex;
                        }
                        startingIndex = 0;
                    }

                    if (typeof caseSensitive != "boolean") {
                        caseSensitive = false;
                    }

                    if (startingIndex === 0) {
                        clone = clone.asc();
                    }

                    slice = slice.trim();

                    if (!caseSensitive) {
                        regexp = new RegExp(slice, "i");
                    } else {
                        regexp = new RegExp(slice);
                    }

                    iterator = Iterable.Proxy.new(this);
                    iterator.each(iteratorBlock);

                    return index;
                }
            },

            countSlice: {
                value: function(slice, startingIndex, caseSensitive) {
                    var
                        i,
                        regexp,
                        clone = this.clone(),
                        count = 0;

                    if (typeof startingIndex != "number") {
                        if (typeof startingIndex == "boolean") {
                            caseSensitive = startingIndex;
                        }
                        startingIndex = 0;
                    }

                    if (typeof caseSensitive != "boolean") {
                        caseSensitive = false;
                    }

                    if (startingIndex === 0) {
                        clone = clone.asc();
                    }

                    slice = slice.trim();

                    if (!caseSensitive) {
                        regexp = new RegExp(slice, "i");
                    } else {
                        regexp = new RegExp(slice);
                    }

                    i = parseInt(clone.firstFromASlice(slice, startingIndex,
                                                     caseSensitive));

                    if (i > -1) {
                        while (i < this.length) {
                            if (clone[i].trim().search(regexp) > -1) {
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

            flatten: {
                value: function() {
                    return $.flatten(this);
                }
            },

            normalizeToLowerCase: {
                value: function() {
                    var
                        clone = [],

                        callback = function(value) {
                            if (typeof value == "string") {
                                clone.push(value.toLowerCase()());
                            }
                        };

                    this.forEach(callback);

                    return clone;
                }
            },

            capitalize: {
                value: function() {
                    var
                        clone = [],

                        callback = function(value) {
                            if (typeof value == "string") {
                                clone.push(value.capitalize());
                            }
                        };

                    this.forEach(callback);

                    return clone;
                }
            },

            spaceOut: {
                value: function() {
                    var
                        i = 0,
                        clone = this.clone();

                    while (i < clone.lastIndex()) {
                        clone[i++] += " ";
                    }

                    return clone;
                }
            },

            compact: {
                value: function() {
                    return $.compact(this);
                }
            },

            asc: {
                value: function() {
                    var
                        clone = this.clone(),
                        compareFunction = function(a, b) {
                            return a > b;
                        };

                    clone.sort(compareFunction);

                    return clone;
                }
            },

            desc: {
                value: function() {
                    var
                        clone = this.clone(),
                        compareFunction = function(a, b) {
                            return a < b;
                        };

                    clone.sort(compareFunction);

                    return clone;
                }
            },

            lastIndex: {
                value: function() {
                    return this.length - 1;
                }
            },

            first: {
                value: function() {
                    return this[0];
                }
            },

            last: {
                value: function() {
                    return this[this.lastIndex()];
                }
            }

        });
    } catch(e) {}

})(Array);
