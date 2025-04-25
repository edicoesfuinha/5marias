// salvar.js

let versosSalvos = [];

function carregarVersosSalvos(usuario) {
  // Simulação local, substituir por leitura da API futuramente
  const arquivosMock = localStorage.getItem(`salvos_${usuario}`);
  if (arquivosMock) {
    versosSalvos = JSON.parse(arquivosMock);
  } else {
    versosSalvos = [];
  }

  atualizarExibicaoSalvos();
  atualizarStatusCredito();
}

function salvarVerso() {
  if (!usuarioAtual || versosSalvos.length >= 5) return;

  const versoCompleto = document.getElementById('versoAtual').textContent.trim();
  const conteudo = formatarConteudoSalvo(versoCompleto);

  versosSalvos.push(conteudo);
  localStorage.setItem(`salvos_${usuarioAtual}`, JSON.stringify(versosSalvos));

  atualizarExibicaoSalvos();
  atualizarStatusCredito();
  document.getElementById('btnSalvar').disabled = true;
}

function atualizarExibicaoSalvos() {
  document.getElementById('versosSalvos').textContent = versosSalvos.join('\n\n');
}

function atualizarStatusCredito() {
  const restantes = 5 - versosSalvos.length;
  if (restantes <= 0) {
    document.getElementById('btnSalvar').disabled = true;
    document.getElementById('status').textContent = `Você salvou os 5 versos. Obrigado por jogar!`;
  } else {
    document.getElementById('status').textContent = `Você já salvou ${versosSalvos.length} de 5 versos.`;
  }
}
