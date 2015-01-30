Class = {
    constructorOf: function(params){
        if(params["fnConstructor"])
            return window[params["class"].capitalized()][params["fnConstructor"].toLowerCase()];
        else
            return window[params["class"].capitalized()];
    },
};
