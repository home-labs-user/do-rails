Test = {
    obj: function(msg){
        this.printPopUp = function(msg){
            alert(msg);
    };

    if(msg)
        return msg;
    },

    alert: function(msg){
        alert("Javali says " + msg);
    }

}
