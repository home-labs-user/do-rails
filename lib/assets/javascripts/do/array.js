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

// ordena através do método "insertion sort", de forma decrescente. Se a < b, assim, como em um baralho de cartas, ordenara-lo-á em ordem ao final da fila da esquerda para a direita
Array.prototype.desc = function() {
    return this.sort(function(a, b) { return a<b; });
}

// testar com <>
Array.prototype.asc = function() {
    return this.sort(function(a, b) { return a>b; });
}

Array.prototype.min = function() {
    return Math.min.apply(null, this);
}

Array.prototype.uniq = function() {
    return this.reduce(function(init, v) {
        if (init.indexOf(v) < 0 ) init.push(v);
        return init;
    // o initValue = []
    }, []);
}

// retorna a quantidade de um item
Array.prototype.occurrences = function(comparison) {
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

//
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
