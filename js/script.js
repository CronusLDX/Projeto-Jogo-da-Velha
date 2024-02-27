document.addEventListener("DOMContentLoaded", function () {
    let x = document.querySelector(".x");
    let o = document.querySelector(".o");
    let boxes = document.querySelectorAll(".box");
    let buttons = document.querySelectorAll("#buttons-container button");
    let messageContainer = document.querySelector("#message");
    let messageText = document.querySelector("#message p");
    let secondPlayer;

    // Contadores de jogadas
    let player1 = 0;
    let player2 = 0;

    // Adicionando o evento de clique aos boxes
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", function () {
            let el = checkEl(player1, player2);
            if (this.childNodes.length === 0) {
                let cloneEl = el.cloneNode(true);
                this.appendChild(cloneEl);
                if (player1 === player2) {
                    player1++;

                    if(secondPlayer == 'ai-player'){
                      // Execute a jogada do computador
                      computerPlay(boxes);
                      player2++;
                    }
                } else {
                    player2++;
                }
                checkWinCondition(); // Verificar condição de vitória após cada jogada
            }
        });
    }

    // Evento para verificar se são dois jogadores ou contra o computador
    for(let i = 0 ; i< buttons.length; i++){
        buttons[i].addEventListener('click',function(){
            secondPlayer = this.getAttribute("id")

            for(let i = 0 ; i< buttons.length; i++){
                buttons[i].style.display = 'none'
            }

            setTimeout(function(){

                let container = document.querySelector("#container") 
                container.classList.remove("hide")

            },1000)
        })
    }
    
    // Ver quem vai jogar
    function checkEl(player1, player2) {
        return player1 === player2 ? x : o;
    }

    // Ver quem ganhou
    function checkWinCondition() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6] // Diagonais
        ];

        for (let condition of winConditions) {
            let [a, b, c] = condition;
            if (
                boxes[a].childNodes.length > 0 &&
                boxes[b].childNodes.length > 0 &&
                boxes[c].childNodes.length > 0
            ) {
                let aChild = boxes[a].childNodes[0].className;
                let bChild = boxes[b].childNodes[0].className;
                let cChild = boxes[c].childNodes[0].className;
                if (aChild === bChild && bChild === cChild) {
                    declareWinner(aChild);
                    return;
                }
            }
        }

        // Deu velha
        let counter = 0;
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].childNodes[0] !== undefined) {
                counter++;
            }
        }
        if (counter === 9) {
            declareWinner('Deu Velha!'); // Ninguém ganhou (deu velha)
        }
    }

    // Limpa o jogo, declara o vencedor e atualiza o placar
    function declareWinner(winner) {
        let scoreboardX = document.querySelector("#scoreboard-1");
        let scoreboardO = document.querySelector("#scoreboard-2");
        let msg = '';
    
        let scoreX = parseInt(scoreboardX.textContent) || 0;
        let scoreO = parseInt(scoreboardO.textContent) || 0;
    
        if (winner === 'x') {
            scoreX++;
            msg = "O Jogador 1 venceu!";
        } else if (winner === 'o') {
            scoreO++;
            msg = "O Jogador 2 venceu!";
        } else {
            msg = "Deu Velha";
        }
    
        scoreboardX.textContent = scoreX;
        scoreboardO.textContent = scoreO;
    
        // Exibe mensagem na tela
        messageText.textContent = msg;
        messageContainer.classList.remove("hide");
    
        // Limpa o tabuleiro após 1 segundo
        setTimeout(function () {
            for (let box of boxes) {
                box.innerHTML = '';
            }
            messageContainer.classList.add("hide");
        }, 2000);
    }
});

// Executar a lógica do computador
function computerPlay(boxes) {
    let cloneO = document.querySelector(".o").cloneNode(true);
    let availableBoxes = [];

    // Encontrar caixas disponíveis
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].childNodes.length === 0) {
            availableBoxes.push(boxes[i]);
        }
    }

    // Se houver caixas disponíveis, seleciona aleatoriamente uma e coloca o símbolo do computador
    if (availableBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableBoxes.length);
        availableBoxes[randomIndex].appendChild(cloneO);
    }
}
