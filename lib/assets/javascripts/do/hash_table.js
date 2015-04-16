HashTable = {

    // o método call é para herdar características de um objeto em um objeto declarado como uma function, não como JSON

    obj: function(hash) {

        this.literal = hash;

        this.merged = function(hash) {
            for ( var i in hash ) {
                if( hash.hasOwnProperty(i) )
                    this.literal[i] = hash[i];
            }

            return this.literal;
        }

        this.deleteProperty = function(key) {
            delete this.literal[key]
            return this.literal;
        }

        this.hasKey = function(search) {
            for ( i in hash ) {
                if ( hash.hasOwnProperty(i) ) {
                    if ( i == search ) {
                        return true;
                    }
                }
            }
            return false;
        }

    },

    merge: function(current, to) {

        var merged = {};

        for ( var i in current ) {
            if( current.hasOwnProperty(i) )
                merged[i] = current[i];
        }
        for ( var i in to ) {
            if( to.hasOwnProperty(i) )
                merged[i] = to[i];
        }
        return merged;
    },

}
