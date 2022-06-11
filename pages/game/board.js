import { Cell } from "./cell.js";
import { getFromLocalStorage } from "../../js/local-storage.js";

export class Board {
	#cellsPerRow;
	#boardCellsNumber;
	#cellsArray;
	constructor(cellsPerRow, problem, solution) {
		this.#cellsPerRow = cellsPerRow;
		this.#boardCellsNumber = cellsPerRow * cellsPerRow;

		this.#createBoard();
		this.#defineCellsProperties(problem, solution);
	}

	#createBoard() {
		// Square takes its number
		this.#cellsArray = new Array(this.#boardCellsNumber)
			.fill()
			.map(() => new Cell());
	}

	#defineCellsProperties(problem, solution) {
		this.#cellsArray.forEach((cell, index) => {
			cell.currentValue = {
				number: problem[index],
				imageUrl: `../images/${getFromLocalStorage("theme")}/${
					problem[index]
				}.jpg`,
			};
			cell.answerValue = solution[index];
			if (cell.currentValue) cell.defaultCell = true;

			cell.left =
				this.#cellsArray[index - 1] ||
				this.#cellsArray[this.#boardCellsNumber - 1];
			cell.right = this.#cellsArray[index + 1] || this.#cellsArray[0];
			cell.up =
				this.#cellsArray[index - this.#cellsPerRow] || this.#cellsArray[index];
			cell.down =
				this.#cellsArray[index + this.#cellsPerRow] || this.#cellsArray[index];
		});
	}

	get cellsArray() {
		return this.#cellsArray;
	}
	get boardCellsNumber() {
		return this.#boardCellsNumber;
	}

	getSelectedCell() {
		return this.#cellsArray.find(
			(cellObject) => cellObject.activeState === true
		);
	}

	isThereWrongCells() {
		console.log(this.#cellsArray);
		const wrongCells = this.#cellsArray.reduce((acc, cellObject) => {
			if (cellObject.currentValue !== cellObject.answerValue)
				acc.push(cellObject);
			return acc;
		}, []);

		return wrongCells.length > 0 ? wrongCells : false;
	}
}
