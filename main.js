const btn = document.querySelector("button");
const hands = document.querySelectorAll(".select img")

const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const game = {
    playerHand: "",
    aiHand: "",
}

function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '')
    this.style.boxShadow = '0 0 0 4px #DAA520';
}

hands.forEach(hand => hand.addEventListener("click", handSelection));

function aiChoice() {
    let rnd = Math.floor(Math.random() * hands.length);
    return hands[rnd].dataset.option;
}

function checkResult(player, ai) {
    if (player === ai) {
        return 'draw'
    } else if ((player === "paper" && ai === "rock") || (player === "rock" && ai === "scissors") ||
        (player === "scissors" && ai === "paper")) {
        return 'win';
    } else {
        return 'loss';
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    gameSummary.numbers++;
    document.querySelector('p.numbers span').textContent = gameSummary.numbers;

    if (result === "win") {
        document.querySelector('[data-summary="who-win"]').textContent = "You won!";
        document.querySelector('[data-summary="who-win"]').style.color = 'green';
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    } else if (result === "loss") {
        document.querySelector('[data-summary="who-win"]').textContent = "You lost!";
        document.querySelector('[data-summary="who-win"]').style.color = 'red';
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
    } else {
        document.querySelector('[data-summary="who-win"]').textContent = "Draw!";
        document.querySelector('[data-summary="who-win"]').style.color = '#DAA520';
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = '';
    game.playerHand = "";
}

function startGame() {
    if (!game.playerHand) {
        return alert("Choose your hand!");
    }
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endGame();
}

btn.addEventListener("click", startGame);