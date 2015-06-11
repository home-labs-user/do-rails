// Considerar algumas propriedades para o algorítmo ficar mais rápido e não precisar fazer conta, exemplos:
// Para apenas dois números o Algorítmo de Euclides é mais rápido
// Se em dois ou mais valores forem múltiplos do menor dentre eles, então o MDC será o menor dentre eles;
// Seja n a quantidade de termos a ser calculado o MDC, se n <= 3, se um dos termos for primo, então o MDC será 1
// Senão se dois termos forem primos, então o MDC também será 1, visto que dois números primos distintos nunca serão
// múltiplos entre si, visto que são múltiplos apenas deles mesmos e de 1.
// Se todos os valores são iguais, então o MDC é um deles.

// greatest common divisor
Math.gcd = function() {
  var _factors = [];
  // arguments returns the arguments of js function
  for(var i in arguments) {
    if( arguments.hasOwnProperty(i) ){
      _factors.push(parseInt(arguments[i]));
    }
  }
  return _factors.gcd();
}

Array.prototype.gcd = function() {
  var
    _factors = [],
    smallerFactorsHash = {},
    factor = 2,
    dividend = 1,
    count = 1,
    smallerCommonProduct = 1,
    _arr = this,
    powFactor = null
  ;

  _arr.map(function(item) {
    if(item < 0){
      item *= -1;
    }

    dividend = item;
    while ( dividend > 1 ) {

      factor = dividend.firstMultiple();
      dividend = dividend/dividend.firstMultiple();

      // para contar quantas vezes o mesmo divisor saiu
      if( dividend.firstMultiple() === factor ) {
        count++;
      } else {
        _factors.push(factor);

        // map smaller factors
        powFactor = Math.pow( factor, count );

        if( factor in smallerFactorsHash ) {
          if( powFactor < smallerFactorsHash[factor] ) {
            smallerFactorsHash[factor] = powFactor;
          }
        } else {
          smallerFactorsHash[factor] = powFactor;
        }

        count = 1;
      }

    }
  });

  // check common factors
  _factors = _factors.sort();
  _factors.map(function(n, i) {
    if( n === _factors[i+1] ) {
      count++;
    } else {
      if( count === _arr.length ) {
        smallerCommonProduct *= smallerFactorsHash[n];
      }
      count = 1;
   }

  });

  return smallerCommonProduct;
}
