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

    $.prototype.autocomplete = function (contentCollection, options, callback) {
        const
            MODULE_CSS = "esphinx-ui";

        var
            self = this,
            ajax = Ajax,
            nonCharacterKeysPattern = new RegExp(esPhinx
                .nonCharacterKeysPattern()),

            inline = false,
            remote = false,

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

                    return mapped;
                }

                return false;
            },

            composeName = function (composedArr, node) {
                var
                    copy = $(node.cloneNode());

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
                    .addClass(MODULE_CSS + "-slice-found");

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

            offlineSearch = function (contentCollection, options) {
                var
                    amountChar = resolveAmountChar(options);

                self.on("keyup", function (e) {

                    if (self.value()) {
                        if (self.value().length >= amountChar
                            && !nonCharacterKeysPattern.test(e.key)
                            && !remote) {
                            inline = true;
                            callback(resolveAnswer(
                                contentCollection, options.order), e);
                        } else {
                            inline = false;
                        }
                    } else {
                        callback([], e);
                    }
                });
            },

            remoteSearch = function (options) {
                var
                    amountChar = resolveAmountChar(options),
                    object,
                    params;

                self.on("keyup", function (e) {
                    if (self.value().length === amountChar
                        && !nonCharacterKeysPattern.test(e.key)
                        && !inline) {
                        remote = true;

                        if (options.remote) {

                            if (options.remote.params) {
                                params = options.remote.params.call(self);
                            }
                            ajax.new(options.remote.url, {
                                params: params,
                                success: function (a) {
                                    $(e.target).off("keypress");
                                    object = $(a);
                                    callback(resolveAnswer(
                                        object, options.order), e);
                                    if (object.length) {
                                        offlineSearch(object, options);
                                    }
                                }
                            })
                            .processing(function (xhr) {
                                if (options.remote.processing) {
                                    options.remote.processing(xhr, e);
                                }

                                $(e.target).on("keypress", function (e) {
                                    // debugger
                                    e.preventDefault();
                                });
                            });
                        }
                    } else if (self.value().length > amountChar) {
                        remote = false;
                    }
                });
            },

            resolveAnswer = function (nodeCollection, order = "asc") {
                var
                    found = $(),
                    tagName = nodeCollection.tagName().toLowerCase(),
                    mapped,
                    composed,
                    nodeText,
                    nodeTextAsArr;

                nodeCollection.sort(order).each(function (node) {
                    nodeText = $(node).text().toLowerCase().trim();
                    nodeTextAsArr = nodeText.split(" ");
                    mapped = map(self, nodeText, nodeTextAsArr);
                    if (mapped) {
                        composed = composeMatch(mapped, nodeText, nodeTextAsArr);
                        found.concat(true, composeName(composed, node));
                    }

                });

                return found;
            };

        // init
        if (contentCollection.constructor !== Object) {
            offlineSearch(contentCollection, options);
        } else {
            callback = options;
            options = contentCollection;

            remoteSearch(options);
        }
    };

})(esPhinx);
