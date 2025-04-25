// salvar.js

let versosSalvos = [];

function carregarVersosSalvos(usuario) {
  // Simulação temporária: tenta buscar via API de issues
  fetch(`https://api.github.com/repos/edicoesfuinha/5marias/issues?state=all&creator=${usuario}`)
    .then(res => res.json())
    .then(data => {
      const relevantes = data.filter(issue => issue.title === 'salvar-verso');
      versosSalvos = relevantes.map(issue => issue.body);
      atualizarExibicaoSalvos();
      atualizarStatusCredito();
    })
    .catch(() => {
      document.getElementById('versosSalvos').textContent = 'Erro ao carregar versos salvos.';
    });
}

function salvarVerso() {
  if (!usuarioAtual || versosSalvos.length >= 5) return;

  const versoCompleto = document.getElementById('versoAtual').textContent.trim();
  const conteudo = formatarConteudoSalvo(versoCompleto);

  fetch('https://api.github.com/repos/edicoesfuinha/5marias/issues', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      title: 'salvar-verso',
      body: conteudo
    })
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao criar issue');
      return res.json();
    })
    .then(() => {
      versosSalvos.push(conteudo);
      atualizarExibicaoSalvos();
      atualizarStatusCredito();
      document.getElementById('btnSalvar').disabled = true;
    })
    .catch(err => alert('Erro ao salvar poema: ' + err.message));
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
