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

            composeMatch = function (mapped, nodeText, nodeTextAsArr) {
                var
                    composedArr = [],
                    leftUnitName,
                    rightUnitName,
                    searchIndex,
                    sliceFound,
                    itemAsLower,
                    span;

                nodeTextAsArr.spaceOut().capitalize()
                .forEach(function (value, i) {
                    if (mapped.hasOwnProperty(i)) {
                        span = mapped[i].first();
                        itemAsLower = value.toLowerCase();
                        sliceFound = span.textContent;
                        searchIndex = itemAsLower.search(sliceFound);
                        leftUnitName = itemAsLower.slice(0, searchIndex);
                        rightUnitName = itemAsLower.slice(searchIndex
                            + sliceFound.length, itemAsLower.length);

                        if (leftUnitName.present()) {
                            composedArr
                                .push(capitalizeIf(leftUnitName, nodeText));
                        } else {
                            span.textContent = capitalizeIf(span
                                .textContent, nodeText);
                        }

                        composedArr.push(span);

                        if (rightUnitName.present()) {
                            composedArr.push(rightUnitName);
                        }
                    } else {
                        composedArr.push(value);
                    }

                });

                return composedArr;
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

            map = function (textBox, nodeText, nodeTextAsArr) {
                var
                    textBoxContentArr = textBox.value().toLowerCase().trim()
                        .split(" "),
                    mapped = {};

                if (matches(textBoxContentArr, nodeText)) {
                    textBoxContentArr.forEach(function (value) {
                        nodeTextAsArr.pieceIndex(value)
                            .forEach(function (i) {
                            mapped[i] = spanize(value);
                        });
                    });

                    // debugger
                    return mapped;
                }

                return false;
            },

            composeName = function (composedArr, node) {
                var
                    copy = $(node).clone();

                composedArr.forEach(function (v) {
                    copy.append(v);
                });

                return copy;
            },

            capitalizeIf = function (word, nodeText) {
                var
                    searchIndex;

                searchIndex = nodeText.toLowerCase().trim().search(word);

                if (![searchIndex-1].present) {
                    return word.capitalize();
                } else {
                    return word;
                }
            },

            spanize = function (sliceFound) {
                var
                    spanizedSliceFound;

                spanizedSliceFound = $("<span></span>");

                spanizedSliceFound
                    .addClass(CSS_CLASS + " slice-found");

                spanizedSliceFound.text(sliceFound);

                return spanizedSliceFound;
            },

            resolveAmountChar = function (options) {
                if (options.afterAmountChar) {
                    return options.afterAmountChar;
                } else {
                    return 1;
                }

                return
            },

            offlineSearch = function (nodeObject, options) {
                var
                    amountChar = resolveAmountChar(options);

                if (!offlineEventLinked) {
                    offlineEventLinked = true;
                    self.on("keyup", function (e) {
                        if (self.value()) {
                            if (self.value().length >= amountChar
                                && !nonCharacterKeysPattern.test(e.key)
                                && !remote) {
                                inline = true;
                                // debugger
                                callback.call(self, resolveAnswer(
                                    nodeObject, options.order), e);
                            } else {
                                inline = false;
                            }
                        } else {
                            callback.call(self, $(), e);
                        }
                    });
                }
            },

            remoteSearch = function (options) {
                var
                    amountChar = resolveAmountChar(options),
                    collection,
                    params;

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
                            // debugger
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
                                        // debugger
                                        collection = $(a);
                                        callback.call(self, resolveAnswer(
                                            collection, options.order), e);
                                        if (collection.length) {
                                            offlineSearch(collection, options);
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
            },

            resolveAnswer = function (nodeCollection, order = "desc") {
            // resolveAnswer = function (nodeCollection, order) {
                // if (order !== "desc") {order = "asc";}

                var
                    found = $(),
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
                        composed = composeMatch(mapped, nodeText,
                            nodeTextAsArr);
                        found.concat(true, composeName(composed, node));
                    }

                });

                return found;
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
