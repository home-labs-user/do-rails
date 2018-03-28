var
    esPhinx;


(function($) {
    "use strict";

    $.extend({
        Cookie: {}
    });

    $.Extender.extend($.Cookie, true, {

        set: function(key, value, options) {
            var
                expiresAt,

                getResolvedOptions = function(options) {
                    var
                        duration;

                    if (!options || !Object.belongsToClass(options, Object)) {
                        options = {};
                    }

                    // duration
                    if (!options.duration ||
                        Object.belongsToClass(options.duration, Object)) {
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

                    // path
                    if (!options.path) {
                        options.path = "/";
                    }

                    // max-age
                    if (!options.maxAge) {
                        if (duration.seconds) {
                            options.maxAge = duration.seconds;
                        } else if (duration.minutes) {
                            options.maxAge = duration.minutes * 60;
                        } else if (duration.hours) {
                            options.maxAge = duration.hours * 60 * 60;
                        } else if (duration.days) {
                            options.maxAge = duration.days * 24 * 60 * 60;
                        }
                    }

                    if (typeof options.secure != "boolean") {
                        options.secure = false;
                    }

                    return options;
                },

                getDuration = function(durationOptions) {
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

                    return date.toString();
                },

                getCompost = function(options) {
                    var
                        compost = "";

                    compost += key + "=" + value +
                        ";path=" + options.path;

                    if (options.domain) {
                        // test woth document.location.host
                        compost += ";domain=" + options.domain;
                    }

                    if (options.maxAge) {
                        compost += ";max-age=" + options.maxAge;
                    }

                    if (options.expires) {
                        expiresAt = getDuration(options.duration);
                        compost += ";expires=" + expiresAt;
                    }

                    if (options.secure) {
                        compost += ";secure";
                    }

                    return compost;
                };

            options = getResolvedOptions(options);

            document.cookie = getCompost(options);

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
        }

        // reset: function(key, durationOptions) {

        // },

        // delete: function(key) {

        // },

        // restart: function(key) {

        // }

    });

}(esPhinx));
