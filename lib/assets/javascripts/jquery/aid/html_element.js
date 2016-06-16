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
