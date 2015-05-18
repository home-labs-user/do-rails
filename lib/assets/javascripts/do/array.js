Array.prototype.mdc = function() {
  var
    _aux = [],
    currFactors = null,
    _primes = [],
    dividend = 1,
    count = 1,
    smallerFactors = {},
    smallerProductCommon = 1,
    _arr = this
  ;

  _arr.map(function(item) {
    dividend = item;
          
    while (dividend > 1) {
      _aux.push(dividend.firstMultiple());
      dividend = dividend/dividend.firstMultiple();
      // para contar quantas vezes o mesmo divisor saiu

      if( dividend.firstMultiple() === (_aux[_aux.length -1]) ) {
        count++;
      } else {                    
        _primes.push(_aux[_aux.length -1]);

        // map lower factors
        if (_aux[_aux.length -1] in smallerFactors) {
          currFactors = Math.pow( (_aux[_aux.length -1]).firstMultiple(), count );
          if (currFactors < smallerFactors[_aux[_aux.length -1]] ) {
            smallerFactors[_aux[_aux.length -1]] = currFactors;
          }
        } else {
          smallerFactors[_aux[_aux.length -1]] = Math.pow( (_aux[_aux.length -1]).firstMultiple(), count);
        }

        count = 1;
        _aux = [];
      }
      
    }
  });
        
        // check common factors
  _primes = _primes.sort();
  _primes.map(function(n, i) {
    if(n === _primes[i+1]) {
      count++;
    } else {
      if(count === _arr.length) {
        smallerProductCommon *= smallerFactors[n];
        count = 1;
      }
   }
   
  });
    
  return smallerProductCommon;
}

//         count = 0;
//         _primes.map(function(n, i) {
//             if(n === n[i-1]) {
//                 count++;
//             } else {
//                 if(count === _arr.length){                    
//                     // dar um sort no array que guarda o assembled. Iterar sobre ele, pegar o valor da primeira 
//                     // base correspondente guardada na string
//                     _primesCommon.push();
//                 }
//             }
//         });
    }

//     return this;

// }).call(this)


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
