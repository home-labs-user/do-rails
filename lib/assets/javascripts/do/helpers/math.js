// head = document.querySelector('head');

// math = document.createElement('script');
// math.src = 'https://rawgit.com/home-labs/do-rails/master/lib/assets/javascripts/do/helpers/math.js';

// head.appendChild(math);

Number.prototype.firstMultiple = function() {
  var
    n = this,
    i = 1,
    count = 1,
    m = 1;

  while(i <= n && count < 3) {
    if(n%i === 0) {
      count++;
      m = i;
    }
    i++;
  }
  return m;
}

Number.firstMultiple = function(n) {
  var
    i = 1,
    count = 1,
    m = 1;

  while(i <= n && count < 3) {
    if(n%i === 0) {
      count++;
      m = i;
    }
    i++;

  }
  return m;
}
