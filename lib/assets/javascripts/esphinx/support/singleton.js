var Singleton;
Singleton = (function () {
    "use strict";

    var
        instances = [];

    return {
        save: function () {
            instances.push(arguments[0]);
        },

        instances: function () {
            return instances;
        },

        destroy: function () {

            return instances;
        }
    };

})();
