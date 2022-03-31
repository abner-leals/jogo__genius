const const_database = {
    ligado: false,
    timeout: undefined,
    sons: [],
    vez__jogador: false,
    pontos: 0,
    melhor__sequencia: [],
    sequencia__computador: [],
    sequencia__jogador: []
};

const const_controles = {
    onoff: document.querySelector('.on__off'),
    contador: document.querySelector(".genius__contador"),
    controles: document.querySelector(".genius__controles"),
    record: document.querySelector(".melhor__sequencia"),
    iniciar: document.querySelector(".iniciar"),
    lentes: document.querySelectorAll(".genius__lentes")
}

const const_sons = [
    "audio/azul.mp3",
    "audio/vermelho.mp3",
    "audio/verde.mp3",
    "audio/amarelo.mp3"
];

const_sons.forEach(url_som => {
    const audio = new Audio(url_som);
    const_database.sons.push(audio);
});

const_controles.onoff.addEventListener('click', liga)//sempre que clicar em ligar executa callback liga()
function liga() {
    const_database.ligado = const_controles.contador.classList.toggle('genius__contador--on')
    console.log(const_database.ligado)
    const_database.vez__jogador = false
    const_database.sequencia__computador = []
    const_database.sequencia__jogador = []
    const_database.melhor__sequencia = []
    const_controles.contador.innerHTML = ('--')
    desliga_lentes()

}
function desliga_lentes() {
    const_controles.lentes.forEach(lentes => {
        lentes.classList.remove('genius__lentes--ligado')
    })
}

const_controles.iniciar.addEventListener('click', iniciar)//sempre que clicar em ligar executa callback contagem3s() para o jogador se prepara para iniciar
function iniciar() {
    const_controles.contador.innerHTML ='01'
    const_database.sequencia__computador = []
    const_database.sequencia__jogador = []
    contagem5s()
    setTimeout(novasCores, 6000)
    setTimeout(novasCores, 6000)
    setTimeout(tocar, 6000)
}

function contagem5s() {
    let duracao = 5
    const const_temp = setInterval(function () {
        if (const_database.ligado===false) { 
            const_controles.contador.innerHTML = ('--')
            clearInterval(const_temp)
            return
        }else{
            const_controles.contador.innerHTML = `0${duracao}`
            if (--duracao < 0) {
            duracao = 0
            clearInterval(const_temp)
            }
        }

    }, 1000)
    //setTimeout(tocar, 6000)
}
function novasCores() {
    const_database.sequencia__computador.push(Math.floor(Math.random() * 4))
    const_database.pontos++
    pontos()
}
function pontos(){
    if(    const_database.pontos<10){const_controles.contador.innerHTML =`0${const_database.pontos}`}
    else{const_controles.contador.innerHTML =`${const_database.pontos}`}

}

function tocar() {
    let indice = 0
    let lenteAcessa = true
    const const_quantidade_toques = const_database.sequencia__computador.length
    const_database.sequencia__jogador = []
    const_database.vez__jogador = false
    const const_temp1=setInterval(
        function () {
            if(const_database.ligado===false){
                clearInterval(const_temp1)
                desliga_lentes()
                const_controles.contador.innerHTML = ('--')
                return

            }
            if (lenteAcessa) {
                if (indice === const_quantidade_toques) {
                    clearInterval(const_temp1)
                    desliga_lentes()
                    const_database.vez__jogador = true
                    esperaJogador()
                    indice=0
                    setTimeout(tocar, 6000)
                    setTimeout(pontos, 6000)
                    return
                }
                const indiceSom = const_database.sequencia__computador[indice]
                const lentes = const_controles.lentes[indiceSom]
                const_database.sons[indiceSom].play()
                lentes.classList.add('genius__lentes--ligado')
                pontos()
                indice++
            } else {
                desliga_lentes()
            }
            if (lenteAcessa) { lenteAcessa = false }
            else { lenteAcessa = true }
        }
        , 800)
}
function esperaJogador(){
    clearTimeout(const_database.timeout)
    const_database.timeout= setTimeout(contagem5s,0100)

}
