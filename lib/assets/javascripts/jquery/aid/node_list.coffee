NodeList.prototype.removeClass = (names, interval)->
  obj = $(this)
  _a = names.split(" ")

  setTimeout ->
    obj.each (e)->
      _a.each (c)->
        e.classList.remove c
  , interval || 0

  this


NodeList.prototype.remove = (interval)->
  obj = this
  setTimeout ->
    obj.each (e)->
      remove e
  , interval || 0

  this


remove = (obj)->
  obj.parentNode.removeChild(obj)
  this
  
