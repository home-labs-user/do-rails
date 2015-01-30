DOMTokenList.prototype.hasAnyContent = function(){
    var _a = this;
    if(obj.length > 0)
        return true;
    else
        return false;
}


DOMTokenList.prototype.toArray = function(){
    var _a = this;
    s = _a.toString().allReplaced(' ', ',');
    return s.split(',');
}


DOMTokenList.prototype.indexOf = function(value){
    var _a = this;
    var index = null;
    _a.each(function(v, i){
        if(v == value)
          index = i;
    });
    return index;
}
