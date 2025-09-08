const readline = require("readline");

// Contribuições
const contribuicoes = {
  Rafael: 25.00,
  Bruno: 15.00,
  Luiza: 50.00,
  Gabriel: 34.00 // Gabriel ficará por último
};

const totalContribuicoes = Object.values(contribuicoes).reduce((acc, val) => acc + val, 0);
const limiteOrcamento = 124.00;

// Cardápio separado por categoria
const hamburgueres = [
  { nome: "Novo Brabo Clubehouse", preco: 41.00 },
  { nome: "Brabo Brabíssimo Carne", preco: 41.00 },
  { nome: "Tasty Turbo 2 Carnes", preco: 41.50 },
  { nome: "Brabo Brabíssimo Frango", preco: 41.00 },
  { nome: "Big Mac", preco: 18.50 },
  { nome: "Duplo Cheddar McMelt", preco: 33.90 },
  { nome: "Tasty Turbo 3 Carnes", preco: 48.90 }
];

const batataFixa = { nome: "McFritas Média", preco: 12.50 };
const bebidas = [{ nome: "Coca-Cola", preco: 11.00 }];
const milkshakes = [
  { nome: "McShake Morango", preco: 19.50 },
  { nome: "McShake Chocolate", preco: 19.50 }
];

// Kits disponíveis
const kits = [
  { nome: "Kit Big Mac", itens: ["Big Mac", "McFritas Média"], preco: 30.50 },
  { nome: "Kit Duplo Cheddar McMelt", itens: ["Duplo Cheddar McMelt", "McFritas Média"], preco: 38.90 },
  { nome: "Kit Tasty Turbo 2 Carnes", itens: ["Tasty Turbo 2 Carnes", "McFritas Média"], preco: 45.00 },
  { nome: "McOferta Média McChicken", itens: ["McOferta Média McChicken"], preco: 22.90 },
  { nome: "2 Chicken Jr.", itens: ["2 Chicken Jr."], preco: 23.90 }
];

// Kit exclusivo para Gabriel
const kitExclusivoGabriel = [
  { nome: "Kit Gabriel (sem bebida)", itens: ["Big Mac", "McFritas Média"], preco: 28.00 }
];

const participantes = ["Rafael", "Bruno", "Luiza", "Gabriel"];
let pedidos = {};
let totaisIndividuais = {};
let totalGasto = 0;
let currentIndex = 0;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Mostra menu
function mostrarMenu(lista, titulo) {
  console.log(`\n=== ${titulo} ===`);
  lista.forEach((item, i) => console.log(`${i + 1} - ${item.nome} → R$ ${item.preco.toFixed(2)}`));
  console.log(`0 - Finalizar pedido\n`);
}

// Mostra resumo do participante
function resumoParticipante(pessoa) {
  console.log(`\n📌 Resumo do pedido de ${pessoa}:`);
  console.log(`Itens: ${pedidos[pessoa].join(", ")}`);
  console.log(`Subtotal de ${pessoa}: R$ ${totaisIndividuais[pessoa].toFixed(2)}`);
  console.log(`💰 Total gasto até agora: R$ ${totalGasto.toFixed(2)}`);
  console.log(`💳 Limite: R$ ${limiteOrcamento.toFixed(2)} → Restante: R$ ${(limiteOrcamento - totalGasto).toFixed(2)}\n`);
}

// Pergunta se quer kit
function perguntarKit(pessoa) {
  let opcoesKit = pessoa === "Gabriel" ? kitExclusivoGabriel : kits;

  rl.question(`${pessoa}, deseja escolher algum kit pronto? (sim/não): `, (resposta) => {
    const r = resposta.trim().toLowerCase();
    if (r === "sim" || r === "s") {
      mostrarMenu(opcoesKit, "🎁 Kits Disponíveis");
      rl.question(`Escolha o número do kit desejado ou 0 para pular: `, (respostaKit) => {
        if (respostaKit === '0') {
          registrarPedido(pessoa);
          return;
        }
        const index = parseInt(respostaKit) - 1;
        if (isNaN(index) || index < 0 || index >= opcoesKit.length) {
          console.log("⚠️ Opção inválida! Tente novamente.\n");
          perguntarKit(pessoa);
        } else {
          const kitEscolhido = opcoesKit[index];
          pedidos[pessoa] = [...kitEscolhido.itens];
          totaisIndividuais[pessoa] = kitEscolhido.preco;
          totalGasto += kitEscolhido.preco;
          console.log(`✅ ${pessoa} escolheu o kit "${kitEscolhido.nome}" → R$ ${kitEscolhido.preco.toFixed(2)}`);
          resumoParticipante(pessoa);

          if (pessoa === "Gabriel") {
            mostrarMenu(milkshakes, "🥤 Milkshakes");
            perguntarItem(pessoa, "milkshake", milkshakes, () => avancar());
          } else {
            avancar();
          }
        }
      });
    } else if (r === "não" || r === "n") {
      registrarPedido(pessoa);
    } else {
      console.log("⚠️ Resposta inválida! Digite 'sim' ou 'não'.");
      perguntarKit(pessoa);
    }
  });
}

