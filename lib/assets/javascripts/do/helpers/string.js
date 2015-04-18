String.prototype.asFloat = function(){
    obj = this;
    return parseFloat(obj);
}


window.isString = function(obj){
    if(obj.constructor == String)
        return true;
    return false;
}

// procura, na string, por palavras (separadas por espaço)
// $ procura da direita para a esquerda
String.prototype.allReplaced = function(find, change){
    s = this;
    // /g -> modifier. Identifica em qualquer parte do contexto
    pattern = eval('/' + find + '/g');
    return s.replace(pattern, change);
}

String.prototype.allReplacedChar = function(find, change){
    s = this;
    // procura qualquer caracter entre os colchetes
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
