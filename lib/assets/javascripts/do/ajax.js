// depends of HashTable

$(function(){

    var init = function(params) {

        var
            // cria o objeto
            xhr = new XMLHttpRequest()
            ,url = params.url || null
            ,user = params.user || null
            ,password = params.password || null
            ,responseData = null
            ,token = null
        ;

        // abre a conexão
        // async não informado dá warning de deprecated
        xhr.open(params.type, url, params.async, user, password);

        meta = document.querySelector('meta[name=csrf-token]');
        if( meta ) { token = meta.getAttribute('content'); }
        if( token ) { xhr.setRequestHeader('X-CSRF-Token', token); }
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

            var formatJS = false;

            params.type = 'GET';

            if( !params.async ) {
                this.async = true;
            } else {
                this.async = params.async;
            }

            if( params.urlParams ) {

                if( params.urlParams.format === 'js' ) {
                    formatJS = true;
                }

                params.url += '?';
                for( i in params.urlParams ) {
                    params.url += i + '=' + params.urlParams[i] + '&';
                }
                params.url = params.url.slice(0, params.url.length-1);
            }

            params.async = this.async;
            params = init(params);
            xhr = params.xhr;
            // envia dados e se conecta ao servidor remoto
            params.xhr.send(null);

            this.respondAsync = function (callback) {
                if( params.progressMedia ) {
                    xhr.addEventListener('progress',
                        function (e) {
                            params.progressMedia(e);
                        }
                    , false);
                }

                xhr.onreadystatechange = function () {
                    // debugger;
                    if( xhr.readyState > 1 && xhr.readyState < 4 ) {
                        if( params.readyStateChange ) {
                            params.readyStateChange(xhr);
                        }
                    } else {
                        try {
                            if( xhr.status === 404 ) {
                                throw new Error('404 (Not Found)');
                            } else {
                                if(
                                    xhr.getResponseHeader('Content-Type')
                                    .search('text/javascript') > -1
                                ) {
                                    eval(xhr.response);
                                }
                                if ( !formatJS ) {
                                    if( callback ) {
                                        callback(xhr.response);
                                    }
                                }
                            }
                        } catch(e) {
                            console.error(e);
                        }
                    }
                }
            }

            this.respondSync = function (callback) {
                if( xhr.getResponseHeader('Content-Type').search('text/javascript') > -1 ) {
                    eval(xhr.response);
                }
                if( callback ) {
                    callback(xhr.response);
                }
            }

            // deve ser declarado após as definições com o this
            if( formatJS ) {
                if( this.async ) {
                    this.respondAsync();
                } else {
                    this.respondSync();
                }
            }

            return this;
        },

        // deixar somente para os casos de envio
        // xhr.send( dataSend || null );

        done: function (callback) {
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