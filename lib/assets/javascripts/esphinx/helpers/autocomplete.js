// require esphinx/support/jquery
// require esphinx/support/ajax
// require esphinx/support/string
// require esphinx/support/array

"use strict";

var
    jQuery,
    Ajax;

(function ($) {

    $.prototype.autocomplete = function (enumerableObject, options, callback) {
        const
            MODULE_CSS = "esphinx-ui";

        var
            self = $(this),
            ajax = Ajax,

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
                        span = mapped[i].get(0);
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
                    textBoxContentArr = textBox.val().toLowerCase().trim()
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

            unsetKeyUpEvent = function () {
                self.off("keyup");
            },

            offlineSearch = function (enumerableObject, options) {
                var
                    amountChar = resolveAmountChar(options);

                unsetKeyUpEvent();

                self.on("keyup", function (e) {

                    if (self.val()) {
                        if (self.val().length >= amountChar) {
                            callback(resolveAnswer(
                                enumerableObject, options.order), e);
                        }
                    } else {
                        callback([], e);
                    }
                });
            },

            remoteSearch = function (options) {
                var
                    amountChar = resolveAmountChar(options),
                    object;

                unsetKeyUpEvent();

                self.on("keyup", function (e) {
                    if (self.val().length === amountChar) {
                        options.remote.query(e, function (q) {
                            ajax.new(options.remote.url, {
                                params: q,
                                success: function (a) {
                                    $(e.target).off("keypress");
                                    object = $(a).find("li");
                                    callback(resolveAnswer(
                                        object, options.order), e);
                                    if (object.length) {
                                        self.autocomplete(
                                            object, options, callback);
                                    }
                                }
                            })
                            .processing(function (xhr) {
                                if (options.remote.processing) {
                                    options.remote.processing(xhr, e);
                                }
                                $(e.target).on("keypress", function (e) {
                                    e.preventDefault();
                                });
                            });
                        });
                    }
                });
            },

            // aqui está o que deve ser mudado
            resolveAnswer = function (enumerableObject, order = "asc") {
                // debugger
                var
                    found = [],
                    tagName = enumerableObject.prop("tagName").toLowerCase(),
                    mapped,
                    composed,
                    text,
                    textAsArr;

                // esse if não é necessário, basta retornar uma collection do tipo exPhinx com objetos tipo document.createTextNode
                if (tagName === "li") {
                    enumerableObject.sortByTextContent(order)
                    .each(function (i, node) {
                        text = node.textContent.toLowerCase().trim();
                        textAsArr = text.split(" ");
                        mapped = map(self, text, textAsArr);
                        if (mapped) {
                            composed = composeMatch(mapped, text,
                                textAsArr);
                            found.push(composeName(composed, node));
                        }

                    });
                }

                // debugger
                return $(found);
            };

        // init
        if (enumerableObject instanceof jQuery) {
            offlineSearch(enumerableObject, options);
        } else if (enumerableObject instanceof Object) {
            callback = options;
            options = enumerableObject;

            remoteSearch(options);
        }
    };

})(jQuery);
