HTMLElement.prototype.computedStyle = function(property){
    obj = this;
    return getComputedStyle(obj).getPropertyValue(property);
}
