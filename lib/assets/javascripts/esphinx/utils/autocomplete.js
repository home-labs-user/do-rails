var
    esPhinx,
    Iterable;


(function ($) {
    "use strict";

    $.prototype.extend({

        // callback no método research
        autocomplete: function (list, options, callback) {
            var
                searchTextBox = this,
                nonCharacterKeysPattern = new RegExp($
                    .nonCharacterKeysPattern()),
                inline = false,
                elements2Recovery = [],
                afterAmountCharacters = options.afterAmountCharacters,

                resolveArguments = function (options) {
                    if (!Object.belongsToClass(options, Object)) {
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

                inlineSearch = function (element, options) {
                    var
                        eventListenerMethod,
                        cachedElements,
                        cachedSearchText = "";

                    if (typeof eventListenerMethod == "function") {
                        searchTextBox.off("input", eventListenerMethod);
                    }

                    eventListenerMethod = function (e) {
                        cachedElements = cachedElements || element
                            .clone();

                        var
                            resolvedList,
                            foundElements = [];

                        if (searchTextBox.value()) {

                            // on delete
                            if (Object.belongsToClass(e, window.InputEvent) &&
                                e.inputType == "deleteContentBackward") {
                                cachedElements = element.clone();
                            }

                            cachedSearchText = searchTextBox.value();
                            resolvedList = resolveList(cachedElements,
                                options.order);

                            foundElements = resolvedList.elements;

                            if (foundElements.some()) {
                                cachedElements = resolvedList.elements;
                            }

                            // debugger
                            callback.call($(this), resolvedList.maps, e);
                        } else {
                            // reset
                            elements2Recovery = [];
                            cachedSearchText = "";
                            cachedElements = element.clone();
                            callback.call($(this), [{}], e);
                        }

                    };

                    searchTextBox.on("input", eventListenerMethod);
                },

                remoteSearch = function (options) {
                    var
                        word,
                        prevText,
                        nextText,
                        element,
                        URLParameters,
                        resolvedList,
                        clipboardData,

                        request = function (e) {
                            if (options.remote.URLParameters) {
                                URLParameters = options.remote.URLParameters
                                    .call(searchTextBox);
                            }

                            $.Ajax.new(options.remote.url.call(searchTextBox))
                                .get({
                                    URLParameters: URLParameters,
                                    progress: function (xhr) {
                                        if (options.remote.loading) {
                                            options.remote
                                                .loading(xhr, e);
                                        }
                                    },
                                    complete: function () {
                                        $(e.target).off("keypress");
                                    },
                                    success: function (r) {
                                        element = $(r);

                                        if (element.some()) {
                                            elements2Recovery.push(element);
                                        }
                                        resolvedList = resolveList(element,
                                            options.order).maps;
                                        callback.call(searchTextBox,
                                            resolvedList,
                                            e);
                                        if (element.length) {
                                            inlineSearch(element, options);
                                        }
                                    }
                                });
                        };

                    searchTextBox.on("keyup", function (e) {
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
                            $(e.target).on("keypress", function (e) {
                                e.preventDefault();
                            });

                            request(e);
                        }

                    });

                    searchTextBox.on("paste", function (e) {
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

                // resolveList = function (list, order = "desc") {
                resolveList = function (list, order) {
                    if (order != "asc") { order = "desc"; }
                    var
                        text,
                        map,
                        wordList,
                        sorted,
                        maps = { maps: [], elements: $() },
                        textBoxContentArr = searchTextBox.value().split(" ")
                            .compact(),

                        callback = function (element) {
                            text = $(element).textContent().trim();
                            wordList = text.split(" ");
                            //map = autocomplete.complete(, options);...
                            map = mapIf(textBoxContentArr, wordList);
                            if (map) {
                                maps.maps.push(map);
                                maps.elements.push(element);
                            }
                        };

                    if (list.isA(window.Element)) {
                        list = list.clone();
                    }

                    if (order == "desc") {
                        sorted = list.orderTextNodeByDesc();
                    } else {
                        sorted = list.orderTextNodeByAsc();
                    }

                    sorted.each(callback);

                    return maps;
                };

            resolveArguments(options);

            // init
            if (!Object.belongsToClass(list, Object)) {
                inlineSearch(list, options);
            } else {
                options = list;
                remoteSearch(options);
            }
        }

    });

})(esPhinx);
