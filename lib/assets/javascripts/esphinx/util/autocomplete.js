var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    $.prototype.extend({

        autocomplete: function(elementsList, options, callback) {
            var
                times,
                searchTextBox = this,
                nonCharacterKeysPattern = new RegExp($
                    .nonCharacterKeysPattern()),
                inline = false,
                elements2Recovery = [],
                i = 0,

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

                    if (typeof options.afterAmountChar != "number") {
                        options.afterAmountChar = 1;
                    }

                },

                inlineSearch = function(elements, options) {
                    var
                        eventListenerMethod,
                        currentElements = elements.clone(true),
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
                            startingIndex,
                            finalIndex;

                        if (searchTextBox.value()) {

                            times = previousSearchText.length -
                                searchTextBox.value().length;

                            startingIndex = searchTextBox.cursorPosition() -
                                times;
                            finalIndex = startingIndex + times - 1;

                            // when delete
                            if (searchTextBox.value().length <
                                previousSearchText.length) {

                                elements2Recovery.delete(startingIndex,
                                                         finalIndex);

                                i = elements2Recovery.lastIndex();
                                currentElements = elements2Recovery[i];
                            }

                            // debugger
                            resolvedList = resolveList(currentElements,
                                options.order);
                            debugger
                            foundElements = resolvedList.elements;

                            if (foundElements.some()) {

                                // debugger
                                // if (times < 0) {
                                //     // o i não deve ser 0, mas onde o cursor está. Assim o times deve ser revisto para acompanhar a lógica
                                //     i = 0;
                                //     // colocar um if aqui para não executar essa operação em caso de remoção de elemento para que ele não retorne à lista. E este teste se dará verificando se previousSearchText.length < searchTextBox.value().length
                                //     debugger
                                //     while(i++ < times) {
                                //         // não fazer push, mas .insertAt
                                //         elements2Recovery.push(foundElements);
                                //     }
                                //     debugger
                                // }

                                resolvedElementsParent = foundElements
                                    .parent().first().clone();
                                // debugger
                                currentElements = resolvedElementsParent
                                    .append(foundElements);
                                // debugger
                            }

                            previousSearchText = searchTextBox.value();

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
                        URLParameters,
                        resolvedList,
                        clipboardData,
                        amountChar = options.afterAmountChar,

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
                                        elements = $(r);

                                        if (elements.some()) {
                                            times = (searchTextBox.value()
                                                .length - options
                                                .afterAmountChar) + 1;
                                            while (i++ < times) {
                                                elements2Recovery
                                                    .push(elements);
                                            }
                                        }

                                        resolvedList = resolveList(elements,
                                                                options.order);
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
                            .slice(0, searchTextBox.cursorPosition());
                        nextText = word
                            .slice(searchTextBox.selectionEnd(), word.length);

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
