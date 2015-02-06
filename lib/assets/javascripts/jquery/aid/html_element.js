HTMLElement.prototype.prepend = function(node, interval){
    obj = this;

    setTimeout(function(){
        obj.insertBefore(node, obj.firstChild);
    }, interval || 0);

    return this;
}
