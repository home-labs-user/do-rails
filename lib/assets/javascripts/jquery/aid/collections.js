// script = document.createElement('script');
// script.src = 'https://rawgit.com/rplaurindo/jquery-aid-rails/master/lib/assets/javascripts/jquery/aid/collections.js';
// head = document.querySelector('head');
// head.appendChild(script);

NodeList.prototype.parents = function(nodeName){
    var _parents = [];
    var collection = this;
    var parent = null;
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

Array.prototype.each = function(callback){
    var _a = this
    var i = 0
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
