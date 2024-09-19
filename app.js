let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}

function mensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${numeroLimite}`);
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativa} ${palavraTentativa}`;
        exibirTextoNaTela("h1", "Parabéns!");
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela("p", "O número secreto é menor");
    } else {
        exibirTextoNaTela("p", "O número secreto é maior");
    }
    tentativa++
    limparCampo()
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let elementosNaLista = listaDeNumerosSorteados.length;

    if (elementosNaLista == numeroEscolhido) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = ""
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true)
}