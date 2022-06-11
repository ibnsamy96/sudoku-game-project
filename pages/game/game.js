import { fetchBoard } from "../../api.js";
import { Board } from "../../js/board.js";
import { getFromLocalStorage } from "../../js/local-storage.js";
import { page1Shown, page3Shown } from "../../js/router.js";

let isInitDone = false;

export function initGamePage() {
	const loader = document.querySelector("#loader-container");
	const gamePage = document.querySelector("#game-page");
	const timerElement = document.querySelector("#timer");
	const startBtn = document.querySelector("#start-btn");
	const userSelectedLevel = parseInt(getFromLocalStorage("level"));
	let gameBoard;

	(async function () {
		const data = await fetchBoard(userSelectedLevel);
		gameBoard = new Board(userSelectedLevel, data.board, data.solution);
		console.log(data);

		updateGameInfo();
		renderBoard(gameBoard);

		loader.classList.add("d-none");
		gamePage.classList.remove("d-none");
	})();

	if (isInitDone) return;

	function renderBoard(gameBoard) {
		gameBoard.cellsArray.forEach((cellObject) => {
			gamePage.querySelector("#board").appendChild(cellObject.element);
		});
	}

	function changeCellValue(number, currentSelectedCell) {
		currentSelectedCell.currentValue = number;
		currentSelectedCell.element.style.backgroundImage = `url(../images/${getFromLocalStorage(
			"theme"
		)}/${number}.jpg)`;

		const wrongCells = gameBoard.isThereWrongCells();
		if (wrongCells.length === 0) declareWinner();
	}

	startBtn.addEventListener("click", startGame);

	function startGame() {
		gameBoard.cellsArray[0].focus();
		console.log(gameBoard.getSelectedCell());
		startTimer(1);

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
			// console.log(event.key);
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
			// console.log({ currentMinutes, currentSeconds });

			if (currentSeconds === 0) {
				if (currentMinutes === 0) {
					console.log("done");
					// TODO checkBoard
					clearInterval(timerInterval);
					gameBoard.getSelectedCell().unfocus();

					const wrongCells = gameBoard.isThereWrongCells();
					if (!wrongCells) {
						declareWinner();
						return;
					}

					wrongCells.forEach((cellObject) => {
						cellObject.element.style.backgroundImage = "";
						cellObject.element.style.backgroundColor = "red";
					});

					declareLoser(wrongCells.length);

					return;
				}
				minutes -= 1;
				seconds = 59;
			} else {
				seconds -= 1;
			}

			if (minutes * 60 + seconds <= (period * 60) / 2)
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

		addMessageBTNs();
	}
	function declareLoser(wrongCellsNumber) {
		messageDiv.parentElement.classList.remove("d-none");

		messageDiv.querySelector("#title").innerText = "OOPS!";
		messageDiv.querySelector("#body").innerText =
			"you had " + wrongCellsNumber + " wrong cells!";

		addMessageBTNs();
	}

	function addMessageBTNs() {
		const btns = document.createElement("div");
		btns.id = "btns";

		const backToLoginBtn = document.createElement("a");
		backToLoginBtn.classList.add("btn", "secondary");
		backToLoginBtn.style.backgroundColor = "#191919 !important";
		backToLoginBtn.style.display = "inline-block";
		backToLoginBtn.innerText = "Go Home";
		// TODO make it go home
		backToLoginBtn.addEventListener("click", function () {
			console.log("page1Shown");
			document.body.dispatchEvent(page1Shown);
			messageDiv.parentElement.classList.add("d-none");
		});

		const playAgainBtn = document.createElement("a");
		playAgainBtn.classList.add("btn");
		playAgainBtn.innerText = "Play Again";
		// TODO make it play again
		playAgainBtn.addEventListener("click", function () {
			console.log("page3Shown");
			document.body.dispatchEvent(page3Shown);
			messageDiv.parentElement.classList.add("d-none");
		});

		btns.appendChild(backToLoginBtn);
		btns.appendChild(playAgainBtn);

		messageDiv.appendChild(btns);
	}

	function updateGameInfo() {
		document.querySelector("#welcoming-message").innerText +=
			" " + getFromLocalStorage("name").split(" ")[0];

		for (let index = 1; index <= userSelectedLevel; index++) {
			const solContainer = document.createElement("div");
			const solImage = document.createElement("img");
			const solNumber = document.createElement("span");

			solImage.src = `./images/${getFromLocalStorage("theme")}/${index}.jpg`;
			solNumber.innerText = index;

			solContainer.appendChild(solImage);
			solContainer.appendChild(solNumber);
			document.querySelector("#theme-images").appendChild(solContainer);
		}
	}

	isInitDone = true;
}

export function clearGamePage() {
	if (document.querySelector("#btns")) document.querySelector("#btns").remove();

	const gamePage = document.querySelector("#game-page");
	const timerElement = document.querySelector("#timer");
	const startBtn = document.querySelector("#start-btn");
	document.querySelector("#theme-images").innerHTML = "";
	gamePage.querySelector("#board").innerHTML = "";
	startBtn.classList.remove("d-none");
	timerElement.classList.add("d-none");
	timerElement.classList.remove("danger");
	document.querySelector("#game-page").classList.add("d-none");
	// document.querySelector("#game-page").classList.remove("d-none");
	document.querySelector("#loader-container").classList.remove("d-none");

	document.querySelector("#welcoming-message").innerText = "Welcome ";
}
