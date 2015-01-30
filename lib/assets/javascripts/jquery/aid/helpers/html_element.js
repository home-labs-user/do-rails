// returns height without padding and border
HTMLElement.prototype.minHeight = function(){
    var obj = this;
    return obj.computedStyle('height').asFloat();
}


// returns height including padding
HTMLElement.prototype.innerHeight = function(){
    var obj = this;
    var paddingTop = obj.computedStyle('padding-top').asFloat();
    var paddingBottom = obj.computedStyle('padding-bottom').asFloat();
    return obj.minHeight() + paddingTop + paddingBottom;
}


// returns height including padding and border
HTMLElement.prototype.height = function(){
    var obj = this;
    var borderTop = obj.computedStyle('border-top-width').asFloat();
    var borderBottom = obj.computedStyle('border-bottom-width').asFloat();
    return obj.innerHeight() + borderTop + borderBottom;
}


HTMLElement.prototype.minWidth = function(){
    var obj = this;
    return obj.computedStyle('width').asFloat();
}


HTMLElement.prototype.innerWidth = function(){
    var obj = this;
    var paddingLeft = obj.computedStyle('padding-left').asFloat();
    var paddingRight = obj.computedStyle('padding-right').asFloat();
    return obj.minWidth() + paddingLeft + paddingRight;
}

HTMLElement.prototype.width = function(){
    var obj = this;
    var borderLeft = obj.computedStyle('border-left-width').asFloat();
    var borderRight = obj.computedStyle('border-right-width').asFloat();
    return obj.innerWidth() + borderLeft + borderRight;
}
