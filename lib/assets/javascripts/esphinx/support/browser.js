"use strict";

var Browser;
Browser = (function ($) {

    var init = function () {

        var
            nav = navigator.userAgent,
            out = {};

        if (/OPR\//gi.test(nav)) {
            out.name = "Opera";
            out.codeName = null;
            out.fullVersion = nav.match(/OPR\/[0-9]+[\.\[0-9]+\]*/)
                .toString().match(/[0-9]+[\.\[0-9]+\]*/).toString();
        } else if (/Opera\//gi.test(nav)) {
            out.name = "Opera";
            out.codeName = null;
            out.fullVersion = nav.match(/Version\/[0-9]+[\.\[0-9]+\]*/)
                .toString().match(/[0-9]+[\.\[0-9]+\]*/).toString();
        } else if (/(Firefox\/[0-9]+[\.\[0-9]+\]*)$/gi.test(nav)) {
            out.name = "Firefox";
            out.codeName = "FF";
            out.fullVersion = nav.match(/[Firefox\/\[0-9]+[\.\[0-9]+\]*$/gi)
                .toString().match("[0-9]+[\\.[0-9]+]*").toString();
        } else if (/Chrome\/[0-9]+[\.\[0-9]+\]*/gi.test(nav)) {
            out.name = "Google Chrome";
            out.codeName = "GC";
            out.fullVersion = nav.match(/Chrome\/[0-9]+[\.\[0-9]+\]*/)
                .toString().match(/[0-9]+[\.\[0-9]+\]*/).toString();
        } else if (/MSIE\//gi.test(nav)) {
            out.name = "Internet Explorer";
            out.codeName = "IE";
            out.fullVersion = nav.match(/MSIE [0-9]+[\.\[0-9]+\]*/)
                .toString().match(/[0-9]+[\.\[0-9]+\]*/).toString();
        } else if (/\.NET\//gi.test(nav)) {
            out.name = "Internet Explorer";
            out.codeName = "IE";
        } else if (/Safari\//gi.test(nav) && /Version\//gi.test(nav)) {
            out.name = "Safari";
        }

        return out;
    };


    return {

        fullVersion: function () {
            return init().fullVersion;
        },

        name: function () {
            return init().name;
        },

        codeName: function () {
            return init().codeName;
        }
    }

})();
