Document.prototype.insertAfter = function(newNode, referenceNode){
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
