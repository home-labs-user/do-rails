NodeList.prototype.css = function(attr, value){
    if(attr.constructor === Object) {
        var attrs = attr;
        collection = this;
        collection.each(function(e) {
            for(i in attrs){
                if( attrs.hasOwnProperty(i) ){
                    e.style[i] = attr[i];
                }
            }
        });
    } else {
        collection.each(function(e) {
            if( e.style.hasOwnProperty(value) ) {
                e.style[attr] = value;
            }
        });
    }
    return this;
}

NodeList.prototype.each = function(callback){
    var _a = this;
    var i = 0;
    while (true) {
        if( _a.hasOwnProperty(i) ) {
            callback(_a.item(i), i);
            i++;
            if(i === _a.length) {
                break;
            }
        }
    }
}
