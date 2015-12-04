//= require require_js

(function () {
    var
        script = document.querySelector("script#require_js");

    script.addEventListener('load', function () {
        require("jtime");
    });

})();
