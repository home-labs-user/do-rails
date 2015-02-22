Test = {
    obj: function(msg){
        if (msg) {
            alert(msg);
        }

        this.popUp = function(msg){
            alert(msg);
            return this;
        }

        return this;
    },

}
