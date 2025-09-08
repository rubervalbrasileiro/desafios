/*. Menu Interativo (do while + switch)
Crie um menu de opções dentro de um do while, onde o programa
só encerra quando o usuário digitar 4 (sair).
Opções:
1 - Mostrar uma mensagem motivacional
2 - Mostrar a hora atual (pode ser só um texto fixo, tipo "12:00h")
3 – Mensagem de Boa noite
4 - Sair */

// Exibe o menu de opções

const prompt = require("prompt-sync")();
let opcao; // variável global
let totalCarrinho = 0; // variável global
let totalVestuario = 0;
let totalPerfumaria = 0;
let totalJoalheria = 0;
let taxaServEmabalagem =0;

// Variáveis para contar o número de itens em cada setor
let contadorVestuario = 0;
let contadorPerfumaria = 0;
let contadorJoalheria = 0;

do{  
  console.log(" "); //exibição do menu
  console.log("            * IGUATEMY * ");
  console.log("           *** SHOPPING *** ");
  console.log("     *** Para toda familia *** ");
  console.log("*** Bem Vindo ao Menu Principal *** ");
  console.log(" ");
  console.log(" (1) Vestuário     (3) Joalheria ");
  console.log(" ");
  console.log(" (2) Perfumária    (4)  Sair ");
  console.log(" ");

opcao = parseInt(prompt("   Digite a opção desejada: ")); // usuário digita a opção desejada.
switch(opcao){

case 1: // usuário acessa a loja de vestuário.
  console.log("");
  console.log("Sua opção digitada foi 1 é o setor de VESTUÁRIO! \n");
  console.log("Confira nosso catálogo PROMOCIONAL com mais de 50 opções no seguimentos de Moda feminina: \n                             (Blusas,Calças, tops,  Vestidos) \n");
      comprarNaLoja("Vestuário", opcao );
      break;
      console.log("");

case 2: // usuário acessa a loja de perfumária.
  console.log("");
  console.log("Sua opção digitada foi 2 é o setor de PERFUMÁRIA! \n");
  console.log("Não deixe de aproveitar as condições ESPECIAIS de LANÇAMENTOS em toda linha de perfumária\n          *** Feminina, Infantil e Masculina *** \n               durante todo o mês de SETEMBRO! \n");
  comprarNaLoja("Perfumária", opcao);
  break;
  console.log("");

  case 3: // usuário acessa a loja de joias.
  console.log("");
  console.log("Sua opção digitada foi 3 é o setor de JOIAS ! ");  
  console.log("Presentei que você ama com a linha R & K JOIAS, distribuidora do (catálogo em exibição), a cerca de 20 opções,\nem sua linha exclusiva de brincos ouro-branco, folheados anti-alérgicos ideal para crianças e pessoas sensíveis da maior idade ! \n");  
  comprarNaLoja("Joalheria", opcao);
  break;
  console.log("");

  case 4: // usuário deixa o shopping.
  console.log("");
  console.log("É bom estar com você, volte sempre! Você já deixa saudades. ");
  console.log("");
  finalizaCompra();
  break;
  console.log("");

  default:
     console.log("Opção inválida. Por favor, digite uma opção de 1 a 4.");
      break;
      
  }
}while(opcao !==4)
console.log("");

