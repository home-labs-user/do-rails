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
    } else if (selector instanceof HTMLElement) {
        collection = Array.prototype.slice
            .call([selector]);
    } else if (selector instanceof jTime) {
        return selector;
    }

    // attrs
    collection.forEach(function (v, i) {
        self[i] = v;
    });

    self.resolve(collection.length);

    return self;
};
