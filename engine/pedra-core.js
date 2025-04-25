// pedra-core.js

let versos = [];

function carregarCSV(callback) {
  fetch('pedra.csv')
    .then(response => response.text())
    .then(csvText => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          versos = results.data.map(row => ({
            codigo: (row['Código'] || '').toUpperCase(),
            verso: limparPontuacaoFinal(row['Verso com "pedra"'] || '')
          }));
          callback();
        }
      });
    });
}

function sortearVerso() {
  if (versos.length === 0) return;
  const index = Math.floor(Math.random() * versos.length);
  const sorteado = versos[index];
  document.getElementById('versoAtual').textContent = `${sorteado.codigo.padEnd(7)} ${sorteado.verso}`;
  document.getElementById('btnSalvar').disabled = false;
}

function limparPontuacaoFinal(texto) {
  texto = texto.trim();
  const final = texto.slice(-1);
  if (final === '?') return texto.toUpperCase();
  if ([',', '.', ';'].includes(final)) return texto.slice(0, -1).toUpperCase();
  return texto.toUpperCase();
} 
