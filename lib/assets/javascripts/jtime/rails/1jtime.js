//= require jquery
//= require jquery_ujs

var jTime = function (selector) {
    "use strict";
    if (!(this instanceof jTime)) {
        return new jTime(selector);
    }

    var
        self = this,
        collection;

    if (typeof selector === "string") {
        collection = Array.prototype.slice
            .call(document.querySelectorAll(selector));
    } else if (typeof selector === "object") {
        collection = Array.prototype.slice
            .call([selector]);
    }

    self.length = collection.length;
    collection.forEach(function (v, i) {
        self[i] = v;
    });

    return self;
};
jTime.prototype.splice = function(){};
