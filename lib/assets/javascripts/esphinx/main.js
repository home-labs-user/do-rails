//= require ./extensor


"use strict";

// IIFE
var
    esPhinx,
    Extensor;

esPhinx = (function () {

    return function esPhinx (selector) {

        var
            Constructor = esPhinx,
            self = this,
            collection;

        if (!(this instanceof Constructor)) {
            return new Constructor(selector);
        }

        if (selector) {
            if (typeof selector === "string") {
                collection = Array.prototype.slice
                    .call(document.querySelectorAll(selector));
            } else if (typeof selector === "function") {
                return Constructor(document).on("DOMContentLoaded", selector);
            } else if (selector instanceof Node) {
                collection = Array.prototype.slice.call([selector]);
            } else if (selector instanceof esPhinx) {
                return selector;
            } else if (selector instanceof Object) {
                selector.eachAttrs(function (v, i) {
                    self[i] = v;
                });
                return self;
            }

            collection.forEach(function (v, i) {
                self[i] = v;
            });
        }

        return self;
    };
}());

(function ($module) {

    Extensor.new($module, {
        extend: function () {
            Extensor.new(this, arguments[0]);
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
