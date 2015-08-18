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


isArray = function(obj){
    if(obj.constructor == Array)
        return true;
    return false;
}

Array.prototype.intersection = function() {
    var
        _args = []
        ,_intersects = []
        ,_arr = this
    ;

    if(arguments.length > 0) {
        for(var i in arguments) {
            if(arguments.hasOwnProperty(i)) {
                _args.push( (arguments[i]).uniq() );
            }
        }
    } else if(_arr.length > 0) {
        _arr.map(function(v) {
            _args.push( v.uniq() );
        });
    } else {
        return [];
    }

    _intersects = _args.asc().reduce(function(_prev, _curr, i) {
        if (i === 1) {
            _intersects = _prev.filter(function(v) {
                // returns to filter method
                return _curr.indexOf(v) > -1
            });
        } else {
            _intersects = _intersects.filter(function(v) {
                return _curr.indexOf(v) > -1
            });
        }
        //console.log(i);
        //console.log(_intersects);
        // returns to reduce
        return _intersects;
    });

    return _intersects;
};

// ordena através do método "insertion sort", de forma decrescente. Ordenara-lo-á ao final da fila da esquerda para a direita, como num baralho de cartas dependendo se o valor de b-a for > < ou = 0
Array.prototype.desc = function() {
    this.sort(function(a, b) { return a<b; });
    return this;
}

Array.prototype.asc = function() {
    this.sort(function(a, b) { return a>b; });
    return this;
}

Array.prototype.min = function() {
    return Math.min.apply(null, this);
}

Array.prototype.max = function() {
    return Math.max.apply(null, this);
}

Array.prototype.uniq = function() {
    return this.reduce(function(init, v) {
        if (init.join().indexOf(v) < 0 ) { init.push(v); }
        return init;
    }, []);
}

// retorna a quantidade de um item
Array.prototype.count = function(comparison) {
    var
        _arr = this.sort();
        count = 0;
    ;

    // talvez fosse interessante não usar o map para otimizar, testando até determinado item se diferente do próximo
    _arr.map(function(item) {
        if(item === comparison) { count++; }
    });
    return count;
}

Array.prototype.css = function(attr, value) {
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

Array.prototype.destroy = function() {
    var
        _a = this,
        i = 0,
        index = -1
    ;

    for(i in arguments) {
        // um método privado destroyAll poderá ser criado também
        while(true) {
            index = _a.indexOf(arguments[i]);
            if(index > -1) {
                destroyItem(_a, index);
            } else {
                break;
            }
        }
    }

    return _a;
}

Array.prototype.without = function() {
    var
        _a = this,
        i = 0,
        index = -1
    ;

    for(i in arguments) {
        while(true) {
            index = _a.indexOf(arguments[i]);
            if(index > -1) {
                _a = removeItem(_a, index);
            } else {
                break;
            }
        }
    }

    return _a;
}

var destroyItem = function(_arr, index) {
    _arr.splice(index, 1);
    return _arr;
}

var removeItem = function(_arr, index) {
    var _new = [];

    array.map(function (v, i){
        if (i !== index ){
            _new.push(v);
        }
    });

    return _new;
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

HTMLElement.prototype.next = function() {
    return this.nextElementSibling;
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

Array.prototype.difference = function() {
    var
        _args = []
        ,_intersects = []
        ,_arr = this
    ;

    if(arguments.length > 0) {
        for(var i in arguments) {
            if(arguments.hasOwnProperty(i)) {
                _args.push( (arguments[i]).uniq() );
            }
        }
    } else if(_arr.length > 0) {
        _arr.map(function(v) {
            _args.push( v.uniq() );
        });
    } else {
        return [];
    }

    _intersects = _args.asc().reduce(function(_prev, _curr, i) {
        if (i === 1) {
            _intersects = _prev.filter(function(v) {
                // returns to filter method
                return _curr.indexOf(v) > -1
            });
        } else {
            _intersects = _intersects.filter(function(v) {
                return _curr.indexOf(v) > -1
            });
        }
        //console.log(i);
        //console.log(_intersects);
        // returns to reduce
        return _intersects;
    });

    return _intersects;
}
