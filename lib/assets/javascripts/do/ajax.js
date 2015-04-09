Ajax = {
    defaults: {
        type: 'GET',
        async: true
    },

    init: function(){
        params = this.defaults;

        this.xhr = new XMLHttpRequest();

        var xhr = this.xhr,
            url = params.url || null,
            user = params.user || null,
            password = params.password || null,
            format = (params.format || null),
            responseData = null,
            dataSend = null,
            token = null;

        if(format)
            url += '?format=' + format;

        xhr.open(params.type, url, params.async, user, password);

        meta = document.querySelector('meta[name=csrf-token]')
        if(meta)
            token = meta.getAttribute('content');

        if(token)
            xhr.setRequestHeader('X-CSRF-Token', token);

        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send( dataSend || null );

        this.respondAsync = function(callback){
            if(params.progressMedia)
                xhr.addEventListener('progress',
                    function(e){
                        params.progressMedia(e);
                    }
                , false);

            xhr.onreadystatechange = function(){
                if(xhr.readyState > 1 && xhr.readyState < 4){
                    if(params.readyStateChange)
                        params.readyStateChange(xhr);
                }
                else if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        if(format == 'js'){
                            eval(xhr.response);
                        }
                        callback(xhr.response);
                    }
                }
            }
        }

        this.respondSync = function(callback){
            if(format == 'js'){
                eval(xhr.response);
            }
            callback(xhr.response);
        }

      },

    get: function(params){
        this.defaults = Hash.merge(this.defaults, params);
        this.init();
        return this;
    },

    done: function(callback){
        params = this.defaults;
        async = params.async;

        if(async){
            this.respondAsync(callback);
        }
        else{
            this.respondSync(callback);
        }

        return this.xhr;
    },

};

// xhr = Ajax.get({
//     url: '',
//     progressMedia: function(e){

//     },
//     readyStateChange: function(xhr){

//     },
// }).done(function(r){

// });
