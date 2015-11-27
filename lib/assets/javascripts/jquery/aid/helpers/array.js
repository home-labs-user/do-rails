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

// Array.prototype.compressed = (compress)->
//   _a = this
//   _new = []

//   _a.each (v)->
//     _new.push v unless v == compress || v == null || v == undefined

//   _new

// removeItem = (array, item)->
//   _new = []

//   array.each (v)->
//     _new.push v unless v == item

//   _new

// Array.prototype.eachUntil = (callback, condition)->
//   _a = this
//   i = 0
//   loop
//     callback _a.item(i), i
//     i++
//     break if condition
