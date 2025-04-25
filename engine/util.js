// util.js

function formatarTimestampBR() {
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const ano = agora.getFullYear();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');
  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

function gerarNomeArquivo(usuario, quantidade) {
  const num = String(quantidade + 1).padStart(2, '0');
  return `${usuario}${num}.txt`;
}

function formatarConteudoSalvo(versoCompleto) {
  const timestamp = formatarTimestampBR();
  return `${timestamp}\n${versoCompleto}`;
}
