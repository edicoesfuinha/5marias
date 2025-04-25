// pedra-core.js

let versos = [];

function carregarCSV(url, callback) {
  fetch(url)
    .then(response => response.text())
    .then(csvText => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          versos = results.data.map(row => ({
            codigo: row['Código']?.toUpperCase() || '',
            verso: limparPontuacaoFinal(row['Verso com "pedra"']),
            plural: row['Plural?']?.toLowerCase() === 'sim'
          }));
          callback(versos);
        }
      });
    });
}

// agora dentro do pedra-core.js
function limparPontuacaoFinal(texto) {
  if (!texto) return '';
  texto = texto.trim();

  const final = texto.slice(-1);
  if (final === '?') return texto.toUpperCase();
  if (['.', ',', ';'].includes(final)) return texto.slice(0, -1).toUpperCase();

  return texto.toUpperCase();
}
