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
                        className = Object.className(linkedList);

                    if (className == "Arguments") {
                        linkedList = $.from(linkedList);
                    } else if (!allowedPattern.test(className)) {
                        return linkedList;
                    }

                    // this way will treate all as String after run .join
                    // linkedList = linkedList.join().split(",");
                    iterator = SearchContext.Proxy
                        .new(Search.Graphs.BFS.Object.new(linkedList));
                    iterator.research(function(item) {
                        if (!allowedPattern.test(Object.className(item))) {
                            flattened.push(item);
                        }
                    });

                    return flattened;
                }
            },

            compact: {
                value: function(collection) {
                    var
                        newArr = [];

                    collection.forEach(function(v) {
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
            }
        });

        Object.defineProperties($.prototype, {

            clone: {
                value: function() {
                    var
                        clone = [];

                    Object.assign(clone, this);

                    return clone;
                }
            },

            indexOfEquivalence: {
                // value: function(comparator, startingIndex = 0) {
                value: function(comparator, startingIndex) {
                    if(typeof startingIndex != "number") {startingIndex = 0;}

                    var
                        found,
                        item,
                        i = startingIndex;

                    if (typeof comparator != "number" && !comparator) {
                        return -1;
                    }

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

                            // change to overridable equals method. Maybe using valueOf
                            if (Object.areEquivalents(item, comparator)) {
                                // debugger
                                return i;
                            }
                        }
                    }

                    // debugger
                    return -1;
                }
            },

            uniq: {
                value: function() {
                    return this.reduce(function(aux, value) {
                        if (aux.indexOfEquivalence(value) == -1) {
                            aux.push(value);
                        }
                        return aux;
                    }, []);
                }
            },

            includes: {
                value: function(items) {
                    var
                        args = Array.from(arguments).uniq(),
                        mainReference = this,
                        count = 0;

                    args.forEach(function(arg) {
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
                    partsToDelete.forEach(function(i) {
                        counter = amount;
                        while (counter-- > 0 && mainReference.count(i)) {
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
                value: function() {
                    var
                        parts = $.flatten(arguments),
                        clone = [];

                    clone = this.clone();

                    parts.forEach(function(i) {
                        clone.deleteValue(clone.count(i), i);
                    });

                    return clone;
                }
            },

            firstFromASlice: {
                value: function(slice, startingIndex, caseSensitive) {
                    var
                        regexp,
                        iterator,
                        index = -1;

                    if (!startingIndex || typeof startingIndex != "number") {
                        if (typeof startingIndex == "boolean") {
                            caseSensitive = startingIndex;
                        } else if (!caseSensitive || typeof caseSensitive !=
                                   "boolean") {
                            caseSensitive = false;
                        }

                        startingIndex = 0;
                    }

                    slice = slice.trim();

                    if (!caseSensitive) {
                        regexp = new RegExp(slice, "i");
                    } else {
                        regexp = new RegExp(slice);
                    }

                    iterator = Iterable.Proxy.new(this);
                    iterator.each(function(v, i) {
                        if (typeof v == "string" && i >= startingIndex) {
                            if (v.search(regexp) != -1) {
                                index = i;
                                this.finalize();
                            }
                        }
                    });

                    return index;
                }
            },

            count: {
                value: function(item, startingIndex) {
                    if(typeof startingIndex != "number") {startingIndex = 0;}

                    var
                        clone = this.asc(),
                        count = 0,
                        i = startingIndex;

                    while (true) {
                        i = clone.indexOfEquivalence(item, i);
                        if (i > -1) {
                            count++;
                            if (++i == clone.length) {
                                break;
                            }
                        } else {
                            break;
                        }
                    }

                    return count;
                }
            },

            countSlice: {
                value: function(slice, startingIndex, caseSensitive) {
                    var
                        i,
                        regexp,
                        iterator,
                        arr = this.asc(),
                        count = 0;

                    if (!startingIndex || typeof startingIndex != "number") {
                        if (typeof startingIndex == "boolean") {
                            caseSensitive = startingIndex;
                        } else if (!caseSensitive || typeof caseSensitive !=
                                   "boolean") {
                            caseSensitive = false;
                        }

                        startingIndex = 0;
                    }

                    slice = slice.trim();

                    if (!caseSensitive) {
                        regexp = new RegExp(slice, "i");
                    } else {
                        regexp = new RegExp(slice);
                    }

                    i = parseInt(arr.firstFromASlice(slice, startingIndex,
                                                     caseSensitive));

                    if (i > -1) {
                        while (i < this.length) {
                            if (arr[i].trim().search(regexp) > -1) {
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

            differences: {
                value: function(sets) {
                    var
                        clone = this.clone();

                    sets = Array.from(arguments);

                    if (sets.length <= 0) {
                        return this;
                    }

                    clone.uniq().forEach(function(item) {
                        sets.forEach(function(set) {
                            clone.deleteValue(set.count(item), item);
                        });
                    });

                    return clone;
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
                        clone = [];

                    this.forEach(function(value) {
                        if (typeof value == "string") {
                            clone.push(value.toLowerCase()());
                        }
                    });

                    return clone;
                }
            },

            capitalize: {
                value: function() {
                    var
                        clone = [];

                    this.forEach(function(value) {
                        if (typeof value == "string") {
                            clone.push(value.capitalize());
                        }
                    });

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

            min: {
                value: function() {
                    return Math.min.apply(null, this);
                }
            },

            max: {
                value: function() {
                    return Math.max.apply(null, this);
                }
            },

            first: {
                value: function() {
                    return this[0];
                }
            },

            lastIndex: {
                value: function() {
                    return this.length - 1;
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
