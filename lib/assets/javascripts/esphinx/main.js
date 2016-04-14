// require ./support/extender

// IIFE
var
    esPhinx,
    Extender;

esPhinx = (function () {
    "use strict";

    return function (selector) {

        if (!(this instanceof esPhinx)) {
            return new esPhinx(selector);
        }

        var
            self = this,
            collection;

        if (selector) {
            if (typeof selector === "string") {
                collection = Array.prototype.slice
                    .call(document.querySelectorAll(selector));
            } else if (selector instanceof HTMLElement) {
                collection = Array.prototype.slice.call([selector]);
            } else if (selector instanceof Array) {
                collection = selector;
            } else if (selector instanceof esPhinx) {
                return selector;
            }

            // attrs
            collection.forEach(function (v, i) {
                self[i] = v;
            });

            Object.defineProperties(self, {
                splice: {
                    value: Function
                },
                length: {
                    value: collection.length
                }
            });
        }

        return self;
    };
}());

(function ($module) {

    Extender.new($module, {
        extend: function () {
            Extender.new(this, arguments[0]);
        }
    });

})(esPhinx);

/*$.prototype.ancestors = function (nodeName) {
        var _parents = []
            ,parent = null
        ;
        collection.forEach(function (e) {
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