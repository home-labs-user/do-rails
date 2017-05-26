var
    SearchContext,
    Search;

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
                // value: function(comparator, startWithIndex = 0) {
                value: function(comparator, startWithIndex) {
                    if(typeof startWithIndex != "number") {startWithIndex = 0;}

                    var
                        found,
                        item,
                        i = startWithIndex,
                        index = i;

                    if (typeof comparator != "number" && !comparator) {
                        return -1;
                    }

                    for(i = startWithIndex; i < this.length; i++) {
                        item = this[i];
                        if (typeof item == "function") {
                            if (item == comparator) {
                                found = true;
                                break;
                            }
                        } else {
                            if (item === undefined) {
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
                value: function() {
                    debugger
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

            count: {
                value: function(item) {
                    var
                        clone = this.asc(),
                        index = -1,
                        count = 0;

                    while(true) {
                        index = clone.indexOfEquivalence(item, index + 1);
                        if(index > -1) {
                            count++;
                        } else {
                            break;
                        }
                    }

                    return count;
                }
            },

            countSlice: {
                value: function(slice) {
                    var
                        arr = this.asc(),
                        count = 0,
                        i = parseInt(arr.firstFromASlice(slice));

                    if (i > -1) {
                        while (i < this.length) {
                            if (arr[i].trim().search(slice.trim()) > -1) {
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

                    while(i < clone.lastIndex()) {
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

            firstIndexOf: {
                value: function(item) {
                    return this.indexOfEquivalence(item);
                }
            },

            lastIndex: {
                value: function() {
                    return this.length - 1;
                }
            },

            lastIndexOf: {
                value: function(item) {
                    return this.lastIndex() - this.clone().reverse()
                        .indexOfEquivalence(item);
                }
            },

            last: {
                value: function() {
                    return this[this.lastIndex()];
                }
            },

            firstFromASlice: {
                value: function(slice) {
                    var
                        i,
                        value,
                        index = 0;

                    for(i in this) {
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

            lastFromASlice: {
                value: function(slice) {
                    var
                        i, key,
                        object = Object.keys(this).desc();

                    for(i in object) {
                        if (object.hasOwnProperty(i)) {
                            key = object[i];
                            if (this[key].search(slice) > -1) {
                                return key;
                            }
                        }
                    }

                    return undefined;
                }
            }

        });
    } catch(e) {}

})(Array);
