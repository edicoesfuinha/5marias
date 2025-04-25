// salvar.js

let versosSalvos = [];

function carregarVersosSalvos(usuario) {
  fetch('https://39104695-9c68-4a0e-8e27-1d977ab03ba8-00-3i268rf2jd6kx.janeway.replit.dev/todos')
    .then(res => res.json())
    .then(data => {
      versosSalvos = data.filter(v => v.usuario === usuario);
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
  const payload = {
    usuario: usuarioAtual,
    texto: formatarConteudoSalvo(versoCompleto)
  };

  fetch('https://39104695-9c68-4a0e-8e27-1d977ab03ba8-00-3i268f2jd6kx.janeway.replit.dev/salvar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
    .then(res => res.json())
    .then(() => {
      versosSalvos.push(payload);
      atualizarExibicaoSalvos();
      atualizarStatusCredito();
      document.getElementById('btnSalvar').disabled = true;
    })
    .catch(err => alert('Erro ao salvar poema: ' + err.message));
}

function atualizarExibicaoSalvos() {
  const blocos = versosSalvos.map(v => v.texto);
  document.getElementById('versosSalvos').textContent = blocos.join('\n\n');
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
