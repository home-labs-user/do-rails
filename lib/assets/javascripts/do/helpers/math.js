Number.prototype.firstMultiple = function() {
    var
        n = this,
        i = 1,
        count = 1,
        m = 1;

    while(i <= n && count < 3) {
        if(n%i === 0) {
            count++;
            m = i;
        }
        i++;

    }
    return m;
}
