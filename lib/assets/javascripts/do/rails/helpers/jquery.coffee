$.fn.findAnchorWithoutHref = ->
  $(this).find "a:not([href])"

$.fn.findAnchorByHref = (href)->
  $(this).find "a[href='#{href}']"


$.fn.replaceToggleClass = (cls1, cls2)->
  self = $(this)

  if self.get(0).classList.contains(cls1)
    # os métodos próprios do jquery mantém o controle da visibilidade e existência
    self.removeClass cls1
    self.addClass cls2
  else if self.get(0).classList.contains(cls2)
    self.removeClass cls2
    self.addClass cls1

  self

$.fn.replaceClass = (sought, substitute, interval)->
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


jQuery.fn.centralizeOnScreen = ->
  obj = this

  # Deve-se, primeiramente, aplicar o position absolute, pois o top e o left funcionam somente com essa propriedade
  obj.css 'position', 'absolute'

  obj.css

    top: "50%"
    marginTop: "#{-$(obj).outerHeight() / 2}px"
    # top: "#{( ( $(document).outerHeight()-2 )/2 )-( obj.outerHeight()/2 )}px"

    left: "50%"
    marginLeft: "#{-$(obj).outerWidth() / 2}px"

  obj


$.fn.extend
  item: (index)->
    obj = $(this)
    obj.get index

