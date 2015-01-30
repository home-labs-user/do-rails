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


# jQuery.fn.centralizeOnScreen = ->
#   obj = $(this)

#   obj.css
#     position: "absolute"

#     top: "50%"
#     # marginTop: "#{-obj.outerHeight() / 2}px"
#     marginTop: (-obj.outerHeight()/2) + "px"
#     # top: "#{( ( $(document).outerHeight()-2 )/2 )-( obj.outerHeight()/2 )}px"

#     left: "50%"
#     # marginLeft: "#{-obj.outerWidth()/2}px"
#     # marginLeft: (-obj.outerWidth()/2) + "px"
#     marginLeft: (-$(this).outerWidth()/2) + "px"

#   # obj.css
#     # marginLeft: (-obj.outerWidth()/2) + "px"

#   $(this)


$.fn.extend
  # toggleClass: (class1, class2, interval)->
  #   obj = $(this)
  #   setTimeout ->
  #     obj.each (i)->
  #       if this.classList.contains(class1)
  #         obj.item(i).replaceClass class1, class2
  #       else if this.classList.contains(class2)
  #         this.replaceClass class2, class1


  #   , interval || 0


  item: (index)->
    obj = $(this)
    obj.get index
    # obj[index]
