let computerPlay = () => {
	return ["Rock", "Paper", "Scissor"][Math.floor(Math.random() * 3)];
};

let playerScore = 0;
let computerScore = 0;

let playRound = (playerSelection, computerSelection) => {
	//* true = Player win;
	let win = false;
	playerSelection = playerSelection.toLowerCase();
	computerSelection = computerSelection.toLowerCase();
	if (playerSelection == computerSelection) {
		updateResult(2);
		return;
	} else {
		switch (playerSelection) {
			case "rock":
				if (computerSelection == "scissor") win = true;
				break;
			case "paper":
				if (computerSelection == "rock") win = true;
				break;
			case "scissor":
				if (computerSelection == "paper") win = true;
				break;
		}
	}
	console.log(computerSelection);
	win ? updateResult(0) : updateResult(1);
};

const result = document.querySelector(".result");
const score = document.querySelector(".score");
let updateResult = (win) => {
	if (win == 0) {
		result.textContent = "Win";
		result.style.color = "#9effff";
		playerScore++;
	} else if (win == 1) {
		result.textContent = "Lose";
		result.style.color = "#dc143c";
		computerScore++;
	} else {
		result.textContent = "Draw";
		result.style.color = "#fff5ee";
	}
	score.textContent = `${playerScore} : ${computerScore}`;
	checkWin();
};

let checkWin = () => {
	if (playerScore != 5 && computerScore != 5) return;
	if (playerScore == 5) {
		result.textContent = "Player has won 5 times!";
	}
	if (computerScore == 5) {
		result.textContent = "Computer has won 5 times!";
	}
	playerScore = 0;
	computerScore = 0;
};

const btnRock = document.querySelector(".btn-rock");
btnRock.addEventListener("click", () => playRound("rock", computerPlay()));
const btnPaper = document.querySelector(".btn-paper");
btnPaper.addEventListener("click", () => playRound("paper", computerPlay()));
const btnScissor = document.querySelector(".btn-scissor");
btnScissor.addEventListener("click", () =>
	playRound("scissor", computerPlay())
);
