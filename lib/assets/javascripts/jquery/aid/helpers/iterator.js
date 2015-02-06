DOMTokenList.prototype.each = function(callback){
    var _a = this;
    var i = 0;
    while (true) {
        if( _a.hasOwnProperty(i) ){
            callback(_a.item(i), i);
            i++;
            if (i === _a.length)
                break;
        }
    }
}

HTMLCollection.prototype.each = function(callback){
    var _a = this
    var i = 0
    while (true) {
        if( _a.hasOwnProperty(i) ){
            callback(_a.item(i), i);
            i++;
            if (i === _a.length)
                break;
        }
    }
}
