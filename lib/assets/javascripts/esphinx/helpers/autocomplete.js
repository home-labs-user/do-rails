// require esphinx/support/jquery
// require esphinx/support/ajax
// require esphinx/support/string
// require esphinx/support/array

"use strict";

var
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            autocomplete: function (nodeObject, options, callback) {

                const
                    CSS_CLASS = "esphinx ui";

                var
                    nonCharacterKeysPattern = new RegExp(esPhinx
                        .nonCharacterKeysPattern()),
                    inline = false,
                    searchTextBox = this,
                    offlineListener,

                    resolveAmountChar = function (options) {
                        if (options.afterAmountChar) {
                            return options.afterAmountChar;
                        } else {
                            return 1;
                        }
                    },

                    offlineSearch = function (nodeObject, options) {
                        var
                            amountChar = resolveAmountChar(options),
                            resolvedAnswer;

                        if (typeof offlineListener === "function") {
                            searchTextBox.off("input", offlineListener);
                            searchTextBox.off("focus", offlineListener);
                        }

                        offlineListener = function (e) {
                            if (searchTextBox.value()) {
                                resolvedAnswer = resolveAnswer(nodeObject,
                                    options.order);
                                callback.call($(this), resolvedAnswer.nodes,
                                    resolvedAnswer.maps, e);
                            } else {
                                callback.call($(this), $(), e);
                            }

                        }

                        searchTextBox.on("input", offlineListener);
                        searchTextBox.on("focus", offlineListener);
                    },

                    remoteSearch = function (options) {
                        var
                            amountChar = resolveAmountChar(options),
                            searchTextBoxAsNode = searchTextBox.asNode(),
                            word,
                            prevText,
                            nextText,
                            nodeObject,
                            params,
                            resolvedAnswer,
                            clipboardData,

                            request = function (e) {
                                if (options.remote.params) {
                                    params = options.remote.params
                                        .call(searchTextBox);
                                }

                                $.Ajax.new(options.remote.url
                                    .call(searchTextBox), {
                                    params: params,
                                    progress: function (xhr) {
                                        if (options.remote.loading) {
                                            options.remote
                                                .loading(xhr, e);
                                        }
                                    },
                                    complete: function () {
                                        $(e.target).off("keypress");
                                    },
                                    success: function (a) {
                                        nodeObject = $(a);
                                        resolvedAnswer = resolveAnswer(
                                            nodeObject, options.order);
                                        callback.call(searchTextBox,
                                            resolvedAnswer.nodes,
                                            resolvedAnswer.maps, e);
                                        if (nodeObject.length) {
                                            offlineSearch(nodeObject,
                                                options);
                                        }
                                    }
                                });
                            };

                        searchTextBox.on("keyup", function (e) {
                            word = searchTextBox.value();

                            if (word.length > amountChar) {
                                inline = true;
                            } else if (word.length < amountChar) {
                                inline = false;
                            }

                            if (word.length === amountChar
                                && !nonCharacterKeysPattern.test(e.key)
                                && !inline
                                && options.remote) {
                                $(e.target).on("keypress", function (e) {
                                    e.preventDefault();
                                });

                                request(e);
                            }

                        });

                        searchTextBox.on("paste", function (e) {
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

                            if (word.length >= amountChar
                                && !inline
                                && options.remote) {
                                searchTextBox.value(word);

                                request(e);
                                e.preventDefault();
                            }
                        });

                    },

                    // resolveAnswer = function (nodeCollection, order = "desc") {
                    resolveAnswer = function (nodeCollection, order) {
                        if (order !== "asc") {order = "desc";}
                        var
                            found = {nodes: $(), maps: []},
                            textBoxContentArr = searchTextBox.value().toLowerCase()
                                .trim().split(" "),
                            nodeText,
                            mapped,
                            nodeTextAsObject;

                        if (nodeCollection.count() === 1 &&
                            (nodeCollection.tagName() === "ul" ||
                            nodeCollection.tagName() === "ol")) {
                            nodeCollection = nodeCollection.childElements();
                        }

                        nodeCollection.sort(order).each(function (node) {
                            nodeText = $(node).textContent().toLowerCase().trim();
                            nodeTextAsObject = nodeText.split(" ");
                            mapped = map(textBoxContentArr, nodeTextAsObject);

                            if (mapped) {
                                found.nodes.push(node);
                                found.maps.push(mapped);
                            }

                        });

                        return found;
                    },

                    map = function (searchTextAsArray, nodeTextAsArray) {
                        var
                            nodeTextAsObject = Object
                                .asObject(nodeTextAsArray),
                            mapped = {},
                            count = 0,
                            lastIndex = -1,
                            index = 0;

                        if (nodeTextAsObject.length
                            >= searchTextAsArray.length) {

                            for (let slice of searchTextAsArray) {
                                slice = slice.trim();

                                index = $.Object.firstOfSlice(nodeTextAsObject,
                                    slice, index);

                                if (index
                                    && nodeTextAsArray.countItemSlice(slice)
                                    >= searchTextAsArray.countItem(slice)
                                ) {
                                    lastIndex = index;
                                    mapped[index] = slice;
                                    $.Object.delete(nodeTextAsObject, index);
                                    count += 1;
                                } else {
                                    break;
                                }
                            }

                            if (count === searchTextAsArray.length) {
                                return mapped;
                            }
                        }

                        return false;
                    };

                // init
                // if (nodeObject.constructor !== Object) {
                if (Object.getPrototypeOf(nodeObject)
                    !== Object.getPrototypeOf({})) {
                    offlineSearch(nodeObject, options);
                } else {
                    options = nodeObject;
                    remoteSearch(options);
                }
            }
        }

    });

})(esPhinx);
