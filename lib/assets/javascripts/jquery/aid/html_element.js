HTMLElement.prototype.css = function(attr, value) {
    obj = this;

    if(attr.constructor === Object) {
        var attrs = attr;
        for(i in attrs){
            if( attrs.hasOwnProperty(i) ){
                obj.style[i] = attr[i];
            }
        }
    } else {
        obj.style[attr] = value;
    }

    return this;
}
