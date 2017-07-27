var
    esPhinx;


(function($) {
    "use strict";

    $.extend({
        Cookie: {}
    });

    $.Extender.extend($.Cookie, true, {
        new: function(key, value, options) {
            var
                expiresAt,
                cookie = document.cookie,
                ConstructorReference = $.Cookie.new,

                resolveOptions = function(options) {
                    if (Object.getPrototypeOf(options) !=
                        Object.getPrototypeOf({})) {
                        options = {};
                    }

                    if (!options.visible2Domain) {
                        options.visible2Domain = "/";
                    }
                },

                calculateDuration = function(durationOptions) {
                    var
                        date = new Date();

                    // seconds
                    // minutes
                    // hours

                    // days
                    // date.setDate(date.getDate() + durationOptions.days);

                    // months
                    // years
                    // date.setFullYear(date.getFullYear() +
                    //                  durationOptions.years);

                    return date.toUTCString();
                },

                add = function(key, value, options) {
                    expiresAt = calculateDuration(options.duration);
                    cookie += key + "=" + value + ";" + expiresAt +
                        ";path=" + visible2Domain;
                };

            if (!(this instanceof ConstructorReference)) {
                return new ConstructorReference(key, value, options);
            }

            resolveOptions(options);

            add(key, value, options);

            this.get = function(key) {
                alert("get");
            };

            this.reset = function(key, value) {

            };

            this.delete = function(key) {

            };

            this.resetDuration = function(key, durationOptions) {

            };

            this.restart = function(key) {

            };

            this.expire = function(key) {

            };

            return this;
        }
    });

}(esPhinx));

// window.document.setCookie = function(cookieName, value, expires)
// {
//   if (expires){
//     var date = new Date();
//     //define um tempo virtual para o objeto Date
//     date.setTime(date.getTime() + expires);
//     expires = 'expires=' + date.toUTCString() + ';';
//   }
//   else
//   var expires = '';

//   //sendo em path o valor /, significa que o cookie poderá ser acessado por toda o domínio
//   document.cookie = cookieName + '=' + value + ';' + expires + 'path=' + '/';
// }

// window.document.getCookie = function (cookieName){
//   var fullCookie = cookieName + '=';
//   var arrCookie = document.cookie.split(';'); //msg='Hello';expires=5000;path='/'

//   for(var i = 0; i < arrCookie.length; i++){
//     var cookie = arrCookie[i];
//     //para que testar o primeiro caracter?
//     while (cookie.charAt(0) == ' '){
//       cookie = cookie.substr(1, cookie.length);
//     }
//     if(cookie.indexOf(fullCookie) == 0)
//       return cookie.substr(fullCookie.length, cookie.length);
//   }
//   return null;
// }

// //método mais robusto
// document.setCookie = function (name, value, expires)
// {
//   //neste método, não trabalhei com mês ou ano, porque trocam de valor, um ano pode ter dias diferenciados, bem como o mês
//   var expires = ''

//   if (expires)
//   {
//     //if (typeof(expires) == Number)
//     //definir quantas semanas, dias, meses, anos? Eis a questão
//     //else

//       var day_millisec = 0
//       var arrDay = expires.split('|')
//       //ver como verificar se o arrDay possui valor
//       if(arrDay[1])
//         {
//           var day = parseInt(arrDay[0])
//           day_millisec = day * 24 * 60 * 60 * 1000
//           var arrTime = arrDay[1].split(':')
//         }
//   else
//     var arrTime = expires.split(':')

//     var hour = parseInt(arrTime[0])
//     var min = parseInt(arrTime[1])
//     var sec = parseInt(arrTime[2])

//     var hour_millisec = hour * 60 * 60 * 1000
//     var min_millisec = min * 60 * 1000
//     var sec_millisec = sec * 1000

//     var timeExpire = day_millisec + hour_millisec + min_millisec + sec_millisec
//     var date = new Date()
//     //define um tempo virtual para o OBJETO, não alterando o tempo real do sistema
//     date.setTime(date.getTime() + timeExpire)
//     expires = 'expires=' + date.toUTCString() + ''
// }

// //sintaxe string contendo cookie=valor;tempo=valor;path=/
// //sendo em path o valor /, significa que o cookie poderá ser acessado por toda a string
// document.cookie = name + '=' + value + '' + expires + 'path=' + '/'
// },
// /*
