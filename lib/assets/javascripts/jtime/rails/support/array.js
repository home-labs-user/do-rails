(function ($) {
    "use strict";

    $.prototype.intersection = function () {
        var
            args = [],
            intersects = [],
            self,
            i;

        self = this;
        if (arguments.length > 0) {
            for (i in arguments) {
                if (arguments.hasOwnProperty(i)) {
                    args.push((arguments[i]).uniq());
                }
            }
        } else if (self.length > 0) {
            self.map(function (v) {
                args.push(v.uniq());
            });
        } else {
            return [];
        }

        intersects = args.asc().reduce(function (prev, curr, i) {
            if (i === 1) {
                intersects = prev.filter(function (v) {
                    // returns to filter method
                    return curr.indexOf(v) > -1;
                });
            } else {
                intersects = intersects.filter(function (v) {
                    return curr.indexOf(v) > -1;
                });
            }
            //console.log(i);
            //console.log(_intersects);
            // returns to reduce
            return intersects;
        });

        return intersects;
    };

    // ordena através do método "insertion sort", de forma
    // decrescente. Ordenara-lo-á ao final da fila da esquerda
    //para a direita, como num baralho de cartas dependendo se o
    // valor de b-a for > < ou = 0
    $.prototype.desc = function () {
        var
            copy = this.copy();

        copy.sort(function (a, b) {
            return a < b;
        });
        return copy;
    };

    $.prototype.asc = function () {
        var
            copy = this.copy();

        copy.sort(function (a, b) {
            return a > b;
        });
        return copy;
    };

    $.prototype.copy = function () {
        var
            copied = [];
        this.map(function (v) {
            copied.push(v);
        });
        return copied;
    };

    $.prototype.min = function () {
        return Math.min.apply(null, this);
    };

    $.prototype.max = function () {
        return Math.max.apply(null, this);
    };

    $.prototype.uniq = function () {
        return this.reduce(function (init, v) {
            if (init.join().indexOf(v) < 0) {
                init.push(v);
            }
            return init;
        }, []);
    };

    // retorna a quantidade de um item
    $.prototype.count = function (comparison) {
        var
            arr = this.sort(),
            count = 0;

        // talvez fosse interessante não usar o map para otimizar,
        // testando até determinado item se diferente do próximo
        arr.map(function (item) {
            if (item === comparison) {
                count += 1;
            }
        });
        return count;
    };

    /*$.prototype.destroy = function () {
        var
            i
            ,index = -1
        ;
        for (i in arguments) {
            // um método privado destroyAll poderá ser criado também
            while (index > -1) {
                destroyItem(this, index);
                index > -1
            }
        }
        return this;
    }

    $.prototype.without = function () {
        var
            _a = []
            ,i = 0
            ,index = -1
        ;
        _a = this;
        for (i in arguments) {
            while(true) {
                index = this.indexOf(arguments[i]);
                if(index > -1) {
                    _a = removeItem(this, index);
                } else {
                    break;
                }
            }
        }
        return this;
    }
    var destroyItem = function (_arr, index) {
        _arr.splice(index, 1);
        return this;
    }*/

    /*var removeItem = function (_arr, index) {
        var _new = [];
        $.prototype.map(function (v, i) {
            if (i !== index) {
                _new.push(v);
            }
        });
        return _new;
    }*/

    $.prototype.prev = function () {
        var collection = [];

        this.map(function (e) {
            if (e.previousElementSibling) {
                collection.push(e.previousElementSibling);
            }
        });
        return collection;
    };

    /*$.prototype.parents = function (nodeName) {
        var _parents = []
            ,parent = null
        ;
        collection.map(function (e) {
            parent = e.parentNode;
            if (nodeName) {
                if (parent.nodeName.toLowerCase() === nodeName) {
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
    }*/

    /*
    HTMLElement.prototype.is = function (selector) {
        if (selector.charAt(0) === ":") {
            switch (selector) {
                case ":hidden":
                    if (obj.style.display === "none") {
                        return true;
                    }
                    break;
            }
        } else {
            if (document.querySelector(selector)) {
                return true;
            }
        }
        return false;
    };*/

    $.prototype.difference = function () {
        var
            args = [],
            differences = [],
            i;

        if (arguments.length > 0) {
            for (i in arguments) {
                if (arguments.hasOwnProperty(i)) {
                    args.push((arguments[i]).uniq());
                }
            }
        } else {
            return this;
        }

        args.unshift(this);
        differences = args.reduce(function (prev, curr, i) {

            if (i === 1) {
                differences = prev.filter(function (v) {
                    return curr.indexOf(v) === -1;
                });
            } else {
                differences = differences.filter(function (v) {
                    return curr.indexOf(v) === -1;
                });
            }

            return differences;
        });

        return differences;
    };
}(Array));
