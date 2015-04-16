// Futuramente ver se é viável extinguir esse objeto, estendendo o objeto window do com o método singleton, dando poder a cada objeto de recuperar seu próprio singleton

// testing
// b = $('body')
// s = Singleton.saveState(o, 'id')
// Singleton.recover('id')

$(function() {

    Singleton = {

        instances: [],

        recover: function(identifier) {
            var obj = null;

            // try {

            // } catch(e) {
            //     console.error(e.message)
            // }

            this.instances.each(function (i) {
                if ( typeof identifier === 'object' ) {
                    if ( i[identifier] === identifier) {
                        obj = i[identifier];
                    }
                } else {
                    if ( i['identifier'] === identifier) {
                        obj = i['instance'];
                    }
                }
            });

            if (obj) {
                return obj;
            }
            console.error('Instance not found!');
            return false;
        },

        // instanciar primeiro e guardar depois
        // parâmetros polimórficos. Instance e params poderão ser typeof string ou object
        saveState: function(instance, identifier) {
            var
                identifierExists_ = function() {
                    var
                        id = null,
                        obj = Singleton;

                    obj.instances.each(function (i) {
                        if ( i['identifier'] === identifier ) {
                            id = true;
                        }
                    });

                    if ( id ) {
                        return true;
                    }
                    return false;
                },

                instanceExists_ = function() {
                    var
                        id = null,
                        obj = Singleton;

                    obj.instances.each(function (i) {
                        if ( i['instance'] === instance ) {
                            id = true;
                        }
                    });

                    if ( id ) {
                        return true;
                    }
                    return false;
                },

                newObject = {};

            // adds a new
            if ( !instanceExists_() ) {
                if( identifier ) {
                    if ( !identifierExists_() ) {
                        newObject['identifier'] = identifier;
                        newObject['instance'] = instance;
                    } else {
                        console.error('Identifier already exists!');
                        return false;
                    }
                } else {
                    // O CODIGO DEVE MUDAR AQUI
                    console.warn('Identifier has not been defined!');
                    // newObject[instance.toString()] = instance;
                    newObject[instance] = instance;
                }
                this.instances.push(newObject);
            } else {
                if( identifier ) {
                    if ( !identifierExists_() ) {
                        newObject['identifier'] = identifier;
                        newObject['instance'] = instance;
                        this.instances = this.instances.without(instance);
                        this.instances.push(newObject);
                    } else {
                        console.error('Identifier already exists!');
                        return false;
                    }
                }
            }

            return this.instances[this.instances.length -1];

        },

    }
})
