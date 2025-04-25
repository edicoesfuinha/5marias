// util.js

function sortearVersos(array, quantidade) {
  const resultado = [];

  while (resultado.length < quantidade && array.length > 0) {
    const rand = Math.floor(Math.random() * array.length);
    resultado.push(array[rand]); // repete se vier igual, e tá tudo bem
  }

  return resultado;
}
