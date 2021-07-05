let computerPlay = () => {
  return ["Rock", "Paper", "Scissor"][Math.floor(Math.random() * 3)];
};

let playRound = (playerSelection, computerSelection) => {
  //* true = Player win;
  let win = false;
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();
  if (playerSelection == computerSelection) {
    return `Draw!`;
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
  return win
    ? `You Win! ${playerSelection} beats ${computerSelection}`
    : `You Lose! ${computerSelection} beats ${playerSelection}`;
};

let game = () => {
  for (let i = 0; i < 5; i++) {
    let p = window.prompt("Choose your selection!");
    console.log(playRound(p, computerPlay()));
  }
};

game();
