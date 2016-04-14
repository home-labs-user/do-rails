// require ./main
// require ./support/object

"use strict";

var
    esPhinx;

(function ($module) {

    $module.extend({
        prototype: {
            on: function (eventName, options, callback) {
                var
                    self = this;

                if (typeof options === "function") {
                    callback = options;
                    options = {};
                }

                self.eachAttrs(function (domEl) {
                    domEl.addEventListener(eventName, function (e) {
                        callback(e);
                    }, (options.capture || false), false);

                });

                return self;
            },

            off: function (eventName, options) {
                options = options || {};

                var
                    self = this,
                    newEl;

                self.eachAttrs(function (domEl) {
                    newEl = domEl.cloneNode(true);
                    domEl.parentNode.replaceChild(newEl, domEl);
                });

                return self;
            }
        }

    });

}(esPhinx));
