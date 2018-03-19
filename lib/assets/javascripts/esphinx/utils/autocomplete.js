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
                elements2Recovery = [],
                afterAmountCharacters = options.afterAmountCharacters,

                resolveArguments = function(options) {
                    if (!Object.belongToClass(options, Object)) {
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
                        previousElement,
                        previousSearchText = "";

                    if (typeof eventListenerMethod == "function") {
                        searchTextBox.off("input", eventListenerMethod);
                    }

                    eventListenerMethod = function(e) {
                        previousElement = previousElement || element
                            .clone(true);

                        var
                            resolvedList,
                            foundElements,
                            resolvedElementsParent,
                            searchTextLength = searchTextBox.value().length;

                        if (searchTextBox.value()) {

                            if (searchTextLength < previousSearchText.length) {
                                previousElement = element.clone(true);
                            }

                            previousSearchText = searchTextBox.value();
                            resolvedList = resolveList(previousElement,
                                options.order);
                            foundElements = resolvedList.elements;

                            if (foundElements.some()) {
                                resolvedElementsParent = previousElement
                                    .clone();
                                previousElement = resolvedElementsParent
                                    .append(resolvedList.elements);
                            }

                            callback.call($(this), foundElements, resolvedList
                                          .maps, e);
                        } else {
                            // reset
                            elements2Recovery = [];
                            previousSearchText = "";
                            previousElement = element.clone(true);
                            callback.call($(this), $(), e);
                        }

                    };

                    searchTextBox.on("input", eventListenerMethod);
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
                                            elements2Recovery.push(element);

                                            // completeOften = (searchTextBox
                                            //     .value().length -
                                            //     afterAmountCharacters) + 1;

                                            // complete2Recovery(element,
                                            //                completeOften);
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
                            .asCountableLiteral(textNodeAsArray),
                        mapped = {},
                        amount = 0,
                        index = 0,
                        previousIndex = -1,

                        callback = function(slice) {
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
                                    searchTextAsArray.amount(slice)) {

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
                                Object.delete(index, textNodeHashSet);
                                amount += 1;
                            } else {
                                this.finalize();
                            }
                        };

                    if (textNodeHashSet.length >= searchTextAsArray.length) {
                        iterator = Iterable.Proxy.new(searchTextAsArray);
                        iterator.each(callback);

                        if (amount == searchTextAsArray.length) {
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
                            .compact(),

                        callback = function(element) {
                            textNode = $(element).textContent().trim();
                            textNodeAsArray = textNode.split(" ");
                            mapped = mapIf(textBoxContentArr, textNodeAsArray);
                            if (mapped) {
                                found.elements.push(element);
                                found.maps.push(mapped);
                            }
                        };

                    if (list.elements().amount() == 1 &&
                        list.isA(window.Element)) {
                        list = list.childElements().clone(true);
                    }

                    if (order == "desc") {
                        sorted = list.orderTextNodeByDesc();
                    } else {
                        sorted = list.orderTextNodeByAsc();
                    }

                    sorted.each(callback);

                    return found;
                };

            resolveArguments(options);

            // init
            if (!Object.belongToClass(elementsList, Object)) {
                inlineSearch(elementsList, options);
            } else {
                options = elementsList;
                remoteSearch(options);
            }
        }

    });

})(esPhinx);
