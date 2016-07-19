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

    $.prototype.autocomplete = function (nodeObject, options, callback) {

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

                return
            },

            map = function (textBox, nodeText, nodeTextAsArr) {
                var
                    textBoxContentArr = textBox.value().toLowerCase().trim()
                        .split(" "),
                    mapped = {};

                if (matches(textBoxContentArr, nodeText)) {
                    textBoxContentArr.forEach(function (value) {
                        nodeTextAsArr.pieceIndex(value)
                            .forEach(function (i) {
                            // spanize on iterator
                            // mapped[i] = spanize(value);
                            mapped[i] = value;
                        });
                    });

                    return mapped;
                }

                return false;
            },

            matches = function (textBoxContentAsArr, comparatedText) {
                var
                    i = 0,
                    count = 0,
                    searchIndex;

                while (true) {
                    searchIndex = comparatedText.search(textBoxContentAsArr[i]);
                    if (searchIndex !== -1) {
                        count += 1;
                    }

                    i += 1;
                    if (i === textBoxContentAsArr.length) {
                        break;
                    }

                }

                if (count === textBoxContentAsArr.length) {
                    return true;
                }

                return false;
            },

            resolveAnswer = function (nodeCollection, order = "desc") {
            // resolveAnswer = function (nodeCollection, order) {
                // if (order !== "desc") {order = "asc";}
                var
                    found = {nodes: $(), maps: []},
                    nodesFound = $(),
                    maps = [],
                    tagName = nodeCollection.tagName().toLowerCase(),
                    mapped,
                    composed,
                    nodeText,
                    nodeTextAsArr;

                nodeCollection.childNodes().sort(order).each(function (node) {
                    nodeText = $(node).text().toLowerCase().trim();
                    nodeTextAsArr = nodeText.split(" ");
                    mapped = map(self, nodeText, nodeTextAsArr);
                    if (mapped) {
                        // composed = composeMatch(mapped, nodeText,
                        //     nodeTextAsArr);
                        // debugger
                        // found.concat(true, composeName(composed, node));

                        found.nodes.push(node);
                        found.maps.push(mapped);
                    }

                });

                return found;
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
                                params = options.remote.params.call(self);
                            }
                            if (!remote) {
                                remote = true;
                                ajax.new(options.remote.url.call(self), {
                                    params: params,
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
                                            offlineSearch(nodeObject, options);
                                        }
                                    }
                                })
                                .processing(function (xhr) {
                                    if (options.remote.processing) {
                                        options.remote.processing(xhr, e);
                                    }
                                });
                            }
                        }
                    } else if (self.value().length > amountChar) {
                        remote = false;
                    }
                });
            };

        // init
        if (nodeObject.constructor !== Object) {
            offlineSearch(nodeObject, options);
        } else {
            options = nodeObject;
            remoteSearch(options);
        }
    };

})(esPhinx);
