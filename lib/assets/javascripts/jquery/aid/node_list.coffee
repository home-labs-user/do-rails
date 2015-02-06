HTMLElement.prototype.prepend = function(node, interval){
    var obj = this;

    setTimeout(function(){
        obj.insertBefore(node, obj.firstChild);
    }, interval || 0);

    return this;
}

HTMLElement.prototype.parent = function(){
    return this.parentNode;
}

NodeList.prototype.css = (attrs)->
  collection = this
  collection.each (e)->
    for i of attrs
      if attrs.hasOwnProperty i
        e.style[i] = attrs[i]

  this


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


NodeList.prototype.hide = (interval)->
  obj = this
  setTimeout ->
    obj.each (e)->
      hide e
  , interval || 0

  this


NodeList.prototype.show = (interval)->
  obj = this
  setTimeout ->
    obj.each (e)->
      show e
  , interval || 0

  this


hide = (obj)->
  obj.css display: "none"


show = (obj)->
  display = obj.computedStyle "display"
  if display == "none"
    obj.css display: ""
