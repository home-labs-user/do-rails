var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    $.prototype.extend({

        autocomplete: function(elementsList, options, callback) {
            var
                searchTextBox = this,
                nonCharacterKeysPattern = new RegExp($
                    .nonCharacterKeysPattern()),
                inline = false,

                resolveArguments = function(options) {
                    if (Object.getPrototypeOf(options) !=
                        Object.getPrototypeOf({})) {
                        options = {};
                    }

                    if (!options.caseSensitive ||
                        typeof options.caseSensitive != "boolean") {
                        options.caseSensitive = false;
                    }

                    if (!options.orderlySearch ||
                        typeof options.orderlySearch != "boolean") {
                        options.orderlySearch = false;
                    }

                    if (!options.afterAmountChar ||
                        typeof options.afterAmountChar != "number") {
                        options.afterAmountChar = 1;
                    }

                },

                inlineSearch = function(elements, options) {
                    var
                        eventListenerMethod,
                        resolvedList,
                        resolvedElementsParent,
                        foundElements,
                        i,
                        currentSearchText = searchTextBox.value(),
                        currentElements = elements.clone(true),
                        elements2Recovery = [];

                    if (typeof eventListenerMethod == "function") {
                        searchTextBox.off("input", eventListenerMethod);
                        searchTextBox.off("focus", eventListenerMethod);
                    }

                    eventListenerMethod = function(e) {
                        if (searchTextBox.value()) {

                            // when delete
                            if (searchTextBox.value().length <
                                currentSearchText.length) {

                                i = searchTextBox.value().length +
                                    options.afterAmountChar - 2;

                                if (i < elements2Recovery.length) {
                                    currentElements = elements2Recovery[i];
                                }
                            }

                            resolvedList = resolveList(currentElements,
                                options.order);
                            foundElements = resolvedList.elements;

                            if (foundElements.some()) {
                                elements2Recovery.push(foundElements);
                                resolvedElementsParent = foundElements
                                    .parent().first().clone();
                                currentElements = resolvedElementsParent
                                    .append(foundElements);
                            }

                            currentSearchText = searchTextBox.value();

                            callback.call($(this), foundElements, resolvedList
                                          .maps, e);
                        } else {
                            // a clone must be done because a change in one doesn't will be done on other
                            elements2Recovery = [];
                            currentElements = elements.clone(true);
                            callback.call($(this), $(), e);
                        }

                    };

                    searchTextBox.on("input", eventListenerMethod);
                    searchTextBox.on("focus", eventListenerMethod);
                },

                remoteSearch = function(options) {
                    var
                        word,
                        prevText,
                        nextText,
                        elements,
                        params,
                        resolvedList,
                        clipboardData,
                        amountChar = options.afterAmountChar,

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
                                success: function(r) {
                                    elements = $(r);
                                    // debugger
                                    resolvedList = resolveList(
                                        elements, options.order);
                                    callback.call(searchTextBox,
                                        resolvedList.elements,
                                        resolvedList.maps, e);
                                    if (elements.length) {
                                        inlineSearch(elements, options);
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

                    // debugger
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
                inlineSearch(elementsList, options);
            } else {
                options = elementsList;
                remoteSearch(options);
            }
        }

    });

})(esPhinx);
