// script = document.createElement('script');
// script.src = 'https://cdn.rawgit.com/rplaurindo/jquery-aid-rails/master/lib/assets/javascripts/jquery/aid/node_list.js';
// head = document.querySelector('head');
// head.appendChild(script);

NodeList.prototype.css = function(attr, value){
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
