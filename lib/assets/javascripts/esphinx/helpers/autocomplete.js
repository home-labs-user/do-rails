// require esphinx/support/jquery
// require esphinx/support/ajax
// require esphinx/support/string
// require esphinx/support/array

"use strict";

var
    jQuery,
    Ajax,
    esPhinx;

(function ($) {

    $.extend({

        prototype: {

            autocomplete: function (nodeObject, options, callback) {

                const
                    CSS_CLASS = "esphinx ui";

                var
                    ajax = Ajax,
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
                            searchTextBox.off("keyup", offlineListener);
                            searchTextBox.off("focus", offlineListener);
                        }

                        offlineListener = function (e) {
                            if (searchTextBox.value()) {
                                if (searchTextBox.value().length > amountChar
                                    && !nonCharacterKeysPattern.test(e.key)
                                    ) {
                                    inline = true;
                                } else {
                                    inline = false;
                                }

                                resolvedAnswer = resolveAnswer(nodeObject,
                                    options.order);
                                callback.call($(this), resolvedAnswer.nodes,
                                    resolvedAnswer.maps, e);
                            } else {
                                callback.call($(this), $(), e);
                            }

                        }

                        searchTextBox.on("keyup", offlineListener);
                        searchTextBox.on("focus", offlineListener);
                    },

                    remoteSearch = function (options) {
                        var
                            amountChar = resolveAmountChar(options),
                            nodeObject,
                            params,
                            resolvedAnswer,

                            request = function (e) {
                                if (options.remote.params) {
                                    params = options.remote.params
                                        .call(searchTextBox);
                                }

                                if (!inline) {
                                    ajax.new(options.remote.url
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
                                }
                            };

                        searchTextBox.on("input", function (e) {
                            if (searchTextBox.value().length >= amountChar
                                && options.remote) {
                                request(e);
                            }
                        });

                        searchTextBox.on("keyup", function (e) {
                            if (searchTextBox.value().length === amountChar
                                && !nonCharacterKeysPattern.test(e.key)
                                && !inline
                                && options.remote) {

                                $(e.target).on("keypress", function (e) {
                                    e.preventDefault();
                                });

                                request(e);
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
                                .arrayToObject(nodeTextAsArray),
                            mapped = {},
                            count = 0,
                            lastIndex = -1,
                            index;

                        if (nodeTextAsObject.length
                            >= searchTextAsArray.length) {

                            for (let slice of searchTextAsArray) {
                                slice = slice.trim();

                                index = Object.firstOfSlice(nodeTextAsObject,
                                    slice);
                                if (index
                                    && index > lastIndex
                                    && nodeTextAsArray.countItemSlice(slice)
                                    >= searchTextAsArray.countItem(slice)
                                ) {
                                    lastIndex = index;
                                    mapped[index] = slice;
                                    Object.delete(nodeTextAsObject, index);
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
                if (nodeObject.constructor !== Object) {
                    offlineSearch(nodeObject, options);
                } else {
                    options = nodeObject;
                    remoteSearch(options);
                }
            }
        }

    });

})(esPhinx);
