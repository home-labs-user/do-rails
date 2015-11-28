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
    } else if (selector instanceof Array) {
        collection = selector;
    } else if (selector instanceof jTime) {
        return selector;
    }

    // attrs
    collection.forEach(function (v, i) {
        self[i] = v;
    });

    Object.defineProperties(self, {
        splice: {
            value: Function,
        },
        length: {
            value: collection.length
        }
    });

    return self;
};

jTime.extend = function (arg) {
    var
        i;

    for (i in arg) {
        Object.defineProperty(jTime.prototype, i, {
            value: arg[i]
        });
    }
};
