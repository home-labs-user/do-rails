var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    $.prototype.extend({

        // autocomplete: function(elementsList, optionElements, options, callback) {
        autocomplete: function(elementsList, options, callback) {
            var
                nonCharacterKeysPattern = new RegExp($
                    .nonCharacterKeysPattern()),
                inline = false,
                searchTextBox = this,
                offlineListener,

                resolveArguments = function(options) {
                    if (!options || Object.getPrototypeOf(options) !=
                        Object.getPrototypeOf({})) {
                        options = {};
                    } else {
                        if (!options.caseSensitive ||
                            typeof options.caseSensitive != "boolean") {
                            options.caseSensitive = false;
                        }

                        if (!options.orderlySearch ||
                            typeof options.orderlySearch != "boolean") {
                            options.orderlySearch = false;
                        }
                    }

                },

                resolveAmountChar = function(options) {
                    if (options.afterAmountChar) {
                        return options.afterAmountChar;
                    } else {
                        return 1;
                    }
                },

                offlineSearch = function(elementsList, options) {
                    var
                        resolvedList,
                        firstResolvedList,
                        previousListNode = elementsList;

                    if (typeof offlineListener == "function") {
                        searchTextBox.off("input", offlineListener);
                        searchTextBox.off("focus", offlineListener);
                    }

                    offlineListener = function(e) {
                        if (searchTextBox.value()) {
                            resolvedList = resolveList(previousListNode,
                                options.order);

                            firstResolvedList = resolvedList.elements.parent()
                                .first();
                            if (firstResolvedList.childElements().some()) {
                                previousListNode = firstResolvedList.clone()
                                    .append(resolvedList.elements);
                            }

                            callback.call($(this), resolvedList.elements,
                                          resolvedList.maps, e);
                        } else {
                            // descobrir o porquê de ter de fazer um clone
                            previousListNode = elementsList.clone(true);
                            callback.call($(this), $(), e);
                        }

                    };

                    searchTextBox.on("input", offlineListener);
                    searchTextBox.on("focus", offlineListener);
                },

                remoteSearch = function(options) {
                    var
                        amountChar = resolveAmountChar(options),
                        word,
                        prevText,
                        nextText,
                        elementsList,
                        params,
                        resolvedList,
                        clipboardData,

                        request = function(e) {
                            if (options.remote.params) {
                                params = options.remote.params
                                    .call(searchTextBox);
                            }

                            $.Ajax.new(options.remote.url
                                .call(searchTextBox), {
                                params: params,
                                progress: function(xhr) {
                                    if (options.remote.loading) {
                                        options.remote
                                            .loading(xhr, e);
                                    }
                                },
                                complete: function() {
                                    $(e.target).off("keypress");
                                },
                                success: function(a) {
                                    elementsList = $(a);
                                    // debugger
                                    resolvedList = resolveList(
                                        elementsList, options.order);
                                    callback.call(searchTextBox,
                                        resolvedList.elements,
                                        resolvedList.maps, e);
                                    if (elementsList.length) {
                                        offlineSearch(elementsList, options);
                                    }
                                }
                            });
                        };

                    searchTextBox.on("keyup", function(e) {
                        word = searchTextBox.value();

                        if (word.length > amountChar) {
                            inline = true;
                        } else if (word.length < amountChar) {
                            inline = false;
                        }

                        if (word.length == amountChar &&
                            !nonCharacterKeysPattern.test(e.key) &&
                            !inline &&
                            options.remote) {
                            $(e.target).on("keypress", function(e) {
                                e.preventDefault();
                            });

                            request(e);
                        }

                    });

                    searchTextBox.on("paste", function(e) {
                        word = searchTextBox.value();
                        prevText = word
                            .slice(0, searchTextBox.cursorStart());
                        nextText = word
                            .slice(searchTextBox.cursorEnd(), word.length);

                        clipboardData = e.clipboardData.getData("text");

                        if (word.length >= amountChar) {
                            inline = true;
                        } else {
                            inline = false;
                        }

                        word = prevText + clipboardData + nextText;

                        if (word.length >= amountChar &&
                            !inline &&
                            options.remote) {
                            searchTextBox.value(word);

                            request(e);
                            e.preventDefault();
                        }
                    });

                },

                mapIf = function(searchTextAsArray, textNodeAsArray) {
                    var
                        iterator,
                        sliceIndex,
                        regexp,
                        textNodeHashSet = Object
                            .asCountableLiteralObject(textNodeAsArray),
                        mapped = {},
                        count = 0,
                        index = 0,
                        previousIndex = -1;

                    if (textNodeHashSet.length >= searchTextAsArray.length) {
                        iterator = Iterable.Proxy.new(searchTextAsArray);
                        iterator.each(function(slice) {
                            slice = slice.trim();
                            index = Object.firstFromASlice(textNodeHashSet,
                                                             slice, index,
                                                             options
                                                             .caseSensitive);

                            if (index && ((options.orderlySearch &&
                                index > previousIndex) ||
                                !options.orderlySearch) &&
                                textNodeAsArray.countSlice(slice,
                                    options.caseSensitive) >=
                                    searchTextAsArray.count(slice)) {

                                previousIndex = index;

                                if (options.caseSensitive) {
                                    regexp = new RegExp(slice);
                                } else {
                                    regexp = new RegExp(slice, "i");
                                }

                                sliceIndex = textNodeAsArray[index]
                                    .search(regexp);
                                mapped[index] = textNodeAsArray[index]
                                    .slice(sliceIndex, sliceIndex + slice
                                           .length);
                                Object.delete(textNodeHashSet, index);
                                count += 1;
                            } else {
                                this.finalize();
                            }
                        });

                        if (count == searchTextAsArray.length) {
                            return mapped;
                        }
                    }

                    return false;
                },

                // resolveList = function(list, order = "desc") {
                resolveList = function(list, order) {
                    if (order != "asc") {order = "desc";}
                    var
                        textNode,
                        mapped,
                        textNodeAsArray,
                        sorted,
                        found = {elements: $(), maps: []},
                        textBoxContentArr = searchTextBox.value().split(" ")
                            .compact();

                    if (list.elements().count() == 1 &&
                        list.instanceOf(window.Element)) {
                        list = list.childElements();
                    }

                    if (order == "asc") {
                        sorted = list.ascendingSortTextNode();
                    } else {
                        sorted = list.descendingSortTextNode();
                    }

                    sorted.each(function(element) {
                        textNode = $(element).textContent().trim();
                        textNodeAsArray = textNode.split(" ");
                        mapped = mapIf(textBoxContentArr, textNodeAsArray);
                        if (mapped) {
                            found.elements.push(element);
                            found.maps.push(mapped);
                        }
                    });

                    return found;
                };

            resolveArguments(options);

            // init
            if (Object.getPrototypeOf(elementsList) != Object.prototype) {
                offlineSearch(elementsList, options);
            } else {
                options = elementsList;
                remoteSearch(options);
            }
        }

    });

})(esPhinx);


 // 08/2012 - 02/2016