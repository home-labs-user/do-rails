// script = document.createElement('script');
// script.src = 'https://rawgit.com/rplaurindo/javascript_collections-rails/master/lib/assets/javascripts/javascript_collections/collections.js';
// head = document.querySelector('head');
// head.appendChild(script);

doQuery = function(query){
    var collection = [],
        query = document.querySelectorAll(query);
    if(query.length > 0) {
        query.each(function(e) {
            collection.push(e);
        });
    }
    return collection;
}

HTMLElement.prototype.is = function(selector) {
    var obj = this;

    switch(selector) {
        case ':hidden':
            if(obj.style.display === 'none') {
                return true;
            }
            break;
    }
    return false;
}

Array.prototype.prev = function(selector) {
    var collection = [];

    this.each(function(e) {
        if(e.previousElementSibling){
            collection.push(e.previousElementSibling);
        }
    });
    return collection;
}

Array.prototype.item = function(index) {
    var _a = this;    
    if(_a.hasOwnProperty(index)) {
        return this[index];
    }
    return null;
}

Array.prototype.parents = function(nodeName){
    var _parents = [],
        collection = this,
        parent = null;

    collection.each(function(e) {
        parent = e.parentNode;
        if(parent.nodeName.toLowerCase() === nodeName) {
            _parents.push(parent);
        } else {
            while(true) {
                parent = parent.parentNode;
                if(parent){
                    if(parent.nodeName.toLowerCase() === nodeName) {
                        _parents.push(parent);
                        break;
                    }
                } else {
                    break;
                }
            }
        }
    });
    return _parents;
}

Array.prototype.css = function(attr, value) {
    var collection = this;
    if(attr.constructor === Object) {
        var attrs = attr;
        collection.each(function(e) {
            for(i in attrs){
                if( attrs.hasOwnProperty(i) ){
                    e.style[i] = attr[i];
                }
            }
        });
    } else {
        collection.each(function(e) {
            e.style[attr] = value;
        });
    }
    return this;
}

Array.prototype.each = function(callback){
    var _a = this,
    i = 0;
    while (true) {
        if( _a.hasOwnProperty(i) ){
            callback(_a[i], i);
            i++;
            if (i === _a.length) {
                break;
            }
        }
    }
}

NodeList.prototype.each = function(callback){
    var _a = this,
        i = 0;
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
