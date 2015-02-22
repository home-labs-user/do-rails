String.prototype.asFloat = function(){
    obj = this;
    return parseFloat(obj);
}


window.isString = function(obj){
    if(obj.constructor == String)
        return true;
    return false;
}


String.prototype.allReplaced = function(find, change){
    s = this;
    pattern = eval('/' + find + '/g');
    return s.replace(pattern, change);
}


String.prototype.allReplacedChar = function(find, change){
    s = this;
    pattern = eval('/[' + find + ']/g');
    return s.replace(pattern, change);
}


String.prototype.without = function(chars){
    return this.allReplacedChar(chars, '');
}


String.prototype.isSet = function(){
    s = this;
    if(s.length > 0)
        return true;
    return false;
}


String.prototype.empty = function(){
    s = this;
    if(s.length == 0)
        return true;
    return false;
}


String.prototype.lTrim = function(){
    pattern = /^\s{1,}/;
    return this.replace(pattern, '');
}


String.prototype.rTrim = function(){
    pattern = /\s+$/;
    return this.replace(pattern, '');
}


String.prototype.capitalized = function(){
    var _s = this.split(' ');
    var str = '';
    _s.each(function(s, i){
        str += s.charAt(0).toUpperCase() + s.slice(1, s.length);
        if(i < _s.length - 1)
            str += ' ';
    });
    return str;
}
