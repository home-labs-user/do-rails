(function ($) {

    var
        instances = [];

    Object.defineProperties($.prototype, {
        singleton: {
            value: function singleton () {
                var
                    self = this,
                    i,
                    newInstance;

                for (i in instances) {
                    if (instances.hasOwnProperty(i)) {
                        if (self.prototype ===
                            Object.getPrototypeOf(instances[i])
                        ) {
                            return instances[i];
                        }
                    }
                }

                newInstance = new self;
                instances.push(newInstance);
                return newInstance;
            }
        }
    });

})(Function);
