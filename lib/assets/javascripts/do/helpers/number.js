// head = document.querySelector('head');

// number = document.createElement('script');
// number.src = 'https://rawgit.com/home-labs/do-rails/master/lib/assets/javascripts/do/helpers/number.js';

// head.appendChild(number);

// Para futuras implementações, como retorno de fatores primos de determinado valor, podemos usar um algorítmo determinístico como esses dois abaixo
// É interessante calcular somente os fatores primos que caberiam para determinado número, ao invés de testar com todo número natural até chegar a ele, e salvá-los em i como um array, e no if calcular o retorno 0 somente para estes. Devendo o próprio número ser retornado caso não haja quantidade de múltiplos maior que 1, pois 1 e ele mesmo não deverão entrar no vetor para ser calculado.
// Mas como calcular esse números primos? No braço?

// http://pt.wikipedia.org/wiki/Crivo_de_Erat%C3%B3stenes
// http://pt.wikipedia.org/wiki/Teste_de_primalidade_AKS

Array.prototype.occurrences = function(comparison) {
  var
    _arr = this.sort();
    count = 0;
  ;

  // talvez fosse interessante não usar o map para otimizar, testando até determinado item se diferente do próximo
  _arr.map(function(item) {
    if(item == comparison) { count++; }
  });
  return count;
}

// Array.prototype.firstMultiple = function() {
//   var
//     _arr = this,
//     _factors = []
//   ;

//   _arr.map(function(item) {
//     _factors.push(item.firstMultiple());
//   });
//   // o primeiro valor não pode ser 1. Não faria sentido. Consertar esse código.
//   return (_factors.sort())[0];
// }

Number.prototype.firstMultiple = function() {
  return Number.firstMultiple(this);
}

Number.firstMultiple = function(n) {
  var
    i = 1,
    count = 1,
    m = 1
  ;
  
  if (n < 0) { n *= -1; }

  while(i <= n && count < 3) {
    if(n%i === 0) {
      count++;
      m = i;
    }
    i++;

  }
  return m;
}
