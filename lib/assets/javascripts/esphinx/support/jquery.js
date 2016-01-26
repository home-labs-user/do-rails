//= require jquery
//= require ./array

"use strict";

var
    jQuery;

(function ($) {

	$.fn.extend({
        findWithoutAttr: function (query, attr) {
            var
                self = $(this);

            return self.find(query + ":not([" + attr + "])");
        },

        findByAttr: function (query, attr, value) {
            return $(this).find(query + "[" + attr + "=\"" + value + "\"]");
        },

        textsAsArray: function () {
            var
                arr = [];

            $(this).each(function (i, obj) {
                arr.push(obj.textContent.trim());
            });

            return arr;
        },

        findByContentText: function (text) {
            return $(this).contents().filter(function () {
                return $(this).text().trim() === text.trim();
            });
        },

        sortByContentText: function (order) {
            var
                self = $(this),
                arr = [],
                asArr = [];

            order = order.toLocaleLowerCase();
            asArr = $(this).textsAsArray();

            if (order === "asc") {
                asArr = asArr.asc();
            } else if (order === "desc") {
                asArr = asArr.desc();
            }

            asArr.map(function (text) {
                arr.push(self.parent().findByContentText(text).get(0));
            });

            return $(arr);
        }


    });

// $.fn.replaceClass = (sought, substitute, interval)->
//   obj = $(this)
//   setTimeout ->
//     obj.each (i)->
//       current = obj.item(i)
//       if current.classList.contains(sought)
//         # de repentemente é só remover a classe antiga e adicionar a nova através do jquery, ao invés de fazer via proprio método de manipulação de string
//         className = current.className.allReplaced "(#{sought}|\\s#{sought}|#{sought}\\s)", " #{substitute} "
//         current.className = className.trim().allReplaced("  ", " ")
//   , interval || 0

//   obj

}(jQuery));
