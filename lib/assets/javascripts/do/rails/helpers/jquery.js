(function ($) {

    "use strict";

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

}(jQuery));
