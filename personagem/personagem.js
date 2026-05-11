const quantidade = Number(localStorage.getItem("quantidadeJogadores")) || 1;

const areaPersonagens = document.getElementById("personagens");

/* RAÇAS */
const racas = {
  Humano: { vida: 100, mana: 50, forca: 10, defesa: 10 },
  Elfo: { vida: 80, mana: 120, forca: 8, defesa: 7 },
  Anao: { vida: 140, mana: 30, forca: 14, defesa: 15 },
  Orc: { vida: 160, mana: 10, forca: 18, defesa: 8 },
};

/* CLASSES */
const classes = {
  Guerreiro: {
    vida: 30,
    mana: 0,
    forca: 5,
    defesa: 3,
    habilidade: "⚔ Golpe Brutal",
  },
  Mago: {
    vida: 0,
    mana: 40,
    forca: 0,
    defesa: 0,
    habilidade: "🔥 Bola de Fogo",
  },
  Arqueiro: {
    vida: 10,
    mana: 10,
    forca: 4,
    defesa: 1,
    habilidade: "🏹 Flecha Tripla",
  },
  Paladino: {
    vida: 20,
    mana: 20,
    forca: 2,
    defesa: 5,
    habilidade: "✨ Cura Divina",
  },
  Barbaro: {
    vida: 40,
    mana: 0,
    forca: 8,
    defesa: -1,
    habilidade: "🪓 Fúria Selvagem",
  },
};

/* NOMES */
const nomesAleatorios = [
  "Arthur",
  "Kael",
  "Ragnar",
  "Eldric",
  "Luna",
  "Selena",
  "Draven",
  "Aelin",
];

/* CRIAR PERSONAGENS */
function criarPersonagens() {
  for (let i = 1; i <= quantidade; i++) {
    areaPersonagens.innerHTML += `
      <div class="card-personagem">

        <h2>JOGADOR ${i}</h2>

        <label>Nome</label>
        <input type="text" id="nome-${i}" placeholder="Digite seu nome" />

        <label>Classe</label>
        <select id="classe-${i}">
          <option>Guerreiro</option>
          <option>Mago</option>
          <option>Arqueiro</option>
          <option>Paladino</option>
          <option>Barbaro</option>
        </select>

        <label>Raça</label>
        <select id="raca-${i}">
          <option>Humano</option>
          <option>Elfo</option>
          <option>Anao</option>
          <option>Orc</option>
        </select>

        <label>Descrição</label>
        <textarea id="descricao-${i}" placeholder="Conte sobre o personagem"></textarea>

        <div class="status" id="status-${i}">
          Vida: 0 <br>
          Mana: 0 <br>
          Força: 0 <br>
          Defesa: 0
        </div>

        <div class="habilidade" id="habilidade-${i}">
          Habilidade Especial:
        </div>

        <button onclick="gerarAleatorio(${i})">ALEATÓRIO</button>

      </div>
    `;
  }
}

/* STATUS */
function atualizarStatus(id) {
  const raca = document.getElementById(`raca-${id}`).value;
  const classe = document.getElementById(`classe-${id}`).value;

  const base = racas[raca];
  const bonus = classes[classe];

  document.getElementById(`status-${id}`).innerHTML = `
    Vida: ${base.vida + bonus.vida} <br>
    Mana: ${base.mana + bonus.mana} <br>
    Força: ${base.forca + bonus.forca} <br>
    Defesa: ${base.defesa + bonus.defesa}
  `;

  document.getElementById(`habilidade-${id}`).innerHTML =
    "Habilidade Especial: " + bonus.habilidade;
}

/* ALEATÓRIO */
function gerarAleatorio(id) {
  const racaKeys = Object.keys(racas);
  const classeKeys = Object.keys(classes);

  document.getElementById(`nome-${id}`).value =
    nomesAleatorios[Math.floor(Math.random() * nomesAleatorios.length)];

  document.getElementById(`raca-${id}`).value =
    racaKeys[Math.floor(Math.random() * racaKeys.length)];

  document.getElementById(`classe-${id}`).value =
    classeKeys[Math.floor(Math.random() * classeKeys.length)];

  atualizarStatus(id);
}

/* PRONTO (GLOBAL) */
function proximaEtapa() {
  alert("Personagens prontos!");
  // window.location.href = "batalha.html";
}

/* VOLTAR (GLOBAL) */
function voltarPagina() {
  window.history.back();
}

/* INICIALIZAR */
criarPersonagens();

/* EVENTOS */
for (let i = 1; i <= quantidade; i++) {
  document
    .getElementById(`raca-${i}`)
    .addEventListener("change", () => atualizarStatus(i));
  document
    .getElementById(`classe-${i}`)
    .addEventListener("change", () => atualizarStatus(i));

  atualizarStatus(i);
}
