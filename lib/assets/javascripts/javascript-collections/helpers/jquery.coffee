$.fn.findByHref = (href)->
  $(this).find "a[href='#{href}']"

$.fn.replaceClass = (sought, substitute, interval)->
    obj = $(this)
    setTimeout ->
        obj.each (i)->
            current = obj.item(i)
            if current.classList.contains(sought)
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
