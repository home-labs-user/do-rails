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


        replaceToggleClass: function (cls1, cls2) {
            var
                self = $(this);

            if (self.get(0).classList.contains(cls1)) {
                // os métodos próprios do jquery mantém o controle da visibilidade e existência
                self.removeClass(cls1);
                self.addClass(cls2);
            } else if (self.get(0).classList.contains(cls2)) {
                self.removeClass(cls2);
                self.addClass(cls1);
            }

            return self;
        },

        centralizeOn: function (obj) {
            var
                self = $(this);

            self.css({
                top: ($(obj).outerHeight() / 2) - (self.outerHeight() / 2) + "px",
                left: ($(obj).outerWidth() / 2) - (self.outerWidth() / 2) + "px"
            });

            return self;
        },

        textsAsArray: function () {
            var
                arr = [];

            $(this).each(function (i, obj) {
                arr.push(obj.textContent.trim());
            });

            return arr;
        },

        findByContent: function (text) {
            return $(this).contents().filter(function () {
                return $(this).text().trim() === text.trim();
            });
        },

        sortByTextContent: function (order) {
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
                arr.push(self.parent().findByContent(text).get(0));
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

})(jQuery);
