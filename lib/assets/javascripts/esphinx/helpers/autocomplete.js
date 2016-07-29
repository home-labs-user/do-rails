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
                    self = this,
                    ajax = Ajax,
                    nonCharacterKeysPattern = new RegExp(esPhinx
                        .nonCharacterKeysPattern()),

                    inline = false,
                    remote = false,
                    offlineEventLinked = false,

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
                            self.on("keyup", function (e) {
                                if (self.value()) {
                                    if (self.value().length >= amountChar
                                        && !nonCharacterKeysPattern.test(e.key)
                                        && !remote) {
                                        inline = true;
                                    } else {
                                        inline = false;
                                    }
                                    resolvedAnswer = resolveAnswer(nodeObject,
                                        options.order);
                                    callback.call(self, resolvedAnswer.nodes,
                                        resolvedAnswer.maps, e);
                                } else {
                                    callback.call(self, $(), e);
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

                        self.on("keyup", function (e) {
                            if (self.value().length === amountChar
                                && !nonCharacterKeysPattern.test(e.key)
                                && !inline) {

                                if (options.remote) {
                                    $(e.target).on("keypress", function (e) {
                                        e.preventDefault();
                                    });

                                    if (options.remote.params) {
                                        params = options.remote.params
                                            .call(self);
                                    }
                                    if (!remote) {
                                        remote = true;
                                        ajax.new(options.remote.url
                                            .call(self), {
                                            params: params,
                                            progress: function (xhr) {
                                                if (options.remote.loading) {
                                                    options.remote
                                                        .loading(xhr, e);
                                                }
                                            },
                                            complete: function () {
                                                // debugger
                                                remote = false;
                                                $(e.target).off("keypress");
                                            },
                                            success: function (a) {
                                                nodeObject = $(a);
                                                resolvedAnswer = resolveAnswer(
                                                    nodeObject, options.order);
                                                // debugger
                                                callback.call(self,
                                                    resolvedAnswer.nodes,
                                                    resolvedAnswer.maps, e);
                                                if (nodeObject.length) {
                                                    // debugger
                                                    offlineSearch(nodeObject,
                                                        options);
                                                }
                                            }
                                        });
                                    }
                                }
                            } else if (self.value().length > amountChar) {
                                remote = false;
                            }
                        });
                    },

                    resolveAnswer = function (nodeCollection, order = "desc") {
                    // resolveAnswer = function (nodeCollection, order) {
                        // if (order !== "desc") {order = "asc";}
                        var
                            found = {nodes: $(), maps: []},
                            textBoxContentArr = self.value().toLowerCase()
                                .trim().split(" "),
                            nodeText,
                            mapped,
                            nodeTextAsObject;

                        if (nodeCollection.count() === 1 &&
                            (nodeCollection.tagName() === "ul" ||
                            nodeCollection.tagName() === "ol")) {
                            // debugger
                            nodeCollection = nodeCollection.childNodes();
                        }

                        nodeCollection.sort(order).each(function (node) {
                            nodeText = $(node).text().toLowerCase().trim();
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
                            count = 0,
                            nodeTextAsObject = Object
                                .arrayToObject(nodeTextAsArray),
                            mapped = {},
                            firstIndex,
                            index;

                        if (nodeTextAsObject.length
                            >= searchTextAsArray.length) {

                            for (let slice of searchTextAsArray) {
                                slice = slice.trim();

                                firstIndex = nodeTextAsArray
                                    .firstOfSlice(slice);
                                if (firstIndex > 0) {
                                    for (let i=0; i < firstIndex; i++) {
                                        Object.delete(nodeTextAsObject, i);
                                    }
                                }

                                index = Object.firstOfSlice(nodeTextAsObject,
                                    slice);

                                if (!index || searchTextAsArray.countItem(slice)
                                    > nodeTextAsArray.countItemSlice(slice)) {
                                } else {
                                    mapped[index] = slice;
                                    Object.delete(nodeTextAsObject, index);
                                    count += 1;
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
