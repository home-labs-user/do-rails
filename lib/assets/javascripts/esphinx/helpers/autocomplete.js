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
                    remote = false,
                    offlineEventLinked = false,
                    searchTextBox = this,

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

                        if (!offlineEventLinked) {
                            offlineEventLinked = true;
                            searchTextBox.on("keyup", function (e) {
                                if (searchTextBox.value()) {
                                    if (searchTextBox.value().length
                                        >= amountChar
                                        && !nonCharacterKeysPattern.test(e.key)
                                        && !remote) {
                                        inline = true;
                                    } else {
                                        inline = false;
                                    }
                                    resolvedAnswer = resolveAnswer(nodeObject,
                                        options.order);
                                    callback.call(this, resolvedAnswer.nodes,
                                        resolvedAnswer.maps, e);
                                } else {
                                    callback.call(this, $(), e);
                                }
                            });
                        }
                    },

                    remoteSearch = function (options) {
                        var
                            amountChar = resolveAmountChar(options),
                            nodeObject,
                            params,
                            resolvedAnswer;

                        searchTextBox.on("keyup", function (e) {
                            if (searchTextBox.value().length === amountChar
                                && !nonCharacterKeysPattern.test(e.key)
                                && !inline) {

                                if (options.remote) {
                                    $(e.target).on("keypress", function (e) {
                                        e.preventDefault();
                                    });

                                    if (options.remote.params) {
                                        params = options.remote.params
                                            .call(searchTextBox);
                                    }
                                    if (!remote) {
                                        remote = true;
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
                                                remote = false;
                                                $(e.target).off("keypress");
                                            },
                                            success: function (a) {
                                                nodeObject = $(a);
                                                resolvedAnswer = resolveAnswer(
                                                    nodeObject, options.order);
                                                callback.call(this,
                                                    resolvedAnswer.nodes,
                                                    resolvedAnswer.maps, e);
                                                if (nodeObject.length) {
                                                    offlineSearch(nodeObject,
                                                        options);
                                                }
                                            }
                                        });
                                    }
                                }
                            } else if (searchTextBox.value().length
                                > amountChar) {
                                remote = false;
                            }
                        });

                    },

                    // resolveAnswer = function (nodeCollection, order) {
                    //     if (order !== "desc") {order = "asc";}
                    resolveAnswer = function (nodeCollection, order = "desc") {
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
