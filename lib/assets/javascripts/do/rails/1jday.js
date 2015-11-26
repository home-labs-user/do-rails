jDay = function (selector) {
    if (!(this instanceof jDay)) {
        return new jDay(selector);
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
jDay.prototype.splice = function(){};
