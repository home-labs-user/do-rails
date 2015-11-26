jTime = function (selector) {
    if (!(this instanceof jTime)) {
        return new jTime(selector);
    }

    var
        collection = Array.prototype.slice
            .call(document.querySelectorAll(selector)),
        self = this;

    self.length = collection.length;
    collection.forEach(function (v, i) {
        self[i] = v
    });

    return self;
}
jTime.prototype.splice = function(){};
