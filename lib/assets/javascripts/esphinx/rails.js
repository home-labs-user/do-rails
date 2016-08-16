"use strict";

var
    esPhinx,
    jQuery;

(function ($) {

    $.extend({

        Rails: {

            bindRemoverLinks: function () {
                var
                    rails = jQuery.rails;

                // extract from Rails jquery_ujs
                // https://github.com/rails/jquery-ujs/blob/master/src/rails.js
                jQuery(document).delegate(rails.linkClickSelector, 'click.rails',
                    function(e) {
                    var
                        link = $(this),
                        method = link.data('method'),
                        data = link.data('params'),
                        metaClick = e.metaKey || e.ctrlKey;

                    if (!rails.allowAction(link)) {
                        return rails.stopEverything(e);
                    }

                    if (!metaClick && link.is(rails.linkDisableSelector)) {
                        rails.disableElement(link);
                    }

                    if (rails.isRemote(link)) {
                        if (metaClick && (!method || method === 'GET')
                            && !data) { return true; }

                        var handleRemote = rails.handleRemote(link);
                        // Response from rails.handleRemote() will either be false or a deferred object promise.
                        if (handleRemote === false) {
                            rails.enableElement(link);
                        } else {
                            handleRemote.fail(function() {
                                rails.enableElement(link);
                            });
                        }
                        return false;

                    } else if (method) {
                        rails.handleMethod(link);
                        return false;
                    }
                });
            }

        }

    });

}(esPhinx));
