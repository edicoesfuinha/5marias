// login.js

let usuariosValidos = {};
let usuarioAtual = null;

// carrega usuarios.json externamente
fetch('usuarios.json')
  .then(res => res.json())
  .then(data => {
    usuariosValidos = data;
  });

function logar() {
  const input = document.getElementById('user').value.trim().toLowerCase();

  if (usuariosValidos[input]) {
    usuarioAtual = input;
    localStorage.setItem('usuario', usuarioAtual);

    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('painel').style.display = 'block';
    document.getElementById('status').textContent = `Olá, ${usuarioAtual}. Você pode sortear versos e salvar até 5.`;

    carregarCSV(() => {
      carregarVersosSalvos(usuarioAtual);
    });
  } else {
    alert('Usuário inválido. Tente novamente.');
  }
}
