const inputs = document.querySelectorAll("input, textarea");

// ❤️ vida (persistente)
let vidaMax = 100;
let vidaAtual = 100;

// 🔊 SONS
const somDano = new Audio("sons/dano.mp3");
const somCura = new Audio("sons/cura.mp3");

somDano.volume = 0.5;
somCura.volume = 0.5;

// PREVIEW DA IMAGEM
document.getElementById("uploadFoto").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    document.getElementById("preview").src = reader.result;
  };

  if (file) reader.readAsDataURL(file);
});

// 💾 SALVAR FICHA
function salvarFicha() {
  let ficha = {};

  inputs.forEach((input, index) => {
    ficha[`campo_${index}`] = input.value;
  });

  ficha.foto = document.getElementById("preview").src;

  ficha.vidaAtual = vidaAtual;
  ficha.vidaMax = vidaMax;

  localStorage.setItem("fichaRPG", JSON.stringify(ficha));

  document.getElementById("status").innerText = "Ficha salva com sucesso!";
}

// 📂 CARREGAR FICHA
function carregarFicha() {
  const dados = JSON.parse(localStorage.getItem("fichaRPG"));

  if (!dados) return;

  inputs.forEach((input, index) => {
    if (dados[`campo_${index}`] !== undefined) {
      input.value = dados[`campo_${index}`];
    }
  });

  if (dados.foto) {
    document.getElementById("preview").src = dados.foto;
  }

  if (dados.vidaAtual !== undefined && dados.vidaMax !== undefined) {
    vidaAtual = Number(dados.vidaAtual);
    vidaMax = Number(dados.vidaMax);
    atualizarVida();
  }
}

// 🎲 ROLAGEM DE DADOS + HISTÓRICO
function rolarDado(lados) {
  const dado = document.getElementById("dadoAnimado");
  const resultadoEl = document.getElementById("resultadoDado");
  const historico = document.getElementById("historicoDados");

  dado.classList.add("girando");
  resultadoEl.innerText = "Rolando...";

  setTimeout(() => {
    const resultado = Math.floor(Math.random() * lados) + 1;

    dado.classList.remove("girando");

    resultadoEl.innerText = `D${lados} → ${resultado}`;

    if (historico) {
      const item = document.createElement("div");
      item.classList.add("historico-item");
      item.innerText = `D${lados} → ${resultado}`;

      historico.prepend(item);
    }
  }, 800);
}

// 🧹 limpar histórico
function limparHistorico() {
  const historico = document.getElementById("historicoDados");

  if (historico) {
    historico.innerHTML = "";
  }
}

// ❤️ atualizar vida (COM COR DINÂMICA 🔥)
function atualizarVida() {
  const porcentagem = (vidaAtual / vidaMax) * 100;

  const barra = document.getElementById("hpFill");
  const texto = document.getElementById("hpText");

  barra.style.width = porcentagem + "%";

  if (porcentagem > 60) {
    barra.style.background = "#2ecc71";
    barra.style.boxShadow = "0 0 10px #2ecc71";
  } else if (porcentagem > 30) {
    barra.style.background = "#f1c40f";
    barra.style.boxShadow = "0 0 10px #f1c40f";
  } else {
    barra.style.background = "#e74c3c";
    barra.style.boxShadow = "0 0 15px #e74c3c";
  }

  texto.innerText = `${vidaAtual} / ${vidaMax}`;
}

// ⚔️ dano + 🔊 som
function tomarDano() {
  const dano = parseInt(document.getElementById("danoInput").value);

  if (!isNaN(dano)) {
    vidaAtual -= dano;
    if (vidaAtual < 0) vidaAtual = 0;

    somDano.currentTime = 0;
    somDano.play();

    atualizarVida();
  }
}

// ✨ cura + 🔊 som
function curarVida() {
  const cura = parseInt(document.getElementById("danoInput").value);

  if (!isNaN(cura)) {
    vidaAtual += cura;
    if (vidaAtual > vidaMax) vidaAtual = vidaMax;

    somCura.currentTime = 0;
    somCura.play();

    atualizarVida();
  }
}

// 🧨 RESET PERSONAGEM
function resetPersonagem() {
  localStorage.removeItem("fichaRPG");

  inputs.forEach((input) => {
    input.value = "";
  });

  document.getElementById("preview").src = "../imgs/default.png";

  vidaAtual = 100;
  vidaMax = 100;
  atualizarVida();

  const historico = document.getElementById("historicoDados");
  if (historico) historico.innerHTML = "";

  document.getElementById("status").innerText = "Personagem resetado!";
}

// 🔁 AUTO LOAD
window.onload = function () {
  carregarFicha();
  atualizarVida();
};
