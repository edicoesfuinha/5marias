// login.js

// Simulação inicial de usuários válidos
const usuariosValidos = {
  "leila": true,
  "gato3": true,
  "zeca": true
};

let usuarioAtual = null;

function logar() {
  const input = document.getElementById('user').value.trim().toLowerCase();

  if (usuariosValidos[input]) {
    usuarioAtual = input;
    localStorage.setItem('usuario', usuarioAtual);

    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('painel').style.display = 'block';
    document.getElementById('status').textContent = `Olá, ${usuarioAtual}. Você pode sortear versos e salvar até 5.`;

    carregarCSV(() => {
      carregarVersosSalvos(usuarioAtual); // função virá no salvar.js
    });

  } else {
    alert('Usuário inválido. Tente novamente.');
  }
}
