var jQuery = jQuery;

(function ($) {

	$.fn.findWithoutAttr = function (query, attr) {
		var
			self = $(this);

	 	return self.find(query + ":not([" + attr + "])");
	};

	$.fn.findByAttr = function (query, attr, value) {
  		return $(this).find(query + "[" + attr + "=\"" + value + "\"]");
	};


	$.fn.replaceToggleClass = function (cls1, cls2) {
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
	};

	$.fn.centralizeOn = function (obj) {
		var
			self = $(this);

		self.css({
			top: ($(obj).outerHeight()/2) - (self.outerHeight()/2) + "px",
			left: ($(obj).outerWidth()/2) - (self.outerWidth()/2) + "px"
		});

		return self;
	};

  $.fn.textsAsArray = function (order) {
    var
        arr = [];
        $(this).each(function (i, obj){
            arr.push(obj.textContent.trim());
        });
        if (order) {
            order = order.toLowerCase();
            if (order === "asc") {
                return arr.asc();
            } else if (order === "desc") {
                return arr.desc();
            }
        } else {
            return arr;
        }
  };

  $.fn.sort = function (order) {
    var
        arr = [],
        self = $(this),
        tagName = self.prop("tagName");

    $(this).textsAsArray(order).map(function (text) {
        arr.push(self.parent()
            .find(tagName + ":contains('" + text + "'):last"));
        // arr.push($("<" + tagName + "></" + tagName + ">").append(text));
    });

    return arr;
  };

/*$.fn.replaceClass = (sought, substitute, interval)->
  obj = $(this)
  setTimeout ->
    obj.each (i)->
      current = obj.item(i)
      if current.classList.contains(sought)
        # de repentemente é só remover a classe antiga e adicionar a nova através do jquery, ao invés de fazer via proprio método de manipulação de string
        className = current.className.allReplaced "(#{sought}|\\s#{sought}|#{sought}\\s)", " #{substitute} "
        current.className = className.trim().allReplaced("  ", " ")
  , interval || 0

  obj

$.fn.extend
  item: (index)->
    obj = $(this)
    obj.get index
*/

}(jQuery));
