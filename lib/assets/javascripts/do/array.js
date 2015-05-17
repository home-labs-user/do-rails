Array.prototype.mdc = function() {
        var
            _factors = [],
            _aux = [],
            dividend = 1,
            count = 1,
            _exponentialFactors = [],
            primesCommon = {}
        ;

        this.map(function(item) {
            dividend = item;

            while (dividend > 1) {
                _aux.push(dividend.firstMultiple());
                dividend = dividend/dividend.firstMultiple();
                
                if( dividend.firstMultiple() === (_aux[_aux.length -1]) ) {
                    count++;
                } else {
                    _exponentialFactors.push((_aux[_aux.length -1]).firstMultiple().toString() + '^' + count.toString());

                    count = 1;
                    _aux = [];
                }
            }

        });
        
        // iterar sobre os valores repetidos e guardar o produto deles em um outro array, para só então guardar
        // em _factors
//         _factors.map(function(_a) {
//             _a.map(function(item, i) {
//                 if (i > 0) {
//                     if(item === item[i -1]) {
//                         count++;
//                     } else {
//                         //primesCommon[item[i -1]] = count;
//                         _aux.push(item.toString() + '^' + count.toString());
//                         count = 1;
//                     }
//                 }
//             });

//             // deve adicionar ao hash table somente se houver em outros arrays. guardar no hash quantas vezes
//             // ele foi repetido, portanto deve adicionar somente ao final da contagem
//         });
//         console.log(primesCommon);
    }

doQuery = function(query){
    var collection = [],
        query = document.querySelectorAll(query);
    if(query.length > 0) {
        query.map(function(e) {
            collection.push(e);
        });
    }
    return collection;
}

Array.prototype.css = function(attr, vaealue) {
    var collection = this;
    if(attr.constructor === Object) {
        var attrs = attr;
        collection.map(function(e) {
            for(i in attrs){
                if( attrs.hasOwnProperty(i) ){
                    e.style[i] = attr[i];
                }
            }
        });
    } else {
        collection.map(function(e) {
            e.style[attr] = value;
        });
    }
    return this;
}


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

    items.map(function (v) {
        if ( isString(v) ) {
            _a = removeItem(_a, v.trim());
        } else {
            _a = removeItem(_a, v);
        }
    });

    return _a;
}

var removeItem = function(array, item) {
    var _new = [];

    array.map(function (v){
        if (! v === item ){
            _new.push(v);
        }
    });

    return _new;
}

// Array.prototype.compressed = (compress)->
//   _a = this
//   _new = []

//   _a.map (v)->
//     _new.push v unless v == compress || v == null || v == undefined

//   _new

HTMLElement.prototype.next = function() {
    return this.nextElementSibling;
}

Array.prototype.prev = function(selector) {
    var collection = [];

    this.map(function(e) {
        if(e.previousElementSibling){
            collection.push(e.previousElementSibling);
        }
    });
    return collection;
}

HTMLElement.prototype.is = function(selector) {
    var obj = this;

    if(selector.charAt(0) === ':'){
        switch(selector) {
            case ':hidden':
                if(obj.style.display === 'none') {
                    return true;
                }
                break;
        }
    } else {
        if(document.querySelector(selector)) {
            return true;
        }
    }

    return false;
}

Array.prototype.parents = function(nodeName){
    var _parents = [],
        collection = this,
        parent = null;

    collection.map(function(e) {
        parent = e.parentNode;
        if(nodeName) {
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
        } else {
            if(parent){
                _parents.push(parent);
            }
        }
    });
    return _parents;
}

NodeList.prototype.map = function(callback){
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
