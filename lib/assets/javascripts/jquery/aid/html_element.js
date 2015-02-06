HTMLElement.prototype.insertAfter = function(node, interval){
    obj = this;

    setTimeout(function(){
        obj.parentNode.insertBefore(node, obj.nextSibling);
    }, interval || 0);

    return this;
}

HTMLElement.prototype.prepend = function(node, interval){
    var obj = this;

    setTimeout(function(){
        obj.insertBefore(node, obj.firstChild);
    }, interval || 0);

    return this;
}

// talvez seja mais interessante iterar e retornar a primeira e última posição
/*
HTMLElement.prototype.searchTextOnList = function (text, caseSensitive) {

    var foundList = {},
        merge = {},
        search = null,
        collection = this;

    collection.each(function (i, o) {
        search = o.textContent.search(text);
        if (search > -1) {
            // fazer merge
            merge = {o.textContent: [search, text.length + search]};
        }
        foundList = Hash.merge(foundList, merge);
    }
    return foundList;
}
*/


// HTMLElement.prototype.centralizeOnScreen = ->
//   obj = this
//   obj.css
//     position: "absolute"

//     top: "50%"
//     marginTop: "#{-obj.fullHeight()/2}px"

//     left: "50%"
//     marginLeft: "#{-obj.fullWidth()/2}px"

//   this


// HTMLElement.prototype.removeClass = (names, interval)->
//   obj = this
//   _a = names.split(" ")

//   setTimeout ->
//     _a.each (c)->
//       obj.classList.remove c
//   , interval || 0

//   this


// HTMLElement.prototype.remove = (interval)->
//   obj = this
//   setTimeout ->
//     obj.parentNode.removeChild(obj)
//   , interval || 0


// HTMLElement.prototype.toggleClass = (class1, class2, interval)->
//   setTimeout ->
//     if this.classList.contains(class1)
//       this.replaceClass class1, class2
//     else if this.classList.contains(class2)
//       this.replaceClass class2, class1
//   , interval || 0

//   this


// HTMLElement.prototype.replaceClass = (sought, substitute)->
//   obj = this
//   setTimeout ->
//     if obj.classList.contains(sought)
//       className = obj.className.allReplaced "(#{sought}|\\s#{sought}|#{sought}\\s)", " #{substitute} "
//       obj.className = className.trim().allReplaced("  ", " ")
//   , interval || 20

//   this


// HTMLElement.prototype.addClass = (names)->
//   obj = this
//   _a = names.split(" ")
//   _a.each (e)->
//     obj.classList.add e

//   this


// HTMLElement.prototype.appendChildren = (collection)->
//   obj = this
//   collection.each (node)->
//     obj.appendChild node


// HTMLElement.prototype.printPreview = ->

//   if navigator.vendor == "Google Inc."
//     window.print()

//   else

//     styleLinks = document.getElementsByTagName("link")
//     print = this.cloneNode(true)
//     head = document.getElementsByTagName("head").item(0).cloneNode(true)
//     preview = window.open()

//     printHTML = preview.document.getElementsByTagName("html").item(0)
//     printHead = preview.document.getElementsByTagName("head").item(0)
//     printHTML.replaceChild head, printHead

//     printHead = preview.document.getElementsByTagName("head").item(0)
//     htmlCollection = document.createElement("script")
//     nodeList = document.createElement("script")
//     printHead.appendChild htmlCollection
//     printHead.appendChild nodeList

//     # bug no FF. um document.createElement("script") no firefox retorna function() enquanto no Chrome e em outros navegadores, retorna HTMLScriptElement.
//     # uma solução seria colocar o código direto aqui para printar nas tags script. Mas iria ficar com uma cara ridícua de gambiarra por causa do bug do FF
//     htmlCollection.printFunction
//       prototype: "HTMLCollection"
//       name: "each"
//       body: HTMLCollection.prototype.each

//     nodeList.printFunction
//       prototype: "NodeList"
//       name: "each"
//       body: NodeList.prototype.each

//     # ele nem chegou aqui. Será que resolvendo o problema do script, ele reconhecerá o each para iterar sobre Nodes e HTMLCollections? Pois eu duvido muitíssimo. Moro, porra?
//     previewStyleLinks = preview.document.getElementsByTagName("link")
//     previewStyleLinks.each (printLink, i)->
//       printLink.href = styleLinks.item(i).href

//     printBody = preview.document.getElementsByTagName("body").item(0)
//     printBody.appendChild print
//     printBody.className = "print-preview"

//     imgs = document.querySelectorAll(".#{this.className} img") || document.querySelectorAll("##{this.id} img")
//     printImgs = preview.document.getElementsByTagName("img")
//     printImgs.each (printImg, i) ->
//       printImg.src = imgs.item(i).src

//     printAnchors = preview.document.querySelectorAll("a")
//     printAnchors.each (printAnchor, i) ->
//       printAnchor.href = "#"

// #Obs.: Todo método setado em HTMLElement, é herdadno por NodeList, HTMLUListElement, ...
