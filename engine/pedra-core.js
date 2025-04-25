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
  if (versos.length < 5) return;

  const sorteados = [];
  while (sorteados.length < 5) {
    const i = Math.floor(Math.random() * versos.length);
    const candidato = versos[i];
    if (!sorteados.includes(candidato)) {
      sorteados.push(candidato);
    }
  }

  const textoFinal = sorteados.map(v => `${v.codigo.padEnd(7)} ${v.verso}`).join('\n');
  document.getElementById('versoAtual').textContent = textoFinal;
  document.getElementById('btnSalvar').disabled = false;
}

function limparPontuacaoFinal(texto) {
  texto = texto.trim();
  const final = texto.slice(-1);
  if (final === '?') return texto.toUpperCase();
  if ([',', '.', ';'].includes(final)) return texto.slice(0, -1).toUpperCase();
  return texto.toUpperCase();
} 
