import { fetchBoard } from "../../api.js";
import { Board } from "../../js/board.js";

const loader = document.querySelector("#loader-container");
const gamePage = document.querySelector("#game-page");
const timerElement = document.querySelector("#timer");
const startBtn = document.querySelector("#start-btn");
let gameBoard;

(async function () {
	const data = await fetchBoard(9);
	gameBoard = new Board(9, data.board, data.solution);
	console.log(data);
	renderBoard(gameBoard);

	loader.classList.add("d-none");
	gamePage.classList.remove("d-none");
})();

function renderBoard(gameBoard) {
	gameBoard.cellsArray.forEach((cellObject) => {
		gamePage.querySelector("#board").appendChild(cellObject.element);
	});
}

function changeCellValue(number, currentSelectedCell) {
	currentSelectedCell.currentValue = number;
	currentSelectedCell.element.style.backgroundImage =
		"url(../images/egyptian/" + number + ".jpg)";

	const wrongCells = gameBoard.isThereWrongCells();
	if (wrongCells.length === 0) declareWinner();
}

startBtn.addEventListener("click", startGame);

function startGame() {
	gameBoard.cellsArray[0].focus();
	console.log(gameBoard.getSelectedCell());
	startTimer(2);

	document.body.addEventListener("keydown", function (event) {
		if (
			![
				"ArrowLeft",
				"ArrowDown",
				"ArrowUp",
				"ArrowRight",
				..."123456789",
			].includes(event.key)
		)
			return;

		event.preventDefault();
		console.log(event.key);
		const currentSelectedCell = gameBoard.getSelectedCell();
		let newSelectedCell;
		switch (event.key) {
			case "ArrowLeft":
				newSelectedCell = currentSelectedCell.left;
				break;
			case "ArrowRight":
				newSelectedCell = currentSelectedCell.right;
				break;
			case "ArrowUp":
				newSelectedCell = currentSelectedCell.up;
				break;
			case "ArrowDown":
				newSelectedCell = currentSelectedCell.down;
				break;

			default:
				changeCellValue(event.key, currentSelectedCell);
				return;
		}

		// console.log(newSelectedCell);
		currentSelectedCell.unfocus();
		newSelectedCell.focus();
	});
}

function startTimer(period) {
	startBtn.classList.add("d-none");
	timerElement.classList.remove("d-none");

	const minutesSpan = timerElement.querySelector("#minutes");
	const secondsSpan = timerElement.querySelector("#seconds");
	minutesSpan.innerText = "0" + period;
	minutesSpan.innerText = "00";

	let minutes = "0" + period;
	let seconds = "00";

	const timerInterval = setInterval(() => {
		const currentMinutes = parseInt(minutes);
		const currentSeconds = parseInt(seconds);
		console.log({ currentMinutes, currentSeconds });

		if (currentSeconds === 0) {
			if (currentMinutes === 0) {
				console.log("done");
				// TODO checkBoard
				clearInterval(timerInterval);

				const wrongCells = gameBoard.isThereWrongCells();
				if (!wrongCells) {
					declareWinner();
					return;
				}

				wrongCells.forEach((cellObject) => {
					cellObject.element.style.backgroundImage = "";
					cellObject.element.style.backgroundColor = "red";
				});

				return;
			}
			minutes -= 1;
			seconds = 59;
		} else {
			seconds -= 1;
		}

		if (minutes <= period / 2 && seconds === 0)
			timerElement.classList.add("danger");

		minutesSpan.innerText = minutes.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
			useGrouping: false,
		});
		secondsSpan.innerText = seconds.toLocaleString("en-US", {
			minimumIntegerDigits: 2,
			useGrouping: false,
		});
	}, 1000);
}

const messageDiv = document.querySelector("#message-container div");

function declareWinner() {
	messageDiv.parentElement.classList.remove("d-none");

	messageDiv.querySelector("#title").innerText = "CONGRATULATIONS!";
	messageDiv.querySelector("#body").innerText = "you won the game :D";

	const btns = document.createElement("div");
	btns.id = "btns";

	const backToLoginBtn = document.createElement("a");
	backToLoginBtn.classList.add("btn", "secondary");
	backToLoginBtn.style.backgroundColor = "#191919 !important";
	backToLoginBtn.style.display = "inline-block";
	backToLoginBtn.innerText = "Go Home";
	// TODO make it go home

	const playAgainBtn = document.createElement("a");
	playAgainBtn.classList.add("btn");
	playAgainBtn.innerText = "Play Again";
	// TODO make it play again

	btns.appendChild(backToLoginBtn);
	btns.appendChild(playAgainBtn);

	messageDiv.appendChild(btns);
}
