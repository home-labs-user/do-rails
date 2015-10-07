(function ($) {
    "use strict";

    // doQuery = function (query) {
    //     var collection = [],
    //         q = document.querySelectorAll(query);
    //     if (q.length > 0) {
    //         q.map(function (e) {
    //             collection.push(e);
    //         });
    //     }
    //     return collection;
    // }

    $.intersection = function () {
        var
            _args = [],
            _intersects = [],
            _this,
            i;

            _this = this;
        if (arguments.length > 0) {
            for (i in arguments) {
                if (arguments.hasOwnProperty(i)) {
                    _args.push((arguments[i]).uniq());
                }
            }
        } else if (_this.length > 0) {
            _this.map(function (v) {
                _args.push(v.uniq());
            });
        } else {
            return [];
        }

        _intersects = _args.asc().reduce(function (_prev, _curr, i) {
            if (i === 1) {
                _intersects = _prev.filter(function (v) {
                    // returns to filter method
                    return _curr.indexOf(v) > -1;
                });
            } else {
                _intersects = _intersects.filter(function (v) {
                    return _curr.indexOf(v) > -1;
                });
            }
            //console.log(i);
            //console.log(_intersects);
            // returns to reduce
            return _intersects;
        });

        return _intersects;
    };

    // ordena através do método "insertion sort", de forma
    // decrescente. Ordenara-lo-á ao final da fila da esquerda
    //para a direita, como num baralho de cartas dependendo se o
    // valor de b-a for > < ou = 0
    $.desc = function () {
        this.sort(function (a, b) {
            return a<b;
        });
        return this;
    };

    $.asc = function () {
        this.sort(function (a, b) {
            return a>b;
        });
        return this;
    };

    $.min = function () {
        return Math.min.apply(null, this);
    };

    $.max = function () {
        return Math.max.apply(null, this);
    };

    $.uniq = function () {
        return this.reduce(function (init, v) {
            if (init.join().indexOf(v) < 0) {
                init.push(v);
            }
            return init;
        }, []);
    };

    // retorna a quantidade de um item
    $.count = function (comparison) {
        var
            _arr = this.sort(),
            count = 0;

        // talvez fosse interessante não usar o map para otimizar,
        // testando até determinado item se diferente do próximo
        _arr.map(function (item) {
            if (item === comparison) {
                count++;
            }
        });
        return count;
    };

    $.css = function (attr, value) {
        var
            _this = $(this),
            attrs,
            i;
        if (attr.constructor === Object) {
            attrs = attr;
            _this.map(function (e) {
                for (i in attrs) {
                    if (attrs.hasOwnProperty(i)) {
                        e.style[i] = attr[i];
                    }
                }
            });
        } else {
            this.map(function (e) {
                e.style[attr] = value;
            });
        }
        return this;
    };

    /*$.destroy = function () {
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

    $.without = function () {
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

        $.map(function (v, i) {
            if (i !== index) {
                _new.push(v);
            }
        });

        return _new;
    }*/

    $.prev = function () {
        var collection = [];

        this.map(function (e) {
            if (e.previousElementSibling) {
                collection.push(e.previousElementSibling);
            }
        });
        return collection;
    };

    /*$.parents = function (nodeName) {
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

    HTMLElement.prototype.next = function () {
        return this.nextElementSibling;
    };

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

    $.difference = function () {
        var
            _args = [],
            _differences = [],
            i;

        if (arguments.length > 0) {
            for (i in arguments) {
                if (arguments.hasOwnProperty(i)) {
                    _args.push((arguments[i]).uniq());
                }
            }
        } else {
            return this;
        }

        _args.unshift(this);
        _differences = _args.reduce(function (_prev, _curr, i) {

            if (i === 1) {
                _differences = _prev.filter(function (v) {
                    return _curr.indexOf(v) === -1;
                });
            } else {
                _differences = _differences.filter(function (v) {
                    return _curr.indexOf(v) === -1;
                });
            }

            return _differences;
        });

        return _differences;
    };
}(Array.prototype));
