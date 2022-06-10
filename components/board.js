import { Cell } from "./cell.js";

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
			cell.currentValue = problem[index];
			cell.answerValue = solution[index];

			cell.left =
				this.#cellsArray[index - 1] ||
				this.#cellsArray[this.#boardCellsNumber - 1];
			cell.right = this.#cellsArray[index + 1] || this.#cellsArray[0];
			cell.top =
				this.#cellsArray[index - this.#cellsPerRow] ||
				this.#cellsArray[this.#boardCellsNumber + index - this.#cellsPerRow];
			cell.bottom =
				this.#cellsArray[index + this.#cellsPerRow] ||
				this.#cellsArray[-this.#boardCellsNumber + index + this.#cellsPerRow];
		});
	}

	get cellsArray() {
		return this.#cellsArray;
	}
	get boardCellsNumber() {
		return this.#boardCellsNumber;
	}
}