function comprarNaLoja(nomeDaLoja) {
  let continuarComprando = "sim"; //criação de variáveis  locais
    // uso de operadores lógicos
  while(continuarComprando.toLowerCase() === "sim" || continuarComprando.toLowerCase === "s") { 
    let valorProduto = parseFloat(prompt(`Digite o valor do produto na loja de ${nomeDaLoja}: `));
    
    // Verifica se o valor é um número válido
    if(!isNaN(valorProduto) && valorProduto > 0) { // uso de operadores lógicos
      totalCarrinho += valorProduto; // somando produto ao carrinho
      // ajusta p/ 2 casa decimais.
      console.log(`Produto de R$ ${valorProduto.toFixed(2)} adicionado ao carrinho! `); 
      if(opcao === 1){
        totalVestuario += valorProduto;
        contadorVestuario++; // Incrementa o contador do vestuário
        console.log(`Você gastou com: ${nomeDaLoja} o valor de R$ ${valorProduto.toFixed(2)}`);
      }else if(opcao === 2) {
        totalPerfumaria += valorProduto;
        contadorPerfumaria++; // Incrementa o contador de perfumaria
        console.log(`Você gastou com: ${nomeDaLoja} o valor de R$ ${valorProduto.toFixed(2)}`);
      }else if(opcao === 3){
        totalJoalheria += valorProduto;
        contadorJoalheria++; // Incrementa o contador de joalheria
        console.log(`Você gastou com: ${nomeDaLoja} o valor de R$ ${valorProduto.toFixed(2)}`);
      }
    }else {
      //joalheria = opcao
      console.log("Valor inválido. Por favor, digite um valor numérico positivo. ");
    }
    continuarComprando = prompt("Deseja adicionar outro item nesta loja? (sim/não): \n");
  }
}
function finalizaCompra(opcao){
    console.log("-------------------------------");
    console.log("--- Resumo Final de Compras ---\n");
    console.log("-------------------------------");
    //Total acumulado no carrinho
    console.log(`$$$ Você gastou no total $$$ R$ ${totalCarrinho} \n`);
     // Mostra os contadores e os totais
    console.log(`Total de itens de Vestuário: ${contadorVestuario} - Você gastou na loja de vestuário R$: ${totalVestuario } \n`);
    console.log(`Total de itens de Perfumaria: ${contadorPerfumaria} - Você gastou na loja de perfumes R$: ${totalPerfumaria}\n `);
    console.log(`Total de itens de Joalheria: ${contadorJoalheria} - Você gastou na loja de joias R$: ${totalJoalheria } \n`);
    console.log("------------------------------- \n");

    //Verifica se o valor está próximo de R$ 1.000,00
    if(totalCarrinho >= 950 && totalCarrinho <= 1000.00) {
      let valorFaltante = 1000 - totalCarrinho;
      console.log(`Falta R$ ${valorFaltante.toFixed(2)} para você atingir R$ 1.000,00 e ganhar 15% de desconto!`);
      let adicionarTaxa = prompt("Deseja adicionar uma taxa de embalagem para atingir o valor? (sim/não): ");
      if (adicionarTaxa.toLowerCase() === "sim" || adicionarTaxa.toLowerCase() === "s") {
            // Adiciona a taxa e atualiza o total
            totalCarrinho += valorFaltante;
            console.log(`Taxa de embalagem de R$ ${valorFaltante.toFixed(2)} adicionada!`);
            console.log(`Seu novo total é de R$ ${totalCarrinho.toFixed(2)}. Agora você pode aproveitar o desconto.`);
        }
    }

  if(totalCarrinho === 1000) {
    let valorComDesconto = totalCarrinho * 0.85;
    let valorDoDesconto = totalCarrinho * 0.15;
    
    console.log(`*** VOCÊ GANHOU 15% DE DESCONTO EM SUAS COMPRAS ***\n`);
    console.log(`O valor do seu desconto é de R$ ${valorDoDesconto} \n`)
    console.log(`O valor total a ser pago é R$ (${valorComDesconto}, *** compra aprovada. *** \n`);

  }else if(totalCarrinho === 850) {
    console.log(`Compra aprovada R$ ${totalCarrinho} com valor autorizado pelo pai. \n`);
  }

  else if (totalCarrinho > 850 && totalCarrinho < 1000) {
        console.log(`Compra acima do valor combinado (R$ 850,00). Retire alguns itens, ou acrescente até chegar em R$ 1.000,00 \n`);
    } else if (totalCarrinho > 1000) {
        console.log("Valor de compra reprovado. Sua compra foi acima do valor autorizado. \n");
    } else if (totalCarrinho < 850) {
        console.log("Compra aprovada, mas ainda dava para acrescentar mais um mimo. \n");
    } else {
        console.log("Lamento sua compra não foi aprovada, verifique os requisitos. \n");
    }

    // Mensagem de saída
    console.log("\nÉ bom estar com você, volte sempre! Você já deixa saudades.")
    
}


