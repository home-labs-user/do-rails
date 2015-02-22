Array.prototype.item = function(index) {
    var _a = this;
    if(_a.hasOwnProperty(index)) {
        return this[index];
    }
    return null;
}


window.isArray = function(obj){
    if(obj.constructor == Array)
        return true;
    return false;
}

Array.prototype.without = function(items) {
    var _a = this;

    if( isString(items) ){
        items = items.split(",");
    }

    items.each(function (v) {
        _a = removeItem(_a, v.trim());
    });

    return _a;
}

var removeItem = function(array, item) {
    var _new = [];

    array.each(function (v){
        if (! v === item ){
            _new.push(v);
        }
    });

    return _new;
}

// Array.prototype.compressed = (compress)->
//   _a = this
//   _new = []

//   _a.each (v)->
//     _new.push v unless v == compress || v == null || v == undefined

//   _new