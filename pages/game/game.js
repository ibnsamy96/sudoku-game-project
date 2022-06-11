import { fetchBoard } from "../../api.js";
import { Board } from "../../js/board.js";

const loader = document.querySelector("#loader-container");
const gamePage = document.querySelector("#game-page");

(async function () {
	const data = await fetchBoard(9);
	const gameBoard = new Board(9, data.board, data.solution);

	renderBoard(gameBoard);

	loader.classList.add("d-none");
	gamePage.classList.remove("d-none");
})();

function renderBoard(gameBoard) {
	gameBoard.cellsArray.forEach((cellObject) => {
		gamePage.querySelector("#board").appendChild(cellObject.element);
	});

	gameBoard.cellsArray[0].focus();
	console.log(gameBoard.getSelectedCell());

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

function changeCellValue(number, currentSelectedCell) {
	currentSelectedCell.currentValue = number;
	currentSelectedCell.element.style.backgroundImage =
		"url(../images/egyptian/" + number + ".jpg)";
}
