Hash = {

    // o método call é para herdar características de um objeto em um objeto declarado como uma function, não como JSON

    merge: function(current, to){

        var merged = {};

        for ( var i in current ){
            if( current.hasOwnProperty(i) )
                merged[i] = current[i];
        }
        for ( var i in to ){
            if( to.hasOwnProperty(i) )
                merged[i] = to[i];
        }
        return merged;
    },

    obj: function(hash){

        // esse método não pode testar qualquer objeto, mas apenas um Object, logo, caso o objeto não seja um hash, um erro será retornado, pois o JQuery impede a implementação de novos métodos a classe Object
        this.isHash = function(){
            if(hash.constructor === Object)
                return true;
        };

        this.hasKey = function(search){
            for(key in hash){
                if( hash.hasOwnProperty(i) ){
                    if(key == search){
                        return true;
                    }
                }
            }
            return false;
        };

        if(!hash)
            return {};
    },

}
