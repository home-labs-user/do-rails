// Não adianta tentar retornar um objeto instanciado para usar um método estático. Esse objeto
// funcionará bem se o método a ser utilizado começa com o "this.", sendo um método de objeto,
// mas não de classe.


// Futuramente extinguir esse objeto extendendo a o objeto window do JS com o método singleton, dando
// poder a cada objeto de criar seu próprio singleton
Singleton = {

  instances: new Hash.obj(),

  instanceOf: function(params){
    // implementar a classe Exception para lançar uma exceção caso o monstro do usuário não
    // informe corretamente a chave

    if( this.instances[params["object"]] ){
      // alert(this.instances[params["object"]]);
      return this.instances[params["object"]];
    }
    else{
      // alert('não')
      constructor = Class.constructorOf(params);
      if(params["params"])
        this.instances[params["object"]] = new constructor(params["params"]);
      else
        this.instances[params["object"]] = new constructor();

      return this.instances[params["object"]];
    };

  },

  save: function(params){
    // params["object"].toString(); //converter para string o nome do objeto
    // qualquer coisa usar o stringfy com o objeto e suas classes(attr("class"))
    this.instances[params["identifier"]] = params["object"];
  },

};