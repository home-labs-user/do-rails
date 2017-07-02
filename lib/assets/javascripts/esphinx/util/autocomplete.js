var
    esPhinx,
    Iterable;


(function($) {
    "use strict";

    $.prototype.extend({

        // autocomplete: function(nodeObject, optionElements, options, callback) {
        autocomplete: function(nodeObject, options, callback) {
            var
                nonCharacterKeysPattern = new RegExp($
                    .nonCharacterKeysPattern()),
                inline = false,
                searchTextBox = this,
                offlineListener,

                resolveArguments = function(options) {
                    if (!options || Object.getPrototypeOf(options) !=
                        Object.getPrototypeOf({})) {
                        options = {};
                    } else {
                        if (!options.caseSensitive ||
                            typeof options.caseSensitive != "boolean") {
                            options.caseSensitive = false;
                        }

                        if (!options.orderlySearch ||
                            typeof options.orderlySearch != "boolean") {
                            options.orderlySearch = false;
                        }
                    }

                },

                resolveAmountChar = function(options) {
                    if (options.afterAmountChar) {
                        return options.afterAmountChar;
                    } else {
                        return 1;
                    }
                },

                offlineSearch = function(nodeObject, options) {
                    var
                        resolvedList,
                        list,
                        previousListNode = nodeObject;

                    if (typeof offlineListener == "function") {
                        searchTextBox.off("input", offlineListener);
                        searchTextBox.off("focus", offlineListener);
                    }

                    offlineListener = function(e) {
                        if (searchTextBox.value()) {
                            resolvedList = resolveList(previousListNode,
                                options.order);

                            list = resolvedList.nodes.parent().first();
                            if (list.childElements().some()) {
                                previousListNode = list.clone()
                                    .append(resolvedList.nodes);
                            }

                            callback.call($(this), resolvedList.nodes,
                                          resolvedList.maps, e);
                        } else {
                            // descobrir o porquê de ter de fazer um clone
                            previousListNode = nodeObject.clone(true);
                            callback.call($(this), $(), e);
                        }

                    };

                    searchTextBox.on("input", offlineListener);
                    searchTextBox.on("focus", offlineListener);
                },

                remoteSearch = function(options) {
                    var
                        amountChar = resolveAmountChar(options),
                        word,
                        prevText,
                        nextText,
                        nodeObject,
                        params,
                        resolvedList,
                        clipboardData,

                        request = function(e) {
                            if (options.remote.params) {
                                params = options.remote.params
                                    .call(searchTextBox);
                            }

                            $.Ajax.new(options.remote.url
                                .call(searchTextBox), {
                                params: params,
                                progress: function(xhr) {
                                    if (options.remote.loading) {
                                        options.remote
                                            .loading(xhr, e);
                                    }
                                },
                                complete: function() {
                                    $(e.target).off("keypress");
                                },
                                success: function(a) {
                                    nodeObject = $(a);
                                    // debugger
                                    resolvedList = resolveList(
                                        nodeObject, options.order);
                                    callback.call(searchTextBox,
                                        resolvedList.nodes,
                                        resolvedList.maps, e);
                                    if (nodeObject.length) {
                                        offlineSearch(nodeObject, options);
                                    }
                                }
                            });
                        };

                    searchTextBox.on("keyup", function(e) {
                        word = searchTextBox.value();

                        if (word.length > amountChar) {
                            inline = true;
                        } else if (word.length < amountChar) {
                            inline = false;
                        }

                        if (word.length == amountChar &&
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

                        if (word.length >= amountChar &&
                            !inline &&
                            options.remote) {
                            searchTextBox.value(word);

                            request(e);
                            e.preventDefault();
                        }
                    });

                },

                map = function(searchTextAsArray, nodeTextAsArray) {
                    var
                        iterator,
                        sliceIndex,
                        regexp,
                        nodeTextHashSet = Object
                            .asCountableLiteralObject(nodeTextAsArray),
                        mapped = {},
                        count = 0,
                        index = 0,
                        previousIndex = -1;

                    if (nodeTextHashSet.length >= searchTextAsArray.length) {
                        iterator = Iterable.Proxy.new(searchTextAsArray);
                        iterator.each(function(slice) {
                            slice = slice.trim();
                            index = Object.firstFromASlice(nodeTextHashSet,
                                                             slice, index,
                                                             options
                                                             .caseSensitive);

                            if (index && ((options.orderlySearch &&
                                index > previousIndex) ||
                                !options.orderlySearch) &&
                                nodeTextAsArray.countSlice(slice,
                                    options.caseSensitive) >=
                                    searchTextAsArray.count(slice)) {

                                previousIndex = index;

                                if (options.caseSensitive) {
                                    regexp = new RegExp(slice);
                                } else {
                                    regexp = new RegExp(slice, "i");
                                }

                                sliceIndex = nodeTextAsArray[index]
                                    .search(regexp);
                                mapped[index] = nodeTextAsArray[index]
                                    .slice(sliceIndex, sliceIndex + slice
                                           .length);
                                Object.delete(nodeTextHashSet, index);
                                count += 1;
                            } else {
                                this.finalize();
                            }
                        });

                        if (count == searchTextAsArray.length) {
                            return mapped;
                        }
                    }

                    return false;
                },

                // resolveList = function(nodeCollection, order = "desc") {
                resolveList = function(nodeCollection, order) {
                    if (order != "asc") {order = "desc";}
                    var
                        nodeText,
                        mapped,
                        nodeTextAsArray,
                        sorted,
                        found = {nodes: $(), maps: []},
                        textBoxContentArr = searchTextBox.value().split(" ")
                            .compact();

                    if (nodeCollection.elements().count() == 1 &&
                        nodeCollection.instanceOf(window.Element)) {
                        nodeCollection = nodeCollection.childElements();
                    }

                    if (order == "asc") {
                        sorted = nodeCollection.ascendingSortTextNode();
                    } else {
                        sorted = nodeCollection.descendingSortTextNode();
                    }

                    sorted.each(function(node) {
                        nodeText = $(node).textContent().trim();
                        nodeTextAsArray = nodeText.split(" ");
                        mapped = map(textBoxContentArr, nodeTextAsArray);
                        if (mapped) {
                            found.nodes.push(node);
                            found.maps.push(mapped);
                        }
                    });

                    return found;
                };

            resolveArguments(options);

            // init
            if (Object.getPrototypeOf(nodeObject) != Object.prototype) {
                offlineSearch(nodeObject, options);
            } else {
                options = nodeObject;
                remoteSearch(options);
            }
        }

    });

})(esPhinx);


 // 08/2012 - 02/2016