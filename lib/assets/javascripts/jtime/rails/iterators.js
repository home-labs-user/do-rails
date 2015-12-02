// (function ($) {
//     "use strict";

//     $.extend({

//         prototype: {
//             each: function () {
//                 var
//                     self = this,
//                     i,
//                     callback,
//                     obj;

//                 // resolve args
//                 if (typeof arguments[0] === "function") {
//                     callback = arguments[0];
//                     obj = self;
//                 } else if (arguments[0] instanceof Object
//                     && arguments[1]) {
//                     obj = arguments[0];
//                     callback = arguments[1];
//                 }

//                 for (i in obj) {
//                     if (obj.hasOwnProperty(i) && !isNaN(parseInt(i, 10))) {
//                         callback(obj[i], i);
//                     } else {
//                         break;
//                     }
//                 }
//             }


//         }

//     });

// })(jTime);
