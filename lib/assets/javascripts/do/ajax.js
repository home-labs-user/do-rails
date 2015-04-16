//= require ./hash_table

// ============ SAMPLE ============
// $(function() {
//     'use strict';

//     $('button').click(function (){
//         var
//             xhr = null;

//         xhr = Ajax.get({
//             url: '/show',
//             urlParams: {layout: false},

//             progressMedia: function(e){

//             },

//             readyStateChange: function(x){

//             },

//         }).done(function(r){
//             $('body').prepend(r);
//         })
//     })
// })

$(function(){

    var init = function(params) {

        var xhr = new XMLHttpRequest(),
            url = params.url || null,
            user = params.user || null,
            password = params.password || null,
            format = (params.urlParams.format || null),
            responseData = null,
            token = null;

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
                // remover o último &
            }

            params.async = this.async;
            params = init(params);
            xhr = params.xhr;
            params.xhr.send(null);

            var format = params.format;

            this.respondAsync = function(callback) {
                if(params.progressMedia) {
                    //
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
                    else if(xhr.readyState == 4) {
                        if(xhr.status == 200) {
                            if(format == 'js') {
                                eval(xhr.response);
                            }
                            callback(xhr.response);
                        }
                    }
                }
            }

            this.respondSync = function(callback){
                if(format == 'js') {
                    eval(xhr.response);
                }
                callback(xhr.response);
            }

            return this;
        },

        // deixar somente para os casos de envio
        // xhr.send( dataSend || null );

        //ver possibilidade de colocar como método de instância em get
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
