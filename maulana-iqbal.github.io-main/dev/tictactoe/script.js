// Variables
let player = "X";
let turns = 0;
let gameOver = false;

// Get table cells
let cells = document.querySelectorAll("td");

// Add event listener to cells
for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", function() {
		if (gameOver) {
			return;
		}
		if (cells[i].innerHTML === "") {
			cells[i].innerHTML = player;
			turns++;
			checkWin();
			if (player === "X") {
				player = "O";
			} else {
				player = "X";
			}
		}
	});
}

// Function to check for a win
function checkWin() {
	if (cells[0].innerHTML === player && cells[1].innerHTML === player && cells[2].innerHTML === player) {
		gameOver = true;
		document.getElementById("info").innerHTML = player + " wins!";
	} else if (cells[3].innerHTML === player && cells[4].innerHTML === player && cells[5].innerHTML === player) {
		gameOver = true;
		document.getElementById("info").innerHTML = player + " wins!";
	} else if (cells[6].innerHTML === player && cells[7].innerHTML === player && cells[8].innerHTML === player) {
		gameOver = true;
		document.getElementById("info").innerHTML = player + " wins!";
	} else if (cells[0].innerHTML === player && cells[3].innerHTML === player && cells[6].innerHTML === player) {
		gameOver = true;
		document.getElementById("info").innerHTML = player + " wins!";
	} else if (cells[1].innerHTML === player && cells[4].innerHTML === player && cells[7].innerHTML === player) {
		gameOver = true;
		document.getElementById("info").innerHTML = player + " wins!";
	} else if (cells[2].innerHTML === player && cells[5].innerHTML === player && cells[8].innerHTML === player) {
		gameOver = true;
		document.getElementById("info").innerHTML = player + " wins!";
	} else if (cells[0].innerHTML === player && cells[4].innerHTML === player && cells[8].innerHTML === player) {
		gameOver = true;
		document.getElementById("info").innerHTML = player + " wins!";
	} else if (cells[2].innerHTML === player && cells[4].innerHTML === player && cells[6].innerHTML === player) {
		gameOver = true;
		document.getElementById("info").innerHTML = player + " wins!";
	} else if (turns === 9) {
		gameOver = true;
		document.getElementById("info").innerHTML = "It's a tie!";
	}
}

// Function to reset the game
function reset() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerHTML = "";
	}
	player = "X";
	turns = 0;
	gameOver = false;
	document.getElementById("info").innerHTML = "";
}
