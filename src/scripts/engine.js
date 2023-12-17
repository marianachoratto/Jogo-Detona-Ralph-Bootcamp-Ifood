const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        gameVelocity: 930,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {// note! uma variável pode fazer uma ação
        //poderia estar dentro da função countDown
        //não foi chamado, mas funciona, pois está dentro da função principal
        countDownTimerId: setInterval(countDown, 1000),
    }
};

//Função do timer 
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId)
       alert(`Game Over! O seu resultado foi ${state.values.result}`) 
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a")
    //diminuir som 
    audio.volume = 0.1;
    audio.play();
}

//Escolher um quadrado aleatório + adicionar inimigo
function randomSquare(){
    //1º: remover inimigo
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    })
    //2º Sortear um número aleatório
    let randomNumber = Math.floor(Math.random()*9)
    let randomSquare = state.view.squares[randomNumber]
    
    //3º Colocar o inimigo dentro do numero escolhido
    randomSquare.classList.add("enemy")

    //4º Guardar a posição do inimigo para fazer a comparação na função ListenerHitbox
    state.values.hitPosition = randomSquare.id;
}

//Função que move o inimigo em X tempo
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
    // a cada 1 segundo a função setInterval sorteia um novo número em randomSquare
}

//Porém, o usuário pode clicar no inimigo antes de dar 1 seg. Nesse caso, acontece outro evento.
//Listener de quando o usuário clica no inimigo
function addListenerHitbox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                // se acertar o inimigo a pontuação sobe +1
                state.values.result++
                state.view.score.textContent = state.values.result;
                //para impedir o usuário de aumentar + de 1 ponto por clique a hitposition zera automaticamente 
                state.values.hitPosition = null
                // toda vez que acerta toca um som 
                playSound();
            }
        } )
    })
}

//Toda a vez que o jogo inicia: o timer começa a contar e o listener inicia
function initialize(){
    moveEnemy();
    addListenerHitbox();
}

//chamando a função para começar 
initialize();