// Considerar algumas propriedades para o algorítmo ficar mais rápido e não precisar fazer conta, exemplos:
// Para apenas dois números o Algorítmo de Euclides é mais rápido
// Se em dois ou mais valores forem múltiplos do menor dentre eles, então o MDC será o menor dentre eles;
// Seja n a quantidade de termos a ser calculado o MDC, se n <= 3, se um dos termos for primo, então o MDC será 1
// Senão se dois termos forem primos, então o MDC também será 1, visto que dois números primos distintos nunca serão
// múltiplos entre si, visto que são múltiplos apenas deles mesmos e de 1.
// Se todos os valores são iguais, então o MDC é um deles.

// greatest common divisor
Array.prototype.gcd = function() {
  var
    _aux = [],
    currFactors = null,
    _primes = [],
    dividend = 1,
    count = 1,
    smallerFactors = {},
    smallerProductCommon = 1,
    _arr = this
  ;

  _arr.map(function(item) {
    if(item < 0){
      item *= -1;
    }

    dividend = item;
    while (dividend > 1) {
      _aux.push(dividend.firstMultiple());
      dividend = dividend/dividend.firstMultiple();
  
      // para contar quantas vezes o mesmo divisor saiu
      if( dividend.firstMultiple() === (_aux[_aux.length -1]) ) {
        count++;
      } else {                    
        _primes.push(_aux[_aux.length -1]);

        // map lower factors
        if (_aux[_aux.length -1] in smallerFactors) {
          currFactors = Math.pow( (_aux[_aux.length -1]).firstMultiple(), count );
          if (currFactors < smallerFactors[_aux[_aux.length -1]] ) {
            smallerFactors[_aux[_aux.length -1]] = currFactors;
          }
        } else {
          smallerFactors[_aux[_aux.length -1]] = Math.pow( (_aux[_aux.length -1]).firstMultiple(), count);
        }

        count = 1;
        _aux = [];
      }
      
    }
  });

  // check common factors
  _primes = _primes.sort();
  _primes.map(function(n, i) {

    if(n === _primes[i+1]) {
      count++;
    } else {
      if(count === _arr.length) {
        smallerProductCommon *= smallerFactors[n];        
      }
      count = 1;
   }
   
  });

  return smallerProductCommon;
}