// Perguntar item
function perguntarItem(pessoa, etapa, lista, callback) {
  let pergunta = "";
  if (etapa === "lanche") pergunta = `🍔 ${pessoa}, escolha o número do seu hambúrguer: `;
  if (etapa === "bebida") pergunta = `🥤 ${pessoa}, escolha o número da bebida: `;
  if (etapa === "milkshake") pergunta = `🥤 ${pessoa}, escolha o número do milkshake: `;

  rl.question(pergunta, (resposta) => {
    if (resposta === '0') {
      console.log(`⚠️ Pedido finalizado por ${pessoa}.\n`);
      resumoParticipante(pessoa);
      avancar();
      return;
    }

    const index = parseInt(resposta) - 1;
    if (isNaN(index) || index < 0 || index >= lista.length) {
      console.log("⚠️ Opção inválida! Digite apenas o número correto.\n");
      perguntarItem(pessoa, etapa, lista, callback);
    } else {
      const itemEscolhido = lista[index];
      pedidos[pessoa].push(itemEscolhido.nome);
      totaisIndividuais[pessoa] += itemEscolhido.preco;
      totalGasto += itemEscolhido.preco;
      console.log(`✅ ${pessoa} adicionou ${itemEscolhido.nome} → R$ ${itemEscolhido.preco.toFixed(2)}`);
      resumoParticipante(pessoa);
      callback();
    }
  });
}

// Registrar pedidos individuais
function registrarPedido(pessoa) {
  pedidos[pessoa] = [];
  totaisIndividuais[pessoa] = 0;

  rl.question(`${pessoa}, deseja incluir McFritas Média no seu pedido? (sim/não): `, (respostaBatata) => {
    const r = respostaBatata.trim().toLowerCase();
    if (r === "sim" || r === "s") {
      pedidos[pessoa].push(batataFixa.nome);
      totaisIndividuais[pessoa] += batataFixa.preco;
      totalGasto += batataFixa.preco;
      console.log(`🍟 ${pessoa} adicionou ${batataFixa.nome} → R$ ${batataFixa.preco.toFixed(2)}`);
      resumoParticipante(pessoa);
    } else {
      console.log(`${pessoa} optou por não adicionar McFritas.\n`);
    }

    if (pessoa === "Gabriel") {
      mostrarMenu(hamburgueres, "🍔 Hambúrgueres");
      perguntarItem(pessoa, "lanche", hamburgueres, () => {
        mostrarMenu(milkshakes, "🥤 Milkshakes");
        perguntarItem(pessoa, "milkshake", milkshakes, () => avancar());
      });
    } else {
      escolherLancheEBebida(pessoa);
    }
  });
}

// Escolher hambúrguer e bebida
function escolherLancheEBebida(pessoa) {
  mostrarMenu(hamburgueres, "🍔 Hambúrgueres");
  perguntarItem(pessoa, "lanche", hamburgueres, () => {
    mostrarMenu(bebidas, "🥤 Bebidas");
    perguntarItem(pessoa, "bebida", bebidas, () => avancar());
  });
}

// Avança para próximo participante
function avancar() {
  currentIndex++;
  if (currentIndex < participantes.length) {
    iniciarParticipante(participantes[currentIndex]);
  } else {
    finalizar();
  }
}

// Inicializa participante
function iniciarParticipante(pessoa) {
  console.log(`\n=== Vez de ${pessoa} ===`);
  perguntarKit(pessoa);
}

// Finalização
function finalizar() {
  console.log("\n=== 🛒 Carrinho Final ===");
  for (let pessoa in pedidos) {
    console.log(`${pessoa} pediu: ${pedidos[pessoa].join(", ")} → R$ ${totaisIndividuais[pessoa].toFixed(2)}`);
  }
  console.log("\n💰 Total arrecadado: R$", totalContribuicoes.toFixed(2));
  console.log("🧾 Total gasto nesse pedido: R$", totalGasto.toFixed(2));

  if (totalGasto > limiteOrcamento) {
    console.log(`⚠️ O pedido ultrapassou o limite de R$ ${limiteOrcamento.toFixed(2)}.`);
    console.log(`💵 Diferença a pagar: R$ ${(totalGasto - limiteOrcamento).toFixed(2)}`);
  } else {
    console.log("✅ O pedido ficou dentro do limite.");
    console.log("💵 Saldo restante: R$", (limiteOrcamento - totalGasto).toFixed(2));
  }

  rl.close();
}

// Início
console.log("=== 🍔 Bem-vindos ao McDonald's ===");
console.log("\n👥 Contribuições individuais:");
for (let pessoa in contribuicoes) {
  console.log(`${pessoa}: R$ ${contribuicoes[pessoa].toFixed(2)}`);
}
console.log(`\n💰 Total arrecadado: R$ ${totalContribuicoes.toFixed(2)}`);
console.log(`💳 Limite total disponível: R$ ${limiteOrcamento.toFixed(2)}\n`);

iniciarParticipante(participantes[currentIndex]);
