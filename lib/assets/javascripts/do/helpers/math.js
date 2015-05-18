Array.prototype.mdc = function() {
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
        count = 1;
      }
   }
   
  });
    
  return smallerProductCommon;
}
