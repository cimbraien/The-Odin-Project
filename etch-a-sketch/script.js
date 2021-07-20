function createBoard(n = 16) {
	const size = 560 / n;
	const board = document.querySelector(".board");
	const tiles = document.querySelectorAll(".tile");
	if (tiles.length > 0) {
		tiles.forEach((t) => board.removeChild(t));
	}
	for (let i = 1; i <= n; i++) {
		for (let j = 1; j <= n; j++) {
			const tile = document.createElement("div");
			tile.classList.add("tile");
			tile.classList.add(`tile-${j}-${i}`);
			tile.style.backgroundColor = "white";
			tile.style.width = size + "px";
			tile.style.height = size + "px";
			tile.addEventListener("mouseover", updateTile);
			board.appendChild(tile);
			board.style.gridTemplateColumns = "repeat(" + n + ", 1fr)";
		}
	}
}

function updateTile(e) {
	this.style.backgroundColor = "black";
}

function resetBoard() {
	const size = prompt("Board size = (max 100)");
	if (size > 100 || size <= 0) {
		resetBoard();
		return;
	}
	createBoard(size);
}

document.querySelector(".reset").addEventListener("click", resetBoard);

createBoard();
