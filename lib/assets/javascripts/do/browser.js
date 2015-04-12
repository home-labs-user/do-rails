// $(function () {
//     'use strict';
// });


var init = function() {

    var
        nav = navigator.userAgent,
        out = {};

    if ( nav.match(/OPR\//gi) ) {
        out.name = "Opera";
        out.codeName = null;
        out.version = nav.match(/OPR\/[0-9]+[\.[0-9]+]*/).toString().match(/[0-9]+[\.[0-9]+]*/).toString();
    } else if ( nav.match(/Opera\//gi) ) {
        out.name = "Opera";
        out.codeName = null;
        out.version = nav.match(/Version\/[0-9]+[\.[0-9]+]*/).toString().match(/[0-9]+[\.[0-9]+]*/).toString();
    } else if ( nav.match(/(Firefox\/[0-9]+[\.[0-9]+]*)$/gi) ) {
        out.name = "Firefox"
        out.codeName = "FF";
        out.version = nav.match(/[Firefox\/[0-9]+[\.[0-9]+]*$/gi).toString().match("[0-9]+[\.[0-9]+]*").toString();
    } else if ( nav.match(/Chrome\/[0-9]+[\.[0-9]+]*/gi) ) {
        out.name = "Google Chrome";
        out.codeName = "GC";
        out.version = nav.match(/Chrome\/[0-9]+[\.[0-9]+]*/).toString().match(/[0-9]+[\.[0-9]+]*/).toString();
    } else if ( nav.match(/MSIE\//gi) ) {
        out.name = "Internet Explorer";
        out.codeName = "IE";
        out.version = nav.match(/MSIE [0-9]+[\.[0-9]+]*/).toString().match(/[0-9]+[\.[0-9]+]*/).toString();
    } else if ( nav.match(/.NET\//gi) ) {
        out.name = "Internet Explorer";
        out.codeName = "IE";
    } else if ( nav.match(/Safari\//gi) && nav.match(/Version\//gi) ) {
        out.name = "Safari";
    }

    return out;
}

Browser = {

    version: function (){
        return init().version;
    },

    name: function (){
        return init().name;
    },

    codeName: function (){
        return init().codeName;
    },

}
