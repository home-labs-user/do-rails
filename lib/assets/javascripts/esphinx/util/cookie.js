var
    esPhinx;


(function($) {
    "use strict";

    $.extend({
        Cookie: {}
    });

    $.Extender.extend($.Cookie, true, {

        add: function(key, value, options) {
            var
                expiresAt,

                resolveOptions = function(options) {
                    var
                        duration;

                    if (Object.getPrototypeOf(options) !=
                        Object.getPrototypeOf({})) {
                        options = {};
                    }

                    // duration
                    if (!options.duration ||
                        Object.getPrototypeOf(options.duration) !=
                        Object.getPrototypeOf({})) {
                        options.duration = {};
                    }

                    duration = options.duration;

                    if (!duration.seconds) {
                        duration.seconds = 0;
                    }

                    if (!duration.minutes) {
                        duration.minutes = 0;
                    }

                    if (!duration.hours) {
                        duration.hours = 0;
                    }

                    if (!duration.days) {
                        duration.days = 0;
                    }

                    if (!duration.months) {
                        duration.months = 0;
                    }

                    if (!duration.years) {
                        duration.years = 0;
                    }

                    // domain
                    if (!options.domain) {
                        options.domain = document.location.host;
                        // options.domain = document.location.origin;
                        // options.domain = document.location.href;
                    }

                    // path
                    if (!options.path) {
                        options.path = "/";
                    }

                    if (duration.seconds) {
                        options.maxAge = duration.seconds;
                    } else if (duration.minutes) {
                        options.maxAge = duration.minutes * 60;
                    } else if (duration.hours) {
                        options.maxAge = optdurationons.hours * 60 * 60;
                    } else if (duration.days) {
                        options.maxAge = duration.days * 24 * 60 * 60;
                    }
                },

                duration = function(durationOptions) {
                    var
                        date = new Date();

                    date.setSeconds(date.getSeconds() +
                                    durationOptions.seconds);
                    date.setMinutes(date.getMinutes() +
                                    durationOptions.minutes);
                    date.setHours(date.getHours() + durationOptions.hours);
                    date.setDate(date.getDate() + durationOptions.days);
                    date.setMonth(date.getMonth() + durationOptions.months);
                    date.setFullYear(date.getFullYear() +
                                     durationOptions.years);

                    // pela questão da hora mundial, pode-se dar a oportunidade ao candidato de informar o tipo, como UTC, neste caso retornar como toUTCString()
                    return date.toString();
                };

            resolveOptions(options);

            expiresAt = duration(options.duration);

            document.cookie = key + "=" + value +
                ";path=" + options.path +
                // still doesn't work.
                // ";domain=" + options.domain +
                ";max-age=" + options.maxAge +
                ";expires=" + expiresAt;

            return this;
        },

        get: function(key) {
            var
                collection,
                length,
                pattern = new RegExp("(?:;*)" + key + "=([^;]*)", "g");

            if (document.cookie) {
                collection = pattern.exec(document.cookie);
                length = collection.length;

                if (length) {
                    return collection[1];
                }
            }

            return "";
        },

        reset: function(key, durationOptions) {

        },

        delete: function(key) {

        },

        restart: function(key) {

        }
    });

}(esPhinx));

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
