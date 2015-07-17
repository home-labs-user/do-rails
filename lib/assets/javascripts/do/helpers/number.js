// retorna a quantidade de um item
Array.prototype.occurrences = function(comparison) {
  var
    _arr = this.sort();
    count = 0;
  ;

  // talvez fosse interessante não usar o map para otimizar, testando até determinado item se diferente do próximo
  _arr.map(function(item) {
    if(item === comparison) { count++; }
  });
  return count;
}
