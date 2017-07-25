var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    $.prototype.extend({

        autocomplete: function(elementsList, options, callback) {
            var
                fillOften,
                searchTextBox = this,
                nonCharacterKeysPattern = new RegExp($
                    .nonCharacterKeysPattern()),
                inline = false,
                elements2Recovery = [],
                afterAmountCharacters = options.afterAmountCharacters,

                fillInToRecovery = function(object, times) {
                    if (typeof times != "number") {times  = 1;}

                    var
                        i = 0;

                    while (i++ < times) {
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
                            foundElements,
                            startingIndex,
                            finalIndex,
                            foundElement,
                            previousElement = element,
                            parent = element.clone(),
                            searchTextLength = searchTextBox.value().length,
                            charactersDifference = previousSearchText.length -
                                    searchTextLength,

                            replaceLast = function(object) {
                                elements2Recovery.pop();
                                fillInToRecovery(object);
                            };

                        if (searchTextBox.value()) {

                            startingIndex = searchTextBox.cursorPosition() - 2;
                            finalIndex = startingIndex + charactersDifference -
                                1;

                            // when delete
                            if (searchTextLength < previousSearchText.length &&
                                searchTextLength >= afterAmountCharacters) {

                                if (startingIndex === 0) {
                                    elements2Recovery.delete(startingIndex,
                                        finalIndex);
                                } else {
                                    elements2Recovery.delete(startingIndex,
                                        elements2Recovery.lastIndex());
                                }
                                // debugger

                                previousElement = elements2Recovery[
                                        elements2Recovery.lastIndex()];
                            }

                            resolvedList = resolveList(previousElement,
                                options.order);
                            foundElements = resolvedList.elements;

                            debugger
                            if (searchTextLength > afterAmountCharacters ||
                                afterAmountCharacters == 1) {

                                if (foundElements.some()) {
                                    foundElement = parent
                                                         .append(foundElements);
                                    // there was a difference for more
                                    if (charactersDifference < 0) {
                                        fillOften = Math
                                            .abs(charactersDifference);
                                        fillInToRecovery(foundElement,
                                                       fillOften);
                                    } else {
                                        replaceLast(foundElement);
                                    }

                                    previousElement = foundElement;
                                } else {
                                    // there was a difference for less
                                    if (charactersDifference > 0) {
                                        // errado se deletar dois ou mais
                                        fillOften = searchTextLength -
                                            afterAmountCharacters +
                                            charactersDifference -
                                            elements2Recovery.length;
                                        debugger
                                    } else {
                                        fillOften = Math
                                            .abs(charactersDifference);
                                    }

                                    fillInToRecovery(previousElement,
                                                     fillOften);
                                }
                            }

                            // if (foundElements.some()) {

                            //     fillOften = searchTextLength -
                            //         elements2Recovery.length -
                            //         afterAmountCharacters + 1;

                            //     debugger
                            //     if ((charactersDifference < 0 &&
                            //         searchTextLength >
                            //         afterAmountCharacters) ||
                            //         afterAmountCharacters == 1) {

                            //         fillInToRecovery(parent
                            //                          .append(foundElements),
                            //                        fillOften);
                            //     }

                            //     previousElement = parent.append(foundElements);
                            // } else {
                            //     if (searchTextLength >
                            //         afterAmountCharacters ||
                            //         afterAmountCharacters == 1) {

                            //         fillInToRecovery(previousElements,
                            //                        fillOften);
                            //     }
                            // }

                            previousSearchText = searchTextBox.value();
                            callback.call($(this), foundElements, resolvedList
                                          .maps, e);
                        } else {
                            // reset
                            elements2Recovery = [];
                            previousSearchText = "";
                            previousElement = element;
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
                                            fillOften = (searchTextBox
                                                .value().length -
                                                afterAmountCharacters) + 1;

                                            fillInToRecovery(element,
                                                           fillOften);
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
