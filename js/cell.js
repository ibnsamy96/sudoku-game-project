export class Cell {
	#element;
	#up;
	#left;
	#right;
	#down;
	#activeState;
	#currentValue = 0;
	#answerValue;

	constructor() {
		this.#element = document.createElement("div");
		this.#element.classList.add("cell");
	}

	get element() {
		return this.#element;
	}

	get up() {
		return this.#up;
	}
	set up(squareObject) {
		this.#up = squareObject;
	}

	get left() {
		return this.#left;
	}
	set left(squareObject) {
		this.#left = squareObject;
	}

	get right() {
		return this.#right;
	}
	set right(squareObject) {
		this.#right = squareObject;
	}

	get down() {
		return this.#down;
	}
	set down(squareObject) {
		this.#down = squareObject;
	}

	get currentValue() {
		return this.#currentValue;
	}
	set currentValue(number) {
		const parsedNumber = parseInt(number);
		if (isNaN(parsedNumber)) return;
		this.#currentValue = parsedNumber;
	}

	get answerValue() {
		return this.#answerValue;
	}
	set answerValue(number) {
		const parsedNumber = parseInt(number);
		this.#answerValue = parsedNumber;
	}

	get activeState() {
		return this.#activeState;
	}
	focus() {
		this.#activeState = true;
		this.#element.classList.add("selected");
	}
	unfocus() {
		this.#activeState = false;
		this.#element.classList.remove("selected");
	}
}
