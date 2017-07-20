var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    $.prototype.extend({

        autocomplete: function(elementsList, options, callback) {
            var
                charactersNumber,
                searchTextBox = this,
                nonCharacterKeysPattern = new RegExp($
                    .nonCharacterKeysPattern()),
                inline = false,
                elements2Recovery = [],
                afterAmountCharacters = options.afterAmountChar,

                fillInToRecovery = function(object, times) {
                    var
                        i = 0;

                    while (i++ < Math.abs(times)) {
                        elements2Recovery.push(object);
                    }
                },

                resolveArguments = function(options) {
                    if (Object.getPrototypeOf(options) !=
                        Object.getPrototypeOf({})) {
                        options = {};
                    }

                    if (typeof options.caseSensitive != "boolean") {
                        options.caseSensitive = false;
                    }

                    if (typeof options.orderlySearch != "boolean") {
                        options.orderlySearch = false;
                    }

                    if (typeof afterAmountCharacters != "number") {
                        afterAmountCharacters = 1;
                    }

                },

                inlineSearch = function(element, options) {
                    var
                        eventListenerMethod,
                        previousSearchText = searchTextBox.value();

                    if (typeof eventListenerMethod == "function") {
                        searchTextBox.off("input", eventListenerMethod);
                        searchTextBox.off("focus", eventListenerMethod);
                    }

                    eventListenerMethod = function(e) {
                        var
                            resolvedList,
                            resolvedElementsParent,
                            foundElements,
                            exclusionIndex,
                            finalIndex,
                            previousElements = element,
                            parent = element.clone(),
                            searchTextLength = searchTextBox.value().length,

                            restartList = function() {
                                previousElements = elements;
                            };

                        if (searchTextBox.value()) {
                            charactersNumber = previousSearchText.length -
                                searchTextLength;

                            exclusionIndex = searchTextBox.cursorPosition();
                            finalIndex = exclusionIndex + charactersNumber - 1;

                            // when delete
                            if (searchTextLength < previousSearchText.length &&
                                searchTextLength >= afterAmountCharacters) {

                                // debugger
                                if (exclusionIndex === 0) {
                                    elements2Recovery.delete(exclusionIndex,
                                        finalIndex);
                                } else {
                                    elements2Recovery.delete(exclusionIndex,
                                        elements2Recovery.lastIndex());
                                }

                                previousElements = elements2Recovery[
                                        elements2Recovery.lastIndex()];
                                // debugger
                            }

                            // debugger
                            resolvedList = resolveList(previousElements,
                                options.order);
                            foundElements = resolvedList.elements;

                            if (searchTextLength > afterAmountCharacters ||
                                afterAmountCharacters == 1) {

                                if (foundElements.some()) {
                                    if (charactersNumber < 0) {
                                        fillInToRecovery(parent
                                                         .append(foundElements),
                                                       charactersNumber);
                                    }

                                    previousElements = parent
                                        .append(foundElements);
                                } else {
                                    fillInToRecovery(parent
                                                     .append(previousElements),
                                                   charactersNumber);
                                }

                            }
                            // debugger

                            previousSearchText = searchTextBox.value();
                            callback.call($(this), foundElements, resolvedList
                                          .maps, e);
                        } else {
                            // reset
                            elements2Recovery = [];
                            previousSearchText = "";
                            previousElements = element;
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
                        element,
                        URLParameters,
                        resolvedList,
                        clipboardData,

                        request = function(e) {
                            if (options.remote.URLParameters) {
                                URLParameters = options.remote.URLParameters
                                    .call(searchTextBox);
                            }

                            $.Ajax.new(options.remote.url.call(searchTextBox))
                                .get({
                                    URLParameters: URLParameters,
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
                                        element = $(r);

                                        if (element.some()) {
                                            charactersNumber = (searchTextBox
                                                .value().length -
                                                afterAmountCharacters) + 1;

                                            fillInToRecovery(element,
                                                           charactersNumber);
                                        }

                                        resolvedList = resolveList(element,
                                                                options.order);
                                        callback.call(searchTextBox,
                                            resolvedList.elements,
                                            resolvedList.maps, e);
                                        if (element.length) {
                                            inlineSearch(element, options);
                                        }
                                    }
                                });
                        };

                    searchTextBox.on("keyup", function(e) {
                        word = searchTextBox.value();

                        if (word.length > afterAmountCharacters) {
                            inline = true;
                        } else if (word.length < afterAmountCharacters) {
                            inline = false;
                        }

                        if (word.length == afterAmountCharacters &&
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
                            .slice(0, searchTextBox.cursorPosition());
                        nextText = word
                            .slice(searchTextBox.selectionEnd(), word.length);

                        clipboardData = e.clipboardData.getData("text");

                        if (word.length >= afterAmountCharacters) {
                            inline = true;
                        } else {
                            inline = false;
                        }

                        word = prevText + clipboardData + nextText;

                        if (word.length >= afterAmountCharacters &&
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
                        list.isA(window.Element)) {
                        list = list.childElements().clone(true);
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
