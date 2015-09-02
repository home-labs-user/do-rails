//= require ./hash_table

$(function(){

    var init = function(params) {

        var
            xhr = new XMLHttpRequest()
            ,url = params.url || null
            ,user = params.user || null
            ,password = params.password || null
            ,responseData = null
            ,token = null
        ;

        // async não informado dá warning de deprecated
        xhr.open(params.type, url, params.async, user, password);

        meta = document.querySelector('meta[name=csrf-token]');
        if(meta) { token = meta.getAttribute('content'); }
        if(token) { xhr.setRequestHeader('X-CSRF-Token', token); }
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        params.xhr = xhr;

        return params;
    }

    Ajax = {

        // try {
        // } catch(e) {
        //     console.error(e.message)
        // }

        get: function(params) {

            params.type = 'GET';

            if(params.async) {
                this.async = params.async;
            } else {
                this.async = true;
            }

            if(params.urlParams) {
                params.url += '?';
                for(i in params.urlParams) {
                    params.url += i + '=' + params.urlParams[i] + '&';
                }
                params.url = params.url.slice(0, params.url.length-1);
            }

            params.async = this.async;
            params = init(params);
            xhr = params.xhr;
            params.xhr.send(null);

            this.respondAsync = function(callback) {
                if(params.progressMedia) {
                    xhr.addEventListener('progress',
                        function(e) {
                            params.progressMedia(e);
                        }
                    , false);
                }

                xhr.onreadystatechange = function(){
                    if(xhr.readyState > 1 && xhr.readyState < 4) {
                        if(params.readyStateChange) {
                            params.readyStateChange(xhr);
                        }
                    }
                    else if(xhr.readyState === 4) {
                        if(xhr.status === 200) {
                            if( xhr.getResponseHeader('Content-Type').search('text/javascript') > -1 ) {
                                eval(xhr.response);
                            }
                            if(callback) {
                                // retorno de html completo gera warning
                                callback(xhr.response);
                            }
                        }
                    }
                }
            }

            this.respondSync = function(callback){
                if( xhr.getResponseHeader('Content-Type').search('text/javascript') > -1 ) {
                    eval(xhr.response);
                }
                if(callback) {
                    callback(xhr.response);
                }
            }

            // deve ser declarado após as definições com o this
            if( params.urlParams ) {
                if(params.urlParams.format === 'js') {
                    if(this.async) {
                        this.respondAsync();
                    } else {
                        this.respondSync();
                    }
                }
            }

            return this;
        },

        // deixar somente para os casos de envio
        // xhr.send( dataSend || null );

        done: function(callback) {
            if(this.async) {
                this.respondAsync(callback);
            }
            else {
                this.respondSync(callback);
            }

            return this.xhr;
        },

    }
})
;