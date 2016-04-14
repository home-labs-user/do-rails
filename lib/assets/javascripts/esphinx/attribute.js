//= require ./main
// require ./support/object

"use strict";

var
    esPhinx;

(function ($module) {

    $module.extend({
        prototype: {
            attr: function (attrName, value) {
                var
                    self = this;

                if (self.length === 1) {
                    if (value) {
                        self[0][attrName] = value;
                    } else {
                        return self[0][attrName];
                    }
                }

                return undefined;
            }
        }

    });

}(esPhinx));
